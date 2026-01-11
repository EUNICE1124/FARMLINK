
const db = require('../config/db'); 

exports.searchProducts = (req, res) => {
    
    const searchTerm = req.query.q;

    if (!searchTerm) {
        return res.status(400).json({ message: "No search term provided" });
    }

    
    const sql = "SELECT * FROM products WHERE product_name LIKE ?";
    const values = [`%${searchTerm}%`];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.status(200).json(results);
    });
};