const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'SystemUser', required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    issueDate: { type: String, required: true },
    organization: { type: String, required: true },
    fileUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', schema);
