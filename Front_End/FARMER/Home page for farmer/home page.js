document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    const nameDisplay = document.getElementById('display-name');
    
    // 1. FETCH HOME DATA
    if (userId) {
        try {
            const response = await fetch(`http://localhost:3001/api/farmer/home-summary/${userId}`);
            const data = await response.json();

            if (response.ok) {
                // Update Name
                if (nameDisplay) nameDisplay.textContent = `Hi, ${data.farmerName}`;
                
                // Update Pending Orders count in the UI (if you have an ID for it)
                const pendingLabel = document.querySelector('.pending-orders p');
                if (pendingLabel) pendingLabel.textContent = `${data.pendingOrders} Pending Orders`;
            }
        } catch (error) {
            console.error('Error fetching home data:', error);
        }
    }

    // 2. NAVIGATION LOGIC
    const profileThumb = document.querySelector('.profile-thumb');
    if (profileThumb) {
        profileThumb.addEventListener('click', () => {
            window.location.href = '../profile account interface/index.html';
        });
    }

    const salesTrigger = document.getElementById('sales-trigger');
    if (salesTrigger) {
        salesTrigger.addEventListener('click', () => {
            window.location.href = '../farmer dashboard/farmer dashboard.html';
        });
    }

    // 3. FAB (Plus Button) Logic
    const fabButton = document.querySelector('.fab-add');
    if (fabButton) {
        fabButton.addEventListener('click', () => {
            window.location.href = '../upload product/index4.html';
        });
    }

    // 4. SEARCH REDIRECT
    const searchInput = document.getElementById('farmer-search');
    if (searchInput) {
        searchInput.addEventListener('click', () => {
            window.location.href = '../../shared interface/search/index.html';
        });
    }
});