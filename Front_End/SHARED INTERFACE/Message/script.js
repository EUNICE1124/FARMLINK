/**
 * MESSAGE INTERFACE LOGIC
 * Connects to: GET /api/messages
 */

async function filterMessages(type, element) {
    const display = document.getElementById('messageDisplay');
    const tabs = document.querySelectorAll('.tab');
    const userId = localStorage.getItem('userId'); // Retrieve logged-in user ID

    // 1. UI: Update Active Tab State
    tabs.forEach(tab => tab.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    } else {
        // Fallback for initial load
        const activeTab = document.querySelector(`.tab[onclick*="'${type}'"]`);
        if (activeTab) activeTab.classList.add('active');
    }

    // 2. Show Loading State
    display.innerHTML = '<div class="empty-state"><p>Loading messages...</p></div>';

    // 3. API Fetch
    try {
        // Ensure you pass the userId and filter type (all vs unread)
        const response = await fetch(`http://localhost:3001/api/messages?userId=${userId}&type=${type}`);
        
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const messages = await response.json();

        // 4. Render Logic
        if (messages.length === 0) {
            display.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-envelope-open" style="font-size: 2rem; color: #ccc; margin-bottom: 10px;"></i>
                    <p>No ${type === 'unread' ? 'Unread' : ''} Messages</p>
                </div>`;
        } else {
            display.innerHTML = messages.map(msg => `
                <div class="message-item" 
                     onclick="viewConversation(${msg.id})" 
                     style="padding: 15px; border-bottom: 1px solid #eee; cursor: pointer; background: ${msg.is_read ? '#fff' : '#f9fff9'};">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong style="color: var(--primary-green);">${msg.sender}</strong>
                        <small style="color: #999;">${formatTime(msg.created_at)}</small>
                    </div>
                    <p style="margin: 5px 0 0; font-size: 0.9rem; color: #555; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${msg.text}
                    </p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error("Connection Error:", error);
        display.innerHTML = '<div class="empty-state"><p style="color: red;">Unable to connect to server</p></div>';
    }
}

// Helper to format DB timestamps
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Placeholder for conversation view
function viewConversation(id) {
    console.log("Opening message ID:", id);
    // window.location.href = `chat.html?id=${id}`;
}

// Initial Load
window.onload = () => {
    // Default to 'unread' tab on open
    filterMessages('unread');
};