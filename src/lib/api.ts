import axios from 'axios';
import type {
  ApiResponse,
  TutorProfile,
  CreateTutorProfileInput,
  UpdateTutorProfileInput,
  TutorStats,
  TutorFilters,
  Booking,
  CreateBookingInput,
  BookingFilters,
  Review,
  CreateReviewInput,
  ReviewsResponse,
  Availability,
  CreateAvailabilityInput,
  AvailabilityResponse,
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
  PlatformStats,
  UserFilters,
  User,
} from '@/types';

// Get API URL from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ==================== TUTOR API ====================

export const tutorApi = {
  getAll: async (filters?: TutorFilters): Promise<TutorProfile[]> => {
    const { data } = await api.get<ApiResponse<TutorProfile[]>>('/tutors', {
      params: filters,
    });
    return data.data || [];
  },

  getById: async (id: string): Promise<TutorProfile> => {
    const { data } = await api.get<ApiResponse<TutorProfile>>(`/tutors/${id}`);
    if (!data.data) throw new Error('Tutor not found');
    return data.data;
  },

  createProfile: async (input: CreateTutorProfileInput): Promise<TutorProfile> => {
    const { data } = await api.post<ApiResponse<TutorProfile>>('/tutors/profile', input);
    if (!data.data) throw new Error('Failed to create profile');
    return data.data;
  },

  getMyProfile: async (): Promise<TutorProfile> => {
    const { data } = await api.get<ApiResponse<TutorProfile>>('/tutors/profile');
    if (!data.data) throw new Error('Profile not found');
    return data.data;
  },

  updateProfile: async (input: UpdateTutorProfileInput): Promise<TutorProfile> => {
    const { data } = await api.put<ApiResponse<TutorProfile>>('/tutors/profile', input);
    if (!data.data) throw new Error('Failed to update profile');
    return data.data;
  },

  getSessions: async (status?: string): Promise<Booking[]> => {
    const { data } = await api.get<ApiResponse<Booking[]>>('/tutors/sessions', {
      params: { status },
    });
    return data.data || [];
  },

  /**
   * Get my stats - WITH ERROR HANDLING
   */
  getStats: async (): Promise<TutorStats> => {
    try {
      const { data } = await api.get<ApiResponse<TutorStats>>('/tutors/stats');
      if (!data.data) {
        // Return default stats
        return {
          totalBookings: 0,
          confirmedBookings: 0,
          completedBookings: 0,
          cancelledBookings: 0,
          totalEarnings: 0,
          rating: 0,
          totalReviews: 0,
          totalSessions: 0,
        };
      }
      return data.data;
    } catch (error) {
      console.warn('Stats endpoint failed, returning defaults');
      // Return default stats instead of throwing error
      return {
        totalBookings: 0,
        confirmedBookings: 0,
        completedBookings: 0,
        cancelledBookings: 0,
        totalEarnings: 0,
        rating: 0,
        totalReviews: 0,
        totalSessions: 0,
      };
    }
  },
};

// ==================== BOOKING API ====================

export const bookingApi = {
  create: async (input: CreateBookingInput): Promise<Booking> => {
    const { data } = await api.post<ApiResponse<Booking>>('/bookings', input);
    if (!data.data) throw new Error('Failed to create booking');
    return data.data;
  },

  getMy: async (filters?: BookingFilters): Promise<Booking[]> => {
    const { data } = await api.get<ApiResponse<Booking[]>>('/bookings', {
      params: filters,
    });
    return data.data || [];
  },

  markComplete: async (id: string): Promise<Booking> => {
    const { data } = await api.patch<ApiResponse<Booking>>(`/bookings/${id}/complete`);
    if (!data.data) throw new Error('Failed to mark complete');
    return data.data;
  },

  cancel: async (id: string): Promise<Booking> => {
    const { data } = await api.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`);
    if (!data.data) throw new Error('Failed to cancel booking');
    return data.data;
  },
};

// ==================== REVIEW API ====================

export const reviewApi = {
  create: async (input: CreateReviewInput): Promise<Review> => {
    const { data } = await api.post<ApiResponse<Review>>('/reviews', input);
    if (!data.data) throw new Error('Failed to create review');
    return data.data;
  },

  getTutorReviews: async (tutorId: string): Promise<ReviewsResponse> => {
    const { data } = await api.get<ApiResponse<ReviewsResponse>>(`/reviews/tutor/${tutorId}`);
    if (!data.data) throw new Error('Failed to fetch reviews');
    return data.data;
  },
};

// ==================== AVAILABILITY API ====================

export const availabilityApi = {
  create: async (input: CreateAvailabilityInput): Promise<Availability> => {
    const { data } = await api.post<ApiResponse<Availability>>('/availability', input);
    if (!data.data) throw new Error('Failed to create availability');
    return data.data;
  },

  getMy: async (): Promise<AvailabilityResponse> => {
    try {
      const { data } = await api.get<ApiResponse<AvailabilityResponse>>('/availability');
      if (!data.data) {
        return { slots: [], groupedByDay: {} };
      }
      return data.data;
    } catch (error) {
      console.warn('Availability endpoint failed, returning empty');
      return { slots: [], groupedByDay: {} };
    }
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/availability/${id}`);
  },
};

// ==================== CATEGORY API ====================

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await api.get<ApiResponse<Category[]>>('/categories');
    return data.data || [];
  },
};

// ==================== ADMIN API ====================

export const adminApi = {
  getStats: async (): Promise<PlatformStats> => {
    const { data } = await api.get<ApiResponse<PlatformStats>>('/admin/stats');
    if (!data.data) throw new Error('Failed to fetch stats');
    return data.data;
  },

  getUsers: async (filters?: UserFilters): Promise<User[]> => {
    const { data } = await api.get<ApiResponse<User[]>>('/admin/users', {
      params: filters,
    });
    return data.data || [];
  },

  updateUserRole: async (userId: string, role: string): Promise<User> => {
    const { data } = await api.patch<ApiResponse<User>>(`/admin/users/${userId}/role`, {
      role,
    });
    if (!data.data) throw new Error('Failed to update role');
    return data.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/admin/users/${userId}`);
  },

  getAllBookings: async (status?: string): Promise<Booking[]> => {
    const { data } = await api.get<ApiResponse<Booking[]>>('/admin/bookings', {
      params: { status },
    });
    return data.data || [];
  },

  categories: {
    getAll: async (): Promise<Category[]> => {
      const { data } = await api.get<ApiResponse<Category[]>>('/admin/categories');
      return data.data || [];
    },

    create: async (input: CreateCategoryInput): Promise<Category> => {
      const { data } = await api.post<ApiResponse<Category>>('/admin/categories', input);
      if (!data.data) throw new Error('Failed to create category');
      return data.data;
    },

    update: async (id: string, input: UpdateCategoryInput): Promise<Category> => {
      const { data } = await api.put<ApiResponse<Category>>(`/admin/categories/${id}`, input);
      if (!data.data) throw new Error('Failed to update category');
      return data.data;
    },
  },
};

export default api;