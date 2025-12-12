document.addEventListener('DOMContentLoaded', function() {
    const roleCards = document.querySelectorAll('.role-card');
    const continueBtn = document.getElementById('continueBtn');
    let selectedRole = null;

    // Function to handle card selection
    function handleRoleSelection(event) {
        // Remove 'selected' class from all cards
        roleCards.forEach(card => {
            card.classList.remove('selected');
        });

        // Add 'selected' class to the clicked card
        const clickedCard = event.currentTarget;
        clickedCard.classList.add('selected');

        // Store the selected role
        selectedRole = clickedCard.getAttribute('data-role');

        // Enable the Continue button
        continueBtn.disabled = false;

        console.log(`Role selected: ${selectedRole}`);
    }

    // Attach the event listener to each card
    roleCards.forEach(card => {
        card.addEventListener('click', handleRoleSelection);
    });

    // Handle the Continue button click
    continueBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default button action

        if (selectedRole) {
            alert(`Continuing as a ${selectedRole}. Next step would be the ${selectedRole} dashboard.`);

            // In a real application, you would navigate the user here:
            // window.location.href = `/dashboard?role=${selectedRole.toLowerCase()}`;
        } else {
            alert('Please select a role to continue.');
        }
    });
});