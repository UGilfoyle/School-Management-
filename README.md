# 🏫 School SaaS Application

A comprehensive School Management System for ICSE and CBSE boards with support for Teachers, Principal, Finance Department, Parents, and Students.

## 🚀 Features

### Core Modules
- **Multi-Role Authentication**: Student, Teacher, Parent, Principal, Finance, Admin
- **Attendance Management**: Daily tracking, reports, auto-notifications to parents
- **Meeting System**: 1:1 and group meetings with real-time scheduling
- **Results Management**: 
  - Quarterly, Half-yearly, Annual exams
  - Special handling for 10th & 12th board exams (ICSE/CBSE)
  - Digital report cards and performance analytics
- **Finance Module**: Fee management, payment tracking, automated invoicing
- **Real-time Updates**: WebSocket support for live notifications
- **Document Management**: Automated report cards and certificates generation

### Supported Boards
- CBSE (Central Board of Secondary Education)
- ICSE (Indian Certificate of Secondary Education)

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Query** - Data fetching & caching
- **Zustand** - State management
- **React Router v6** - Routing
- **React Hook Form + Zod** - Form validation
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **Recharts** - Data visualization

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Primary database (Neon)
- **Passport.js + JWT** - Authentication
- **class-validator** - Request validation
- **Socket.io** - WebSocket server

### Deployment & Infrastructure
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Neon PostgreSQL (Serverless)
- **File Storage**: AWS S3 or Cloudinary

## 📦 Project Structure

```
school-saas/
├── frontend/              # React + TypeScript application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── layouts/       # Layout components
│   │   ├── services/      # API service layer
│   │   ├── store/         # Zustand stores
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Third-party configurations
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Main App component
│   └── package.json
│
├── backend/               # NestJS API server
│   ├── src/
│   │   ├── modules/       # Feature modules
│   │   │   ├── auth/      # Authentication module
│   │   │   ├── users/     # User management
│   │   │   ├── students/  # Student module
│   │   │   ├── teachers/  # Teacher module
│   │   │   ├── attendance/# Attendance tracking
│   │   │   ├── meetings/  # Meeting management
│   │   │   ├── results/   # Exam results
│   │   │   └── finance/   # Financial management
│   │   ├── common/        # Shared resources
│   │   ├── config/        # Configuration
│   │   ├── prisma/        # Prisma service
│   │   └── main.ts        # Application entry point
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── migrations/    # Database migrations
│   └── package.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **pnpm** (recommended) or npm
- **PostgreSQL** or Neon account

### 1. Database Setup

#### Option A: Using Neon (Recommended for Production)
1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Update `backend/.env`:
```env
DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"
```

#### Option B: Local PostgreSQL
1. Install PostgreSQL
2. Create database:
```bash
createdb schooldb
```
3. Update `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/schooldb"
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
pnpm install

# Generate Prisma Client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev --name init

# (Optional) Seed database with sample data
pnpm prisma db seed

# Start development server
pnpm run start:dev
```

Backend will run on `http://localhost:3000/api`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies  
pnpm install

# Start development server
pnpm dev
```

Frontend will run on `http://localhost:5173`

## 📚 Database Schema

### Core Models

#### User Management
- **User** - Base user table with role-based access
- **Profile** - User profile information
- **Role** - STUDENT, TEACHER, PRINCIPAL, FINANCE, PARENT, ADMIN

#### School Structure
- **School** - School information (ICSE/CBSE)
- **Class** - Grade and section (1A, 10B, 12C, etc.)
- **Subject** - Subject master data
- **ClassSubject** - Subject-class-teacher mapping

#### Academic Management
- **Student** - Student profiles and enrollment
- **Teacher** - Teacher profiles and qualifications
- **Parent** - Parent information
- **Attendance** - Daily attendance records
- **Meeting** - Meeting scheduling and management
- **Exam** - Exam definitions (Quarterly, Board, etc.)
- **Result** - Student exam results

#### Finance
- **FeeStructure** - Fee definitions by class
- **FeePayment** - Payment transactions

#### Communication
- **Notification** - User notifications
- **Announcement** - School-wide announcements

### View Complete Schema
```bash
cd backend
pnpm prisma studio
```
This opens Prisma Studio to browse the database visually.

## 🔧 Development Commands

### Backend Commands
```bash
cd backend

# Development
pnpm run start:dev          # Start dev server with hot reload
pnpm run start:debug        # Start with debugging
pnpm run start:prod         # Start production server

# Database
pnpm prisma studio          # Open Prisma Studio
pnpm prisma migrate dev     # Create new migration
pnpm prisma migrate deploy  # Run migrations (production)
pnpm prisma generate        # Generate Prisma Client
pnpm prisma db push         # Push schema without migration
pnpm prisma db seed         # Seed database

# Testing
pnpm test                   # Run unit tests
pnpm test:watch             # Run tests in watch mode
pnpm test:cov               # Generate coverage report
pnpm test:e2e               # Run E2E tests

# Linting & Formatting
pnpm run lint               # Lint code
pnpm run format             # Format code with Prettier
```

### Frontend Commands
```bash
cd frontend

# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm preview                # Preview production build

# Testing (to be configured)
pnpm test                   # Run tests
pnpm test:ui                # Run tests with UI
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Students
- `GET /api/students` - List all students
- `GET /api/students/:id` - Get student details
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/student/:id` - Student attendance report
- `GET /api/attendance/class/:id` - Class attendance report
- `GET /api/attendance/report` - Generate attendance report

### Meetings
- `POST /api/meetings` - Schedule meeting
- `GET /api/meetings` - List meetings
- `GET /api/meetings/:id` - Get meeting details
- `PUT /api/meetings/:id` - Update meeting
- `DELETE /api/meetings/:id` - Cancel meeting

### Results
- `GET /api/results/student/:id` - Get student results
- `POST /api/results` - Add exam results
- `GET /api/results/exam/:id` - Get exam results
- `PUT /api/results/:id` - Update results

### Finance
- `GET /api/finance/fees` - Get fee structure
- `POST /api/finance/payment` - Record payment
- `GET /api/finance/payments/:studentId` - Student payment history
- `GET /api/finance/reports` - Financial reports

## 🔐 Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/schooldb"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRATION="7d"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRATION="30d"

# Application
NODE_ENV="development"
PORT=3000
API_PREFIX="api"
FRONTEND_URL="http://localhost:5173"

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# File Storage (Optional)
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="us-east-1"
AWS_S3_BUCKET=""
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_PREFIX=api

# WebSocket
VITE_SOCKET_URL=ws://localhost:3000

# App Configuration
VITE_APP_NAME="School SaaS"
```

## 🚢 Deployment

### Deploy Frontend to Vercel

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Set root directory: `frontend`
   - Add environment variables
   - Deploy!

### Deploy Backend to Render

1. **Create Render account** at [render.com](https://render.com)

2. **Create Web Service**
   - Connect GitHub repository
   - Root directory: `backend`
   - Build command: `pnpm install && pnpm prisma generate && pnpm build`
   - Start command: `pnpm run start:prod`

3. **Add Environment Variables** in Render dashboard

4. **Run Migrations**
```bash
pnpm prisma migrate deploy
```

### Setup Neon Database

1. Create project at [neon.tech](https://neon.tech)
2. Copy connection string
3. Add to backend environment variables
4. Run migrations

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:cov
```

### Frontend Tests
```bash
cd frontend

# Run tests (to be configured)
pnpm test
```

## 📝 Next Steps

### Phase 1: Core Authentication ✅
- [x] Project structure setup
- [x] Database schema design
- [x] Basic configuration
- [ ] Implement auth module
- [ ] Create login/register UI
- [ ] Role-based access control

### Phase 2: User Management
- [ ] User CRUD operations
- [ ] Profile management
- [ ] Student enrollment
- [ ] Teacher assignment

### Phase 3: Attendance System
- [ ] Daily attendance marking
- [ ] Attendance reports
- [ ] Parent notifications
- [ ] Analytics dashboard

### Phase 4: Meeting System
- [ ] Meeting scheduling
- [ ] Calendar integration
- [ ] Real-time meeting rooms
- [ ] Meeting notes

### Phase 5: Results Management
- [ ] Exam creation
- [ ] Result entry
- [ ] Report card generation
- [ ] Board exam handling

### Phase 6: Finance Module
- [ ] Fee structure setup
- [ ] Payment processing
- [ ] Invoice generation
- [ ] Financial reports

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Email: support@schoolsaas.com

## 👥 Team

Built with ❤️ for modern school management

---

**Happy Coding!** 🚀
