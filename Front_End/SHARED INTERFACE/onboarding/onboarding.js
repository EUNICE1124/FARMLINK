document.addEventListener('DOMContentLoaded', function () {
    const roleCards = document.querySelectorAll('.role-card');
    const continueBtn = document.getElementById('continueBtn');
    let selectedRole = null;

    // 1. Handle Card Selection
    function handleRoleSelection(event) {
        roleCards.forEach(card => card.classList.remove('selected'));

        const clickedCard = event.currentTarget;
        clickedCard.classList.add('selected');

        // Store role 
        selectedRole = clickedCard.getAttribute('data-role');

        continueBtn.disabled = false;
        console.log(`Role selected: ${selectedRole}`);
    }

    roleCards.forEach(card => {
        card.addEventListener('click', handleRoleSelection);
    });

    // 2. Handle Navigation
    continueBtn.addEventListener('click', function (event) {
        event.preventDefault();

        if (selectedRole) {
            // SAVE the role so the Login and Search pages can see it later
            localStorage.setItem('userRole', selectedRole.toLowerCase());

            // ROUTING LOGIC:
            window.location.href = '../signup/signup.html';

        } else {
            alert('Please select a role to continue.');
        }
    });
});