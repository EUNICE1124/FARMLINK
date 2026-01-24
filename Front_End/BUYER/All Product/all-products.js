// all-products.js
async function loadMarket() {
    const grid = document.getElementById('marketGrid');
    try {
        const res = await fetch('http://173.234.79.54:3001/marketplace');
        const products = await res.json();

        grid.innerHTML = products.map(p => `
            <div class="product-card">
                <img src="${p.image_url || '../buyer home page/images'}" class="product-image">
                <div class="product-details">
                    <span class="farmer-tag">Grown by: ${p.farmer_name}</span>
                    <div class="product-name">${p.name}</div>
                    <div class="product-price">${p.price}cfa</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${p.id})">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        grid.innerHTML = "<p class='loading-msg'>Market connection failed. Check if server is running.</p>";
    }
}
async function addToCart(productId) {
    const userId = localStorage.getItem('userId') || 1; // Fallback for testing
    try {
        const response = await fetch('http://173.234.79.54:3001/api/marketplace/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                product_id: productId, 
                user_id: userId, 
                quantity_label: '1 unit' 
            })
        });

        const result = await response.json();
        if (response.ok) {
            alert("Added to cart!");
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Cart error:", error);
    }
}