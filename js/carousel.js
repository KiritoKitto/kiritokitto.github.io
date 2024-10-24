let currentIndex = 0; // Indice dell'immagine corrente
const images = document.querySelectorAll('#carousel1 .carousel-item'); // Seleziona tutti i contenitori delle immagini nel carosello
const totalImages = images.length;

// Funzione per aggiornare l'immagine visualizzata
function updateImageDisplay() {
    // Calcola la posizione in base all'indice corrente
    const offset = -currentIndex * 100; // Sposta le immagini di 100% per ogni cambio di immagine
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`; // Applica la traslazione
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
let startX;
let isDragging = false;

const touchStart = (event) => {
    startX = event.touches[0].clientX; // Prendi la posizione iniziale del tocco
    isDragging = true; // Inizia il trascinamento
};

const touchMove = (event) => {
    if (!isDragging) return; // Non fare nulla se non si sta trascinando

    const currentX = event.touches[0].clientX; // Posizione attuale del tocco
    const diffX = currentX - startX; // Differenza tra posizione attuale e iniziale

    // Se il trascinamento è sufficiente, naviga tra le immagini
    if (diffX > 50 && currentIndex > 0) { // Scorrimento verso destra e non è la prima immagine
        prevImage();
        isDragging = false; // Termina il trascinamento
    } else if (diffX < -50 && currentIndex < totalImages - 1) { // Scorrimento verso sinistra e non è l'ultima immagine
        nextImage();
        isDragging = false; // Termina il trascinamento
    }
};

// Aggiungi gli event listener per il trascinamento
document.getElementById('carousel1').addEventListener('touchstart', touchStart);
document.getElementById('carousel1').addEventListener('touchmove', touchMove);
document.addEventListener('touchend', () => isDragging = false); // Termina il trascinamento
document.addEventListener('touchcancel', () => isDragging = false); // Termina il trascinamento se annullato

// Inizializza la visualizzazione dell'immagine
updateImageDisplay();
