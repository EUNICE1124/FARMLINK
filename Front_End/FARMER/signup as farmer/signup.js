document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Capture data from your HTML input IDs
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = 'Buyer'; // Or get from a selector if you have one

            try {
                // 2. Send data to userController.registerUser
                const response = await fetch('http://localhost:3001/api/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, role })
                });

                const result = await response.json();

                if (response.ok) {
                    // 3. Save name for the Profile Page and redirect
                    localStorage.setItem('farmerName', name); 
                    localStorage.setItem('userId', result.userId);
                    window.location.href = '../confirmation/confirmation.html';
                } else {
                    alert(result.message || "Registration failed");
                }
            } catch (error) {
                console.error("Signup Error:", error);
                alert("Could not connect to the server.");
            }
        });
    }
});