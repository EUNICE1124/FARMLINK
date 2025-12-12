document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const locationSelector = document.querySelector('.location-selector');
    const skipLink = document.querySelector('.skip-link');

    // Handle Form Submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fullName = fullNameInput.value.trim();

        if (fullName.length < 2) {
            alert('Please enter your full name (at least 2 characters).');
            fullNameInput.focus();
            return;
        }

        console.log(`Submitting registration for: ${fullName}`);
        
        // In a real app, send data to the backend API here.

        alert(`Registration data collected for ${fullName}. Proceeding to dashboard.`);
    });

    // Handle Location Selection Click (Triggers a Picker/Modal)
    locationSelector.addEventListener('click', () => {
        console.log('Location selector clicked. Triggering modal/picker.');
        
        // Simple visual feedback for interaction
        locationSelector.style.boxShadow = '0 0 0 2px rgba(56, 168, 50, 0.5)';
        setTimeout(() => {
            locationSelector.style.boxShadow = 'none';
        }, 500);
    });

    // Handle Skip Link
    skipLink.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('User skipped registration setup. Redirecting...');
        alert('Skipping for now. Redirecting to the main app dashboard.');
    });
});