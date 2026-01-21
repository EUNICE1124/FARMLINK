// all-products.js
async function loadMarket() {
    const grid = document.getElementById('marketGrid');
    try {
        const res = await fetch('http://localhost:3001/api/marketplace');
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