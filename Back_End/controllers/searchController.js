const db = require('../config/db'); 

/**
 * @desc    Search for products by name or category
 * @route   GET /api/search
 */
exports.searchProducts = (req, res) => {
    // 1. Extract search term from the URL (e.g., /api/search?q=tomato)
    const searchTerm = req.query.q;

    if (!searchTerm) {
        return res.status(400).json({ 
            success: false, 
            message: "No search term provided" 
        });
    }

    // 2. SQL query using LIKE to find partial matches in Name or Category
    // We use ? for security (prepared statements) to prevent SQL Injection
    const sql = `
        SELECT id, name, price, category, image_url 
        FROM products 
        WHERE name LIKE ? OR category LIKE ?
    `;
    const values = [`%${searchTerm}%`, `%${searchTerm}%`];

    // 3. Execute the query
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Search Database error:", err);
            return res.status(500).json({ 
                success: false, 
                error: "Internal server error during search" 
            });
        }

        // 4. Return results (even if empty) to the frontend
        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    });
};
const performSearch = async () => {
    const query = searchInput?.value.trim();
    if (query) {
        // Fetch real results from your Node.js/Java API
        try {
            const response = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
            const results = await response.json();
            
            // Render results instead of just history
            renderSearchResults(results); 
            
            // Add to history
            if (!recentSearches.includes(query)) {
                recentSearches.unshift(query);
            }
            renderSearches();
        } catch (error) {
            console.error("Search failed:", error);
        }
    }
};