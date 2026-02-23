import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

export default function Chat() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { messages, addMessage, clearMessages } = useChatStore();
  const { user } = useAuthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    addMessage(userMessage);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
        {
          messages: [...messages, userMessage],
          model: 'gpt-4'
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date().toISOString()
      };

      addMessage(aiMessage);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const SuggestedPrompts = () => (
    <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
      {[
        '✨ Generate a business plan for my startup',
        '💻 Write a Python script to analyze data',
        '📝 Help me draft a professional email',
        '🎨 Create a marketing strategy'
      ].map((prompt, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => setInput(prompt)}
          className="card hover:border-primary-600/50 text-left p-4 hover:scale-105 transition-transform"
        >
          <p className="text-gray-300">{prompt}</p>
        </motion.button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-dark-950">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <span className="text-white font-bold text-3xl">L</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Welcome to <span className="gradient-text">Logirc AI</span>
              </h1>
              <p className="text-xl text-gray-400 mb-12">
                How can I help you today?
              </p>
              <SuggestedPrompts />
            </motion.div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold">L</span>
                      </div>
                    )}
                    
                    <div className={`max-w-3xl ${message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                      <ReactMarkdown
                        className="markdown-content"
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg my-4"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className="bg-dark-700 px-2 py-1 rounded text-primary-400" {...props}>
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div className="chat-bubble-ai">
                    <div className="typing-indicator">
                      <span style={{ '--i': 0 }} />
                      <span style={{ '--i': 1 }} />
                      <span style={{ '--i': 2 }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-dark-800 bg-dark-900 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-3 bg-dark-800 border border-dark-700 rounded-2xl px-4 py-3 focus-within:border-primary-600 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Logirc anything..."
                className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-gray-500 text-lg"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-3">
              Logirc AI can make mistakes. Consider checking important information.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
