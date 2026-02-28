'use client';

import { useEffect, useState } from 'react';
import { Star, Calendar, BookOpen, Trash2, Edit } from 'lucide-react';
import { bookingApi } from '@/lib/api';
import type { Booking } from '@/types';

export default function MyReviewsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      // Get completed bookings with reviews
      const data = await bookingApi.getMy({ status: 'COMPLETED' });
      // Filter only bookings with reviews
      const withReviews = data.filter((booking) => booking.review);
      setBookings(withReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Reviews you've given to tutors
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bookings.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400 fill-current" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bookings.length > 0
                    ? (
                        bookings.reduce((sum, b) => sum + (b.review?.rating || 0), 0) /
                        bookings.length
                      ).toFixed(1)
                    : '0.0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tutors Reviewed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(bookings.map((b) => b.tutorId)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {bookings.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete a session to leave your first review
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  {/* Tutor Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-white">
                        {booking.tutor?.user?.name?.charAt(0) || 'T'}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {booking.tutor?.user?.name || 'Tutor'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {booking.tutor?.headline || 'Professional Tutor'}
                      </p>

                      {/* Session Details */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {booking.subject}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review */}
                  {booking.review && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < booking.review!.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {booking.review.rating}.0
                        </span>
                      </div>

                      {/* Comment */}
                      {booking.review.comment && (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                          {booking.review.comment}
                        </p>
                      )}

                      {/* Date */}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Reviewed on{' '}
                        {new Date(booking.review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
