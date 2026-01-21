document.addEventListener('DOMContentLoaded', async () => {
    // 1. GET ORDER ID FROM URL
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id') || "1"; // Default to 1 for testing

    // DOM ELEMENTS
    const customerEl = document.querySelector('.row:nth-child(1) .label');
    const orderIdEl = document.querySelector('.row:nth-child(2) .label');
    const amountEl = document.querySelector('.row:nth-child(3) .label');
    const statusEl = document.querySelector('.row:nth-child(4) .label');
    
    const confirmBtn = document.querySelector('.confirm-btn');
    const rejectBtn = document.querySelector('.reject-btn');

    // 2. FETCH ORDER DATA
    async function loadOrderDetails() {
        try {
            const response = await fetch(`http://localhost:3001/api/orders/${orderId}`);
            const order = await response.json();
            if (response.ok) {
                 // Correctly accessing the keys sent by the updated controller
                  customerEl.nextElementSibling.innerHTML = `<span>${order.customerName}</span>`;
                  orderIdEl.nextElementSibling.innerHTML = `<span>#${order.orderId}</span>`;
                  amountEl.nextElementSibling.innerHTML = `<span>CFA ${order.amount}</span>`;
                  statusEl.nextElementSibling.innerHTML = `<span id="current-status">${order.status}</span>`;
    
                  // Logic to show the product name if you add a row for it in HTML
                  if(order.productName) {
                            console.log("Buying product:", order.productName);
                     }
            }
        } catch (error) {
            console.error("Error loading order:", error);
        }
    }

    // 3. UPDATE STATUS FUNCTION
    async function handleStatusUpdate(newStatus) {
        try {
            const response = await fetch('http://localhost:3001/api/orders/status', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: orderId, status: newStatus })
            });

            if (response.ok) {
                alert(`Order ${newStatus}!`);
                location.reload(); // Refresh to show updated status
            }
        } catch (error) {
            alert("Failed to update order.");
        }
    }

    confirmBtn.addEventListener('click', () => handleStatusUpdate('CONFIRMED'));
    rejectBtn.addEventListener('click', () => handleStatusUpdate('REJECTED'));

    loadOrderDetails();
});