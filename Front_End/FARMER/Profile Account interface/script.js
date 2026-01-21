// Function to simulate navigating to different pages
function navigateTo(page) {
    console.log(`Navigating to: ${page}`);
}
document.addEventListener('DOMContentLoaded', () => {
    const backArrow = document.querySelector('.back-arrow');

    if (backArrow) {
        backArrow.style.cursor = 'pointer';
        backArrow.addEventListener('click', () => {
            // Path: Out of 'profile', into 'home'
            window.location.href = '../home page for farmer/home page.html';
        });
    }

    // Since we're here, let's also load the name you saved at signup!
    const profileName = document.querySelector('.user-name-display');
    const savedName = localStorage.getItem('farmerName');
    
    if (profileName && savedName) {
        profileName.textContent = savedName;
    }
});
// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        // 1. Clear local credentials
        localStorage.removeItem('userId');
        localStorage.removeItem('farmerName');
        localStorage.removeItem('role');

        alert("Logged out successfully");
        // 2. Redirect to login page
        window.location.href = '../../SHARED INTERFACE/log in/index.html';
    }
});

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