// ===============================
// IMAGE UPLOAD FROM GALLERY / COMPUTER
// ===============================
const imageBox = document.getElementById("imageBox");
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");

imageBox.addEventListener("click", () => {
    imageInput.click();
});

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            previewImage.src = reader.result;
            localStorage.setItem("productImage", reader.result);
        };
        reader.readAsDataURL(file);
    }
});


// ===============================
// SAVE PRODUCT DATA
// ===============================
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {
    const productData = {
        name: document.getElementById("productName").value,
        category: document.getElementById("category").value,
        quantity: document.getElementById("quantity").value,
        amount: document.getElementById("amount").value,
        description: document.getElementById("description").value
    };

    localStorage.setItem("productData", JSON.stringify(productData));
    alert("Product details saved successfully!");
});


// ===============================
// LOAD SAVED DATA + IMAGE
// ===============================
window.addEventListener("load", () => {
    const savedData = localStorage.getItem("productData");
    const savedImage = localStorage.getItem("productImage");

    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById("productName").value = data.name;
        document.getElementById("category").value = data.category;
        document.getElementById("quantity").value = data.quantity;
        document.getElementById("amount").value = data.amount;
        document.getElementById("description").value = data.description;
    }

    if (savedImage) {
        previewImage.src = savedImage;
    }
});


// ===============================
// BACK BUTTON
// ===============================
document.querySelector(".back-arrow").addEventListener("click", () => {
    alert("Back button clicked");
});
