// Back_End/routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchControllers');

// This makes the endpoint: GET /api/search
router.get('/', searchController.searchProducts);

module.exports = router;