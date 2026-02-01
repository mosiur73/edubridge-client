'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 dark:from-blue-900 dark:via-indigo-900 dark:to-gray-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.05] dark:bg-grid-white/[0.03] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 dark:from-black/40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full border border-white/20 dark:border-white/10">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Connect with 500+ Expert Tutors</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Learn from the{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text">
                Best Tutors
              </span>{' '}
              Worldwide
            </h1>

            {/* Description */}
            <p className="text-xl text-blue-100 dark:text-blue-200 leading-relaxed max-w-xl">
              Book personalized one-on-one sessions with qualified tutors. 
              Master any subject at your own pace with expert guidance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/tutors"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 dark:bg-gray-100 dark:text-blue-700 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                Browse Tutors
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 dark:bg-white/5 backdrop-blur-sm border-2 border-white/30 dark:border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200"
              >
                Become a Tutor
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-sm font-bold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-2xl font-bold">10,000+</p>
                  <p className="text-sm text-blue-200 dark:text-blue-300">Happy Students</p>
                </div>
              </div>

              <div className="h-12 w-px bg-white/20 dark:bg-white/10" />

              <div>
                <p className="text-2xl font-bold">4.9/5</p>
                <p className="text-sm text-blue-200 dark:text-blue-300">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 p-6 space-y-4 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Mathematics</h3>
                    <p className="text-gray-600 dark:text-gray-400">150+ Tutors Available</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">$25-$80</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">per hour</span>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg font-semibold animate-bounce">
                🔥 Popular
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl shadow-xl p-4 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <div>
                    <p className="text-sm opacity-90">Live Sessions</p>
                    <p className="text-2xl font-bold">234</p>
                  </div>
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute top-1/2 -right-12 w-24 h-24 bg-yellow-300 dark:bg-yellow-500 rounded-full opacity-20 dark:opacity-10 blur-2xl" />
              <div className="absolute bottom-0 -left-12 w-32 h-32 bg-purple-400 dark:bg-purple-600 rounded-full opacity-20 dark:opacity-10 blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            className="fill-white dark:fill-gray-900"
          />
        </svg>
      </div>
    </section>
  );
}