const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SystemUser = require('../models/SystemUser');
const Attendance = require('../models/Attendance');
const Score = require('../models/Score');
const Certificate = require('../models/Certificate');

// MIDDLEWARE
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');
            req.user = await SystemUser.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Not authorized for this role' });
        }
        next();
    };
};

const generateToken = (id) => jwt.sign({ id: id.toString() }, process.env.JWT_SECRET || 'mysecretkey', { expiresIn: '30d' });

// AUTHENTICATION
router.post('/auth/:role/login', async (req, res) => {
    const { email, password } = req.body;
    const { role } = req.params; // admin, teacher, student

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
    }
    const cleanEmail = email.trim();
    console.log(`[LOGIN ATTEMPT] role: ${role}, email: '${cleanEmail}'`);

    try {
        // Case-insensitive regex search for email
        const user = await SystemUser.findOne({ email: new RegExp('^' + cleanEmail + '$', 'i'), role });

        if (!user) {
            console.log(`[LOGIN FAILED] User not found or mismatch role: ${role} email: ${cleanEmail}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (isMatch) {
            console.log(`[LOGIN SUCCESS] ${cleanEmail}`);
            res.json({
                _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id)
            });
        } else {
            console.log(`[LOGIN FAILED] Bad password for ${cleanEmail}`);
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/auth/me', protect, (req, res) => res.json(req.user));

// USERS (Admin creates teachers/students)
router.get('/users', protect, authorize('admin', 'teacher'), async (req, res) => {
    const { role } = req.query;
    const query = role ? { role } : {};
    // if teacher, they can only get students
    if (req.user.role === 'teacher') query.role = 'student';

    const users = await SystemUser.find(query).select('-password');
    res.json(users);
});

router.post('/users', protect, authorize('admin'), async (req, res) => {
    try {
        const user = await SystemUser.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/users/:id', protect, authorize('admin', 'teacher'), async (req, res) => {
    if (req.user.role === 'teacher') {
        // Basic verification allowing teachers to edit specific fields could go here
    }
    const user = await SystemUser.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
});

router.delete('/users/:id', protect, authorize('admin'), async (req, res) => {
    await SystemUser.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
});

// STUDENT PROFILE (Self)
router.get('/myprofile', protect, async (req, res) => {
    const profile = await SystemUser.findById(req.user._id).select('-password');
    const attendance = await Attendance.find({ student: req.user._id });
    const scores = await Score.find({ student: req.user._id });
    const certificates = await Certificate.find({ student: req.user._id });
    res.json({ profile, attendance, scores, certificates });
});

// ATTENDANCE
router.get('/attendance', protect, async (req, res) => {
    // admin/teacher sees all (or filtered). Student sees only their own.
    const query = req.user.role === 'student' ? { student: req.user._id } : {};
    const data = await Attendance.find(query).populate('student', 'name');
    res.json(data);
});

router.post('/attendance', protect, authorize('admin', 'teacher'), async (req, res) => {
    const doc = await Attendance.create({ ...req.body, teacher: req.user._id });
    res.json(doc);
});

// SCORES
router.get('/scores', protect, async (req, res) => {
    const query = req.user.role === 'student' ? { student: req.user._id } : {};
    const data = await Score.find(query).populate('student', 'name grade course');
    res.json(data);
});

router.post('/scores', protect, authorize('admin', 'teacher'), async (req, res) => {
    const doc = await Score.create({ ...req.body, teacher: req.user._id });
    res.json(doc);
});

// CERTIFICATES
router.get('/certificates', protect, async (req, res) => {
    const query = req.user.role === 'student' ? { student: req.user._id } : {};
    const data = await Certificate.find(query).populate('student', 'name');
    res.json(data);
});

router.post('/certificates', protect, authorize('admin', 'teacher'), async (req, res) => {
    const doc = await Certificate.create(req.body);
    res.json(doc);
});

module.exports = router;
