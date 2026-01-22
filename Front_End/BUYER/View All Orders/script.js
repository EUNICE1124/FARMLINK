// 1. Get the current User ID from your standardized localStorage key
const currentUserId = localStorage.getItem('userId') || 1; // Fallback to 1 for testing

// 2. Updated API URL to include the userId as a query parameter
const ORDER_API = `http://localhost:3001/api/orders/latest?userId=${currentUserId}`;

async function fetchOrderData() {
    try {
        const response = await fetch(ORDER_API);
        
        if (!response.ok) {
            if (response.status === 404) {
                document.getElementById('status').textContent = "No Orders Found";
                return;
            }
            throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();

        // 3. Populate HTML with Real Data from orderController.js
        document.getElementById('orderId').textContent = data.id || "N/A";
        document.getElementById('customer').textContent = data.customerName || "User";
        document.getElementById('items').textContent = data.productCount || "1 Order";
        document.getElementById('orderDate').textContent = data.date || "Date Unknown";

        // 4. Status Handling & Visual Coloring
        const statusElement = document.getElementById('status');
        const currentStatus = data.status || "Pending";
        statusElement.textContent = currentStatus;

        // Apply professional status colors
        if (currentStatus === 'Delivered' || currentStatus === 'Complete') {
            statusElement.style.color = "#28a745"; // Green
        } else if (currentStatus === 'New' || currentStatus === 'Processing') {
            statusElement.style.color = "#fd7e14"; // Orange
        } else {
            statusElement.style.color = "var(--primary-green)";
        }

    } catch (error) {
        console.error("Critical Connection Error:", error.message);
        
        // Fail-safe Mock Data for UI stability if server is off
        document.getElementById('orderId').textContent = "OFFLINE";
        document.getElementById('status').textContent = "Connection Error";
        document.getElementById('status').style.color = "red";
    }
}

// Initialized on load
window.addEventListener('DOMContentLoaded', fetchOrderData);