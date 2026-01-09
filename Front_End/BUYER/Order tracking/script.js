async function fetchOrderData() {
    try {
        // Replace '1' with the actual Order ID from your URL or session
        const orderId = 1; 
        const response = await fetch(`http://localhost:3000/api/orders/status/${orderId}`);
        
        if (!response.ok) throw new Error('Order not found');
        
        const data = await response.json();

        // Populate fields with real database data
        document.getElementById('customerNum').value = data.customerNumber;
        document.getElementById('adminNumber').innerText = data.adminNumber;
        document.getElementById('deliveryDate').innerText = data.deliveryDate;

        // Visual tracking logic
        updateVisualStatus(data.statusStep);

    } catch (error) {
        console.error("Error fetching order status:", error);
        // Fallback UI if server is down
        document.getElementById('deliveryDate').innerText = "Status Unavailable";
    }
}

function updateVisualStatus(step) {
    // Logic to highlight circles/lines in your UI
    const steps = document.querySelectorAll('.status-step'); // Assuming you have these classes
    steps.forEach((el, index) => {
        if (index + 1 <= step) {
            el.style.opacity = "1";
            el.style.color = "var(--primary-green)";
        } else {
            el.style.opacity = "0.5";
        }
    });
}