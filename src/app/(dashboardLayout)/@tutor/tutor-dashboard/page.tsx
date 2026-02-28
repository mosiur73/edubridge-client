'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DollarSign, Calendar, Star, TrendingUp, AlertCircle } from 'lucide-react';
import { tutorApi, bookingApi } from '@/lib/api';
import type { TutorStats, Booking } from '@/types';
import toast from 'react-hot-toast';

export default function TutorDashboard() {
  const [stats, setStats] = useState<TutorStats | null>(null);
  const [sessions, setSessions] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to get stats - this will fail if no profile exists
      const statsData = await tutorApi.getStats();
      setStats(statsData);
      setHasProfile(true);

      // Only load sessions if we have a profile
      try {
        const sessionsData = await tutorApi.getSessions();
        setSessions(sessionsData.filter(s => s.status === 'CONFIRMED').slice(0, 5));
      } catch (sessionError) {
        console.error('Error loading sessions:', sessionError);
        setSessions([]);
      }
    } catch (err: any) {
      console.error('Error loading dashboard:', err);
      
      // Check if it's a "no profile" error
      if (err.response?.status === 404 || err.message?.includes('Profile not found')) {
        setHasProfile(false);
        setError('You need to create your tutor profile first.');
      } else if (err.response?.status === 401) {
        setError('Please log in to access the dashboard.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later or contact support.');
      } else {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      }
      
      toast.error(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (id: string) => {
    try {
      await bookingApi.markComplete(id);
      toast.success('Session marked as complete!');
      loadData(); // Reload all data
    } catch (error: any) {
      console.error('Mark complete error:', error);
      toast.error(error.response?.data?.message || 'Failed to mark complete');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show error state if no profile or other error
  if (error || !hasProfile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-yellow-900 dark:text-yellow-100 mb-2">
                  {!hasProfile ? 'Profile Setup Required' : 'Dashboard Error'}
                </h3>
                <p className="text-yellow-800 dark:text-yellow-200 mb-6 text-lg">
                  {error || 'You need to create your tutor profile to access the dashboard.'}
                </p>
                <div className="flex gap-3">
                  {!hasProfile ? (
                    <Link
                      href="/tutor/dashboard/profile"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                    >
                      Create Tutor Profile
                      <span>→</span>
                    </Link>
                  ) : (
                    <button
                      onClick={loadData}
                      className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started Guide */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Getting Started as a Tutor
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Create Your Profile</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Set up your tutor profile with bio, subjects, and hourly rate
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Set Your Availability</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Add your weekly availability so students can book sessions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Start Teaching</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Students can now find and book sessions with you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Tutor Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your performance and manage your sessions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              ${stats?.totalEarnings || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stats?.totalSessions || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stats?.rating.toFixed(1) || '0.0'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stats?.completedBookings || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Upcoming Sessions
              </h2>

              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-2">No upcoming sessions</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Students will book sessions once you set your availability
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {session.student?.name?.charAt(0) || 'S'}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {session.student?.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.subject}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.startTime} - {session.endTime}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          ${session.price}
                        </p>
                        <button
                          onClick={() => handleMarkComplete(session.id)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/tutor-dashboard/profile"
                  className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-center transition-colors"
                >
                  Edit Profile
                </Link>
                <Link
                  href="/tutor-dashboard/availability"
                  className="block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium text-center transition-colors"
                >
                  Set Availability
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Growing Your Profile</h3>
              <p className="text-sm text-blue-100 mb-4">
                Keep your profile updated and maintain high ratings to attract more students!
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Profile complete: ✓</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Availability set: {stats?.totalSessions ? '✓' : 'Pending'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>First review: {stats?.totalReviews ? '✓' : 'Pending'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}