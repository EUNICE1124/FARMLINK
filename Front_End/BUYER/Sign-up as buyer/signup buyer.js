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
    // Send Data to Backend
    console.log("Sending data to FarmLink API...", formData);
    
   try {
    const response = await fetch('http://173.234.79.54:3001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: formData.username,
            email: formData.email,
            phone: formData.phone,
            password: formData.passwords[0].value
        })
    });

    const result = await response.json();

    if (response.ok) {
        localStorage.setItem('userId', JSON.stringify({
        id: result.id,
        name: formData.username,
        email: formData.email
    }));
        alert("Welcome to FarmLink! Account created.");
        window.location.href = '../buyer home page/index.html'; // Redirect to login
    } else {
        alert("Registration failed: " + result.message);
    }
} catch (err) {
    console.error("Connection Error:", err);
    alert("Could not connect to the server.");
}});
