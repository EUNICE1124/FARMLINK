document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.getElementById('signUpForm');
    
    const inputs = {
        userName: document.getElementById('userName'),
        email: document.getElementById('email'),
        phoneNumber: document.getElementById('phoneNumber'),
        address: document.getElementById('address'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        privacyCheck: document.getElementById('privacyCheck')
    };

    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        if (validateForm(inputs)) {
            // Success: Handle server submission here
            alert("Sign Up Successful! Data prepared for submission.");
        }
    });

    function validateForm(inputElements) {
        let isValid = true;

        function displayError(inputElement, message) {
            alert(message);
            inputElement.focus();
            isValid = false;
        }

        // --- Required Field Checks ---
        if (inputElements.userName.value.trim() === '') {
            displayError(inputElements.userName, "Please enter your User Name.");
            return false;
        }
        if (inputElements.email.value.trim() === '') {
            displayError(inputElements.email, "Please enter your Email address.");
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputElements.email.value)) {
            displayError(inputElements.email, "Please enter a valid Email address.");
            return false;
        }
        if (inputElements.phoneNumber.value.trim() === '') {
            displayError(inputElements.phoneNumber, "Please enter your Phone number.");
            return false;
        }
        if (inputElements.address.value.trim() === '') {
            displayError(inputElements.address, "Please enter your Address.");
            return false;
        }
        if (inputElements.password.value === '') {
            displayError(inputElements.password, "Please enter a Password.");
            return false;
        }
        if (inputElements.confirmPassword.value === '') {
            displayError(inputElements.confirmPassword, "Please confirm your Password.");
            return false;
        }

        // --- Password Match and Length Check ---
        if (inputElements.password.value !== inputElements.confirmPassword.value) {
            displayError(inputElements.confirmPassword, "Passwords do not match.");
            inputElements.password.value = '';
            inputElements.confirmPassword.value = '';
            return false;
        }
        if (inputElements.password.value.length < 6) {
             displayError(inputElements.password, "Password must be at least 6 characters long.");
             return false;
        }

        // --- Privacy Policy Check ---
        if (!inputElements.privacyCheck.checked) {
            displayError(inputElements.privacyCheck, "You must agree to the privacy policy.");
            return false;
        }

        return true;
    }
});