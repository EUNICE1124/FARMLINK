document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Function to handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 

            // Remove 'active' class from all items
            navItems.forEach(i => i.classList.remove('active'));

            // Add 'active' class to the clicked item
            item.classList.add('active');

            const pageName = item.querySelector('span').textContent;
            console.log(`Navigating to: ${pageName}`);
        });
    });

    // Handle search input focus
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('focus', () => {
        console.log('Search field focused.');
    });
});