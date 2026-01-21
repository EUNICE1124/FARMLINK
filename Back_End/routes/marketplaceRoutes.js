const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');
const upload = require('../middleware/multerConfig'); 

/**
 * @route   GET /api/marketplace
 * @desc    Fetch all products with Farmer details (Buyer View)
 */
router.get('/', marketplaceController.getAllMarketplaceProducts);

/**
 * @route   GET /api/marketplace/grid
 * @desc    Fetch products for the home grid with category filters
 */
router.get('/grid', marketplaceController.getProductsGrid);

/**
 * @route   POST /api/marketplace/save
 * @desc    Save a new product with an image (Farmer/Admin View)
 * @access  Private (Farmer)
 */
router.post('/save', upload.single('productImage'), marketplaceController.saveProduct);

/**
 * @route   POST /api/marketplace/cart/add
 * @desc    Add a product to the user's shopping cart
 */
router.post('/cart/add', marketplaceController.addToCart);

module.exports = router;