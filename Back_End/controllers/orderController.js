const db = require('../config/db');

// GET /api/orders/latest
exports.getLatestOrder = (req, res) => {
    const query = "SELECT * FROM orders ORDER BY id DESC LIMIT 1";

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error", details: err.message });
        if (results.length === 0) return res.status(404).json({ message: "No orders found" });

        const order = results[0];

        res.status(200).json({
            id: `FL-${order.id}`,
            customerName: order.customer_name || "Guest",
            productCount: order.product_items || "1x Order",
            status: order.status || "Processing",
            date: new Date(order.placed_time || Date.now()).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            }),
            buyerNumber: order.phone,
            adminNumber: order.admin_phone || "677000000"
        });
    });
};

// GET /api/orders/:orderId
exports.getOrderDetails = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const [order] = await db.execute('SELECT * FROM orders WHERE id = ?', [orderId]);
        if (order.length === 0) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order[0]);
    } catch (err) {
        res.status(500).json({ message: "Error fetching order", error: err.message });
    }
};
/**
 * 2. POST NEW ORDER (From Checkout Page)
 */
exports.placeOrder = (req, res) => {
    const { name, phone, city, region, items, total } = req.body;
    
    // Ensure table has customer_name, phone, city, region, product_items, total_price, status
    const query = `
        INSERT INTO orders 
        (customer_name, phone, city, region, product_items, total_price, status) 
        VALUES (?, ?, ?, ?, ?, ?, 'Processing')
    `;

    db.query(query, [name, phone, city, region, items, total], (err, result) => {
        if (err) {
            console.error("Insert Error:", err.message);
            return res.status(500).json({ message: "Failed to place order", error: err.message });
        }
        res.status(201).json({ 
            message: "Order placed successfully!", 
            orderId: result.insertId 
        });
    });
};

/**
 * 3. GET ORDER STATUS (For Visual Tracking Page)
 * Endpoint: /api/orders/status/:id
 */
exports.getOrderStatus = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM orders WHERE id = ?";

    db.query(query, [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        const order = results[0];
        
        // Map string status to numerical step for the UI (1, 2, or 3)
        let step = 1;
        if (order.status === 'Shipped') step = 2;
        if (order.status === 'Delivered') step = 3;

        res.status(200).json({
            customerNumber: order.phone,
            adminNumber: order.admin_phone || "677-000-000",
            deliveryDate: "3-5 Working Days",
            statusStep: step
        });
    });
};

/**
 * 4. GET ALL ORDERS (For Admin View)
 */
exports.getAllOrders = (req, res) => {
    const query = "SELECT * FROM orders ORDER BY id DESC";

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching orders" });
        }
        res.status(200).json(results);
    });
};

/**
 * 5. PATCH UPDATE STATUS (Admin changing status)
 */
exports.updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // e.g., 'Shipped' or 'Delivered'

    const query = "UPDATE orders SET status = ? WHERE id = ?";

    db.query(query, [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });
        
        res.status(200).json({ message: "Status updated to " + status });
    });
};