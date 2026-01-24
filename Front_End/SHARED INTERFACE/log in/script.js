const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://root:173.234.79.54/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok && result.authenticated) {
            // 1. Store the user data (including role) in localStorage
            localStorage.setItem('farmlink_user', JSON.stringify(result.user));

            alert(`Welcome, ${result.user.name}!`);

            // 2. Redirect based on position (Role)
            if (result.user.role === 'Farmer') {
                window.location.href = '../FARMER/Home page for farmer/home page.html'; // Farmer's home page
            } else if (result.user.role === 'Buyer') {
                window.location.href = '../BUYER/buyer home page/index.html'; // Buyer's home page (Red Corn product page)
            } else {
                alert("Role not recognized. Contact admin.");
            }
        } else {
            alert(result.message || "Login failed");
        }
    } catch (err) {
        console.error("Connection Error:", err);
        alert("Server is offline. Ensure 'node server.js' is running.");
    }
});