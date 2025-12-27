const userListContainer = document.getElementById('userList');
const searchInput = document.getElementById('userSearch');
const fabButton = document.querySelector('.fab');

/**
 * 1. FETCH USERS FROM DATABASE
 * Connects to your Node.js/MySQL backend
 */
async function fetchUsers() {
    try {
        userListContainer.innerHTML = '<p style="padding:20px;">Loading users...</p>';
        
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) throw new Error('Failed to connect to server');
        
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error("Fetch error:", error);
        userListContainer.innerHTML = `
            <div style="padding:20px; color:red; text-align:center;">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p>Database Connection Error</p>
                <button onclick="fetchUsers()" style="color:var(--primary-green); border:none; background:none; cursor:pointer; text-decoration:underline;">Try Again</button>
            </div>`;
    }
}

/**
 * 2. RENDER TO HTML
 * Converts the MySQL array into the UI cards seen in your image
 */
function renderUsers(users) {
    if (users.length === 0) {
        userListContainer.innerHTML = '<p style="padding:20px; color:#999;">No users found.</p>';
        return;
    }

    userListContainer.innerHTML = users.map(user => `
        <div class="user-item" data-id="${user.id}">
            <div class="avatar-circle"></div>
            <div class="user-info">
                <h3>${user.name}</h3>
                <p>${user.email}</p>
            </div>
            <div class="status-icon"></div>
            <i class="fa-solid fa-chevron-right" style="color:#ccc"></i>
        </div>
    `).join('');
}

/**
 * 3. SEARCH FILTER (Local)
 * Filters the currently loaded list without hitting the database again
 */
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.user-item');
    
    items.forEach(item => {
        const name = item.querySelector('h3').innerText.toLowerCase();
        const email = item.querySelector('p').innerText.toLowerCase();
        
        if (name.includes(term) || email.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

/**
 * 4. ADD USER (FAB Button)
 * Example of how to send data TO the database (POST)
 */
fabButton.addEventListener('click', async () => {
    const name = prompt("Enter User Name:");
    const email = prompt("Enter User Email:");

    if (name && email) {
        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email })
            });

            if (response.ok) {
                fetchUsers(); // Refresh the list to show the new user
            }
        } catch (error) {
            alert("Could not save user to MySQL.");
        }
    }
});

// Start the app
fetchUsers();