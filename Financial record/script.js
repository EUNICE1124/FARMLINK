// --- API CONFIGURATION ---
const API_CONFIG = {
    BASE_URL: 'https://your-api-domain.com/api',
    REVENUE_DATA_ENDPOINT: '/finance/revenue-trends',
    HEADERS: { 'Content-Type': 'application/json' }
};

// Initialize Chart
const ctx = document.getElementById('revenueChart').getContext('2d');
let revenueChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
        datasets: [
            { label: 'Blue', data: [4.3, 2.5, 3.5, 4.5], backgroundColor: '#4472c4' },
            { label: 'Orange', data: [2.4, 4.4, 1.8, 2.8], backgroundColor: '#ed7d31' },
            { label: 'Grey', data: [2.0, 2.0, 3.0, 5.0], backgroundColor: '#a5a5a5' }
        ]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, max: 6 } }
    }
});

// --- API FETCH FUNCTION ---
async function fetchFinancialTrends() {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.REVENUE_DATA_ENDPOINT}`, {
            method: 'GET',
            headers: API_CONFIG.HEADERS
        });

        if (response.ok) {
            const apiData = await response.json();
            
            // Update chart with API data
            // Example: revenueChart.data.datasets[0].data = apiData.blueSeries;
            revenueChart.update();
        }
    } catch (error) {
        console.warn("API not found, showing default mock data.");
    }
}

// Event Listeners for Buttons
document.getElementById('btnHistory').addEventListener('click', () => {
    alert("Loading Transaction History...");
});

// Run on load
window.onload = fetchFinancialTrends;