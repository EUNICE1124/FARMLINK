const db = require('../config/db');

// GET /api/orders
exports.getAllOrders = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM orders ORDER BY placed_time DESC');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders", error: err.message });
    }
};

// PATCH /api/orders/:id
exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Expects { status: "Processing" }

    try {
        const [result] = await db.execute(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Status updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error updating status", error: err.message });
    }
};
// POST new order (from Checkout Page)
exports.placeOrder = async (req, res) => {
    // These keys match your checkout script.js: name, city, region, phone, provider, total
    const { name, city, region, phone, provider, total } = req.body;

    try {
        const [result] = await db.execute(
            `INSERT INTO orders (customer_name, city, region, phone, provider, total_price, status) 
             VALUES (?, ?, ?, ?, ?, ?, 'New')`,
            [name, city, region, phone, provider, total]
        );

        res.status(201).json({ 
            message: "Order placed successfully", 
            orderId: result.insertId 
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to place order", error: err.message });
    }
};
// GET /api/orders/status/:id
exports.getOrderStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.execute(
            'SELECT id, status, phone FROM orders WHERE id = ?', 
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        const order = rows[0];
        let step = 1;

        // Logic to map database status to UI steps
        if (order.status === 'Shipped') step = 2;
        if (order.status === 'Complete') step = 3;

        res.status(200).json({
            customerNumber: order.phone,
            adminNumber: "677-xxx-xxx", // Static help line or from config
            deliveryDate: "To be confirmed",
            statusStep: step
        });
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
};
// GET /api/orders/latest
exports.getLatestOrder = async (req, res) => {
    try {
        // Fetch the single most recent order
        const [rows] = await db.execute(
            `SELECT id, customer_name, total_price, status, 
             DATE_FORMAT(created_at, '%b %d, %Y') as formatted_date 
             FROM orders ORDER BY id DESC LIMIT 1`
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        const order = rows[0];
        
        // Map database fields to the keys expected by your script.js
        res.status(200).json({
            id: `FL-${order.id}`,
            customerName: order.customer_name,
            productCount: "Items detail in database", // You can expand this with a join table
            status: order.status,
            date: order.formatted_date
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching latest order", error: err.message });
    }
};