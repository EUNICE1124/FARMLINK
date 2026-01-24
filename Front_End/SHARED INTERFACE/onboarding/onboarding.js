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

       // Replace your try/catch block with this:
try {
    continueBtn.disabled = true;
    continueBtn.innerText = "Saving...";

    // Add a timeout to prevent infinite "Saving..."
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second limit

    const response = await fetch('http://173.234.79.54:3001/api/auth/select-role', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole, userId: userId })
    });

    clearTimeout(timeoutId);
    const result = await response.json();

    if (response.ok) {
        window.location.href = selectedRole === 'farmer' 
            ? '../../FARMER/signup as farmer/signup.html' 
            : '../../BUYER/Sign-up as buyer/signup buyer.html';
    } else {
        throw new Error(result.message || "Server rejected the request");
    }

} catch (error) {
    console.error("DETAILED ERROR:", error);
    alert("Submission Failed: " + error.message);
    continueBtn.disabled = false;
    continueBtn.innerText = "Continue";
}
    });
});