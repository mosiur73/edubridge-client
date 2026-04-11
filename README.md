# EduBridge - Online Tutoring Platform

EduBridge is a full-stack online tutoring platform that connects students with expert tutors. Students can browse tutors, book sessions, and leave reviews. Tutors can manage their profiles, set availability, and track bookings. Admins have full control over users, categories, and platform data.

---

## 🔗 Live URLs

| | URL |
|--|--|
| **Frontend** | https://edubridge-client.vercel.app |
| **Backend** | https://edubridge-backend-ruddy.vercel.app |

---



---

## 👤 Admin Credentials

```
Email    : admin@gmail.com
Password : admin12345
```

---

## ✨ Features

### 🎓 Student
- Register & Login
- Browse tutors by category, subject, and rating
- View tutor profiles with reviews
- Book a tutoring session
- View and manage bookings
- Leave reviews for completed sessions
- Update profile and change password

### 👨‍🏫 Tutor
- Register & Login
- Create and update tutor profile (headline, bio, subjects, languages, hourly rate)
- Set weekly availability slots
- View and manage bookings
- Track earnings and session stats

### 🛡️ Admin
- View platform stats (users, bookings, revenue)
- Manage all users (ban/unban)
- Manage categories (create, update, activate/deactivate)
- View all bookings

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - UI component library
- **Better Auth** - Authentication client
- **TanStack Form** - Form management
- **Axios** - HTTP client
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - REST API framework
- **Prisma** - Database ORM
- **Better Auth** - Authentication server
- **PostgreSQL** - Relational database (Neon)
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Frontend & Backend hosting
- **Neon** - PostgreSQL cloud database

---

## 📁 Project Structure

### Frontend
```
src/
├── app/
│   ├── (commonLayout)/       # Public pages (home, login, register, tutors)
│   └── (dashboardLayout)/    # Protected dashboard pages
│       ├── @admin/           # Admin dashboard
│       ├── @student/         # Student dashboard
│       └── @tutor/           # Tutor dashboard
├── components/
│   ├── homepage/             # Homepage sections
│   ├── layout/               # Navbar, Footer, Sidebar
│   ├── modules/              # Feature components
│   └── ui/                   # shadcn UI components
├── lib/
│   ├── api.ts                # API functions
│   └── auth-client.ts        # Better Auth client
└── types/                    # TypeScript types
```

### Backend
```
src/
├── modules/
│   ├── admin/                # Admin routes & controllers
│   ├── availability/         # Tutor availability
│   ├── booking/              # Booking management
│   ├── category/             # Categories
│   ├── review/               # Reviews
│   └── tutor/                # Tutor profiles
├── lib/
│   ├── auth.ts               # Better Auth config
│   └── prisma.ts             # Prisma client
├── middleware/               # Auth middleware
└── app.ts                    # Express app
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Backend Setup

```bash
# Clone repository
git clone https://github.com/mosiur73/edubridge-backend.git
cd edubridge-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your environment variables

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed admin user
npm run seed:admin

# Start development server
npm run dev
```

### Backend Environment Variables

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_postgresql_url
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Frontend Setup

```bash
# Clone repository
git clone https://github.com/mosiur73/edubridge-client.git
cd edubridge-client

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
# Fill in your environment variables

# Start development server
npm run dev
```

### Frontend Environment Variables

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📊 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/sign-up/email` | Register |
| POST | `/api/auth/sign-in/email` | Login |
| GET | `/api/auth/get-session` | Get session |
| POST | `/api/auth/sign-out` | Logout |

### Tutors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tutors` | Get all tutors |
| GET | `/api/tutors/:id` | Get tutor by ID |
| POST | `/api/tutors/profile` | Create tutor profile |
| PUT | `/api/tutors/profile` | Update tutor profile |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | Get my bookings |
| PATCH | `/api/bookings/:id/complete` | Mark complete |
| PATCH | `/api/bookings/:id/cancel` | Cancel booking |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reviews` | Create review |
| GET | `/api/reviews/tutor/:id` | Get tutor reviews |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Platform stats |
| GET | `/api/admin/users` | All users |
| PATCH | `/api/admin/users/:id/ban` | Ban user |
| PATCH | `/api/admin/users/:id/unban` | Unban user |
| GET | `/api/admin/bookings` | All bookings |

---

## 🔐 Role-Based Access Control

| Feature | Student | Tutor | Admin |
|---------|---------|-------|-------|
| Browse Tutors | ✅ | ✅ | ✅ |
| Book Session | ✅ | ❌ | ❌ |
| Leave Review | ✅ | ❌ | ❌ |
| Manage Profile | ✅ | ✅ | ✅ |
| Create Tutor Profile | ❌ | ✅ | ❌ |
| Set Availability | ❌ | ✅ | ❌ |
| Manage Users | ❌ | ❌ | ✅ |
| Manage Categories | ❌ | ❌ | ✅ |

---

## 📝 License

This project is for educational purposes only.