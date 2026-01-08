// Function to simulate navigating to different pages
function navigateTo(page) {
    console.log(`Navigating to: ${page}`);
    // In a real app: window.location.href = `/${page}.html`;
}

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        // Mock API call to clear session
        fetch('https://api.example.com/logout', { method: 'POST' })
            .then(() => {
                alert("Logged out successfully");
                // Redirect to login
            })
            .catch(() => {
                // Since this is a mock, we'll just alert success anyway
                alert("Session cleared (Mock)");
            });
    }
});

// Simulate loading external user data
window.onload = () => {
    console.log("Profile data loaded from API.");
};