document.addEventListener('DOMContentLoaded', () => {
    const pricePerKg = 1000; 
    let selectedQuantity = 5; 

    const chips = document.querySelectorAll('.chip');
    const priceDisplay = document.querySelector('.btn-value');
    const cartBtn = document.querySelector('.cart-action-btn');

    // Get real user data from localStorage
    const savedUser = JSON.parse(localStorage.getItem('userId')) || { name: "Guest", phone: "00000000", id: 0 };

    chips.forEach(chip => {
        chip.addEventListener('click', function () {
            chips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            selectedQuantity = parseInt(this.innerText);
            if (priceDisplay) priceDisplay.textContent = `${selectedQuantity * pricePerKg}cfa`;
        });
    });

    if (cartBtn) {
        cartBtn.addEventListener('click', async () => {
            const cartData = {
                product_id: 1, 
                quantity_label: `${selectedQuantity}kg`,
                user_id: savedUser.id // Now using real ID
            };

            try {
                const response = await fetch('http://localhost:3001/api/marketplace/cart/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cartData)
                });

                if (response.ok) {
                    // SUCCESS CHOICES
                    const userChoice = confirm(`✅ ${selectedQuantity}kg added to cart!\n\nClick "OK" to CHECKOUT now.\nClick "Cancel" to KEEP SHOPPING for more products.`);
                    
                    if (userChoice) {
                        window.location.href = '../checkout buyer/index.html'; // Go to payment
                    } else {
                        window.location.href = '../buyer home page/index.html'; // Go back to products
                    }
                } else {
                    alert('❌ Server Error: Please try again.');
                }
            } catch (error) {
                alert('⚠️ Connection Error: Ensure your server is running.');
            }
        });
    }
});