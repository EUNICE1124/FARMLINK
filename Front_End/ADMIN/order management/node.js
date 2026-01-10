let orders = []; 

async function loadRealOrders() {
    try {
        // Fetching from your Node.js server on Port 3001
        const response = await fetch('http://localhost:3001/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        
        orders = await response.json();
        
        // Render the "New" (Pending) orders by default
        renderOrders('New'); 
    } catch (error) {
        console.error("Database Error:", error);
        orderListContainer.innerHTML = `<p style="color:red; text-align:center;">Database Connection Error</p>`;
    }
}
async function handleOrderAction(orderId, action) {
    const newStatus = action === 'Approve' ? 'Processing' : 'Cancelled';
    
    try {
        const response = await fetch(`http://localhost:3001/api/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            alert(`Order ${orderId} is now ${newStatus}`);
            loadRealOrders(); // Refresh the list from the database
        }
    } catch (error) {
        alert("Could not update order status in MySQL.");
    }
}