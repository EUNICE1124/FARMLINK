const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// All routes here start with /api/users
router.get('/', userController.getAllUsers); //
router.post('/', userController.addUser);    //
router.post('/register', userController.registerUser); // Matches fetch path in signup buyer.js

module.exports = router;