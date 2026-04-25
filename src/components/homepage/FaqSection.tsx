'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  { id: 1, question: 'How do I find the right tutor for my needs?', answer: 'You can search tutors by subject, skill level, and availability. Each tutor profile includes their qualifications, ratings, reviews, and teaching style. We recommend reading reviews from other students to find the perfect match.' },
  { id: 2, question: 'What is the pricing structure?', answer: "Tutors set their own hourly rates, which typically range from $25-$75 per hour depending on expertise and subject. You only pay for sessions you book. There are no hidden fees or subscription requirements." },
  { id: 3, question: 'Can I cancel or reschedule sessions?', answer: "Yes! You can cancel or reschedule sessions up to 24 hours in advance for a full refund. Cancellations within 24 hours may be subject to a cancellation fee as per your tutor's policy." },
  { id: 4, question: 'How does the payment system work?', answer: 'All payments are processed securely through our platform using Stripe. You pay before each session is confirmed. Tutors receive their payments after session completion. We use industry-standard encryption to protect your financial information.' },
  { id: 5, question: 'What platforms do you support for online sessions?', answer: 'We support video sessions through Zoom, Google Meet, and our built-in video platform. You can also arrange in-person sessions if the tutor is in your area. The choice of platform is coordinated with your tutor.' },
  { id: 6, question: 'Is there a money-back guarantee if I am not satisfied?', answer: 'Yes! If you are not satisfied with your first session with a tutor, we offer a full refund. We want you to find the perfect learning match. This guarantee applies to your first booking with each tutor.' },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-60" />

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find answers to common questions about EduBridge
          </p>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3 mb-12"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className={`bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border transition-all duration-200 ${
                openId === faq.id
                  ? 'border-blue-300 dark:border-blue-600 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700'
              }`}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className={`w-5 h-5 transition-colors ${openId === faq.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-8 text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
