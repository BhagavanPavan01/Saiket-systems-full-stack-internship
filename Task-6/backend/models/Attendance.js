const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'SystemUser', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'SystemUser' },
    subject: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['Present', 'Absent'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', schema);
