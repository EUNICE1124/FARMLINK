const ORDER_API = "http://localhost:3001/api/orders/latest";

async function fetchOrderData() {
    try {
        const response = await fetch(ORDER_API);
        
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();

        // Sanitize and Fill Data
        document.getElementById('orderId').textContent = data.id || "N/A";
        document.getElementById('customer').textContent = data.customerName || "User";
        document.getElementById('items').textContent = data.productCount || "0 items";
        document.getElementById('status').textContent = data.status || "Pending";
        document.getElementById('orderDate').textContent = data.date || "Just now";

    } catch (error) {
        console.error("Critical API Error:", error.message);
        
        // Fail-safe Mock Data for offline testing
        document.getElementById('orderId').textContent = "FL-OFFLINE";
        document.getElementById('status').textContent = "Server Connection Error";
        document.getElementById('status').style.color = "red";
    }
}

// Initialized on load
window.addEventListener('DOMContentLoaded', fetchOrderData);