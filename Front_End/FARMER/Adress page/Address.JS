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

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            fullName: fullNameInput.value.trim(),
            province: provinceSelect.value,
            district: districtInput.value.trim(),
            city: cityInput.value.trim()
        };

        // Basic Validation
        if (formData.fullName.length < 2) {
            alert('Please enter a valid name.');
            return;
        }

        try {
            // Sending data to the Node.js backend
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Registration Successful! Redirecting...');
                 window.location.href = 'dashboard.html'; 
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Connection error:', error);
            alert('Could not connect to the server. Is your backend running?');
        }
    });
});