/**
 * FarmLink - Product Page Logic
 * Handles quantity selection, price calculation, and backend connection.
 */

// 1. Configuration & Initial State
let selectedQuantity = 5; // Default matches the 'active' class in your HTML
const pricePerKg = 1000;  // Calculation: 5000Cfa / 5kg = 1000Cfa per kg

const priceDisplay = document.querySelector('.btn-value');
const cartBtn = document.querySelector('.cart-action-btn');

// 2. Quantity Selection & Price Calculus
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function () {
        // UI: Toggle active classes
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        // Logic: Extract number from text (e.g., "10kg" -> 10)
        selectedQuantity = parseInt(this.innerText);
        
        // Calculus: Update the total price display
        const newTotal = selectedQuantity * pricePerKg;
        priceDisplay.textContent = `${newTotal}cfa`;
        
        console.log(`User selected: ${selectedQuantity}kg. New Total: ${newTotal}Cfa`);
    });
});

// 3. Backend Integration (Add to Cart / Place Order)
if (cartBtn) {
    cartBtn.addEventListener('click', async () => {
        const totalAmount = selectedQuantity * pricePerKg;

        // Data structure expected by orderController.placeOrder
        const orderData = {
            name: "Default Customer", // Suggestion: Pull from localStorage after login
            phone: "677000000",
            items: `${selectedQuantity}kg Red Corn`,
            total: totalAmount,
            city: "Yaoundé",
            region: "Centre"
        };

        try {
            const response = await fetch('http://localhost:3001/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Success! Order #${result.orderId} placed for ${totalAmount}Cfa.`);
                // Optional: Redirect to tracking page
                 window.location.href = '../Order tracking/index.html';
            } else {
                const error = await response.json();
                alert('Server Error: ' + (error.message || 'Could not place order'));
            }
        } catch (error) {
            console.error('Connection failed:', error);
            alert('Backend Error: Ensure your Node.js server is running on port 3001.');
        }
    });
} else {
    console.error("Critical Error: '.cart-action-btn' not found in HTML.");
}