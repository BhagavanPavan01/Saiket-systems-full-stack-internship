const express = require('express');
const router = express.Router();
const {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    loginStudent
} = require('../controllers/studentController');
const { protect, admin } = require('../middleware/studentAuth');

router.post('/login', loginStudent);

// Student registration can be open or admin only. We'll leave it open for now or admin only.
router.route('/')
    .get(protect, getStudents)
    .post(createStudent); // Allow sign up freely (or restrict via protect+admin)

router.route('/:id')
    .get(protect, getStudent)
    .put(protect, updateStudent)
    .delete(protect, admin, deleteStudent);

module.exports = router;
