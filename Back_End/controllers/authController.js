const db = require('../config/db');

exports.saveRolePreference = async (req, res) => {
    const { role, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is missing. Please log in again." });
    }

    const query = `
        UPDATE users 
        SET role = ?, onboarding_completed = 1 
        WHERE id = ?
    `;

    try {
        // Use execute or query depending on your db config
        db.query(query, [role, userId], (err, result) => {
            if (err) {
                console.error("SQL Error:", err.message);
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: "Onboarding completed successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.selectRole = (req, res) => {
    const { userId, role } = req.body; // 'farmer' or 'buyer'
    
    // Capitalize role to match your database conventions (e.g., 'Farmer')
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);
    
    const sql = "UPDATE users SET role = ? WHERE id = ?";
    db.query(sql, [formattedRole, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Role updated successfully" });
    });
};