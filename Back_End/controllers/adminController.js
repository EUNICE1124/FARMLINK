const db = require('../config/db');

// Get all users for the Management UI
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, email, role FROM users');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database Error: Could not fetch users" });
    }
};

// Admin Login logic
exports.adminLogin = async (req, res) => {
    const { admin_email, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND role = "Admin"', [admin_email]);
        
        if (rows.length > 0 && rows[0].password === password) { // Use hashing in production
            res.status(200).json({ token: 'fake-jwt-token', message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid Admin Credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
};