'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Code,
  Languages,
  Briefcase,
  Palette,
  Music,
  Globe,
  ArrowRight,
  TrendingUp,
  FlaskConical,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  tutorCount?: number;
}

const iconMap: Record<string, any> = {
  Calculator,
  Code,
  Languages,
  Briefcase,
  Palette,
  Music,
  Globe,
  Flask: FlaskConical,
};

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-pink-500 to-rose-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-indigo-500 to-blue-500',
  'from-red-500 to-pink-500',
  'from-teal-500 to-cyan-500',
];

const stats = [
  { value: '500+', label: 'Expert Tutors' },
  { value: '50+', label: 'Subjects Covered' },
  { value: '10k+', label: 'Sessions Completed' },
];

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategories([
      { id: '1', name: 'Mathematics', slug: 'mathematics', description: 'Algebra, Calculus, Geometry, Statistics', icon: 'Calculator', tutorCount: 245 },
      { id: '2', name: 'Programming', slug: 'programming', description: 'Python, JavaScript, Java, C++, Web Development', icon: 'Code', tutorCount: 312 },
      { id: '3', name: 'Languages', slug: 'languages', description: 'English, Spanish, French, German, Mandarin', icon: 'Languages', tutorCount: 189 },
      { id: '4', name: 'Sciences', slug: 'sciences', description: 'Physics, Chemistry, Biology, Environmental Science', icon: 'Flask', tutorCount: 156 },
      { id: '5', name: 'Business', slug: 'business', description: 'Economics, Finance, Marketing, Management', icon: 'Briefcase', tutorCount: 134 },
      { id: '6', name: 'Arts & Design', slug: 'arts-design', description: 'Drawing, Painting, Graphic Design, UI/UX', icon: 'Palette', tutorCount: 98 },
      { id: '7', name: 'Music', slug: 'music', description: 'Piano, Guitar, Violin, Music Theory, Vocals', icon: 'Music', tutorCount: 87 },
      { id: '8', name: 'Social Studies', slug: 'social-studies', description: 'History, Geography, Political Science, Sociology', icon: 'Globe', tutorCount: 76 },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse text-gray-600 dark:text-gray-400">Loading categories...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-blue-900/[0.02] dark:bg-grid-white/[0.02] bg-[size:40px_40px]" />

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
            <TrendingUp className="w-4 h-4" />
            Popular Categories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Subjects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find expert tutors across all major subjects and disciplines
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Calculator;
            const gradient = gradients[index % gradients.length];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <Link
                  href={`/tutors?category=${category.id}`}
                  className="group relative flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl dark:shadow-gray-900/50 dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden h-full"
                >
                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-md`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-white mb-2 transition-colors">
                      {category.name}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 mb-4 line-clamp-2 transition-colors flex-1">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors">
                        {category.tutorCount}+ tutors
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-3 gap-px bg-blue-100 dark:bg-blue-900/30 rounded-2xl overflow-hidden shadow-lg mb-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 p-8 text-center text-white">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-4xl lg:text-5xl font-bold mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Browse All Tutors
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
