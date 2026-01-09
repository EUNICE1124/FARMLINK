document.addEventListener('DOMContentLoaded', () => {
    // Select the form by its class
    const signupForm = document.querySelector('.signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            // 1. STOP the page from refreshing/loading
            e.preventDefault();

            console.log("Form submission caught!");

            // 2. Redirect to confirmation
            // Make sure the path is exactly correct
            window.location.href = '../confirmation/confirmation.html';
        });
    }
});