document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const imageInput = document.getElementById('productImage');

    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Use FormData for multipart/form-data (required for files)
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('price', document.getElementById('price').value);
        formData.append('isFruit', document.getElementById('statusFruit').checked);
        formData.append('isVegetable', document.getElementById('statusVegetable').checked);
        
        // Append the actual file from the hidden input
        if (imageInput.files[0]) {
            formData.append('productImage', imageInput.files[0]);
        }

        try {
            const response = await fetch('http://localhost:3001/api/marketplace/save', {
                method: 'POST',
                body: formData 
                // Note: Do NOT set Content-Type header, the browser does it automatically for FormData
            });

            if (response.ok) {
                alert("Success: Product saved with image!");
                productForm.reset();
                window.location.href = '../Inventory/inventory.html';
            } else {
                const errorData = await response.json();
                alert("Error: " + (errorData.error || "Server could not save the product."));
            }
        } catch (error) {
            console.error("Connection failed:", error);
            alert("Connection error! Is your server running on port 3001?");
        }
    });
});