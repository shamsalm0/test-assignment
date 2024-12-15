// Checkout button modal toggle
const checkOut = document.getElementById('checkOut');
checkOut.addEventListener('click', () => {
    const modal = document.getElementById('modal').classList.toggle('hidden');
});

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const bandOptions = document.querySelectorAll('.band'); // Select all band options
    const productImage = document.getElementById('product-image'); // Select the product image

    // Add event listeners to each band option
    bandOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Get the new image source from the data-image attribute
            const newImage = option.getAttribute('data-image');
            productImage.setAttribute('src', newImage); // Update the product image

            // Remove the outline class from all bands
            bandOptions.forEach(opt => opt.classList.remove('outline', 'outline-offset-2', 'outline-2', 'outline-[#816BFF]'));

            // Add the outline class to the clicked band
            option.classList.add('outline', 'outline-offset-2', 'outline-2', 'outline-[#816BFF]');
        });
    });
});
