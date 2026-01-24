let orders = []; 

async function loadRealOrders() {
    const userId = localStorage.getItem('userId'); // Ensure we only get THIS farmer's orders
    try {
        const response = await fetch(`http://173.234.79.54:3001/api/orders/farmer/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        
        orders = await response.json();
        renderOrders('New'); 
    } catch (error) {
        console.error("Database Error:", error);
        orderListContainer.innerHTML = `<p style="color:red; text-align:center;">Connection Error</p>`;
    }
}
async function handleOrderAction(orderId, action) {
    const newStatus = action === 'Approve' ? 'Processing' : 'Cancelled';
    
    try {
        const response = await fetch(`http://173.234.79.54:3001/api/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            alert(`Order ${orderId} is now ${newStatus}`);
            // Example link generation in your order list
            card.onclick = () => window.location.href = `../order page/index.html?id=${order.id}`;
            loadRealOrders(); // Refresh the list from the database
        }
    } catch (error) {
        alert("Could not update order status in MySQL.");
    }
}