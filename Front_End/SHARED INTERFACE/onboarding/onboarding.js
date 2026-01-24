document.addEventListener('DOMContentLoaded', function () {
    const roleCards = document.querySelectorAll('.role-card');
    const continueBtn = document.getElementById('continueBtn');
    let selectedRole = null;

    // 1. Handle Card Selection UI
    function handleRoleSelection(event) {
        roleCards.forEach(card => card.classList.remove('selected'));

        const clickedCard = event.currentTarget;
        clickedCard.classList.add('selected');

        // Store role (farmer or buyer)
        selectedRole = clickedCard.getAttribute('data-role');

        continueBtn.disabled = false;
        console.log(`Role selected: ${selectedRole}`);
    }

    roleCards.forEach(card => {
        card.addEventListener('click', handleRoleSelection);
    });

    // 2. Handle Database Update and Navigation
    continueBtn.addEventListener('click', async function () {
        if (!selectedRole) return;

        
        const userId = localStorage.getItem('userId') || 1; 

        try {
            // Disable button to prevent double-clicks
            continueBtn.disabled = true;
            continueBtn.innerText = "Saving...";

            const response = await fetch('http://173.234.79.54:3001/api/auth/select-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    role: selectedRole,
                    userId: userId
                })
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Success:", result.message);
                
                // Navigate based on the selected role
                if (selectedRole === 'farmer') {
                    window.location.href = '../../FARMER/signup as farmer/signup.html';
                } else if (selectedRole === 'buyer') {
                    window.location.href = '../../BUYER/Sign-up as buyer/signup buyer.html';
                }
            } else {
                alert("Error: " + result.message);
                continueBtn.disabled = false;
                continueBtn.innerText = "Continue";
            }

        } catch (error) {
            console.error("Connection Error:", error);
            alert("Could not connect to the server. Please check if Node.js is running.");
            continueBtn.disabled = false;
            continueBtn.innerText = "Continue";
        }
    });
});