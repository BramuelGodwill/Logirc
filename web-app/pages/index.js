import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-600/20 via-transparent to-accent-600/20 blur-3xl animate-float" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent-600/20 via-transparent to-primary-600/20 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Logirc AI</h1>
              <p className="text-xs text-gray-500">Innovation, Simplified</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <button 
              onClick={() => router.push('/login')}
              className="btn-ghost"
            >
              Login
            </button>
            <button 
              onClick={() => router.push('/signup')}
              className="btn-primary"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-primary-600/10 border border-primary-600/20 rounded-full text-primary-400 text-sm font-medium">
                🚀 Powered by Advanced AI
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Vision,
              <br />
              <span className="gradient-text">Our Code</span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Where <span className="text-primary-400 font-semibold">Logic</span> meets <span className="text-accent-400 font-semibold">Creativity</span>. 
              Experience the future of AI-powered conversations with Logirc AI.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => router.push('/signup')}
                className="btn-primary px-8 py-4 text-lg"
              >
                Start Free Trial
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={() => router.push('/chat')}
                className="btn-secondary px-8 py-4 text-lg"
              >
                View Demo
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Active Users', value: '50K+' },
                { label: 'Messages', value: '10M+' },
                { label: 'Uptime', value: '99.9%' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Chat Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="glass rounded-3xl p-6 shadow-2xl">
              {/* Mock Chat Interface */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="chat-bubble-user max-w-xs">
                    How can Logirc AI help my business?
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">L</span>
                  </div>
                  <div className="chat-bubble-ai max-w-md">
                    <p className="mb-2">I can help your business in multiple ways:</p>
                    <ul className="space-y-1 text-sm">
                      <li>✨ Automate customer support</li>
                      <li>🚀 Generate content & ideas</li>
                      <li>💡 Analyze data & insights</li>
                      <li>⚡ Boost productivity</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-3 bg-dark-800 rounded-xl border border-dark-700">
                  <input 
                    type="text" 
                    placeholder="Ask me anything..." 
                    className="flex-1 bg-transparent border-none outline-none text-gray-300 placeholder-gray-600"
                    disabled
                  />
                  <button className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-primary-600/20 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-600/20 rounded-full blur-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">Logirc AI</span>?
          </h2>
          <p className="text-xl text-gray-400">
            The Logic is simple — innovate or fade.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Get instant responses powered by cutting-edge AI technology'
            },
            {
              icon: '🔒',
              title: 'Secure & Private',
              description: 'Your conversations are encrypted and completely confidential'
            },
            {
              icon: '🎨',
              title: 'Creative Solutions',
              description: 'From code to content, we bring your ideas to life'
            },
            {
              icon: '📱',
              title: 'Cross-Platform',
              description: 'Access on web, mobile, or desktop - anywhere, anytime'
            },
            {
              icon: '🌍',
              title: 'Global Reach',
              description: 'Built in Kenya, serving the world with African innovation'
            },
            {
              icon: '💰',
              title: 'Fair Pricing',
              description: 'Transparent pricing with no hidden fees - pay as you grow'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card hover:border-primary-600/50 group cursor-pointer"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of users already experiencing the power of Logirc AI
          </p>
          <button 
            onClick={() => router.push('/signup')}
            className="btn-primary px-10 py-5 text-lg"
          >
            Start Your Free Trial
            <svg className="w-6 h-6 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
