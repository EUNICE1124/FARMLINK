const db = require('../config/db');

// GET /api/users - Fetch all registered users
exports.getUsers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT id, name, email, role FROM users');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
};

// POST /api/users - Add a new user (from FAB button)
exports.createUser = async (req, res) => {
    const { name, email, role, password } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO users (name, email, role, password) VALUES (?, ?, ?, ?)',
            [name, email, role, password]
        );
        res.status(201).json({ message: "User created", id: result.insertId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            // This triggers the "Duplicate email" alert in your frontend
            res.status(409).json({ error: "Duplicate email entry" });
        } else {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
};
// POST /api/users/register - New logic for Buyer Sign-up
exports.registerUser = async (req, res) => {
    // These keys match your signup buyer.js: username, email, phone, password
    const { username, email, phone, password } = req.body;

    try {
        // Check if user already exists
        const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Insert new buyer
        const [result] = await db.execute(
            'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
            [username, email, phone, password, 'Buyer']
        );

        res.status(201).json({ 
            message: "Welcome to FarmLink! Account created.", 
            userId: result.insertId 
        });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
};