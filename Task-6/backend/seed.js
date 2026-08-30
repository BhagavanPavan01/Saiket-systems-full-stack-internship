require('dotenv').config();
const mongoose = require('mongoose');
const SystemUser = require('./models/SystemUser');
const Attendance = require('./models/Attendance');
const Score = require('./models/Score');
const Certificate = require('./models/Certificate');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await SystemUser.deleteMany({});
        await Attendance.deleteMany({});
        await Score.deleteMany({});
        await Certificate.deleteMany({});

        // Admin
        const admin = await SystemUser.create({
            name: 'Admin User', email: 'admin@school.com', password: 'adminpassword', role: 'admin',
            phone: '1234567890', address: 'Admin Blvd'
        });

        // Teacher
        const teacher = await SystemUser.create({
            name: 'Prof. John Doe', email: 'teacher@school.com', password: 'teacherpassword', role: 'teacher',
            teacherId: 'T-1001', subjects: ['Mathematics', 'Science']
        });

        // Students
        const student1 = await SystemUser.create({
            name: 'Jason Williams', email: 'Jason@gmail.com', password: 'password123', role: 'student',
            studentId: 'S-2001', grade: 'First grade', course: 'Computer Science', department: 'Engineering',
            dob: '2001-08-13', phone: '37246370287', address: '789 Oak Drive',
            photo: 'https://images.unsplash.com/photo-1542838686-37ed7a928b17?q=80&w=200'
        });

        const student2 = await SystemUser.create({
            name: 'Sophia Ahmed', email: 'Sophi@gmail.com', password: 'password123', role: 'student',
            studentId: 'S-2002', grade: 'Second grade', course: 'Biology', department: 'Science',
            dob: '2002-04-08', phone: '03729756894', address: '123 Elm Street',
            photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200'
        });

        // Score
        await Score.create({
            student: student1._id, teacher: teacher._id, subject: 'Mathematics', examType: 'Final Examination',
            marks: 85, totalMarks: 100, grade: 'A'
        });

        // Attendance
        await Attendance.create({
            student: student1._id, teacher: teacher._id, subject: 'Mathematics', date: '2023-10-01', status: 'Present'
        });

        // Certificate
        await Certificate.create({
            student: student1._id, title: 'Outstanding Achiever', type: 'Academic', issueDate: '2023-10-15',
            organization: 'School Board'
        });

        console.log('Seeded successfully with robust mock data!');
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
}

seed();
