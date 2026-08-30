const Ticket = require('../models/Ticket');

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate('assignedTo', 'name email profession')
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: tickets.length,
            data: tickets
        });
    } catch (error) {
        console.error('Get tickets error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
    try {
        // Add user to req.body
        req.body.createdBy = req.user.id;

        const ticket = await Ticket.create(req.body);
        const populatedTicket = await Ticket.findById(ticket._id)
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email');

        res.status(201).json({
            success: true,
            data: populatedTicket
        });
    } catch (error) {
        console.error('Create ticket error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Invalid Data'
        });
    }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = async (req, res) => {
    try {
        let ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('assignedTo', 'name email').populate('createdBy', 'name email');

        res.json({
            success: true,
            data: ticket
        });
    } catch (error) {
        console.error('Update ticket error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Invalid Data'
        });
    }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        await Ticket.deleteOne({ _id: req.params.id });

        res.json({
            success: true,
            message: 'Ticket removed'
        });
    } catch (error) {
        console.error('Delete ticket error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket
};
