let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-image');
const totalSlides = slides.length;
const container = document.querySelector('.carousel-container');
let autoSlideInterval;

// Function to update the carousel position
function updateSlide() {
    container.style.transition = "transform 0.5s ease-in-out";
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Function to show a specific slide
function showSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateSlide();
}

// Next Slide
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
    } else {
        currentSlide = 0; // Loop back to first slide
    }
    updateSlide();
}

// Previous Slide
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = totalSlides - 1; // Loop back to last slide
    }
    updateSlide();
}

// Auto-slide every 5 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Stop auto-slide when user interacts
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Touch Swipe Support
let startX = 0;
container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopAutoSlide(); // Stop auto-slide on user interaction
});

container.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
        nextSlide(); // Swipe left
    } else if (startX - endX < -50) {
        prevSlide(); // Swipe right
    }
    startAutoSlide(); // Resume auto-slide after interaction
});

// Start auto-sliding on page load
startAutoSlide();
