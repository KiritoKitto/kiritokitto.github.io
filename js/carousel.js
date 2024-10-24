let currentIndex = 0; // Indice dell'immagine corrente
const images = document.querySelectorAll('#carousel1 .carousel-item'); // Seleziona tutti i contenitori delle immagini nel carosello
const totalImages = images.length;
let isDragging = false; // Flag per il trascinamento
let startX; // Posizione iniziale del tocco

// Funzione per aggiornare l'immagine visualizzata
function updateImageDisplay(offset = 0) {
    const currentOffset = -currentIndex * 100 + offset; // Sposta le immagini di 100% per ogni cambio di immagine
    const carouselInner = document.querySelector('.carousel-inner');

    // Rimuovi l'ease per lo scorrimento con il dito
    carouselInner.style.transition = isDragging ? 'none' : 'transform 0.5s ease';
    
    // Applica la traslazione
    carouselInner.style.transform = `translateX(${currentOffset}%)`;

    // Nascondi i pulsanti se siamo all'inizio o alla fine
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');

    backButton.style.display = currentIndex === 0 ? 'none' : 'block'; // Nascondi il pulsante "Indietro" se alla prima immagine
    nextButton.style.display = currentIndex === totalImages - 1 ? 'none' : 'block'; // Nascondi il pulsante "Avanti" se all'ultima immagine
}

// Funzione per andare avanti
function nextImage() {
    if (currentIndex < totalImages - 1) { // Controlla se non è l'ultima immagine
        currentIndex++;
        updateImageDisplay();
    }
}

// Funzione per andare indietro
function prevImage() {
    if (currentIndex > 0) { // Controlla se non è la prima immagine
        currentIndex--;
        updateImageDisplay();
    }
}

// Aggiungi gli event listener ai pulsanti
document.getElementById('nextButton').addEventListener('click', nextImage);
document.getElementById('backButton').addEventListener('click', prevImage);

// Funzionalità di trascinamento
const touchStart = (event) => {
    startX = event.touches[0].clientX; // Prendi la posizione iniziale del tocco
    isDragging = true; // Inizia il trascinamento
};

const touchMove = (event) => {
    if (!isDragging) return; // Non fare nulla se non si sta trascinando

    const currentX = event.touches[0].clientX; // Posizione attuale del tocco
    const diffX = currentX - startX; // Differenza tra posizione attuale e iniziale

    // Trasla il carosello in base al movimento del tocco
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(${-currentIndex * 100 + (diffX / window.innerWidth) * 100}%)`; // Traslazione responsiva

    // Se il trascinamento supera la soglia, naviga tra le immagini
    if (diffX > 50) { // Scorrimento verso destra
        prevImage();
        isDragging = false; // Termina il trascinamento
    } else if (diffX < -50) { // Scorrimento verso sinistra
        nextImage();
        isDragging = false; // Termina il trascinamento
    }
};

// Aggiungi gli event listener per il trascinamento
document.getElementById('carousel1').addEventListener('touchstart', touchStart);
document.getElementById('carousel1').addEventListener('touchmove', touchMove);
document.addEventListener('touchend', () => {
    isDragging = false; // Termina il trascinamento
    updateImageDisplay(); // Riporta l'immagine corrente
});
document.addEventListener('touchcancel', () => isDragging = false); // Termina il trascinamento se annullato

// Inizializza la visualizzazione dell'immagine
updateImageDisplay();
