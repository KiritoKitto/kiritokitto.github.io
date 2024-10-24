const carousels = {};

function initCarousel(carouselId) {
    const slides = document.querySelectorAll(`#${carouselId} .carousel-item`);
    carousels[carouselId] = {
        currentSlide: 0,
        totalSlides: slides.length,
        inner: document.querySelector(`#${carouselId} .carousel-inner`),
    };
    showSlide(carouselId);
}

function showSlide(carouselId) {
    const slides = document.querySelectorAll(`#${carouselId} .carousel-item`);
    const carousel = carousels[carouselId];

    if (carousel.currentSlide >= slides.length) {
        carousel.currentSlide = 0;
    } else if (carousel.currentSlide < 0) {
        carousel.currentSlide = slides.length - 1;
    }

    const offset = -carousel.currentSlide * 100;
    carousel.inner.style.transform = `translateX(${offset}%)`;
}

function moveSlide(carouselId, direction) {
    const carousel = carousels[carouselId];
    carousel.currentSlide += direction;

    showSlide(carouselId);
}

// Gestione degli eventi touch
let startX = 0;
let endX = 0;

function handleTouchStart(event, carouselId) {
    startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    endX = event.touches[0].clientX;
}

function handleTouchEnd(carouselId) {
    if (startX > endX + 50) {
        moveSlide(carouselId, 1);
    } else if (startX + 50 < endX) {
        moveSlide(carouselId, -1);
    }
}

// Aggiungere gli eventi touch per ogni carosello
document.querySelectorAll('.carousel').forEach(carousel => {
    const carouselId = carousel.id;
    initCarousel(carouselId);
    
    carousel.addEventListener('touchstart', (event) => handleTouchStart(event, carouselId));
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', () => handleTouchEnd(carouselId));
});