const db = require('../config/db');

// --- 1. BUYER LOGIC: Fetching Products ---

// Fetch for the "Marketplace" view (Farmer info included)
exports.getAllMarketplaceProducts = async (req, res) => {
    try {
        const query = `
            SELECT p.*, u.name AS farmer_name 
            FROM products p
            JOIN users u ON p.farmer_id = u.id
            WHERE u.role = 'Farmer'
        `;
        // Using db.execute (Promise based)
        const [rows] = await db.execute(query);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error loading marketplace", error: err.message });
    }
};

// Fetch for the "Home Grid" (Category filter)
exports.getProductsGrid = async (req, res) => {
    const { category } = req.query;
    try {
        let query = 'SELECT * FROM products';
        let params = [];
        if (category && category !== 'All') {
            query += ' WHERE category = ?';
            params.push(category);
        }
        const [rows] = await db.execute(query, params);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error loading products", error: err.message });
    }
};

// --- 2. SELLER LOGIC: Management ---

// Save a new product WITH Multer image upload
exports.saveProduct = (req, res) => {
    // 1. Extract values (Removed 'category' from const to avoid redeclaration error)
    const { name, price, farmer_id, isFruit, isVegetable } = req.body;
    const image_url = req.file ? `images/${req.file.filename}` : 'images/images.jpg';

    // 2. Logic to determine category based on checkboxes/flags
    let finalCategory = 'Other'; 
    if (isFruit === 'true' || isFruit === true) {
        finalCategory = 'Fruit';
    } else if (isVegetable === 'true' || isVegetable === true) {
        finalCategory = 'Vegetable';
    }

    // 3. Database Query
    const sql = "INSERT INTO products (name, price, category, image_url, farmer_id) VALUES (?, ?, ?, ?, ?)";
    
    // Note: If your db config uses promises, use db.execute. 
    // If it uses standard callbacks, use db.query as shown below:
    db.query(sql, [name, price, finalCategory, image_url, farmer_id], (err, result) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Product saved successfully!", id: result.insertId });
    });
};

// --- 3. ACTION LOGIC: Cart ---

exports.addToCart = async (req, res) => {
    const { product_id, user_id, quantity_label } = req.body; 
    try {
        await db.execute(
            'INSERT INTO cart (product_id, user_id, quantity_label) VALUES (?, ?, ?)', 
            [product_id, user_id, quantity_label]
        );
        res.status(201).json({ message: "Successfully added to cart" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};