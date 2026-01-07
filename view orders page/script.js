async function loadUserData() {
    try {
        // Replace with your actual User API
        const response = await fetch('https://api.example.com/user/profile');
        const userData = await response.json();

        // Update the UI with API data
        document.getElementById('userName').innerText = `Hi, ${userData.name}`;
        document.getElementById('userAvatar').src = userData.profileImage;
        
    } catch (error) {
        // Fallback for demo purposes
        console.log("API not reached, using default name.");
        document.getElementById('userName').innerText = "Hi, Farmer John";
    }
}

// Search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        console.log("Searching for:", searchInput.value);
        // Trigger API search call here
    }
});

// Initialize
window.onload = loadUserData;