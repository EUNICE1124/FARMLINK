const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Routes for User Management page
router.get('/users', adminController.fetchUsers);
router.post('/users', adminController.addUser);

// Route for Admin Login page
router.post('/login', adminController.adminLogin);

module.exports = router;