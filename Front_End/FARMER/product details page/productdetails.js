const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", async () => {
    const formData = new FormData();
    
    // Get the file from your hidden input
    const imageFile = document.getElementById("imageInput").files[0];
    
    // Append fields to match your marketplaceController.js
    formData.append('name', document.getElementById("productName").value);
    formData.append('price', document.getElementById("amount").value);
    formData.append('productImage', imageFile);

    // Logic for categories (matching your controller's check)
    const category = document.getElementById("category").value.toLowerCase();
    formData.append('isFruit', category === 'fruit');
    formData.append('isVegetable', category === 'vegetable');

    try {
        const response = await fetch('http://root:173.234.79.54/api/marketplace/save', {
            method: 'POST',
            body: formData // No headers needed, browser handles multipart
        });

        const result = await response.json();
        if (response.ok) {
            alert("Product saved to database successfully!");
            window.location.href = "../Farmer dashboard/Farmer dashboard.html"; // Redirect to dashboard after saving
        } else {
            alert("Error: " + result.error);
        }
    } catch (error) {
        console.error("Connection failed:", error);
        alert("Could not connect to the server.");
    }
});