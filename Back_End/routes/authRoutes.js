const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to log the role selection
router.post('/select-role', authController.saveRolePreference);

module.exports = router;