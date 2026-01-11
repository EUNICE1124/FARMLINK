const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors()); // Crucial for connection
app.use(express.json()); // Parses body data

// Route Linking
// This makes the URLs: http://localhost:3001/api/users and /api/login
app.use('/api', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/', productRoutes); // Cart & products logic is inside the same router here
app.use('/api/orders', orderRoutes);  // Logic for order management

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`✅ FARMLINK Backend running on http://localhost:${PORT}`);
    console.log(`🛢️  Connecting to MySQL on Port 3000`);
});