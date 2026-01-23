async function fetchOrderData() {
    try {
        // Try to get dynamic ID from URL, otherwise fallback to 1
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('id') || 1; 

        const response = await fetch(`http://localhost:3001/api/orders/status/${orderId}`);
        if (!response.ok) throw new Error('Order not found');
        
        const data = await response.json();

        // 1. Map String Status to Step Number
        const statusMap = {
            'New': 1,
            'Processing': 2,
            'Shipped': 3,
            'Complete': 4
        };
        const currentStep = statusMap[data.status] || 1;

        // 2. Populate UI
        document.getElementById('customerNum').value = data.buyerNumber || data.phone;
        document.getElementById('adminNumber').innerText = data.adminNumber || "694002750";
        document.getElementById('deliveryDate').innerText = data.date || "Calculating...";

        // 3. Update visual tracking
        updateVisualStatus(currentStep);

    } catch (error) {
        console.error("Error fetching order status:", error);
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