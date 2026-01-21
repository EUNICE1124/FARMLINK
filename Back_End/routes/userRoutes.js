const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Check these carefully - the names must match your exports!
router.get('/', userController.getUsers);           // Matches exports.getUsers
router.post('/', userController.createUser);        // Matches exports.createUser
router.post('/register', userController.registerUser); // Matches exports.registerUser
router.post('/address', userController.registerAddress); // Matches exports.registerAddress
router.put('/profile', userController.updateProfile);   // Matches exports.updateProfile
router.get('/dashboard/:id', userController.getDashboardData); 
router.get('/home-summary/:id', userController.getHomeSummary);
router.get('/inventory/:userId', userController.getInventory);
router.post('/login', userController.loginUser);

module.exports = router;