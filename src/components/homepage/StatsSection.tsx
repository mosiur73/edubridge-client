'use client';

import { Users, BookOpen, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: Users,
    value: '500+',
    label: 'Expert Tutors',
    description: 'Verified professionals across all subjects',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/30',
  },
  {
    icon: BookOpen,
    value: '10,000+',
    label: 'Happy Students',
    description: 'Learners achieving their goals every day',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Average Rating',
    description: 'Based on thousands of student reviews',
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-50 dark:bg-yellow-900/30',
  },
  {
    icon: Award,
    value: '50+',
    label: 'Subjects Covered',
    description: 'From academics to professional skills',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/30',
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-medium mb-4">
            <Award className="w-4 h-4" />
            Platform Impact
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join a growing community of learners and educators making education accessible worldwide
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-all duration-300 text-center"
            >
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className={`text-4xl font-bold mb-2 ${stat.color}`}
              >
                {stat.value}
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{stat.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
