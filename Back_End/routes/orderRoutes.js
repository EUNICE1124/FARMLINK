const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/latest', orderController.getLatestOrder);
router.get('/', orderController.getAllOrders); // Matches fetch('http://localhost:3001/api/orders')
router.patch('/:id', orderController.updateOrderStatus); // Matches fetch('http://localhost:3001/api/orders/${orderId}')
router.post('/', orderController.placeOrder); 
router.get('/status/:id', orderController.getOrderStatus);
// This matches: fetch('http://localhost:3001/api/orders/cart/add')
router.post('/cart/add', orderController.addToCart);

module.exports = router;