document.addEventListener('DOMContentLoaded', () => {
    
    const farmerName = localStorage.getItem('farmerName') || 'Farmer John';
    const nameDisplay = document.getElementById('display-name');
    if (nameDisplay) {
        nameDisplay.textContent = `Hi, ${farmerName}`;
    }


    const salesPart = document.getElementById('sales-trigger');
    const stockPart = document.getElementById('stock-trigger');

    if (salesPart) {
        salesPart.addEventListener('click', () => {
            console.log("Navigating to Performance Dashboard...");
            // Redirects to the performance dashboard folder
            window.location.href = '../farmer dashboard/farmer dashboard.html';
        });
    }

    if (stockPart) {
        stockPart.addEventListener('click', () => {
            console.log("Navigating to Inventory/Stocks...");
            // Redirects to the products management page
            window.location.href = '../inventory/inventory.html';
        });
    }

    // 3. FLOATING ACTION BUTTON (FAB)
    const fabAdd = document.querySelector('.fab-add');
    if (fabAdd) {
        fabAdd.addEventListener('click', () => {
            // Redirect to the "Add New Product" form
            window.location.href = '../add products/index.html';
        });
    }

    // 4. SEARCH BAR LOGIC

    const searchInput = document.getElementById('farmer-search');

    searchInput.addEventListener('keyup', function () {
        
        const filter = searchInput.value.toLowerCase();

        
        const rows = document.querySelectorAll('.stock-row');

        rows.forEach(row => {
            
            const productName = row.querySelector('.p-name').textContent.toLowerCase();

            
            if (productName.indexOf(filter) > -1) {
                row.style.display = ""; // 
            } else {
                row.style.display = "none"; 
            }
        });
    });

    // 5. BOTTOM NAVIGATION ACTIVE STATE
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
    
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            
            const label = item.querySelector('span').textContent.toLowerCase();
            if (label !== 'home') {
            
            }
        });
    });
});