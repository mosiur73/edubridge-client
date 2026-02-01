'use client';

import { Search, UserCheck, Calendar, Zap } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Browse Tutors',
    description: 'Search through hundreds of qualified tutors. Filter by subject, price, rating, and availability to find your perfect match.',
    color: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Choose Your Tutor',
    description: 'Review detailed profiles, read student reviews, and check credentials. Compare tutors to make the best choice for your learning style.',
    color: 'from-purple-500 to-pink-500',
    textColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    number: '03',
    icon: Calendar,
    title: 'Book a Session',
    description: 'Select a time that works for you. Our flexible scheduling makes it easy to fit learning into your busy life.',
    color: 'from-orange-500 to-red-500',
    textColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    number: '04',
    icon: Zap,
    title: 'Start Learning',
    description: 'Join your live session, get personalized attention, and accelerate your learning with expert guidance.',
    color: 'from-green-500 to-emerald-500',
    textColor: 'text-green-600 dark:text-green-400',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] bg-[size:32px_32px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium mb-4">
            <Zap className="w-4 h-4" />
            Simple Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get started in just 4 simple steps. From browsing to learning, we've made it incredibly easy.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines (Desktop only) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
            <div className="relative h-full">
              <div className="absolute top-0 left-[12.5%] right-[12.5%] h-full bg-gradient-to-r from-blue-200 via-purple-200 via-orange-200 to-green-200 dark:from-blue-800 dark:via-purple-800 dark:via-orange-800 dark:to-green-800 rounded-full opacity-50" />
            </div>
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white rounded-full flex items-center justify-center font-bold shadow-lg z-10">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                    <step.icon className={`w-8 h-8 ${step.textColor}`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative Element */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Ready to get started?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join thousands of students already learning with SkillBridge
              </p>
            </div>
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap">
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}