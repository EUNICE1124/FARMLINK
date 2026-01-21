document.addEventListener('DOMContentLoaded', () => {
    // 1. Load User Data from Backend
    loadFarmerProfile();

    // 2. Setup Search Listener
    const searchInput = document.getElementById('dashboardSearch');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleDashboardSearch(searchInput.value);
        }
    });
});

/**
 * Fetches the real name from userController.getDashboardData
 */
async function loadFarmerProfile() {
    const userId = localStorage.getItem('userId') || 1; // Fallback to 1 for testing
    const nameDisplay = document.getElementById('userNameDisplay');

    try {
        const response = await fetch(`http://localhost:3001/api/users/dashboard/${userId}`);
        const data = await response.json();

        if (response.ok) {
            nameDisplay.innerText = `Hi, ${data.userName}`;
        } else {
            nameDisplay.innerText = "Hi, Farmer";
        }
    } catch (error) {
        console.error("Connection error:", error);
        nameDisplay.innerText = "Hi, Farmer John"; // Fallback
    }
}

/**
 * Connects to searchController.searchProducts
 */
async function handleDashboardSearch(query) {
    if (!query) return;

    try {
        const response = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
        const results = await response.json();

        if (response.ok) {
            console.log("Search Results:", results);
            alert(`Found ${results.length} items. Check console for details.`);
            // Here you would typically clear 'dashboardContent' and show the results
        }
    } catch (error) {
        console.error("Search failed:", error);
    }
}