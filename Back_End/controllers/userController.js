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
//   POST /api/users/address - Logic for the Address Form (From Address.html)
exports.registerAddress = async (req, res) => {
    const { fullName, province, district, city, userId } = req.body;

    try {
        // We use UPDATE instead of INSERT because the user account already exists 
        // after the confirmation page.
        const [result] = await db.execute(
            'UPDATE users SET name = ?, province = ?, district = ?, city = ? WHERE id = ?',
            [fullName, province, district, city, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            message: "Profile completed successfully! Redirecting to dashboard." 
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to update address", error: err.message });
    }
};
//PUT /api/users/profile - Update user profile details
exports.updateProfile = async (req, res) => {
    const { userId, fullName, email, phone, gender } = req.body;

    try {
        // Validation: Ensure userId is provided
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const [result] = await db.execute(
            'UPDATE users SET name = ?, email = ?, phone = ?, gender = ? WHERE id = ?',
            [fullName, email, phone, gender, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully!" });
    } catch (err) {
        // Handle duplicate email if someone tries to change to an existing email
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ message: "Email already in use" });
        } else {
            res.status(500).json({ message: "Update failed", error: err.message });
        }
    }
};
// GET /api/users/dashboard/:id - Fetch data for the Farmer Dashboard
exports.getDashboardData = async (req, res) => {
    const userId = req.params.id;

    try {
        // Fetch user name and location
        const [user] = await db.execute(
            'SELECT name, province, city FROM users WHERE id = ?', 
            [userId]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // In a real app, you would also fetch sales stats, orders, etc.
        res.status(200).json({
            userName: user[0].name,
            location: `${user[0].city}, ${user[0].province}`,
            stats: {
                totalSales: "125,000", // Example static data for now
                activeOrders: 5
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching dashboard data", error: err.message });
    }
};
// GET /api/farmer/home-summary/:id - Fetch summary for Home Page
exports.getHomeSummary = async (req, res) => {
    const userId = req.params.id;

    try {
        // Get user name
        const [user] = await db.execute('SELECT name FROM users WHERE id = ?', [userId]);
        
        // Get count of pending orders (Assuming an 'orders' table exists)
        const [orders] = await db.execute(
            'SELECT COUNT(*) as pendingCount FROM orders WHERE farmer_id = ? AND status = "Pending"', 
            [userId]
        );

        // Get top 4 recent products (Assuming a 'products' table exists)
        const [products] = await db.execute(
            'SELECT name, status, image_url FROM products WHERE farmer_id = ? LIMIT 4', 
            [userId]
        );

        res.status(200).json({
            farmerName: user[0]?.name || 'Farmer',
            pendingOrders: orders[0].pendingCount,
            inventory: products
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching home summary", error: err.message });
    }
};