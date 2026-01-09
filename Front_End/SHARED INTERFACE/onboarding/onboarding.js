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
    continueBtn.addEventListener('click', function () {
        if (selectedRole === 'farmer') {
            window.location.href = '../../farmer/signup as farmer/signup.html';
        }
        else if (selectedRole === 'buyer') {
            window.location.href = '../../buyer/sign-up as buyer/signup buyer.html';
        }
    });
});