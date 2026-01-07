const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const credentials = {
        user: document.getElementById('username').value,
        pass: document.getElementById('password').value
    };

    console.log("Authenticating with FarmLink API...", credentials);

    // Mock API Call Simulation
    try {
        const result = await simulateLogin(credentials);
        if (result.authenticated) {
            alert("Welcome back!");
            // Proceed to the dashboard (Farmer John screen)
        }
    } catch (err) {
        alert("Authentication failed. Check your username or password.");
    }
});

function simulateLogin(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simplified logic for example
            if (data.user && data.pass.length > 3) {
                resolve({ authenticated: true });
            } else {
                reject({ authenticated: false });
            }
        }, 800);
    });
}