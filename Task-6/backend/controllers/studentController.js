const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'mysecretkey', {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/students/login
// @access  Public
exports.loginStudent = async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({ email });
        if (student && (await student.comparePassword(password))) {
            res.json({
                _id: student._id,
                name: student.name,
                email: student.email,
                role: student.role,
                token: generateToken(student._id),
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Private
exports.getStudents = async (req, res) => {
    try {
        let students;
        if (req.user.role === 'admin') {
            students = await Student.find().sort({ createdAt: -1 }).select('-password');
        } else {
            // Student can only see themselves
            students = await Student.find({ _id: req.user._id }).select('-password');
        }
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select('-password');
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Auth check
        if (req.user.role !== 'admin' && req.user._id.toString() !== student._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to view this profile' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create student
// @route   POST /api/students
// @access  Private/Admin
exports.createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update student (also issues certs/workflow)
// @route   PUT /api/students/:id
// @access  Private/Admin
exports.updateStudent = async (req, res) => {
    try {
        let student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Role check
        if (req.user.role !== 'admin' && req.user._id.toString() !== student._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this profile' });
        }

        student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select('-password');

        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Only admin can delete
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to delete' });
        }

        await student.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
