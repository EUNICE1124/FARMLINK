const API_BASE_URL = "http://localhost:3001/api";

// --- 2. PRODUCT MANAGEMENT LOGIC ---
// Captures data from the Product Management screen (IMG-20251226-WA0005.jpg)
const handleAddProduct = async () => {
    const product = {
        name: document.getElementById('pName')?.value,
        price: 0, // Added because productController.saveProduct expects price
        isFruit: document.getElementById('pCat')?.value === 'Fruit',
        isVegetable: document.getElementById('pCat')?.value === 'Vegetable'
    };

    try {
        const response = await fetch(`${API_BASE_URL}/products/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("API Error:", error);
    }
};
// --- 3. ORDERS LOGIC ---
// Fills the table in the Orders screen (IMG-20251226-WA0003.jpg)
const loadOrders = async () => {
    const orderIdElem = document.getElementById('orderId');
    if (!orderIdElem) return;

    try {
        const res = await fetch(`${API_BASE_URL}/orders/latest`); // Path from orderController
        const data = await res.json();
        
        // Use the exact keys from orderController.js
        document.getElementById('orderId').textContent = data.id; 
        document.getElementById('customer').textContent = data.customerName; // Changed from .customer
        document.getElementById('items').textContent = data.productCount;    // Changed from .items
        document.getElementById('status').textContent = data.status;
        document.getElementById('orderDate').textContent = data.date;
    } catch (err) {
        console.error("Failed to load orders from Node.js controller", err);
    }
};

// --- 4. PAYMENT RECEIPTS & PDF LOGIC ---
// Handles the dark table and functional download (IMG-20251226-WA0007.jpg)
async function downloadReceipt(receiptId) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Finding the specific row in the Receipts table
    const rows = document.querySelectorAll("#receiptData tr");
    let rowData = null;

    rows.forEach(row => {
        if (row.cells[0].innerText === receiptId) {
            rowData = {
                id: row.cells[0].innerText,
                details: row.cells[1].innerText,
                amount: row.cells[2].innerText,
                date: row.cells[3].innerText
            };
        }
    });

    if (rowData) {
        // Design the PDF
        doc.setFillColor(40, 167, 69); // FarmLink Green
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("FarmLink Payment Receipt", 20, 25);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Receipt ID: ${rowData.id}`, 20, 60);
        doc.text(`Details: ${rowData.details}`, 20, 75);
        doc.text(`Total Amount: ${rowData.amount} CFA`, 20, 90);
        doc.text(`Date: ${rowData.date}`, 20, 105);
        
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 115, 190, 115);
        
        doc.text("Thank you for your business!", 20, 130);

        // Triggers the download
        doc.save(`Receipt_${rowData.id}.pdf`);
    }
}

// --- 5. INITIALIZATION ---
// This runs as soon as the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the Product Management page
    const addBtn = document.querySelector('.add-product-btn') || document.querySelector('.primary-btn');
    if (addBtn) {
        addBtn.addEventListener('click', handleAddProduct);
    }

    // Check if we are on the Orders page
    if (document.getElementById('orderId')) {
        loadOrders();
    }
});