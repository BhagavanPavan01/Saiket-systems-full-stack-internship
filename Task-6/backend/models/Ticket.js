const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [1000, 'Description cannot be more than 1000 characters']
        },
        status: {
            type: String,
            enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
            default: 'Open'
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Critical'],
            default: 'Medium'
        },
        assignedTo: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: false
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Ticket', ticketSchema);
