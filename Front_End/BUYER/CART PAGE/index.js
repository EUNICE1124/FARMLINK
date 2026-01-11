// Variable to store the currently selected quantity
let selectedQuantity = null;

document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function () {
        // Remove active class from all chips
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));

        // Add active class to the clicked one
        this.classList.add('active');

        // Store the selection (e.g., "1kg" or "500g")
        selectedQuantity = this.innerText;
        console.log("Selected quantity:", selectedQuantity);
    });
});

// Add to Cart with Backend Connection
document.querySelector('.add-to-cart-btn').addEventListener('click', async () => {
    if (!selectedQuantity) {
        alert('Please select a quantity first!');
        return;
    }

    // Prepare data for the backend
    const cartData = {
        product_id: 1, // This would normally be dynamic based on the page
        quantity_label: selectedQuantity,
        user_id: 123 // Assuming a logged-in user
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
            alert('Error: ' + error.message);
        }
    } catch (error) {
        console.error('Connection failed:', error);
        alert('Could not connect to the database server.');
    }
});