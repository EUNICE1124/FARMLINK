document.addEventListener('DOMContentLoaded', () => {
    // 1. Use a more generic selector to find the input inside the search bar
    const searchInput = document.querySelector('input[type="text"]') || document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn') || document.querySelector('.fa-search')?.parentElement;
    const resultsArea = document.querySelector('.results-area');

    // 2. Role-based placeholder (Fixed with a "Null Check")
    const userRole = localStorage.getItem('userRole') || 'buyer';

    if (searchInput) {
        searchInput.placeholder = (userRole === 'farmer')
            ? "Search for customers..."
            : "Search for fresh produce...";
    } else {
        console.error("Could not find the search input element. Check your HTML classes.");
    }

    let recentSearches = [];

    function renderSearches() {
        if (!resultsArea) return;
        if (recentSearches.length === 0) {
            resultsArea.innerHTML = '<p style="margin-top: 50%; color: #888;">No Recent Searches</p>';
        } else {
            resultsArea.innerHTML = recentSearches.slice(0, 5).map(item => `
                <div class="search-history-item" style="padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
                    <span>${item}</span>
                    <i class="fas fa-history" style="color: #ccc;"></i>
                </div>
            `).join('');
        }
    }

    // 3. The Search Logic
    const performSearch = () => {
        const query = searchInput?.value.trim();
        if (query) {
            if (!recentSearches.includes(query)) {
                recentSearches.unshift(query);
            }
            renderSearches();
            if (searchInput) searchInput.value = '';
        }
    };

    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // 4. Catch the redirect from Home Page
    const params = new URLSearchParams(window.location.search);
    const urlQuery = params.get('query');
    if (urlQuery) {
        recentSearches.unshift(urlQuery);
        renderSearches();
    }
});