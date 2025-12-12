// Sample Order Data (mimicking the content in the image)
const orders = [
    { id: 'ORD001', customer: 'Mr. Kouame', product: 'Plantain', quantity: '5 Bunches', time: '10:30am', status: 'Pending' },
    { id: 'ORD002', customer: 'Mrs. Jane', product: 'Tomato', quantity: '10kg', time: '11:00am', status: 'Pending' },
    { id: 'ORD003', customer: 'Mr. Kouame', product: 'Plantain', quantity: '5 Bunches', time: '10:30am', status: 'Pending' },
    { id: 'ORD004', customer: 'Ms. Alice', product: 'Yams', quantity: '10kg', time: '11:00am', status: 'Processing' },
    { id: 'ORD005', customer: 'Mr. Bob', product: 'Cassava', quantity: '20kg', time: '11:15am', status: 'Pending' },
];

const orderListContainer = document.getElementById('order-list-container');
const filterTabs = document.querySelectorAll('.filter-tab');

/**
 * Creates the HTML string for a single order card.
 * Uses Bootstrap Icons (bi bi-circle-fill).
 * @param {Object} order - The order data object.
 * @returns {string} The HTML string for the order card.
 */
function createOrderCard(order) {
    return `
        <div class="order-card" data-order-id="${order.id}" data-status="${order.status}">
            <div class="card-header">
                <div class="customer-info">
                    <h4>Customer's name</h4>
                    <span class="customer-name">${order.customer}</span>
                </div>
                <div class="status-badge">${order.status}</div>
            </div>

            <div class="product-info">
                <h4>Product Name</h4>
                <div class="product-details">
                    <span class="product-name">${order.product}</span>
                    <span class="quantity-detail"><i class="bi bi-circle-fill"></i> ${order.quantity}</span>
                    <span class="placed-time">Placed ${order.time}</span>
                </div>
            </div>

            <div class="card-actions">
                <button class="action-btn approve-btn" onclick="handleOrderAction('${order.id}', 'Approve')">Approve Order</button>
                <button class="action-btn reject-btn" onclick="handleOrderAction('${order.id}', 'Reject')">Reject Order</button>
            </div>
        </div>
    `;
}

/**
 * Renders the list of orders based on the current filter selection.
 * @param {string} filterStatus - The status to filter by (e.g., 'New', 'Processing', or 'All').
 */
function renderOrders(filterStatus) {
    orderListContainer.innerHTML = ''; // Clear previous cards
    let filteredOrders = [];

    // Simple mapping: 'New' in filter refers to 'Pending' in data for this prototype
    const statusMap = {
        'New': 'Pending',
        'Processing': 'Processing',
        'Ready': 'Ready',
        'Shipped': 'Shipped',
        'Complete': 'Delivered'
    };

    const targetStatus = statusMap[filterStatus] || null;

    if (targetStatus) {
        filteredOrders = orders.filter(order => order.status === targetStatus);
    } else {
        // Render all if the filter is not explicitly handled
        filteredOrders = orders;
    }


    if (filteredOrders.length === 0) {
        orderListContainer.innerHTML = `<p style="text-align: center; margin-top: 30px; color: #888;">No orders found for the ${filterStatus} status.</p>`;
        return;
    }

    // Append the cards to the container
    filteredOrders.forEach(order => {
        orderListContainer.innerHTML += createOrderCard(order);
    });
}

/**
 * Handles the click event for 'Approve' and 'Reject' buttons.
 * @param {string} orderId - The ID of the order.
 * @param {string} action - The action taken ('Approve' or 'Reject').
 */
function handleOrderAction(orderId, action) {
    alert(`${action} action triggered for Order ID: ${orderId}. (Server update needed)`);
}

/**
 * Attaches event listeners to the filter carousel tabs.
 */
function setupFilterListeners() {
    filterTabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            // Remove 'active' class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));

            // Add 'active' class to the clicked tab
            event.currentTarget.classList.add('active');

            // Render orders based on the clicked tab's status
            const status = event.currentTarget.getAttribute('data-status');
            renderOrders(status);

            // Scroll the carousel to center the active tab (optional enhancement)
            event.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        });
    });
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    setupFilterListeners();

    // Find the initially active tab and render orders for it (which is 'New' in the HTML)
    const initialTab = document.querySelector('.filter-tab.active');
    if (initialTab) {
        renderOrders(initialTab.getAttribute('data-status'));
    }
});
