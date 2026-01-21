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
            // Update UI with real data
            document.querySelector('.user-info p').textContent = `HI, ${data.userName}`;
            document.getElementById('total-sales').textContent = `${data.totalSales.toLocaleString()} CFA`;
            document.getElementById('total-orders').textContent = data.orderCount;
        }
    } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
    }
}
    const timeDropdown = document.getElementById('time-range');
    const salesText = document.getElementById('total-sales');

    // Fake data to simulate the change
    const performanceData = {
        "7": { sales: "$350", orders: "12" },
        "30": { sales: "$1,200", orders: "45" },
        "90": { sales: "$4,100", orders: "130" },
        "365": { sales: "$15,000", orders: "520" }
    };

    if (timeDropdown) {
        timeDropdown.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            const newData = performanceData[selectedValue];

            // Add a small fade effect or just swap the text
            salesText.style.opacity = 0;

            setTimeout(() => {
                salesText.innerText = newData.sales;
                salesText.style.opacity = 1;
            }, 200);

            console.log(`Updated dashboard for the last ${selectedValue} days.`);
        });
    }

    // 2. NAVIGATION LOGIC
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const pageName = item.querySelector('span').textContent;
            
            // Route to different pages based on selection
         
           
        });
    });

    // 3. SEARCH LOGIC
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        console.log('Searching for:', e.target.value);
       
    });
});