const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Conversation = require('../models/Conversation');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @route   POST /api/chat
// @desc    Send message and get AI response
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { messages, conversationId } = req.body;
    const userId = req.user.id;

    // Validate
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Please provide messages' });
    }

    // Get user
    const user = await User.findById(userId);
    
    // Check message limit
    if (user.messagesUsed >= user.messageLimit) {
      return res.status(403).json({ 
        error: 'Message limit reached. Please upgrade your plan.',
        messagesUsed: user.messagesUsed,
        messageLimit: user.messageLimit
      });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const aiMessage = completion.choices[0].message.content;

    // Update user message count
    user.messagesUsed += 1;
    await user.save();

    // Save conversation
    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (conversation) {
        conversation.messages.push(...messages, {
          role: 'assistant',
          content: aiMessage,
          timestamp: new Date()
        });
        conversation.generateTitle();
        await conversation.save();
      }
    } else {
      // Create new conversation
      conversation = await Conversation.create({
        userId: user._id,
        messages: [...messages, {
          role: 'assistant',
          content: aiMessage,
          timestamp: new Date()
        }]
      });
      conversation.generateTitle();
      await conversation.save();
    }

    res.json({
      success: true,
      message: aiMessage,
      conversationId: conversation._id,
      messagesRemaining: user.messageLimit - user.messagesUsed,
      tokensUsed: completion.usage.total_tokens
    });
  } catch (error) {
    console.error('Chat error:', error);
    
    if (error.response) {
      return res.status(error.response.status).json({ 
        error: 'OpenAI API error',
        details: error.response.data
      });
    }
    
    res.status(500).json({ error: 'Error processing chat' });
  }
});

// @route   GET /api/chat/history
// @desc    Get user's chat history
// @access  Private
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const conversations = await Conversation.find({ 
      userId: req.user.id,
      isActive: true
    })
      .sort({ updatedAt: -1 })
      .limit(50)
      .select('-messages'); // Don't include full messages, just metadata

    res.json({ 
      success: true, 
      conversations 
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Error fetching history' });
  }
});

// @route   GET /api/chat/conversation/:id
// @desc    Get specific conversation
// @access  Private
router.get('/conversation/:id', authMiddleware, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({ 
      success: true, 
      conversation 
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Error fetching conversation' });
  }
});

// @route   DELETE /api/chat/conversation/:id
// @desc    Delete conversation
// @access  Private
router.delete('/conversation/:id', authMiddleware, async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      { isActive: false },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({ 
      success: true, 
      message: 'Conversation deleted successfully' 
    });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({ error: 'Error deleting conversation' });
  }
});

module.exports = router;
