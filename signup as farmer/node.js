
document.addEventListener('DOMContentLoaded', () => {

    const signupForm = document.querySelector('.signup-form');
    const inputGroups = document.querySelectorAll('.input-group');
    const usernameInput = document.querySelector('input[placeholder="Enter User Name"]');
    const emailInput = document.querySelector('input[placeholder="Enter Email"]');
    const phoneInput = document.querySelector('input[placeholder="Enter Phone number"]');
    const address1Input = document.querySelector('input[placeholder="Enter Farm/Business Address "]');
    const address2Input = document.querySelector('input[placeholder="Enter City, State"]');
    const passwordInput = document.querySelector('input[placeholder="Create Password"]');
    const signupButton = document.querySelector('.signup-btn');

    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    inputGroups.forEach(group => {
        const input = group.querySelector('input');

        
        input.addEventListener('focus', () => {
            document.querySelectorAll('.input-group').forEach(g => g.classList.remove('selected-input'));
            group.classList.add('selected-input');
        });

        input.addEventListener('blur', () => {
            group.classList.remove('selected-input');
        });
    });
    signupButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Gather input values
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const address1 = address1Input.value.trim();
        const address2 = address2Input.value.trim();
        const password = passwordInput.value;

        let isValid = true; 
        let alertMessage = ""; 

        if (!username || !email || !phone || !address1 || !address2 || !password) {
            alertMessage += "All fields are required.\n";
            isValid = false;
        }

        if (email && !isValidEmail(email)) {
            alertMessage += "Please enter a valid email address.\n";
            isValid = false;
        }

        if (password && password.length < 6) {
            alertMessage += "Password must be at least 6 characters long.\n";
            isValid = false;
        }

        if (isValid) {
            alert(`Sign up successful for ${username}! Data ready to be sent to the server.`);

            console.log("Form data collected:", { username, email, phone, address1, address2, password });
            signupForm.reset(); 

        } else {
            alert("Please correct the following errors:\n\n" + alertMessage);
        }
    });

});