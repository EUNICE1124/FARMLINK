const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(cors()); // Crucial for connection
app.use(express.json()); // Parses body data

// Route Linking
// This makes the URLs: http://localhost:3000/api/users and /api/login
app.use('/api', adminRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`FARMLINK Backend running on http://localhost:${PORT}`);
});