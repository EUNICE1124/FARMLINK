// Function to fetch order details
async function fetchOrderData() {
    try {
        // Replace with your actual API endpoint
        // const response = await fetch('https://api.yourdomain.com/order-status/123');
        // const data = await response.json();

        // Mock Data for demonstration
        const data = {
            customerNumber: "+1 234 567 890",
            adminNumber: "+1 800 555 0199",
            statusStep: 2, // Highlights current progress
            deliveryDate: "Oct 24, 2023"
        };

        // Populate fields
        document.getElementById('customerNum').value = data.customerNumber;
        document.getElementById('adminNumber').innerText = data.adminNumber;
        document.getElementById('deliveryDate').innerText = data.deliveryDate;

        // Logic to highlight active steps could be added here
        updateVisualStatus(data.statusStep);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateVisualStatus(step) {
    // You can change opacity or colors of steps 1, 2, or 3 based on 'step'
    console.log("Current order stage:", step);
}

// Initialize on page load
window.onload = fetchOrderData;