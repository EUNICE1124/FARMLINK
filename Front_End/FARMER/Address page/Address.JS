document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const provinceSelect = document.getElementById('province-select');
    const districtInput = document.getElementById('district-input');
    const cityInput = document.getElementById('city-input');

    // List of Cameroon Regions
    const provinces = [
        "Adamawa", "Centre", "East", "Far North", 
        "Littoral", "North", "Northwest", "South", 
        "Southwest", "West"
    ];

    // Populate dropdown
    provinces.forEach(province => {
        const opt = document.createElement('option');
        opt.value = province;
        opt.textContent = province;
        provinceSelect.appendChild(opt);
    });

    // Address.JS - Update the submit event listener
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Grab the logged-in User ID from localStorage
    const userId = localStorage.getItem('userId'); 

    if (!userId) {
        alert("Session expired. Please log in again.");
        window.location.href = '/Front_End/SHARED INTERFACE/log in/index.html'; // Redirect if no user found
        return;
    }

    const formData = {
        userId: userId, // Add this line!
        full_name: fullNameInput.value.trim(),
        province: provinceSelect.value,
        district: districtInput.value.trim(),
        city: cityInput.value.trim()
    };

    try {
        const response = await fetch('http://localhost:3001/api/users/address', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Address saved! Redirecting to your dashboard...');
            window.location.href = '../home/farmer_home.html'; 
        } else {
            // This will show the specific error from the backend
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Connection error:', error);
        alert('Could not connect to the server.');
    }
});
});