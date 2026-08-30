const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },

    // Profile info shared/optional
    phone: String,
    address: String,
    photo: { type: String, default: 'https://via.placeholder.com/150' },

    // Student Specific
    studentId: String,
    grade: String,
    dob: String,
    department: String,
    course: String,

    // Teacher Specific
    teacherId: String,
    subjects: [String],
    assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('SystemUser', userSchema);
