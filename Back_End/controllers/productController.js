const db = require('../config/db');

// --- 1. BUYER: Get Products ---
exports.getMarketplace = async (req, res) => {
    const { category } = req.query;
    try {
        let sql = "SELECT * FROM products";
        let params = [];

        if (category && category !== 'All') {
            sql += " WHERE category = ?";
            params.push(category);
        }

        const [products] = await db.query(sql, params);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

// --- 2. FARMER: Upload New Product ---
exports.uploadProduct = async (req, res) => {
    const { name, price, category, stock, farmer_id } = req.body;
    try {
        const sql = "INSERT INTO products (name, price, category, stock_quantity, farmer_id) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [name, price, category, stock, farmer_id]);
        res.status(201).json({ message: "Product listed successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to upload product" });
    }
};

// --- 3. BUYER: Add to Cart ---
exports.addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    // In a full system, user_id comes from the login session
    const user_id = 1; 

    try {
        const sql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
        await db.query(sql, [user_id, product_id, quantity]);
        res.status(201).json({ message: "Added to database cart" });
    } catch (err) {
        res.status(500).json({ error: "Failed to add to cart" });
    }
};