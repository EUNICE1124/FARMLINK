// Mock API response
const mockMessages = {
    all: [
        { sender: "Farmer John", text: "Your order is ready!", time: "10:30 AM" },
        { sender: "Support", text: "How can we help you today?", time: "Yesterday" }
    ],
    unread: [] // Empty to match your screenshot
};

function filterMessages(type) {
    const display = document.getElementById('messageDisplay');
    const tabs = document.querySelectorAll('.tab');
    
    // Update UI Active State
    tabs.forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const data = mockMessages[type];

    if (data.length === 0) {
        display.innerHTML = '<div class="empty-state"><p>No Messages</p></div>';
    } else {
        display.innerHTML = data.map(msg => `
            <div class="message-item">
                <strong>${msg.sender}</strong>
                <p style="margin:5px 0; font-size:0.9rem; color:#666;">${msg.text}</p>
                <small style="color:#999;">${msg.time}</small>
            </div>
        `).join('');
    }
}

// Initial fetch simulation
window.onload = () => {
    console.log("Checking for new messages from API...");
};