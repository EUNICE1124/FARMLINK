const db = require('../config/db');

// Logic for fetching all users
exports.fetchUsers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, name, email FROM users");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Database error" });
    }
};

// Logic for adding a new user
exports.addUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Failed to save user" });
    }
};

// Logic for Admin Login
exports.adminLogin = async (req, res) => {
    const { admin_email, password } = req.body;
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND password = ? AND role = 'Admin'", [admin_email, password]);
        if (rows.length > 0) {
            res.json({ success: true, token: "admin-session-secure-123" });
        } else {
            res.status(401).json({ message: "Invalid Admin Credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
};
// 4. NEW: Logic for Public User Registration
exports.registerUser = async (req, res) => {
    const { username, email, phone, password } = req.body;

    try {
        // Check if email exists
        const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Insert new user (Defaults to 'Buyer' role)
        const sql = "INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, 'Buyer')";
        const [result] = await db.query(sql, [username, email, phone, password]);

        res.status(201).json({ message: "User created", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed" });
    }
};