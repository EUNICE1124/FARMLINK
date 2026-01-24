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
                const response = await fetch('http://root:173.234.79.54/api/users/profile', {
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
    async function loadProfileData() {
    const userId = localStorage.getItem('userId');
    try {
        const response = await fetch(`http://root:173.234.79.54/api/users/profile/${userId}`);
        if (response.ok) {
            const data = await response.json();
            fullNameInput.value = data.full_name || "";
            emailInput.value = data.email || "";
            phoneInput.value = data.phone || "";
            genderSelect.value = data.gender || "male";
            if (data.profile_pic) profilePic.src = `http://root:173.234.79.54/${data.profile_pic}`;
        }
    } catch (error) {
        console.error("Failed to load profile:", error);
    }
}
loadProfileData(); 
});