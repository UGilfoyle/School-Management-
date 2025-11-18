// User Management Types
export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PRINCIPAL = 'PRINCIPAL',
  FINANCE = 'FINANCE',
  PARENT = 'PARENT',
  ADMIN = 'ADMIN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export interface User {
  id: string;
  email: string;
  role: Role;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: Profile;
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

// School Structure Types
export enum Board {
  CBSE = 'CBSE',
  ICSE = 'ICSE',
}

export interface School {
  id: string;
  name: string;
  code: string;
  board: Board;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website?: string;
}

export interface Class {
  id: string;
  name: string;
  section: string;
  academicYear: string;
  schoolId: string;
  capacity: number;
  roomNumber?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
}

// Student & Teacher Types
export interface Student {
  id: string;
  userId: string;
  rollNumber: string;
  admissionNumber: string;
  classId: string;
  admissionDate: string;
  bloodGroup?: string;
  user?: User;
  class?: Class;
}

export interface Teacher {
  id: string;
  userId: string;
  employeeId: string;
  qualification: string;
  experience?: number;
  joiningDate: string;
  specialization?: string;
  user?: User;
}

// Attendance Types
export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED',
  SICK_LEAVE = 'SICK_LEAVE',
  HOLIDAY = 'HOLIDAY',
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  markedBy: string;
  remarks?: string;
  student?: Student;
  teacher?: Teacher;
}

// Meeting Types
export enum MeetingType {
  ONE_ON_ONE = 'ONE_ON_ONE',
  GROUP = 'GROUP',
  PARENT_TEACHER = 'PARENT_TEACHER',
  STAFF_MEETING = 'STAFF_MEETING',
  PARENT_MEETING = 'PARENT_MEETING',
  ADMIN_MEETING = 'ADMIN_MEETING',
}

export enum MeetingStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  RESCHEDULED = 'RESCHEDULED',
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  type: MeetingType;
  scheduledAt: string;
  duration: number;
  location?: string;
  meetingLink?: string;
  status: MeetingStatus;
  agenda?: string;
  notes?: string;
  createdBy: string;
}

// Exam & Result Types
export enum ExamType {
  UNIT_TEST = 'UNIT_TEST',
  QUARTERLY = 'QUARTERLY',
  HALF_YEARLY = 'HALF_YEARLY',
  ANNUAL = 'ANNUAL',
  BOARD_10TH = 'BOARD_10TH',
  BOARD_12TH = 'BOARD_12TH',
  MOCK_TEST = 'MOCK_TEST',
}

export interface Exam {
  id: string;
  name: string;
  description?: string;
  type: ExamType;
  classId: string;
  startDate: string;
  endDate: string;
  totalMarks: number;
  passingMarks: number;
  academicYear: string;
  isPublished: boolean;
}

export interface Result {
  id: string;
  studentId: string;
  examId: string;
  subjectId: string;
  marksObtained: number;
  maxMarks: number;
  grade?: string;
  percentage?: number;
  isPassed: boolean;
  remarks?: string;
  exam?: Exam;
  subject?: Subject;
}

// Finance Types
export enum FeeTerm {
  ADMISSION = 'ADMISSION',
  QUARTERLY = 'QUARTERLY',
  HALF_YEARLY = 'HALF_YEARLY',
  ANNUAL = 'ANNUAL',
  MONTHLY = 'MONTHLY',
  ONE_TIME = 'ONE_TIME',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CHEQUE = 'CHEQUE',
  ONLINE = 'ONLINE',
  CARD = 'CARD',
  UPI = 'UPI',
  NET_BANKING = 'NET_BANKING',
}

export interface FeePayment {
  id: string;
  studentId: string;
  amount: number;
  feeType: string;
  term: FeeTerm;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  transactionId: string;
  status: PaymentStatus;
  receiptNumber?: string;
  remarks?: string;
}

// Notification Types
export enum NotificationType {
  ATTENDANCE = 'ATTENDANCE',
  RESULT = 'RESULT',
  MEETING = 'MEETING',
  FEE = 'FEE',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  ASSIGNMENT = 'ASSIGNMENT',
  GENERAL = 'GENERAL',
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

