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
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');


// 2. Import Controllers (Only the ones currently in use)
const userController = require('./controllers/userController'); 
const financeController = require('./controllers/financeController');
const messageController = require('./controllers/messageController');


const app = express();

// --- Middleware ---
app.use(cors()); 
app.use(express.json()); 

// --- Static Folders ---
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

// Messages
app.get('/api/messages', messageController.getMessages);


// --- Mounting Routers ---
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/marketplace', marketplaceRoutes); 
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);



// --- Server Start ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is LIVE and listening on all interfaces at port ${PORT}`);
    console.log(`🔗 Local access: http://localhost:${PORT}`);
    console.log(`🌐 Public access: http://173.234.79.54:${PORT}`);
});