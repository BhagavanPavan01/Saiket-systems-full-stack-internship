const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'SystemUser', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'SystemUser' },
    subject: { type: String, required: true },
    examType: { type: String, required: true },
    marks: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    grade: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Score', schema);
