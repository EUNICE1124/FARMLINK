const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Import Routes
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const searchRoutes = require('./routes/searchRoutes');

// 2. Import Controllers (Fixed ReferenceErrors)
const productController = require('./controllers/productController');
const userController = require('./controllers/userController'); // Was missing!
const orderController = require('./controllers/orderController'); // Was missing!

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// --- Route Linking ---

// Order Routes (Pointing to orderController)
app.get('/api/orders/:orderId', orderController.getOrderDetails);
app.put('/api/orders/status', orderController.updateOrderStatus);

// Farmer/User Dashboard Routes (Pointing to userController)
app.get('/api/farmer/inventory/:userId', userController.getInventory);
app.get('/api/farmer/home-summary/:userId', userController.getHomeSummary);
app.get('/api/users/dashboard/:id', userController.getDashboardData);

// Finance Routes
app.get('/api/finance/revenue', productController.getFinancialRecords);

// Profile & Address Routes
app.post('/api/users/address', userController.registerAddress);
app.put('/api/users/profile', userController.updateProfile);

// Standard Resource Routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);  
app.use('/api/', productRoutes); 
app.use('/api', adminRoutes);
app.use('/api/search', searchRoutes);

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
    console.log(`✅ FARMLINK Backend running on http://localhost:${PORT}`);
    console.log(`🛢️  Connected to database: ${process.env.DB_NAME || 'farmlink'}`);
});