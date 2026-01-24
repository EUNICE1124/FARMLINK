document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            formData.append('farmerId', localStorage.getItem('userId'));
            // 1. Capture data from HTML inputs
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // CRITICAL: Set role to 'Farmer' for this specific flow
            const role = 'Farmer'; 

            try {
                // 2. POST to your Node.js/Java Backend
                const response = await fetch('http://root:173.234.79.54/api/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, role })
                });

                const result = await response.json();

                if (response.ok) {
                    // 3. PERSISTENCE: Save credentials for use in Farmer Dashboard/Profile
                    localStorage.setItem('farmerName', name); 
                    localStorage.setItem('userId', result.userId); 
                    localStorage.setItem('role', role);

                    // 4. NEXT STEP: Redirect to the confirmation/setup page
                    window.location.href = '../confirmation/confirmation.html';
                } else {
                    alert(result.message || "Registration failed");
                }
            } catch (error) {
                console.error("Signup Error:", error);
                alert("Could not connect to the server. Check if backend is running on Port 173.234.79.54.");
            }
        });
    }
});