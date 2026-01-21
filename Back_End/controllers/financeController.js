// controllers/financeController.js
const db = require('../config/db');

exports.getRevenueData = async (req, res) => {
    const { userId } = req.query;

    try {
        const sql = `
            SELECT category, SUM(amount_cfa) as total 
            FROM transactions 
            WHERE farmer_id = ? 
            GROUP BY category
        `;
        const [rows] = await db.execute(sql, [userId]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};