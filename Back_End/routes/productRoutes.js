const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);
router.post('/cart/add', productController.addToCart); 
router.post('/save', productController.saveProduct);

module.exports = router;