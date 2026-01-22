const db = require('../config/db');

// GET /api/orders/latest
exports.getLatestOrder = (req, res) => {
    const { userId } = req.query; // Get the ID from the frontend
    const query = "SELECT * FROM orders WHERE customer_id = ? ORDER BY id DESC LIMIT 1";

    db.query(query, [userId], (err, results) => {
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
            adminNumber: order.admin_phone || "694002750"
        });
    });
};

// GET /api/orders/:orderId

exports.getOrderDetails = async (req, res) => {
    const orderId = req.params.orderId;
    // Join with products table to show what they are buying
    const query = `
        SELECT o.id, o.customer_name, o.status, o.total_amount, p.name AS product_name 
        FROM orders o
        JOIN products p ON o.product_id = p.id
        WHERE o.id = ?`;

    db.query(query, [orderId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Order not found" });

        const order = results[0];
        // Send data back in the format the JS expects
        res.status(200).json({
            customerName: order.customer_name,
            orderId: order.id,
            amount: order.total_amount,
            status: order.status,
            productName: order.product_name
        });
    });
};
/**
 * 2. POST NEW ORDER (From Checkout Page)
 */
exports.placeOrder = (req, res) => {
    const { customer_id, customer_name, city, region, phone, provider, total_price, status } = req.body;
    const sql = `INSERT INTO orders (customer_id, customer_name, city, region, phone, provider, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [customer_id, customer_name, city, region, phone, provider, total_price, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Order saved!", orderId: result.insertId });
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
            status: order.status, // e.g., 'Processing'
            buyerNumber: order.phone,
            adminNumber: order.admin_phone,
            date: order.placed_time
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
// New function to match index.js logic
exports.addToCart = (req, res) => {
    const { product_id, quantity_label, user_id } = req.body; // Matches index.js keys

    const query = "INSERT INTO cart (product_id, user_id, quantity_label) VALUES (?, ?, ?)";
    
    db.query(query, [product_id, user_id, quantity_label], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(201).json({ message: "Successfully added to cart", cartId: result.insertId });
    });
};
/**
 * FETCH ALL ORDERS
 * Matches: fetch('http://localhost:3001/api/orders')
 */
exports.getAllOrders = (req, res) => {
    // JOIN with users to get the Customer Name for the UI
    const query = `
        SELECT o.*, u.name AS customer_name 
        FROM orders o 
        LEFT JOIN users u ON o.customer_id = u.id 
        ORDER BY o.id DESC
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

/**
 * UPDATE ORDER STATUS
 * Matches: fetch('http://localhost:3001/api/orders/${orderId}', { method: 'PATCH' ... })
 */
exports.updateStatusPatch = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = "UPDATE orders SET status = ? WHERE id = ?";

    db.query(query, [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });
        
        res.status(200).json({ message: "Status updated successfully" });
    });
};