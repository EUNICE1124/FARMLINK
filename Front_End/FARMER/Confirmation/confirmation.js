document.addEventListener('DOMContentLoaded', () => {
    const completeProfileBtn = document.getElementById('btn-complete-profile');
    const skipBtn = document.querySelector('.skip-btn');

    // Redirects to the address page we just updated
    completeProfileBtn.addEventListener('click', () => {
        window.location.href = '../adress page/address.html';
    });

    // Skips to the home page
    skipBtn.addEventListener('click', () => {
        window.location.href = '../home/farmer_home.html';
    });
});