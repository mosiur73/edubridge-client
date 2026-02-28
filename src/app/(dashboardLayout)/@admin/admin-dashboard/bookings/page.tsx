'use client';

import { useEffect, useState } from 'react';
import { Calendar, Search, User, GraduationCap } from 'lucide-react';
import { adminApi } from '@/lib/api';
import type { Booking } from '@/types';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);  // ✅ Type added
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadBookings();
  }, [statusFilter]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAllBookings(statusFilter || undefined);
      setBookings(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... rest of your code
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Bookings Management
        </h1>

        {/* Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
          <select
            className="px-4 py-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {booking.subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      Student: {booking.student?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Tutor: {booking.tutor?.user?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                    booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}