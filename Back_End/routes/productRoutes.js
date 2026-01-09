const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Matches: GET http://localhost:3000/api/products
router.get('/', productController.getAllProducts);

// Matches: POST http://localhost:3000/api/cart
router.post('/cart', productController.addToCart);

// For: fetch('.../api/products/cart', { method: 'POST' })
router.post('/cart', productController.addToCart);

module.exports = router;