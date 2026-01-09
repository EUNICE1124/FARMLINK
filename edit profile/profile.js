// PROFILE IMAGE CLICK
const profileImg = document.querySelector(".profile-img");
const imageInput = document.getElementById("imageInput");
const profilePic = document.getElementById("profilePic");
const profileBox = document.getElementById("profileBox");
profileImg.addEventListener("click", () => {
    imageInput.click();
});

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profilePic.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});

// BOTTOM NAV ACTIVE STATE
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});

// BACK BUTTON
document.querySelector(".back-arrow").addEventListener("click", () => {
    alert("Back button clicked");
});

// SIMPLE DATA SAVE (LOCAL STORAGE)
const inputs = document.querySelectorAll("input, select");

inputs.forEach(input => {
    input.addEventListener("change", () => {
        localStorage.setItem(input.id, input.value);
    });
});

// LOAD SAVED DATA
window.onload = () => {
    inputs.forEach(input => {
        const saved = localStorage.getItem(input.id);
        if (saved) input.value = saved;
    });
};

