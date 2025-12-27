document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const provinceSelect = document.getElementById('province-select');
    const districtInput = document.getElementById('district-input');
    const cityInput = document.getElementById('city-input');

    // --- Location Data (Cameroon Regions) ---
    const provinces = [
        "Adamawa", "Centre", "East", "Far North", 
        "Littoral", "North", "Northwest", "South", 
        "Southwest", "West"
    ];

    // --- Helper Function to populate the dropdown ---
    function populateProvinceDropdown(selectElement, options) {
        // Clear existing options (except the first placeholder)
        selectElement.innerHTML = selectElement.options[0].outerHTML; 
        
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    }

    // 1. Populate Provinces on Load
    populateProvinceDropdown(provinceSelect, provinces);

    // --- Event Handlers ---
    
    // Handle Form Submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fullName = fullNameInput.value.trim();
        const selectedProvince = provinceSelect.value;
        const district = districtInput.value.trim();
        const city = cityInput.value.trim();

        // Form Validation
        if (fullName.length < 2) {
            alert('Please enter your full name (at least 2 characters).');
            fullNameInput.focus();
            return;
        }
        
        if (!selectedProvince || !district || !city) {
             alert('Please select a Province/Region and enter your District and City.');
             return;
        }

        console.log(`Submitting registration for: ${fullName}`);
        console.log(`Location: ${city}, ${district}, ${selectedProvince}`);
        
        // In a real application, this is where you send data to your server/backend.

        alert(`Registration data collected for ${fullName} in ${city}. Proceeding to dashboard.`);
    });

    // Handle Skip Link (Bottom)
    const skipLinkBottom = document.querySelector('.skip-link-bottom');
    if (skipLinkBottom) {
        skipLinkBottom.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('User skipped registration setup. Redirecting...');
            alert('Skipping for now. Redirecting to the main app dashboard.');
        });
    }
});