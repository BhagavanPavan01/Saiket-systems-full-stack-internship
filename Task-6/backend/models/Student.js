const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: 'password123' }, // default password for seeded accounts
    role: { type: String, enum: ['admin', 'student'], default: 'student' },
    grade: { type: String, required: true },
    photo: { type: String, default: 'https://via.placeholder.com/150' },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    certificates: [{
        title: { type: String, required: true },
        date: { type: String, required: true }
    }],
    workflow: { type: String, enum: ['Enrolled', 'Active', 'Graduated', 'Suspended'], default: 'Active' }
}, {
    timestamps: true
});

// Encrypt password before saving
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
studentSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('StudentProfile', studentSchema, 'students');
