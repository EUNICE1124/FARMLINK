// Function to simulate navigating to different pages
function navigateTo(page) {
    console.log(`Navigating to: ${page}`);
}
document.addEventListener('DOMContentLoaded', () => {
    const backArrow = document.querySelector('.back-arrow');

    if (backArrow) {
        backArrow.style.cursor = 'pointer';
        backArrow.addEventListener('click', () => {
            // Path: Out of 'profile', into 'home'
            window.location.href = '../home page for farmer/home page.html';
        });
    }

    // Since we're here, let's also load the name you saved at signup!
    const profileName = document.querySelector('.user-name-display');
    const savedName = localStorage.getItem('farmerName');
    
    if (profileName && savedName) {
        profileName.textContent = savedName;
    }
});
// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        fetch('https://api.example.com/logout', { method: 'POST' })
            .then(() => {
                alert("Logged out successfully");
                
            })
            .catch(() => {
        
                alert("Session cleared (Mock)");
            });
    }
});


window.onload = () => {
    console.log("Profile data loaded from API.");
};