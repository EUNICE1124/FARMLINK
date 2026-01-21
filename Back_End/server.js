const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 1. Import Routes
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes'); // Now handles all product/cart logic

// 2. Import Controllers (Only the ones currently in use)
const userController = require('./controllers/userController'); 
const financeController = require('./controllers/financeController');

const app = express();

// --- Middleware ---
app.use(cors()); 
app.use(express.json()); 

// --- Static Folders ---
// Allows the frontend to access images: http://localhost:3001/images/example.jpg
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// --- Direct API Routes (Manual Mounts) ---
// Farmer/User Dashboard
app.get('/api/farmer/inventory/:userId', userController.getInventory);
app.get('/api/farmer/home-summary/:userId', userController.getHomeSummary);
app.get('/api/users/dashboard/:id', userController.getDashboardData);

// Profile & Finance
app.post('/api/users/address', userController.registerAddress);
app.put('/api/users/profile', userController.updateProfile);
app.get('/api/users/verify/:userId', userController.checkAccountStatus);
app.get('/api/finance/revenue', financeController.getRevenueData); // Consolidated to financeController

// --- Mounting Routers ---
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/marketplace', marketplaceRoutes); // Unified endpoint for grid, save, and cart

// --- Server Start ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Static images available at http://localhost:${PORT}/images`);
});