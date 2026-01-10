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
// --- NEW: Fetch Latest Order for UI ---
exports.getLatestOrder = async (req, res) => {
    try {
        // Query to get the single most recent order
        const sql = `
            SELECT id, customer_name, total_amount, status_step, 
            DATE_FORMAT(created_at, '%Y-%m-%d') as orderDate 
            FROM orders 
            ORDER BY created_at DESC LIMIT 1`;
        
        const [rows] = await db.query(sql);

        if (rows.length > 0) {
            // Mapping DB columns to the names expected by your frontend
            res.json({
                id: `FL-${rows[0].id}`,
                customerName: rows[0].customer_name,
                productCount: "Items in Cart", // You can expand this with a JOIN later
                status: rows[0].status_step === 1 ? "Pending" : "Processing",
                date: rows[0].orderDate
            });
        } else {
            res.status(404).json({ message: "No orders found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
};