document.addEventListener('DOMContentLoaded', () => {
    // 1. Search Functionality
    const searchInput = document.getElementById('productSearch');
    const stockItems = document.querySelectorAll('.your-stocks .stock-item:not(.header)');

    searchInput.addEventListener('keyup', (e) => {
        const searchText = e.target.value.toLowerCase();
        
        stockItems.forEach(item => {
            const productName = item.querySelector('.col-name').textContent.toLowerCase();
            
            // Show item if its name contains the search text, hide otherwise
            if (productName.includes(searchText)) {
                item.style.display = 'grid';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


// 2. Simulated Stock Edit Function
function editStock(productId) {
    const stockElement = document.querySelector(`.stock-item[data-product="${productId}"] .col-current`);
    const currentStock = stockElement.getAttribute('data-stock');
    const productName = stockElement.closest('.stock-item').querySelector('.col-name').textContent;

    // Prompt the user for the new stock count
    const newStock = prompt(`Enter new stock count for ${productName}:`, currentStock);

    if (newStock !== null && !isNaN(newStock) && newStock.trim() !== "") {
        const newStockValue = parseInt(newStock, 10);
        
        // Update the display text and the data attribute
        stockElement.textContent = `${newStockValue} bunch remaining `;
        stockElement.setAttribute('data-stock', newStockValue);
        
        // Re-add the edit icon (since it was overwritten by .textContent)
        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-pen edit-icon';
        editIcon.setAttribute('onclick', `editStock('${productId}')`);
        stockElement.appendChild(editIcon);

        alert(`Stock for ${productName} updated to ${newStockValue}.`);
    } else if (newStock !== null) {
        alert('Invalid input. Stock not updated.');
    }
}

// 3. Simulated View Details Function
function viewOrderDetails() {
    alert('Navigating to Orders page to view details for the 3 pending orders...');
    // In a real application, this would redirect the user: 
    // window.location.href = '/orders.html';
}

// 4. Simulated Add Product Function (attached via event listener in HTML)
document.querySelector('.add-product-button').addEventListener('click', () => {
    alert('Opening form to add a new product...');
});