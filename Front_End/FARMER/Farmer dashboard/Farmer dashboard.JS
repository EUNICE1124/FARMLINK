document.addEventListener('DOMContentLoaded', async () => {
    const userNameElement = document.querySelector('.user-info p');
    const navItems = document.querySelectorAll('.nav-item');
    
    // 1. FETCH DASHBOARD DATA FROM BACKEND
    const userId = localStorage.getItem('userId');
    
    if (userId) {
        try {
            const response = await fetch(`http://localhost:3001/api/users/dashboard/${userId}`);
            const data = await response.json();
            
            if (response.ok) {
                // Update the greeting with the real name from the database
                userNameElement.textContent = `HI, ${data.userName}`;
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        }
    }

    // 2. NAVIGATION LOGIC
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const pageName = item.querySelector('span').textContent;
            
            // Route to different pages based on selection
            if (pageName === 'Account') {
                window.location.href = '../profile page/editprofile.html';
            } else if (pageName === 'Home') {
                window.location.href = 'Farmer dashboard.html';
            }
            // Add more routes as you build them
        });
    });

    // 3. SEARCH LOGIC
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        console.log('Searching for:', e.target.value);
        // You could add a fetch call here for a search API in the future
    });
});