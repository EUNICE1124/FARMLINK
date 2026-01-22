// --- 1. NAVIGATION LOGIC (The "Page Flipper") ---
function nextStep(step) {
    // Hide all sections first
    document.getElementById('delivery-section').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';
    document.getElementById('review-section').style.display = 'none';

    // Show the section corresponding to the step number
    if (step === 1) {
        document.getElementById('delivery-section').style.display = 'block';
        document.getElementById('step-title').innerText = "Delivery and Contact";
    } else if (step === 2) {
        document.getElementById('payment-section').style.display = 'block';
        document.getElementById('step-title').innerText = "Payment Method";
    } else if (step === 3) {
        document.getElementById('review-section').style.display = 'block';
        document.getElementById('step-title').innerText = "Review Your Order";
    }

    // Update the Progress Bar visual active state
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`p-step-${step}`).classList.add('active');
}

// --- 2. TOGGLE & SELECTION LOGIC ---

function toggleMethod(method) {
    const deliveryBtn = document.getElementById('btn-delivery');
    const pickupBtn = document.getElementById('btn-pickup');
    
    if (method === 'delivery') {
        deliveryBtn.classList.add('active');
        pickupBtn.classList.remove('active');
    } else {
        pickupBtn.classList.add('active');
        deliveryBtn.classList.remove('active');
    }
}

function selectProvider(provider) {
    const mtnBtn = document.getElementById('btn-mtn');
    const orangeBtn = document.getElementById('btn-orange');

    if (provider === 'mtn') {
        mtnBtn.classList.add('selected'); // Make sure you have a .selected class in CSS
        orangeBtn.classList.remove('selected');
    } else {
        orangeBtn.classList.add('selected');
        mtnBtn.classList.remove('selected');
    }
}

// --- 3. ADDRESS MODAL LOGIC ---

function openModal() {
    document.getElementById('addressModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('addressModal').style.display = 'none';
}

function updateAddress(city, region) {
    document.getElementById('display-city').innerText = city;
    document.getElementById('display-region').innerText = region;
    closeModal();
}

// --- 4. BACKEND CONNECTION (Place Order) ---

async function placeOrder() {
    const savedUser = JSON.parse(localStorage.getItem('userId')) || { id: 1 };
    
    const orderData = {
        customer_id: savedUser.id,
        customer_name: document.getElementById('input-name').value,
        city: document.getElementById('display-city').innerText,
        region: document.getElementById('display-region').innerText,
        phone: document.getElementById('momo-phone').value,
        provider: document.getElementById('btn-mtn').classList.contains('selected') ? "MTN" : "Orange",
        total_price: 6500, 
        status: 'New'
    };

    if (!orderData.customer_name || !orderData.phone) {
        alert("Please enter your name and phone number!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Order Placed Successfully!");
            // Clear the cart since the order is placed
            localStorage.removeItem('cartItems'); 
            window.location.href = '../View All Orders/index.html';
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Order Error:", error);
        alert("Could not connect to the server.");
    }
}

function goBack() {
    window.history.back();
}