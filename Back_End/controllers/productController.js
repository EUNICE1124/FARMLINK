const db = require('../config/db');

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