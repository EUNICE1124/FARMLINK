document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');

    productForm.addEventListener('submit', async (e) => {
        // 1. Prevent page from refreshing
        e.preventDefault();

        // 2. Collect the data from the form
        const productData = {
            name: document.getElementById('name').value,
            price: document.getElementById('price').value,
            isFruit: document.getElementById('fruit').checked,
            isVegetable: document.getElementById('vegetable').checked
        };

        // 3. Send data to your Node.js/MySQL Backend
        try {
            const response = await fetch('http://localhost:3001/api/products/save', {
                method: 'POST', // Use POST to create/save a new product
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                alert("Success: Product saved to database!");
                productForm.reset(); // Clear form after saving
            } else {
                alert("Error: Server could not save the product.");
            }
        } catch (error) {
            console.error("Connection failed:", error);
            alert("Connection error! Is your MySQL server running?");
        }
    });
});