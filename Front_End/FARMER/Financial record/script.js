// --- API CONFIGURATION ---
const API_CONFIG = {
    BASE_URL: 'http://173.234.79.54:3001/api',
    REVENUE_DATA_ENDPOINT: '/finance/revenue',
    HEADERS: { 'Content-Type': 'application/json' }
};

// Initialize Chart with empty data first
const ctx = document.getElementById('revenueChart').getContext('2d');
let revenueChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], // Will be filled by API
        datasets: [{
            label: 'Revenue (CFA)',
            data: [], // Will be filled by API
            backgroundColor: ['#4472c4', '#ed7d31', '#a5a5a5', '#ffc000']
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
    }
});

// --- API FETCH FUNCTION ---
async function fetchFinancialTrends() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.REVENUE_DATA_ENDPOINT}?userId=${userId}`, {
            method: 'GET',
            headers: API_CONFIG.HEADERS
        });

        if (response.ok) {
            const apiData = await response.json();
            
            // Extract labels and values for Chart.js
           const labels = apiData.map(item => item.category);
           const values = apiData.map(item => Number(item.total)); 

            // Update chart
            revenueChart.data.labels = labels;
            revenueChart.data.datasets[0].data = values;
            revenueChart.update();
        }
    } catch (error) {
        console.error("Error loading financial data:", error);
    }
}

// Load data when page opens
document.addEventListener('DOMContentLoaded', fetchFinancialTrends);

// Button placeholders
document.getElementById('btnHistory').addEventListener('click', () => {
    window.location.href = '../View All Orders/index.html'; 
});

document.getElementById('btnReceipts').addEventListener('click', () => {
    window.location.href = '../Order Tracking/index.html'; 
});