document.addEventListener('DOMContentLoaded', () => {
    
    const farmerName = localStorage.getItem('farmerName') || 'Farmer John';
    const nameDisplay = document.getElementById('display-name');
    if (nameDisplay) {
        nameDisplay.textContent = `Hi, ${farmerName}`;
    }
    
    const profileThumb = document.querySelector('.profile-thumb');

    if (profileThumb) {
        profileThumb.style.cursor = 'pointer'; // Makes it look clickable
        profileThumb.addEventListener('click', () => {
            // Path: jump out of 'home' and into 'profile'
            window.location.href = '../profile account interface/index.html';
        });
    }
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-view-details')) {
            console.log("Pending Order Details Clicked!");

            window.location.href = '../order management/index.html';
        }
    });
   
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

    const fabButton = document.querySelector('.fab-add');

    if (fabButton) {
        fabButton.addEventListener('click', () => {
            // Path: jump out of 'home' and into 'products'
            window.location.href = '../upload product/index4.html';
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
   
        });