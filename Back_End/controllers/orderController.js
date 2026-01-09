const db = require('../config/db');

exports.addToCart = async (req, res) => {
    // Capture data sent from the frontend
    const { product_id, quantity_label, user_id } = req.body;

    try {
        const sql = "INSERT INTO cart_items (product_id, quantity_description, user_id) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, [product_id, quantity_label, user_id]);
        
        res.status(200).json({ 
            message: 'Item added to database', 
            cartId: result.insertId 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Database saving failed' });
    }
};