document.addEventListener('DOMContentLoaded', () => {
    const completeProfileBtn = document.getElementById('btn-complete-profile');
    const skipBtn = document.querySelector('.skip-btn');

    completeProfileBtn.addEventListener('click', () => {
        window.location.href = '../address/address.html';
    });

    skipBtn.addEventListener('click', () => {
        window.location.href = '../home/farmer_home.html';
    });
});