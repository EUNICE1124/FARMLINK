const ORDER_API = "http://localhost:3001/api/orders/latest";

async function fetchOrderData() {
    try {
        const response = await fetch(ORDER_API);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();

        // Filling the table with real API data
        document.getElementById('orderId').textContent = data.id;
        document.getElementById('customer').textContent = data.customerName;
        document.getElementById('items').textContent = data.productCount;
        document.getElementById('status').textContent = data.status;
        document.getElementById('orderDate').textContent = data.date;

    }catch (error) {
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