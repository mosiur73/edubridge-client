'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const perks = [
    'Weekly tutor spotlights',
    'Learning tips & resources',
    'Exclusive discounts',
    'New subject announcements',
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] bg-[size:32px_32px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/3" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left — Info */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                  <Bell className="w-7 h-7 text-white" />
                </div>

                <h2 className="text-3xl font-bold mb-4 leading-tight">
                  Stay Updated with EduBridge
                </h2>

                <p className="text-blue-100 mb-8 leading-relaxed">
                  Subscribe to our newsletter and never miss the latest updates, 
                  new tutors, and exclusive learning resources.
                </p>

                <ul className="space-y-3">
                  {perks.map((perk, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center gap-3 text-sm text-blue-100"
                    >
                      <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                      {perk}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right — Form */}
            <div className="p-10 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-8"
                    >
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        You're subscribed!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Thank you for subscribing. Check your inbox for a welcome email.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          Subscribe to Newsletter
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Join 5,000+ learners getting weekly updates. No spam, ever.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              placeholder="you@example.com"
                              className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                error
                                  ? 'border-red-400 dark:border-red-500'
                                  : 'border-gray-300 dark:border-gray-600'
                              }`}
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                              }}
                            />
                          </div>
                          {error && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-1.5 text-sm text-red-500 dark:text-red-400"
                            >
                              {error}
                            </motion.p>
                          )}
                        </div>

                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-semibold transition-colors shadow-md hover:shadow-lg"
                        >
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Subscribe Now
                            </>
                          )}
                        </motion.button>

                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          By subscribing, you agree to our{' '}
                          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Privacy Policy
                          </a>
                          . Unsubscribe anytime.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}