'use client';

import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  gradient: string;
}

const testimonials: Testimonial[] = [
  { id: 1, name: 'Jessica Wong', role: 'College Student', content: 'EduBridge completely transformed my learning experience. The tutors are incredibly knowledgeable and patient. I went from struggling with calculus to scoring an A!', rating: 5, avatar: 'J', gradient: 'from-blue-500 to-cyan-500' },
  { id: 2, name: 'David Martinez', role: 'Career Switcher', content: 'I wanted to learn web development and found the perfect tutor. The personalized approach and flexible scheduling made it so convenient for me.', rating: 5, avatar: 'D', gradient: 'from-violet-500 to-purple-500' },
  { id: 3, name: 'Emma Thompson', role: 'Professional', content: 'Preparing for my professional certifications was daunting, but my tutor made it manageable and even enjoyable. Highly recommend EduBridge!', rating: 5, avatar: 'E', gradient: 'from-pink-500 to-rose-500' },
  { id: 4, name: 'Lucas Chen', role: 'High School Student', content: 'The platform is easy to use and the tutors really care about your progress. My grades have improved significantly since I started using EduBridge.', rating: 5, avatar: 'L', gradient: 'from-amber-500 to-orange-500' },
  { id: 5, name: 'Sofia Rodriguez', role: 'Language Learner', content: "I've been learning Spanish for 6 months and my tutor has been amazing. The structured lessons combined with real conversation practice is perfect!", rating: 5, avatar: 'S', gradient: 'from-emerald-500 to-teal-500' },
  { id: 6, name: 'James Wilson', role: 'Parent', content: "My son was falling behind in math, but after just 2 months with a tutor from EduBridge, he's now at the top of his class. Worth every penny!", rating: 5, avatar: 'J', gradient: 'from-indigo-500 to-blue-500' },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full font-medium mb-4">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            Student Reviews
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of learners who have achieved their goals with EduBridge
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl dark:shadow-gray-900/50 dark:hover:shadow-gray-900 border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col relative overflow-hidden"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1 leading-relaxed text-sm">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              {/* Bottom gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
