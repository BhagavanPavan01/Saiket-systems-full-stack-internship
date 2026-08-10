const express = require('express');
const router = express.Router();
const { askAgent } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/ask', protect, askAgent);

module.exports = router;
