const db = require('../config/db');

exports.getMessages = (req, res) => {
    const { userId, type } = req.query;
    let query = "SELECT id, sender, text, created_at, is_read FROM messages WHERE receiver_id = ?";
    
    if (type === 'unread') {
        query += " AND is_read = 0";
    }

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// New function to handle marking messages as read
exports.markAsRead = (req, res) => {
    const { id } = req.params;
    const query = "UPDATE messages SET is_read = 1 WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Message marked as read" });
    });
};