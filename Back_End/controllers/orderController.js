const db = require('../config/db');

// --- PART 1: PLACING THE ORDER (From Checkout Page) ---
exports.createOrder = async (req, res) => {
    const { name, city, region, phone, provider, total } = req.body;
    try {
        const sql = `INSERT INTO orders 
            (customer_name, city, region, phone_number, payment_method, total_amount, status_step) 
            VALUES (?, ?, ?, ?, ?, ?, 1)`; // Start at step 1
        
        const [result] = await db.query(sql, [name, city, region, phone, provider, total]);
        res.status(201).json({ orderId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: "Failed to save order" });
    }
};

// --- PART 2: TRACKING THE ORDER (From Status Page) ---
exports.getOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    try {
        const [rows] = await db.query(
            "SELECT phone_number, status_step, DATE_FORMAT(created_at, '%b %d, %Y') as deliveryDate FROM orders WHERE id = ?", 
            [orderId]
        );

        if (rows.length > 0) {
            res.json({
                customerNumber: rows[0].phone_number,
                adminNumber: "+237 600 000 000",
                statusStep: rows[0].status_step,
                deliveryDate: rows[0].deliveryDate
            });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
};