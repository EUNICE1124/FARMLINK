const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// --- 1. GET ROUTES ---

// Summary view: Matches fetch('.../api/orders/latest/15')
router.get('/latest/:userId', orderController.getLatestOrder);

// History view: Matches fetch('.../api/orders')
router.get('/', orderController.getAllOrders);

// Status check: Matches fetch('.../api/orders/status/5')
router.get('/status/:id', orderController.getOrderStatus);


// --- 2. POST ROUTES ---

// Create new order
router.post('/', orderController.placeOrder);

// Cart management: Matches fetch('.../api/orders/cart/add')
router.post('/cart/add', orderController.addToCart);


// --- 3. PATCH ROUTES ---

// Update status (Approve/Cancel): Matches fetch('.../api/orders/12')
router.patch('/:id', orderController.updateOrderStatus);

module.exports = router;