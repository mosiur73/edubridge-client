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
  TrendingUp
} from 'lucide-react';

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
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategories([
      {
        id: '1',
        name: 'Mathematics',
        slug: 'mathematics',
        description: 'Algebra, Calculus, Geometry, Statistics',
        icon: 'Calculator',
        tutorCount: 245,
      },
      {
        id: '2',
        name: 'Programming',
        slug: 'programming',
        description: 'Python, JavaScript, Java, C++, Web Development',
        icon: 'Code',
        tutorCount: 312,
      },
      {
        id: '3',
        name: 'Languages',
        slug: 'languages',
        description: 'English, Spanish, French, German, Mandarin',
        icon: 'Languages',
        tutorCount: 189,
      },
      {
        id: '4',
        name: 'Sciences',
        slug: 'sciences',
        description: 'Physics, Chemistry, Biology, Environmental Science',
        icon: 'Flask',
        tutorCount: 156,
      },
      {
        id: '5',
        name: 'Business',
        slug: 'business',
        description: 'Economics, Finance, Marketing, Management',
        icon: 'Briefcase',
        tutorCount: 134,
      },
      {
        id: '6',
        name: 'Arts & Design',
        slug: 'arts-design',
        description: 'Drawing, Painting, Graphic Design, UI/UX',
        icon: 'Palette',
        tutorCount: 98,
      },
      {
        id: '7',
        name: 'Music',
        slug: 'music',
        description: 'Piano, Guitar, Violin, Music Theory, Vocals',
        icon: 'Music',
        tutorCount: 87,
      },
      {
        id: '8',
        name: 'Social Studies',
        slug: 'social-studies',
        description: 'History, Geography, Political Science, Sociology',
        icon: 'Globe',
        tutorCount: 76,
      },
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
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-blue-900/[0.02] dark:bg-grid-white/[0.02] bg-[size:40px_40px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
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
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Calculator;
            
            return (
              <Link
                key={category.id}
                href={`/tutors?category=${category.id}`}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-white mb-2 transition-colors">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/90 mb-4 line-clamp-2 transition-colors">
                    {category.description}
                  </p>

                  {/* Tutor Count & Arrow */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors">
                      {category.tutorCount}+ tutors
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
              </Link>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="grid sm:grid-cols-3 gap-8 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 rounded-2xl text-white">
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold mb-2">500+</div>
            <div className="text-blue-100 dark:text-blue-200">Expert Tutors</div>
          </div>
          <div className="text-center border-l border-r border-white/20">
            <div className="text-4xl lg:text-5xl font-bold mb-2">50+</div>
            <div className="text-blue-100 dark:text-blue-200">Subjects Covered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold mb-2">10k+</div>
            <div className="text-blue-100 dark:text-blue-200">Sessions Completed</div>
          </div>
        </div>

        {/* Browse All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-700 dark:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Browse All Tutors
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}