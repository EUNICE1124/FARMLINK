const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST http://localhost:3000/api/orders (To Create)
router.post('/', orderController.createOrder);

// GET http://localhost:3000/api/orders/status/:id (To Track)
router.get('/status/:id', orderController.getOrderStatus);

module.exports = router;