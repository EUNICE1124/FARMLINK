
let currentStep = 1;

document.addEventListener('DOMContentLoaded', () => {
    
    toggleMethod('delivery');
});

function navigateToStep(stepNumber) {
    currentStep = stepNumber;

    // 1. Update Progress Bar UI
    for (let i = 1; i <= 3; i++) {
        const stepEl = document.getElementById(`p-step-${i}`);
        if (stepEl) {
            stepEl.classList.toggle('active', i <= stepNumber);
        }
    }
    const deliverySec = document.getElementById('delivery-section');
    const paymentSec = document.getElementById('payment-section');
    const reviewSec = document.getElementById('review-section');
    const titleEl = document.getElementById('step-title');

    deliverySec.style.display = 'none';
    paymentSec.style.display = 'none';
    reviewSec.style.display = 'none';

    if (stepNumber === 1) {
        deliverySec.style.display = 'block';
        titleEl.innerText = "Delivery and Contact";
    } else if (stepNumber === 2) {
        paymentSec.style.display = 'block';
        titleEl.innerText = "Payment Method";
        syncConfirmDetails();
    } else if (stepNumber === 3) {
        reviewSec.style.display = 'block';
        titleEl.innerText = "Review Order";
        updateReviewData(); 
    }
}

function validateAndGoToPayment() {
    const phoneInput = document.getElementById('input-phone');
    const phoneValue = phoneInput ? phoneInput.value.trim() : "";

    if (phoneValue.length < 8) {
        alert("Please enter a valid phone number (at least 8 digits)");
        if (phoneInput) phoneInput.focus();
        return;
    }
    navigateToStep(2);
}
function toggleMethod(method) {
    const isDelivery = (method === 'delivery');
    document.getElementById('btn-delivery').classList.toggle('active', isDelivery);
    document.getElementById('btn-pickup').classList.toggle('active', !isDelivery);
    document.querySelector('.address-card').style.display = isDelivery ? 'flex' : 'none';
}
function openModal() { document.getElementById('addressModal').style.display = 'flex'; }
function closeModal() { document.getElementById('addressModal').style.display = 'none'; }

function updateAddress(city, region) {
    document.getElementById('display-city').innerText = city;
    document.getElementById('display-region').innerText = region;
    closeModal();
}
function selectMomo(provider) {
    document.getElementById('btn-mtn').classList.toggle('selected', provider === 'mtn');
    document.getElementById('btn-orange').classList.toggle('selected', provider === 'orange');

    const input = document.getElementById('momo-phone');
    input.placeholder = provider === 'mtn' ? "Enter MTN MoMo Number" : "Enter Orange Money Number";
}
function syncConfirmDetails() {
    const nameInput = document.getElementById('input-name');
    const city = document.getElementById('display-city').innerText;
    const region = document.getElementById('display-region').innerText;

    document.querySelectorAll('.confirm-name').forEach(el => el.innerText = nameInput.value);
    document.querySelectorAll('.confirm-city').forEach(el => el.innerText = city);
    document.querySelectorAll('.confirm-region').forEach(el => el.innerText = region);
}
function updateReviewData() {
    const city = document.getElementById('display-city').innerText; 
    const region = document.getElementById('display-region').innerText; 
    const phone = document.getElementById('momo-phone').value;

    const reviewAddress = document.getElementById('review-address');
    if (reviewAddress) {
        reviewAddress.innerText = `${city}, ${region}`;
    }
    const phoneLast = document.getElementById('review-phone-last');
    if (phoneLast) {
        phoneLast.innerText = phone.length >= 2 ? phone.slice(-2) : "XX";
    }

    const isMtn = document.getElementById('btn-mtn').classList.contains('selected');
    const momoType = document.getElementById('review-momo-type');
    if (momoType) {
        momoType.innerText = isMtn ? "MTN Momo" : "Orange Momo";
    }
}
function goBack() {
    if (currentStep > 1) {
        navigateToStep(currentStep - 1);
    } else {
        console.log("Returning to Cart...");
    }
}

function placeOrder() {
    const total = "CFA 5000"; 
    alert(`Order Placed Successfully! Total: ${total}. Redirecting to MoMo Payment...`);
}