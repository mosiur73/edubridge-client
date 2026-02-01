'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star, Clock, ArrowRight, Award } from 'lucide-react';

interface Tutor {
  id: string;
  name: string;
  headline: string;
  rating: number;
  totalReviews: number;
  hourlyRate: number;
  subjects: string[];
  totalSessions: number;
}

export default function FeaturedTutorsSection() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setTutors([
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        headline: 'Mathematics PhD | 15 Years Experience',
        rating: 4.9,
        totalReviews: 234,
        hourlyRate: 75,
        subjects: ['Calculus', 'Linear Algebra', 'Statistics'],
        totalSessions: 450,
      },
      {
        id: '2',
        name: 'Prof. Michael Chen',
        headline: 'Computer Science Expert | MIT Graduate',
        rating: 5.0,
        totalReviews: 189,
        hourlyRate: 85,
        subjects: ['Python', 'JavaScript', 'Data Structures'],
        totalSessions: 380,
      },
      {
        id: '3',
        name: 'Emma Williams',
        headline: 'English Literature Specialist',
        rating: 4.8,
        totalReviews: 156,
        hourlyRate: 60,
        subjects: ['English', 'Writing', 'Essay Prep'],
        totalSessions: 290,
      },
      {
        id: '4',
        name: 'Dr. James Rodriguez',
        headline: 'Physics & Chemistry Professor',
        rating: 4.9,
        totalReviews: 203,
        hourlyRate: 70,
        subjects: ['Physics', 'Chemistry', 'Biology'],
        totalSessions: 420,
      },
      {
        id: '5',
        name: 'Lisa Anderson',
        headline: 'French Language Native Speaker',
        rating: 4.7,
        totalReviews: 98,
        hourlyRate: 50,
        subjects: ['French', 'Spanish', 'Linguistics'],
        totalSessions: 210,
      },
      {
        id: '6',
        name: 'David Kim',
        headline: 'Business & Economics Consultant',
        rating: 4.9,
        totalReviews: 167,
        hourlyRate: 65,
        subjects: ['Economics', 'Business', 'Finance'],
        totalSessions: 340,
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse text-gray-600 dark:text-gray-400">Loading tutors...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium mb-4">
            <Award className="w-4 h-4" />
            Top Rated Tutors
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Featured Tutors
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Learn from experienced educators who are passionate about helping you succeed
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tutors.map((tutor, index) => (
            <Link
              key={tutor.id}
              href={`/tutors/${tutor.id}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Header */}
              <div className="relative h-32 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 p-6">
                {/* Profile Picture */}
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {tutor.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full text-white">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  <span className="font-semibold">{tutor.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-14 p-6 space-y-4">
                {/* Name & Headline */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tutor.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{tutor.headline}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{tutor.totalSessions} sessions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>({tutor.totalReviews} reviews)</span>
                  </div>
                </div>

                {/* Subjects */}
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.slice(0, 3).map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 dark:border-gray-700" />

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Starting at</span>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${tutor.hourlyRate}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/hr</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                    View Profile
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            View All Tutors
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}