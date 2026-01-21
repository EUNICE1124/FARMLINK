const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect Data
    const formData = {
        username: signupForm.querySelector('input[type="text"]').value,
        email: signupForm.querySelector('input[type="email"]').value,
        phone: signupForm.querySelector('input[type="tel"]').value,
        passwords: signupForm.querySelectorAll('input[type="password"]')
    };

    // Validation
    if (formData.passwords[0].value !== formData.passwords[1].value) {
        alert("Passwords do not match!");
        return;
    }

    // Mock API Call
    console.log("Sending data to FarmLink API...", formData);
    
    try {
        // Simulate network request
        const response = await simulateRegisterAPI(formData);
        alert(response.message);
        // Redirect to buyer home page after successful signup
        window.location.href = "../buyer home page/index.html";
    } catch (err) {
        alert("Registration failed. Please try again.");
    }
});

function simulateRegisterAPI(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 200, message: "Welcome to FarmLink! Account created." });
        }, 1500);
    });
}