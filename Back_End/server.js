const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const searchRoutes = require('./routes/searchRoutes');
const app = express();

// Middleware
app.use(cors()); // Crucial for connection
app.use(express.json()); // Parses body data

// Route Linking
// This makes the URLs: http://localhost:3001/api/users and /api/login


app.get('/api/orders/:orderId', productController.getOrderDetails);
app.put('/api/orders/status', productController.updateOrderStatus);
app.get('/api/farmer/inventory/:userId', userController.getInventory);
app.get('/api/farmer/home-summary/:userId', userController.getHomeSummary);
app.get('/api/finance/revenue', productController.getFinancialRecords);
app.get('/api/users/dashboard/:id', userController.getDashboardData);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);  
app.post('/api/users/address', userController.registerAddress);
app.put('/api/users/profile', userController.updateProfile);
app.use('/api/', productRoutes); 
app.use('/api', adminRoutes);
app.use('/api/search', searchRoutes);

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`✅ FARMLINK Backend running on http://localhost:${PORT}`);
    console.log(`🛢️  Connecting to MySQL on Port 3000`);
});