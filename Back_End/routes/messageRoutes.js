const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Define your messaging endpoints
router.get('/', messageController.getMessages);
router.patch('/:id/read', messageController.markAsRead); // For the "Mark as Read" logic

module.exports = router;