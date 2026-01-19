// 1. Variable to store the currently selected quantity
let selectedQuantity = null;

// 2. Select quantity chips
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function () {
        // Remove active class from all chips
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));

        // Add active class to the clicked one
        this.classList.add('active');

        // Store the selection (e.g., "5kg")
        selectedQuantity = this.innerText;
        console.log("Selected quantity:", selectedQuantity);
    });
});

// 3. Add to Cart Logic 
const cartBtn = document.querySelector('.cart-action-btn');

if (cartBtn) {
    cartBtn.addEventListener('click', async () => {
        console.log("Add to Cart clicked!");

        if (!selectedQuantity) {
            alert('Please select a quantity first!');
            return;
        }

        const cartData = {
            product_id: 1, 
            quantity_label: selectedQuantity,
            user_id: 123 
        };

        try {
            const response = await fetch('http://localhost:3001/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cartData)
            });

            if (response.ok) {
                alert(`Success: ${selectedQuantity} added to your cart!`);
            } else {
                const error = await response.json();
                alert('Server Error: ' + error.message);
            }
        } catch (error) {
            console.error('Connection failed:', error);
            alert('Could not connect to the server. Check if the backend is running on port 3001.');
        }
    });
} else {
    console.error("Critical Error: Button with class '.cart-action-btn' not found in HTML!");
}