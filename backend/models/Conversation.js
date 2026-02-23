const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'New Conversation'
  },
  messages: [messageSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update timestamp on save
conversationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate title from first message
conversationSchema.methods.generateTitle = function() {
  if (this.messages.length > 0 && this.messages[0].role === 'user') {
    const firstMessage = this.messages[0].content;
    this.title = firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : '');
  }
};

module.exports = mongoose.model('Conversation', conversationSchema);
