'use client';

import { Shield, Clock, CreditCard, HeartHandshake, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Verified Tutors',
    description: 'Every tutor goes through a thorough verification process. We check qualifications, experience, and conduct background reviews.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Book sessions that fit your schedule. Morning, evening, or weekend — our tutors are available when you need them.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'All payments are processed securely through Stripe. No hidden fees — you only pay for sessions you book.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Learning',
    description: 'Every session is tailored to your unique learning style, pace, and goals. Get one-on-one attention you deserve.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    description: 'Book a session in minutes. Browse profiles, check availability, and confirm your booking instantly.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Learn From Anywhere',
    description: 'Connect with expert tutors from around the world. All you need is an internet connection to start learning.',
    gradient: 'from-indigo-500 to-blue-500',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium mb-4">
            <Shield className="w-4 h-4" />
            Why EduBridge
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're committed to making quality education accessible, affordable, and effective for everyone
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-md`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
