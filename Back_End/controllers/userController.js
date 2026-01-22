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
    // 1. Get data from the request body
    const { userId, fullName, province, district, city } = req.body;

    // 2. Validation: Ensure all fields and the userId are present
    if (!userId || !fullName || !province || !district || !city) {
        return res.status(400).json({ message: "All fields are required, including User ID." });
    }

    // 3. SQL Query: Make sure these match your table columns exactly
   const sql = "UPDATE users SET full_name = ?, region = ?, district = ?, city = ? WHERE id = ?";
    try {
        const [result] = await db.execute(sql, [fullName, province, district, city, userId]);
        res.status(200).json({ message: "Address saved successfully!", id: result.insertId });
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ message: "Database error: " + err.message });
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
// PUT /api/users/profile - Update user profile details (from profile.js auto-save)
exports.updateProfile = (req, res) => {
    const { userId, fullName, email, phone, gender } = req.body; // Keys from your profile.js
    const sql = "UPDATE users SET full_name = ?, email = ?, phone = ?, gender = ? WHERE id = ?";
    
    db.query(sql, [fullName, email, phone, gender, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Profile synchronized!" });
    });
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
// GET /api/farmer/inventory/:userId - Fetch all products for a specific farmer
exports.getInventory = async (req, res) => {
    const userId = req.params.userId;

    try {
        const [products] = await db.execute(
            'SELECT id, name, price, quantity, unit, status, image_url FROM products WHERE farmer_id = ?',
            [userId]
        );

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching inventory", error: err.message });
    }
};
// POST /api/users/login - Authenticate user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query must include 'role' to differentiate users
        const [rows] = await db.execute(
            'SELECT id, name, email, role FROM users WHERE email = ? AND password = ?', 
            [email, password]
        );

        if (rows.length > 0) {
            res.status(200).json({ 
                authenticated: true, 
                user: rows[0] // Returns { id, name, email, role }
            });
        } else {
            res.status(401).json({ authenticated: false, message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};
// Check if the user's account is active before showing the confirmation
exports.checkAccountStatus = async (req, res) => {
    const { userId } = req.params;
    try {
        const [user] = await db.execute("SELECT id FROM users WHERE id = ?", [userId]);
        if (user.length > 0) {
            res.status(200).json({ status: 'Verified' });
        } else {
            res.status(404).json({ status: 'Not Found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// GET /api/users/dashboard/:userId - Fetch dashboard data for a specific user
exports.getDashboardData = async (req, res) => {
    const { userId } = req.params;

    try {
        // 1. Get User Name
        const [user] = await db.execute("SELECT name FROM users WHERE id = ?", [userId]);
        
        // 2. Get Total Sales & Order Count (assuming you have an 'orders' table)
        // If you don't have an orders table yet, these will return 0
        const [stats] = await db.execute(`
            SELECT 
                IFNULL(SUM(total_amount), 0) AS totalSales, 
                COUNT(id) AS orderCount 
            FROM orders 
            WHERE farmer_id = ?`, [userId]);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            userName: user[0].name,
            totalSales: stats[0].totalSales,
            orderCount: stats[0].orderCount
        });
    } catch (err) {
        console.error("Dashboard Error:", err.message);
        res.status(500).json({ message: "Error loading dashboard data" });
    }
};
