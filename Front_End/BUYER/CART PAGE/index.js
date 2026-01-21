document.addEventListener('DOMContentLoaded', () => {
    // 1. Set default values to match the HTML "active" state
    const pricePerKg = 1000; // Base: 5000cfa / 5kg
    let selectedQuantity = 5; 

    const chips = document.querySelectorAll('.chip');
    const priceDisplay = document.querySelector('.btn-value');
    const cartBtn = document.querySelector('.cart-action-btn');

    // 2. Responsive Quantity & Price Calculus
    chips.forEach(chip => {
        chip.addEventListener('click', function () {
            chips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            // Update quantity and recalculate price
            selectedQuantity = parseInt(this.innerText);
            const newTotal = selectedQuantity * pricePerKg;

            if (priceDisplay) {
                priceDisplay.textContent = `${newTotal}cfa`;
            }
        });
    });

    // 3. Backend Connection
    if (cartBtn) {
        cartBtn.addEventListener('click', async () => {
            const totalAmount = selectedQuantity * pricePerKg;

            // Map data to match orderController.js expected fields
            const orderData = {
                name: "Guest User", // Replace with real name if login is implemented
                phone: "677000000",
                city: "Yaounde",
                region: "Centre",
                items: `${selectedQuantity}kg Red Corn`,
                total: totalAmount
            };

            try {
                // Pointing to the correct route in server.js/orderRoutes.js
                const response = await fetch('http://localhost:3001/api/orders/cart/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(`✅ Order Placed! ID: ${result.orderId}`);
                } else {
                    alert('❌ Server Error: Ensure your database has the "product_items" column.');
                }
            } catch (error) {
                console.error('Connection failed:', error);
                alert('⚠️ Backend Error: Make sure your node server.js is running on port 3001.');
            }
        });
    }
});