'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Star, 
  MapPin, 
  Award, 
  BookOpen, 
  Clock, 
  Languages, 
  DollarSign,
  Calendar,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { tutorApi, reviewApi } from '@/lib/api';
import type { TutorProfile, ReviewsResponse } from '@/types';
import BookingModal from '@/components/tutors/BookingModel';


const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function TutorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const tutorId = params.id as string;

  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [reviews, setReviews] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [tutorData, reviewsData] = await Promise.all([
          tutorApi.getById(tutorId),
          reviewApi.getTutorReviews(tutorId),
        ]);
        setTutor(tutorData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error loading tutor:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [tutorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">Tutor not found</p>
          <button
            onClick={() => router.push('/tutors')}
            className="text-blue-600 hover:underline"
          >
            Browse all tutors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/tutors')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to tutors
        </button>

        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600"></div>

          <div className="px-8 pb-8">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col md:flex-row gap-6 -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                <span className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                  {tutor.user?.name?.charAt(0) || 'T'}
                </span>
              </div>

              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {tutor.user?.name}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                      {tutor.headline || 'Professional Tutor'}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {tutor.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          ({tutor.totalReviews} reviews)
                        </span>
                      </div>
                      <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {tutor.totalSessions} sessions completed
                      </div>
                    </div>
                  </div>

                  {/* Price & Book Button */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Starting at</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      ${tutor.hourlyRate}
                      <span className="text-lg font-normal text-gray-500 dark:text-gray-400">/hr</span>
                    </p>
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {tutor.experience} years
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Subjects</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {tutor.subjects?.length || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <Languages className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Languages</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {tutor.languages?.length || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Response</p>
                  <p className="font-semibold text-gray-900 dark:text-white">Within 1 hour</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                About Me
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {tutor.bio || 'No bio provided yet.'}
              </p>
            </div>

            {/* Education */}
            {tutor.education && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Education
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{tutor.education}</p>
              </div>
            )}

            {/* Subjects */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Subjects I Teach
              </h2>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects?.map((subject) => (
                  <span
                    key={subject}
                    className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {tutor.languages?.map((language) => (
                  <span
                    key={language}
                    className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg font-medium"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Student Reviews
              </h2>

              {reviews && reviews.reviews.length > 0 ? (
                <div className="space-y-6">
                  {/* Rating Summary */}
                  <div className="flex items-start gap-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                        {reviews.averageRating.toFixed(1)}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.round(reviews.averageRating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {reviews.totalReviews} reviews
                      </p>
                    </div>

                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        // const count = reviews.ratingDistribution[rating] || 0;
                        const count = (reviews.ratingDistribution as any)[rating] || 0;
                        const percentage = reviews.totalReviews > 0
                          ? (count / reviews.totalReviews) * 100
                          : 0;

                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                              {rating} ★
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 w-12 text-right">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review List */}
                  <div className="space-y-6">
                    {reviews.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                              {review.student?.name?.charAt(0) || 'S'}
                            </span>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {review.student?.name || 'Student'}
                              </h4>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                              {review.comment}
                            </p>

                            <p className="text-sm text-gray-500 dark:text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No reviews yet
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Availability */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Availability
                </h2>
              </div>

              {tutor.availability && tutor.availability.length > 0 ? (
                <div className="space-y-3">
                  {tutor.availability.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {DAYS[slot.dayOfWeek]}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No availability set
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to start?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Book a session with {tutor.user?.name?.split(' ')[0]} to begin your learning journey.
              </p>
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          tutor={tutor}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}
