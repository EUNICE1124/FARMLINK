const imageInput = document.getElementById("image");
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", async () => {
    if(!imageInput.files[0]){
        alert("Please select an image.");
        return;
    }

    const formData = new FormData();
    // 1. Key must be 'productImage' to match your Multer config
    formData.append("productImage", imageInput.files[0]);
    formData.append("name", document.getElementById("name").value);
    
    // 2. Map 'price' (your controller uses price, your HTML uses stats card/input)
    // If you add a price input, use its ID here.
    formData.append("price", "2500"); 

    // 3. Category Logic
    const category = document.getElementById("category")?.value || "Other";
    formData.append("isFruit", category.toLowerCase() === 'fruit');
    formData.append("isVegetable", category.toLowerCase() === 'vegetable');

    try {
        // 4. Point to the CORRECT port (3001) and merged route
        const response = await fetch("http://root:173.234.79.54/api/marketplace/save", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if(response.ok) {
            alert("Product successfully uploaded to FarmLink!");
            location.reload(); // Refresh to show changes
        } else {
            alert("Upload failed: " + data.error);
        }
    } catch (error) {
        console.error("Connection Error:", error);
        alert("Could not connect to the backend server.");
    }
});