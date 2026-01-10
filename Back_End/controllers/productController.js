const db = require('../config/db');

// GET /api/products?category=Vegetables
exports.getProducts = async (req, res) => {
    const { category } = req.query;
    try {
        let query = 'SELECT * FROM products';
        let params = [];

        if (category && category !== 'All') {
            query += ' WHERE category = ?';
            params.push(category);
        }

        const [rows] = await db.execute(query, params);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error loading products", error: err.message });
    }
};

// POST /api/cart
exports.addToCart = async (req, res) => {
    // These keys match your index.js: product_id, quantity_label, user_id
    const { product_id, quantity_label, user_id } = req.body; 

    try {
        await db.execute(
            'INSERT INTO cart (product_id, user_id, quantity, quantity_label) VALUES (?, ?, ?, ?)',
            [product_id, user_id, 1, quantity_label]
        );
        res.status(201).json({ message: "Added to cart successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
};