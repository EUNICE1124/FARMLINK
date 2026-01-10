document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Capture Data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 2. API Linking (The Backend Connection)
    try {
      const response = await fetch('http://localhost:3001/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                admin_email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Store the token for future requests (Auth)
            localStorage.setItem('adminToken', data.token);
            alert('Login Successful!');
            window.location.href = 'user-management.html'; // Move to next interface
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Connection failed:', error);
        alert('Could not connect to the server.');
    }
});
