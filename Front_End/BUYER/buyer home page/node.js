document.addEventListener('DOMContentLoaded', async function () {
    const productGrid = document.querySelector('.product-grid'); // Ensure your HTML has this class
    const categoryButtons = document.querySelectorAll('.category-btn');

    /**
     * 1. FETCH PRODUCTS FROM DATABASE
     * Replaces static HTML with real data from MySQL
     */
    async function loadProducts(category = 'All') {
        try {
            productGrid.innerHTML = '<p>Loading fresh produce...</p>';
            
            // Link to the backend route we will create below
            const response = await fetch(`http://localhost:3001/api/products?category=${category}`);
            const products = await response.json();
            
            renderProducts(products);
        } catch (error) {
            productGrid.innerHTML = '<p style="color:red;">Could not load products. Please check server.</p>';
        }
    }

    /**
     * 2. RENDER PRODUCTS TO UI
     */
    function renderProducts(products) {
        if (products.length === 0) {
            productGrid.innerHTML = '<p>No products available in this category.</p>';
            return;
        }

        productGrid.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image_url || 'placeholder.jpg'}" alt="${product.name}">
                <div class="card-content">
                    <h3 class="card-title">${product.name}</h3>
                    <p class="card-price">$${product.price}</p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        `).join('');

        // Re-attach listeners to the new buttons
        attachCartEvents();
    }

    /**
     * 3. ADD TO CART (Backend POST)
     */
    function attachCartEvents() {
        const buttons = document.querySelectorAll('.add-to-cart-btn');
        buttons.forEach(button => {
            button.addEventListener('click', async function () {
                const productCard = this.closest('.product-card');
                const productId = productCard.dataset.id;
                const productName = productCard.querySelector('.card-title').textContent;

                try {
                    const response = await fetch('http://localhost:3001/api/cart', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ product_id: productId, quantity: 1 })
                    });

                    if (response.ok) {
                        alert(`${productName} added to database cart!`);
                    }
                } catch (error) {
                    alert("Server error: Could not add to cart.");
                }
            });
        });
    }

    // Initial Load
    loadProducts();
});