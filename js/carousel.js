const carousels = {};

function initCarousel(carouselId) {
    const slides = document.querySelectorAll(`#${carouselId} .carousel-item`);
    carousels[carouselId] = {
        currentSlide: 0,
        totalSlides: slides.length,
        inner: document.querySelector(`#${carouselId} .carousel-inner`),
        startX: 0,
        currentTranslate: 0,
        isDragging: false
    };
    showSlide(carouselId);
}

function showSlide(carouselId) {
    const carousel = carousels[carouselId];
    const offset = -carousel.currentSlide * 100;
    carousel.inner.style.transform = `translateX(${offset}%)`;
}

function moveSlide(carouselId, direction) {
    const carousel = carousels[carouselId];
    carousel.currentSlide += direction;

    if (carousel.currentSlide >= carousel.totalSlides) {
        carousel.currentSlide = 0;
    } else if (carousel.currentSlide < 0) {
        carousel.currentSlide = carousel.totalSlides - 1;
    }

    showSlide(carouselId);
}

function handleTouchStart(event, carouselId) {
    const carousel = carousels[carouselId];
    carousel.startX = event.touches[0].clientX;
    carousel.isDragging = true;
}

function handleTouchMove(event, carouselId) {
    if (!carousels[carouselId].isDragging) return;

    const carousel = carousels[carouselId];
    const currentX = event.touches[0].clientX;
    const diffX = carousel.startX - currentX;

    carousel.currentTranslate = -carousel.currentSlide * 100 + (diffX / window.innerWidth * 100);
    carousel.inner.style.transform = `translateX(${carousel.currentTranslate}%)`;
}

function handleTouchEnd(carouselId) {
    const carousel = carousels[carouselId];
    carousel.isDragging = false;

    const threshold = 50; // soglia per determinare lo scorrimento

    if (carousel.startX - carousel.currentTranslate / 100 * window.innerWidth > threshold) {
        moveSlide(carouselId, 1); // Sposta a sinistra
    } else if (carousel.startX - carousel.currentTranslate / 100 * window.innerWidth < -threshold) {
        moveSlide(carouselId, -1); // Sposta a destra
    } else {
        showSlide(carouselId); // Ritorna alla slide corrente
    }
}

// Aggiungere gli eventi touch per ogni carosello
document.querySelectorAll('.carousel').forEach(carousel => {
    const carouselId = carousel.id;
    initCarousel(carouselId);

    carousel.addEventListener('touchstart', (event) => handleTouchStart(event, carouselId));
    carousel.addEventListener('touchmove', (event) => handleTouchMove(event, carouselId));
    carousel.addEventListener('touchend', () => handleTouchEnd(carouselId));
});