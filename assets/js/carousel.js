document.addEventListener('DOMContentLoaded', function () {
    // Configuration
    const totalSketches = 8; // Update this if you add more sketches

    // Elements
    const carouselItems = document.querySelector('.carousel-items');
    const dotsContainer = document.querySelector('.dots-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // Start with a random sketch
    let currentIndex = Math.floor(Math.random() * totalSketches);

    // Initialize carousel
    function initializeCarousel() {
        // Create sketches
        for (let i = 1; i <= totalSketches; i++) {
            const item = document.createElement('div');
            item.className = 'carousel-item';

            const iframe = document.createElement('iframe');
            iframe.src = `${i}/`;
            iframe.loading = 'lazy'; // Lazy load iframes

            item.appendChild(iframe);
            carouselItems.appendChild(item);

            // Create dot for this sketch
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i - 1 === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i - 1));
            dotsContainer.appendChild(dot);
        }

        // Go to the random sketch on initial load
        goToSlide(currentIndex);
    }

    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) index = totalSketches - 1;
        if (index >= totalSketches) index = 0;

        currentIndex = index;
        carouselItems.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update the active dot
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Event listeners
    prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Initialize
    initializeCarousel();
}); 