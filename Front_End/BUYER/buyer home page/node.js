// node.js
document.addEventListener('DOMContentLoaded', async function () {
    const productGrid = document.querySelector('.recently-listed-grid'); 
    const savedUser = JSON.parse(localStorage.getItem('farmlink_user')) || { id: 0, name: "Guest" };

    const profileName = document.querySelector('#profileName');
    if (profileName) profileName.textContent = savedUser.name;

    async function loadProducts() {
        try {
            const response = await fetch(`http://173.234.79.54:3001/api/marketplace/grid?category=All`);
            if (!response.ok) throw new Error("Server down");
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error("Fetch error:", error);
            productGrid.innerHTML = "<p class='error-msg'>Check if server is running on port 3001</p>";
        }
    }

    function renderProducts(products) {
    if (!productGrid) return;
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image_url || '/Front_End/BUYER/buyer home page/images'}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}cfa</div>
                <button class="add-to-cart-btn">
                    <i class="bi bi-plus"></i>
                </button>
            </div>
        </div>
    `).join('');
    attachCartEvents();
}

    function attachCartEvents() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', async function () {
                const productId = this.closest('.product-card').dataset.id;
                const cartData = { product_id: productId, user_id: savedUser.id, quantity_label: "1 unit" };

                try {
                    const res = await fetch('http://173.234.79.54:3001/api/marketplace/cart/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(cartData)
                    });
                    if (res.ok) alert("Added to cart!");
                } catch (err) { alert("Cart server error."); }
            });
        });
    }
    loadProducts();
});