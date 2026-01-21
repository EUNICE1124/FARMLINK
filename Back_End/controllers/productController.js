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
        // Updated to match your 'cart' table columns exactly
        await db.execute(
            'INSERT INTO cart (product_id, user_id, quantity_label) VALUES (?, ?, ?)',
            [product_id, user_id, quantity_label]
        );
        res.status(201).json({ message: "Added to cart successfully!" });
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ message: "Database error", error: err.message });
    }
};
// POST /api/products/save
exports.saveProduct = async (req, res) => {
    const { name, price, isFruit, isVegetable } = req.body;

    // Logic to determine category based on your checkboxes
    let category = 'vegetable'; 
    if (isFruit) category = 'fruit';

    try {
        const [result] = await db.execute(
            'INSERT INTO products (name, price, category) VALUES (?, ?, ?)',
            [name, price, category]
        );

        res.status(201).json({ 
            message: "Product saved successfully!", 
            productId: result.insertId 
        });
    } catch (err) {
        res.status(500).json({ message: "Error saving product", error: err.message });
    }
};
// 7. NEW: GET /api/finance/revenue - Fetch data for the Chart
exports.getFinancialRecords = async (req, res) => {
    const userId = req.query.userId;

    try {
        // In a real app, you would have a 'transactions' or 'sales' table
        // For now, we simulate fetching summarized data for the user
        const [results] = await db.execute(
            'SELECT category, SUM(amount) as total FROM sales WHERE farmer_id = ? GROUP BY category',
            [userId]
        );

        // If no data exists, we send an empty array or default values
        res.status(200).json(results.length > 0 ? results : [
            { category: 'Crops', total: 0 },
            { category: 'Livestock', total: 0 },
            { category: 'Other', total: 0 }
        ]);
    } catch (err) {
        res.status(500).json({ message: "Error fetching financial data", error: err.message });
    }
};