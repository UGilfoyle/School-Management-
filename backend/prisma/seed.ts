import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.$transaction([
    prisma.notification.deleteMany(),
    prisma.announcement.deleteMany(),
    prisma.assignment.deleteMany(),
    prisma.result.deleteMany(),
    prisma.exam.deleteMany(),
    prisma.feePayment.deleteMany(),
    prisma.feeStructure.deleteMany(),
    prisma.meetingParticipant.deleteMany(),
    prisma.meeting.deleteMany(),
    prisma.attendance.deleteMany(),
    prisma.timetable.deleteMany(),
    prisma.classSubject.deleteMany(),
    prisma.student.deleteMany(),
    prisma.teacher.deleteMany(),
    prisma.parent.deleteMany(),
    prisma.subject.deleteMany(),
    prisma.class.deleteMany(),
    prisma.school.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log('✅ Data cleaned');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create School
  console.log('🏫 Creating schools...');
  const school = await prisma.school.create({
    data: {
      name: 'Delhi Public School',
      code: 'DPS001',
      board: 'CBSE',
      address: '123 School Street',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      phone: '+91-11-12345678',
      email: 'info@dpsdelhi.edu.in',
      website: 'https://dpsdelhi.edu.in',
      principalName: 'Dr. Rajesh Kumar',
      establishedYear: 1995,
    },
  });

  // 2. Create Classes
  console.log('📚 Creating classes...');
  const class10A = await prisma.class.create({
    data: {
      name: '10',
      section: 'A',
      academicYear: '2024-2025',
      schoolId: school.id,
      capacity: 40,
      roomNumber: '101',
    },
  });

  const class10B = await prisma.class.create({
    data: {
      name: '10',
      section: 'B',
      academicYear: '2024-2025',
      schoolId: school.id,
      capacity: 40,
      roomNumber: '102',
    },
  });

  const class12A = await prisma.class.create({
    data: {
      name: '12',
      section: 'A',
      academicYear: '2024-2025',
      schoolId: school.id,
      capacity: 35,
      roomNumber: '201',
    },
  });

  // 3. Create Subjects
  console.log('📖 Creating subjects...');
  const mathematics = await prisma.subject.create({
    data: {
      name: 'Mathematics',
      code: 'MATH101',
      type: 'CORE',
      description: 'Advanced Mathematics for Class 10 & 12',
    },
  });

  const science = await prisma.subject.create({
    data: {
      name: 'Science',
      code: 'SCI101',
      type: 'CORE',
      description: 'General Science',
    },
  });

  const english = await prisma.subject.create({
    data: {
      name: 'English',
      code: 'ENG101',
      type: 'CORE',
      description: 'English Language & Literature',
    },
  });

  const physics = await prisma.subject.create({
    data: {
      name: 'Physics',
      code: 'PHY201',
      type: 'CORE',
      description: 'Physics for Class 12',
    },
  });

  const chemistry = await prisma.subject.create({
    data: {
      name: 'Chemistry',
      code: 'CHEM201',
      type: 'CORE',
      description: 'Chemistry for Class 12',
    },
  });

  // 4. Create Principal User
  console.log('👨‍💼 Creating principal...');
  const principalUser = await prisma.user.create({
    data: {
      email: 'principal@school.com',
      password: hashedPassword,
      role: 'PRINCIPAL',
      isActive: true,
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Rajesh',
          lastName: 'Kumar',
          phone: '+91-9876543210',
          dateOfBirth: new Date('1975-05-15'),
          gender: 'MALE',
          address: '456 Principal Avenue',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110002',
        },
      },
    },
  });

  // 5. Create Teachers
  console.log('👨‍🏫 Creating teachers...');
  const mathTeacherUser = await prisma.user.create({
    data: {
      email: 'math.teacher@school.com',
      password: hashedPassword,
      role: 'TEACHER',
      isActive: true,
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Priya',
          lastName: 'Sharma',
          phone: '+91-9876543211',
          dateOfBirth: new Date('1985-08-20'),
          gender: 'FEMALE',
          address: '789 Teacher Lane',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110003',
        },
      },
    },
  });

  const mathTeacher = await prisma.teacher.create({
    data: {
      userId: mathTeacherUser.id,
      employeeId: 'TCH001',
      qualification: 'M.Sc. Mathematics, B.Ed',
      experience: 10,
      joiningDate: new Date('2014-06-01'),
      specialization: 'Advanced Mathematics',
      salary: 50000,
    },
  });

  const scienceTeacherUser = await prisma.user.create({
    data: {
      email: 'science.teacher@school.com',
      password: hashedPassword,
      role: 'TEACHER',
      isActive: true,
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Amit',
          lastName: 'Verma',
          phone: '+91-9876543212',
          dateOfBirth: new Date('1982-03-10'),
          gender: 'MALE',
          address: '321 Science Road',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110004',
        },
      },
    },
  });

  const scienceTeacher = await prisma.teacher.create({
    data: {
      userId: scienceTeacherUser.id,
      employeeId: 'TCH002',
      qualification: 'M.Sc. Physics, B.Ed',
      experience: 8,
      joiningDate: new Date('2016-07-15'),
      specialization: 'Physics & Chemistry',
      salary: 48000,
    },
  });

  // 6. Create Finance User
  console.log('💰 Creating finance staff...');
  const financeUser = await prisma.user.create({
    data: {
      email: 'finance@school.com',
      password: hashedPassword,
      role: 'FINANCE',
      isActive: true,
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Neha',
          lastName: 'Gupta',
          phone: '+91-9876543213',
          dateOfBirth: new Date('1990-12-05'),
          gender: 'FEMALE',
          address: '654 Finance Street',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110005',
        },
      },
    },
  });

  // 7. Create Parents
  console.log('👨‍👩‍👧‍👦 Creating parents...');
  const parent1User = await prisma.user.create({
    data: {
      email: 'parent1@email.com',
      password: hashedPassword,
      role: 'PARENT',
      isActive: true,
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Suresh',
          lastName: 'Patel',
          phone: '+91-9876543214',
          dateOfBirth: new Date('1980-07-25'),
          gender: 'MALE',
          address: '111 Parent Colony',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110006',
        },
      },
    },
  });

  const parent1 = await prisma.parent.create({
    data: {
      userId: parent1User.id,
      occupation: 'Business Owner',
      relationship: 'Father',
    },
  });

  const parent2User = await prisma.user.create({
    data: {
      email: 'parent2@email.com',
      password: hashedPassword,
      role: 'PARENT',
      isActive: true,
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Kavita',
          lastName: 'Singh',
          phone: '+91-9876543215',
          dateOfBirth: new Date('1982-11-30'),
          gender: 'FEMALE',
          address: '222 Guardian Avenue',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110007',
        },
      },
    },
  });

  const parent2 = await prisma.parent.create({
    data: {
      userId: parent2User.id,
      occupation: 'Doctor',
      relationship: 'Mother',
    },
  });

  // 8. Create Students
  console.log('👨‍🎓 Creating students...');
  const student1User = await prisma.user.create({
    data: {
      email: 'student1@email.com',
      password: hashedPassword,
      role: 'STUDENT',
      isActive: true,
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Rahul',
          lastName: 'Patel',
          phone: '+91-9876543216',
          dateOfBirth: new Date('2008-04-15'),
          gender: 'MALE',
          address: '111 Parent Colony',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110006',
        },
      },
    },
  });

  const student1 = await prisma.student.create({
    data: {
      userId: student1User.id,
      rollNumber: 'STU001',
      admissionNumber: 'ADM2024001',
      classId: class10A.id,
      admissionDate: new Date('2024-04-01'),
      bloodGroup: 'O+',
      parentId: parent1.id,
      emergencyPhone: '+91-9876543214',
    },
  });

  const student2User = await prisma.user.create({
    data: {
      email: 'student2@email.com',
      password: hashedPassword,
      role: 'STUDENT',
      isActive: true,
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Priya',
          lastName: 'Singh',
          phone: '+91-9876543217',
          dateOfBirth: new Date('2006-09-20'),
          gender: 'FEMALE',
          address: '222 Guardian Avenue',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110007',
        },
      },
    },
  });

  const student2 = await prisma.student.create({
    data: {
      userId: student2User.id,
      rollNumber: 'STU002',
      admissionNumber: 'ADM2024002',
      classId: class12A.id,
      admissionDate: new Date('2024-04-01'),
      bloodGroup: 'A+',
      parentId: parent2.id,
      emergencyPhone: '+91-9876543215',
    },
  });

  const student3User = await prisma.user.create({
    data: {
      email: 'student3@email.com',
      password: hashedPassword,
      role: 'STUDENT',
      isActive: true,
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Ankit',
          lastName: 'Sharma',
          phone: '+91-9876543218',
          dateOfBirth: new Date('2008-06-10'),
          gender: 'MALE',
          address: '333 Student Street',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110008',
        },
      },
    },
  });

  const student3 = await prisma.student.create({
    data: {
      userId: student3User.id,
      rollNumber: 'STU003',
      admissionNumber: 'ADM2024003',
      classId: class10B.id,
      admissionDate: new Date('2024-04-01'),
      bloodGroup: 'B+',
      emergencyPhone: '+91-9876543219',
    },
  });

  // 9. Create Class Subjects (Assign teachers to subjects)
  console.log('📝 Assigning subjects to classes...');
  const cs1 = await prisma.classSubject.create({
    data: {
      classId: class10A.id,
      subjectId: mathematics.id,
      teacherId: mathTeacher.id,
    },
  });

  const cs2 = await prisma.classSubject.create({
    data: {
      classId: class10A.id,
      subjectId: science.id,
      teacherId: scienceTeacher.id,
    },
  });

  const cs3 = await prisma.classSubject.create({
    data: {
      classId: class12A.id,
      subjectId: physics.id,
      teacherId: scienceTeacher.id,
    },
  });

  // 10. Create Attendance Records
  console.log('✅ Creating attendance records...');
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  await prisma.attendance.createMany({
    data: [
      {
        studentId: student1.id,
        date: today,
        status: 'PRESENT',
        markedBy: mathTeacher.id,
      },
      {
        studentId: student1.id,
        date: yesterday,
        status: 'PRESENT',
        markedBy: mathTeacher.id,
      },
      {
        studentId: student2.id,
        date: today,
        status: 'PRESENT',
        markedBy: scienceTeacher.id,
      },
      {
        studentId: student3.id,
        date: today,
        status: 'ABSENT',
        markedBy: mathTeacher.id,
        remarks: 'Sick leave',
      },
    ],
  });

  // 11. Create Exams
  console.log('📋 Creating exams...');
  const quarterlyExam = await prisma.exam.create({
    data: {
      name: 'Quarterly Examination - Q1 2024',
      description: 'First quarterly exam of academic year 2024-2025',
      type: 'QUARTERLY',
      classId: class10A.id,
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-09-15'),
      totalMarks: 100,
      passingMarks: 35,
      academicYear: '2024-2025',
      conductedBy: mathTeacher.id,
      isPublished: true,
    },
  });

  const boardExam = await prisma.exam.create({
    data: {
      name: 'Board Examination - Class 12 (CBSE)',
      description: 'CBSE Board Exam for Class 12',
      type: 'BOARD_12TH',
      classId: class12A.id,
      startDate: new Date('2025-02-15'),
      endDate: new Date('2025-03-30'),
      totalMarks: 100,
      passingMarks: 33,
      academicYear: '2024-2025',
      conductedBy: scienceTeacher.id,
      isPublished: false,
    },
  });

  // 12. Create Results
  console.log('🎯 Creating exam results...');
  await prisma.result.createMany({
    data: [
      {
        studentId: student1.id,
        examId: quarterlyExam.id,
        subjectId: mathematics.id,
        marksObtained: 85,
        maxMarks: 100,
        grade: 'A',
        percentage: 85,
        isPassed: true,
        remarks: 'Excellent performance',
      },
      {
        studentId: student1.id,
        examId: quarterlyExam.id,
        subjectId: science.id,
        marksObtained: 78,
        maxMarks: 100,
        grade: 'B+',
        percentage: 78,
        isPassed: true,
        remarks: 'Good work',
      },
    ],
  });

  // 13. Create Fee Structure
  console.log('💵 Creating fee structure...');
  await prisma.feeStructure.createMany({
    data: [
      {
        classId: class10A.id,
        feeName: 'Tuition Fee',
        amount: 25000,
        term: 'QUARTERLY',
        dueDate: new Date('2024-07-15'),
        description: 'Quarterly tuition fee for Class 10',
      },
      {
        classId: class10A.id,
        feeName: 'Exam Fee',
        amount: 5000,
        term: 'ANNUAL',
        dueDate: new Date('2024-08-30'),
        description: 'Annual exam fee',
      },
      {
        classId: class12A.id,
        feeName: 'Tuition Fee',
        amount: 30000,
        term: 'QUARTERLY',
        dueDate: new Date('2024-07-15'),
        description: 'Quarterly tuition fee for Class 12',
      },
    ],
  });

  // 14. Create Fee Payments
  console.log('💳 Creating fee payments...');
  await prisma.feePayment.createMany({
    data: [
      {
        studentId: student1.id,
        amount: 25000,
        feeType: 'Tuition Fee',
        term: 'QUARTERLY',
        paymentDate: new Date('2024-07-10'),
        paymentMethod: 'ONLINE',
        transactionId: 'TXN001202407101234',
        status: 'COMPLETED',
        receiptNumber: 'RCP001',
      },
      {
        studentId: student2.id,
        amount: 30000,
        feeType: 'Tuition Fee',
        term: 'QUARTERLY',
        paymentDate: new Date('2024-07-12'),
        paymentMethod: 'UPI',
        transactionId: 'TXN002202407125678',
        status: 'COMPLETED',
        receiptNumber: 'RCP002',
      },
      {
        studentId: student3.id,
        amount: 12500,
        feeType: 'Tuition Fee (Partial)',
        term: 'QUARTERLY',
        paymentDate: new Date('2024-07-08'),
        paymentMethod: 'CASH',
        transactionId: 'TXN003202407080001',
        status: 'COMPLETED',
        receiptNumber: 'RCP003',
        remarks: 'Partial payment - balance pending',
      },
    ],
  });

  // 15. Create Meetings
  console.log('🤝 Creating meetings...');
  const meeting1 = await prisma.meeting.create({
    data: {
      title: 'Parent-Teacher Meeting - Class 10A',
      description: 'Quarterly parent-teacher meeting to discuss student progress',
      type: 'PARENT_TEACHER',
      scheduledAt: new Date('2024-12-20T10:00:00'),
      duration: 120,
      location: 'School Auditorium',
      status: 'SCHEDULED',
      agenda: 'Discuss student performance and upcoming board exams',
      createdBy: mathTeacher.id,
    },
  });

  const meeting2 = await prisma.meeting.create({
    data: {
      title: 'One-on-One: Rahul Progress Review',
      description: 'Individual meeting with parent to discuss Rahul progress',
      type: 'ONE_ON_ONE',
      scheduledAt: new Date('2024-12-25T15:00:00'),
      duration: 30,
      location: 'Teacher Cabin',
      status: 'SCHEDULED',
      createdBy: mathTeacher.id,
    },
  });

  await prisma.meetingParticipant.createMany({
    data: [
      {
        meetingId: meeting1.id,
        userId: mathTeacherUser.id,
        role: 'ORGANIZER',
        status: 'ACCEPTED',
      },
      {
        meetingId: meeting1.id,
        userId: parent1User.id,
        role: 'ATTENDEE',
        status: 'PENDING',
      },
      {
        meetingId: meeting2.id,
        userId: mathTeacherUser.id,
        role: 'ORGANIZER',
        status: 'ACCEPTED',
      },
      {
        meetingId: meeting2.id,
        userId: parent1User.id,
        role: 'ATTENDEE',
        status: 'ACCEPTED',
      },
    ],
  });

  // 16. Create Notifications
  console.log('🔔 Creating notifications...');
  await prisma.notification.createMany({
    data: [
      {
        userId: parent1User.id,
        title: 'Attendance Alert',
        message: 'Your child Rahul was marked present today',
        type: 'ATTENDANCE',
        isRead: false,
      },
      {
        userId: student1User.id,
        title: 'Exam Results Published',
        message: 'Your quarterly exam results are now available',
        type: 'RESULT',
        isRead: false,
      },
      {
        userId: parent2User.id,
        title: 'Fee Payment Successful',
        message: 'Fee payment of ₹30,000 received successfully',
        type: 'FEE',
        isRead: true,
      },
      {
        userId: parent1User.id,
        title: 'Meeting Scheduled',
        message: 'Parent-Teacher meeting scheduled for Dec 20, 2024',
        type: 'MEETING',
        isRead: false,
      },
    ],
  });

  // 17. Create Announcements
  console.log('📢 Creating announcements...');
  await prisma.announcement.createMany({
    data: [
      {
        title: 'Annual Day Celebration',
        content:
          'Our school annual day will be celebrated on January 15, 2025. All students and parents are invited.',
        type: 'EVENT',
        priority: 'HIGH',
        isActive: true,
        publishedAt: new Date(),
        expiresAt: new Date('2025-01-15'),
      },
      {
        title: 'Winter Break Notice',
        content:
          'School will remain closed from December 25, 2024 to January 5, 2025 for winter break.',
        type: 'HOLIDAY',
        priority: 'NORMAL',
        isActive: true,
        publishedAt: new Date(),
      },
      {
        title: 'Board Exam Registration',
        content:
          'Class 10 and 12 students must complete board exam registration by December 31, 2024.',
        type: 'EXAM',
        priority: 'URGENT',
        targetRole: 'STUDENT',
        isActive: true,
        publishedAt: new Date(),
        expiresAt: new Date('2024-12-31'),
      },
    ],
  });

  // 18. Create Sample Assignments
  console.log('📚 Creating assignments...');
  await prisma.assignment.createMany({
    data: [
      {
        title: 'Mathematics Assignment - Quadratic Equations',
        description:
          'Solve all problems from Chapter 4: Quadratic Equations (Exercise 4.1 to 4.4)',
        dueDate: new Date('2024-12-30'),
        totalMarks: 50,
        status: 'PENDING',
        studentId: student1.id,
      },
      {
        title: 'Science Project - Renewable Energy',
        description:
          'Prepare a detailed project report on renewable energy sources with diagrams',
        dueDate: new Date('2024-12-28'),
        totalMarks: 100,
        status: 'SUBMITTED',
        studentId: student1.id,
        submittedAt: new Date('2024-12-20'),
        marksObtained: 85,
        feedback: 'Excellent work! Very detailed and well-presented.',
      },
    ],
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log('- 1 School created');
  console.log('- 3 Classes created (10A, 10B, 12A)');
  console.log('- 5 Subjects created');
  console.log('- 1 Principal created');
  console.log('- 2 Teachers created');
  console.log('- 1 Finance staff created');
  console.log('- 2 Parents created');
  console.log('- 3 Students created');
  console.log('- Attendance, Exams, Results, Fees, Meetings, and more!');
  console.log('\n🔑 Login Credentials (password for all: password123):');
  console.log('- Principal: principal@school.com');
  console.log('- Math Teacher: math.teacher@school.com');
  console.log('- Science Teacher: science.teacher@school.com');
  console.log('- Finance: finance@school.com');
  console.log('- Parent 1: parent1@email.com');
  console.log('- Parent 2: parent2@email.com');
  console.log('- Student 1 (Class 10A): student1@email.com');
  console.log('- Student 2 (Class 12A): student2@email.com');
  console.log('- Student 3 (Class 10B): student3@email.com');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

