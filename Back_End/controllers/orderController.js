const db = require('../config/db');

// 1. GET FARMER STATS (For Farmer Dashboard)
// Route: GET /api/orders/stats/:userId
exports.getFarmerStats = (req, res) => {
    const { userId } = req.params;
    const sql = `
        SELECT 
            SUM(total_price) AS totalSales, 
            COUNT(*) AS orderCount 
        FROM orders 
        WHERE farmer_id = ?`;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Dashboard Stats Error:", err);
            return res.status(500).json({ error: "Failed to fetch sales statistics." });
        }
        res.json({
            totalSales: results[0].totalSales || 0,
            orderCount: results[0].orderCount || 0
        });
    });
};

// 2. GET LATEST ORDER (For summary view)
// Route: GET /api/orders/latest/:userId
exports.getLatestOrder = (req, res) => {
    const userId = req.params.userId; 
    const sql = `
        SELECT 
            o.id, 
            u.name AS customerName, 
            o.status, 
            o.created_at AS date 
        FROM orders o
        JOIN users u ON o.customer_id = u.id
        WHERE o.farmer_id = ?
        ORDER BY o.created_at DESC 
        LIMIT 1`;

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "No orders found." });
        res.json(results[0]);
    });
};

// 3. GET ALL ORDERS (History view)
// Route: GET /api/orders
exports.getAllOrders = (req, res) => {
    const sql = "SELECT * FROM orders ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// 4. GET ORDER STATUS DETAILS (Tracking)
// Route: GET /api/orders/status/:id
exports.getOrderStatus = (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT 
            customer_phone AS customerNumber, 
            admin_contact AS adminNumber, 
            delivery_date AS deliveryDate, 
            status_step AS statusStep 
        FROM orders 
        WHERE id = ?`;

    db.query(sql, [id], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ error: "Order not found." });
        res.json(results[0]);
    });
};

// 5. UPDATE ORDER STATUS (Approve/Cancel)
// Route: PATCH /api/orders/:id
exports.updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body; 

    const sql = "UPDATE orders SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Order status updated successfully" });
    });
};

// 6. PLACE NEW ORDER (Buyer Checkout)
// Route: POST /api/orders
exports.placeOrder = (req, res) => {
    const { buyer_id, farmer_id, total_price } = req.body;
    const sql = "INSERT INTO orders (buyer_id, farmer_id, total_price, status) VALUES (?, ?, ?, 'Pending')";
    
    db.query(sql, [buyer_id, farmer_id, total_price], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Order placed successfully", orderId: result.insertId });
    });
};

// 7. ADD TO CART
// Route: POST /api/orders/cart/add
exports.addToCart = (req, res) => {
    const { userId, productId, quantity } = req.body;
    const sql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
    
    db.query(sql, [userId, productId, quantity], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Product added to cart" });
    });
};