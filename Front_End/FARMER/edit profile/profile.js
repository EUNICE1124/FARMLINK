document.addEventListener('DOMContentLoaded', () => {
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const genderSelect = document.getElementById("gender");
    const profileImg = document.querySelector(".profile-img");
    const imageInput = document.getElementById("imageInput");
    const profilePic = document.getElementById("profilePic");

    // 1. IMAGE UPLOAD LOGIC
    profileImg.addEventListener("click", () => {
        imageInput.click();
    });

    imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                profilePic.src = reader.result;
                // Note: In a real app, you'd upload this image file to the server/S3
            };
            reader.readAsDataURL(file);
        }
    });

    // 2. BACK BUTTON
    document.querySelector(".back-arrow").addEventListener("click", () => {
        window.history.back();
    });

    // 3. AUTO-SAVE & BACKEND UPDATE
    // We can trigger the update when the user leaves an input field (blur) 
    // or when they change a value.
    const inputs = [fullNameInput, emailInput, phoneInput, genderSelect];

    inputs.forEach(input => {
        input.addEventListener("change", async () => {
            const userId = localStorage.getItem('userId');
            
            if (!userId) {
                console.error("No userId found. Please log in.");
                return;
            }

            const profileData = {
                userId: userId,
                fullName: fullNameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                gender: genderSelect.value
            };

            try {
                const response = await fetch('http://localhost:3001/api/users/profile', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profileData)
                });

                const result = await response.json();
                if (response.ok) {
                    console.log("Auto-saved:", result.message);
                } else {
                    alert("Error: " + result.message);
                }
            } catch (error) {
                console.error("Sync error:", error);
            }
        });
    });

    // 4. LOAD SAVED DATA FROM DATABASE ON PAGE LOAD
    // (Optional: You'd fetch current user data here to fill the inputs)
});