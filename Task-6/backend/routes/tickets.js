const express = require('express');
const router = express.Router();
const {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket
} = require('../controllers/ticketController');
const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);

router
    .route('/')
    .get(getTickets)
    .post(createTicket);

router
    .route('/:id')
    .put(updateTicket)
    .delete(deleteTicket);

module.exports = router;
