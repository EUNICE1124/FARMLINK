async function placeOrder() {
    // 1. Collect data from the multi-step sections
    const orderData = {
        name: document.getElementById('input-name').value,
        city: document.getElementById('display-city').innerText,
        region: document.getElementById('display-region').innerText,
        phone: document.getElementById('momo-phone').value,
        provider: document.getElementById('btn-mtn').classList.contains('selected') ? "MTN" : "Orange",
        total: 5000 // You can make this dynamic based on your cart
    };

    try {
        // 2. Send to your Node.js backend
        const response = await fetch('http://localhost:3001/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Order #${result.orderId} Placed Successfully! Redirecting to MoMo Payment...`);
            window.location.href = 'order-success.html'; 
        } else {
            throw new Error('Server rejected the order');
        }
    } catch (error) {
        console.error("Order error:", error);
        alert("Database Connection Error: Could not place order.");
    }
}