export type{Route} from "./routes.types"


// User and Auth Types
export type UserRole = 'STUDENT' | 'TUTOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  session: {
    token: string;
    expiresAt: string;
  };
}

// Tutor Types
export interface TutorProfile {
  id: string;
  userId: string;
  bio?: string;
  headline?: string;
  subjects: string[];
  languages: string[];
  education?: string;
  hourlyRate: number;
  experience: number;
  categoryIds: string[];
  rating: number;
  totalReviews: number;
  totalSessions: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  user?: User;
  availability?: Availability[];
  reviews?: Review[];
  categories?: Category[];
}

export interface CreateTutorProfileInput {
  bio?: string;
  headline?: string;
  subjects: string[];
  languages: string[];
  education?: string;
  hourlyRate: number;
  experience?: number;
  categoryIds: string[];
}

export interface UpdateTutorProfileInput extends Partial<CreateTutorProfileInput> {
  isAvailable?: boolean;
}

export interface TutorStats {
  totalBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalEarnings: number;
  rating: number;
  totalReviews: number;
  totalSessions: number;
}

// Booking Types
export type BookingStatus = 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  duration?: number;
  status: BookingStatus;
  price: number;
  notes?: string;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
  student?: User;
  tutor?: TutorProfile;
  review?: Review;
}

export interface CreateBookingInput {
  tutorId: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  duration?: number;
  price: number;
  notes?: string;
  meetingLink?: string;
}

// Review Types
export interface Review {
  id: string;
  bookingId: string;
  tutorId: string;
  studentId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
  student?: User;
  booking?: {
    subject: string;
    date: string;
  };
}

export interface CreateReviewInput {
  bookingId: string;
  rating: number;
  comment?: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  averageRating: number;
  totalReviews: number;
}

// Availability Types
export interface Availability {
  id: string;
  tutorId: string;
  dayOfWeek: number; // 0-6 (Sunday to Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAvailabilityInput {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface AvailabilityResponse {
  slots: Availability[];
  groupedByDay: Record<number, Availability[]>;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {
  isActive?: boolean;
}

// Admin Types
export interface PlatformStats {
  overview: {
    totalUsers: number;
    totalStudents: number;
    totalTutors: number;
    totalAdmins: number;
    totalBookings: number;
    totalRevenue: number;
    totalCategories: number;
    totalReviews: number;
    recentUsers: number;
  };
  bookings: {
    total: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Filter Types
export interface TutorFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  subject?: string;
  page?: number;
  limit?: number;
  sortBy?: 'rating' | 'price_low' | 'price_high';
}

export interface BookingFilters {
  status?: BookingStatus;
}

export interface UserFilters {
  role?: UserRole;
  search?: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

// Utility Types
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DAYS_OF_WEEK: Record<DayOfWeek, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const BOOKING_STATUS_COLORS: Record<BookingStatus, string> = {
  CONFIRMED: 'blue',
  COMPLETED: 'green',
  CANCELLED: 'red',
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  STUDENT: 'Student',
  TUTOR: 'Tutor',
  ADMIN: 'Admin',
};