/**
 * UPDATED: Farmer dashboard.JS
 */

document.addEventListener('DOMContentLoaded', async () => {
    const userNameElement = document.querySelector('.user-info p');
    const salesText = document.getElementById('total-sales');
    const ordersText = document.getElementById('total-orders');
    const navItems = document.querySelectorAll('.nav-item');
    const timeDropdown = document.getElementById('time-range');
    
    // 1. FETCH DASHBOARD DATA
    const userId = localStorage.getItem('userId');
    
    if (userId) {
        try {
            // Fetch User Profile Name from userController
            const profileRes = await fetch(`http://localhost:3001/api/users/profile/${userId}`);
            if (profileRes.ok) {
                const userData = await profileRes.json();
                userNameElement.textContent = `HI, ${userData.full_name || 'Farmer'}`;
            }

            // Fetch Order Statistics from orderController
            const statsRes = await fetch(`http://localhost:3001/api/orders/stats/${userId}`);
            if (statsRes.ok) {
                const statsData = await statsRes.json();
                // Update UI with real aggregated data
                salesText.textContent = `${Number(statsData.totalSales).toLocaleString()} CFA`;
                ordersText.textContent = statsData.orderCount;
            }
        } catch (error) {
            console.error('Failed to connect to backend controllers:', error);
            salesText.textContent = "Error Loading";
        }
    } else {
        console.warn("No userId found in localStorage. Redirecting to login...");
        // window.location.href = '../login/index.html';
    }

    // 2. PERFORMANCE FILTER (Simulated range logic)
    const performanceData = {
        "7": { sales: "35,000 CFA", orders: "12" },
        "30": { sales: "120,000 CFA", orders: "45" },
        "90": { sales: "410,000 CFA", orders: "130" },
        "365": { sales: "1,500,000 CFA", orders: "520" }
    };

    if (timeDropdown) {
        timeDropdown.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            const newData = performanceData[selectedValue];

            salesText.style.opacity = 0;
            setTimeout(() => {
                salesText.innerText = newData.sales;
                ordersText.innerText = newData.orders;
                salesText.style.opacity = 1;
            }, 200);
        });
    }

    // 3. NAVIGATION LOGIC
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); 
            const pageName = item.querySelector('span').textContent.trim();
            
            // Map the sidebar buttons to your project folders
            if (pageName === "Inventory") window.location.href = "../Inventory/inventory.html";
            if (pageName === "Orders") window.location.href = "../View All Orders/index.html";
            if (pageName === "Messages") window.location.href = "../Messages/index.html";
            if (pageName === "Settings") window.location.href = "../Edit Profile/index.html";
        });
    });
});