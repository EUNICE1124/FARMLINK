document.addEventListener('DOMContentLoaded', async () => {
    const inventoryList = document.getElementById('inventoryList');
    const searchInput = document.getElementById('searchInput');
    const userId = localStorage.getItem('userId');
    const nameDisplay = document.querySelector('.header h1');

    // 1. FETCH AND RENDER INVENTORY
    async function loadInventory() {
        if (!userId) return;

        try {
            const response = await fetch(`http://root:173.234.79.54/api/farmer/inventory/${userId}`);
            const products = await response.json();

            if (response.ok) {
                renderProducts(products);
            }
        } catch (error) {
            console.error('Failed to load inventory:', error);
        }
    }

    function renderProducts(products) {
        inventoryList.innerHTML = ''; // Clear static items

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            // Logic for the stock badge color
            const badgeClass = product.quantity < 10 ? 'low-stock' : 'in-stock';
            const badgeText = product.quantity < 10 ? 'Low' : 'In Stock';

            card.innerHTML = `
                <img src="${product.image_url || 'images/default-product.png'}" alt="${product.name}">
                <div class="product-details">
                    <div class="detail-header">
                        <h3>${product.name}</h3>
                        <span class="badge ${badgeClass}">${badgeText}</span>
                    </div>
                    <p class="price">Cfa ${product.price}/${product.unit}</p>
                    <p class="remaining">${product.quantity} ${product.unit}s remaining</p>
                </div>
                <button class="edit-btn" onclick="editProduct(${product.id})">
                    <i class="bi bi-pencil-fill"></i>
                </button>
            `;
            inventoryList.appendChild(card);
        });
    }

    // 2. SEARCH FILTER LOGIC
    searchInput.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = title.includes(term) ? 'flex' : 'none';
        });
    });

    // 3. NAVIGATION INTERACTION
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.querySelector('span').textContent;
            if (page === 'Home') window.location.href = '../home page for farmer/home page.html';
            if (page === 'Orders') window.location.href = '../order management/index.html';
            if (page === 'Account') window.location.href = '../profile account interface/index.html';
        });
    });

    // Initial Load
    loadInventory();
});

// Global function for edit button
function editProduct(id) {
    console.log("Editing product ID:", id);
    window.location.href = `../Add Product/index.html?id=${id}`;
    // Redirect to an edit page or open a modal
}