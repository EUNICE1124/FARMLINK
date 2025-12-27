// URL for your order data API
const ORDER_API = "https://your-api.com/get-latest-order";

async function fetchOrderData() {
    try {
        const response = await fetch(ORDER_API);
        const data = await response.json();

        // Filling the table with API data
        document.getElementById('orderId').textContent = data.id || "#1024";
        document.getElementById('customer').textContent = data.customerName || "John Doe";
        document.getElementById('items').textContent = data.productCount || "5 Boxes";
        document.getElementById('status').textContent = data.status || "Pending";
        document.getElementById('orderDate').textContent = data.date || "2025-12-26";

    } catch (error) {
        console.log("Error fetching API, using mock data instead.");
        // Static data for testing
        document.getElementById('orderId').textContent = "FL-990";
        document.getElementById('customer').textContent = "Abena Mensah";
        document.getElementById('items').textContent = "3kg Bananas";
        document.getElementById('status').textContent = "Processing";
        document.getElementById('orderDate').textContent = "Dec 26, 2025";
    }
}

// Run the function when the page loads
window.onload = fetchOrderData;