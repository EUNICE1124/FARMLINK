document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function () {
        // Remove active class from all chips
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));

        // Add active class to the clicked one
        this.classList.add('active');

        // Optional: Update price dynamically based on selection
        console.log("Selected quantity:", this.innerText);
    });
});

// Add to Cart feedback
document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    alert('Added to cart!');
});