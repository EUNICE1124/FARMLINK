const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsArea = document.getElementById('resultsArea');
// Check who is using the search
const userRole = localStorage.getItem('userRole'); // 'farmer' or 'buyer'

const searchPlaceholder = document.querySelector('.search-input');

if (userRole === 'farmer') {
    searchPlaceholder.placeholder = "Search for customers...";
} else {
    searchPlaceholder.placeholder = "Search for fresh produce...";
}
let recentSearches = [];

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    
    if (query) {
        // Mock API logic: Add to local "recent" list
        if (!recentSearches.includes(query)) {
            recentSearches.unshift(query);
        }
        renderSearches();
        searchInput.value = '';
    }
});

function renderSearches() {
    if (recentSearches.length === 0) {
        resultsArea.innerHTML = '<p>No Recent Searches</p>';
    } else {
        resultsArea.className = ""; // Remove empty-state centering
        resultsArea.innerHTML = recentSearches.slice(0, 5).map(item => `
            <div style="padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
                <span>${item}</span>
                <i class="fas fa-history" style="color: #ccc;"></i>
            </div>
        `).join('');
    }
}