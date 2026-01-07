document.addEventListener('DOMContentLoaded', function () {
    console.log('FARM LINK Buyer Home Page Loaded. Ready for interaction.');

    // --- Example JavaScript for Category Interaction ---
    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove 'active' class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            this.classList.add('active');

            const category = this.textContent.trim();
            console.log(`Switched to category: ${category}`);

        });
    });

    // --- Example JavaScript for Add to Cart ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent card click if implemented
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.card-title').textContent;

            alert(`${productName} added to cart!`);
            // In a real app, this would trigger an AJAX call to add the item to the server cart.
        });
    });
});