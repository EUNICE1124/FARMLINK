// controllers/financeController.js
const db = require('../config/db');

exports.getRevenueData = async (req, res) => {
    const { userId } = req.query;

    try {
        const sql = `
          SELECT p.category, SUM(o.total_price) AS total 
          FROM orders o 
          JOIN products p ON o.product_id = p.id 
          WHERE o.farmer_id = ? 
          GROUP BY p.category
        `;
        const [rows] = await db.execute(sql, [userId]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};