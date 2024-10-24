let currentIndex = 0; // Indice dell'immagine corrente
const images = document.querySelectorAll('#carousel1 .carousel-item'); // Seleziona tutti i contenitori delle immagini nel carosello
const totalImages = images.length;
const threshold = 50; // Soglia per il cambiamento dell'immagine
let offsetX = 0; // Offset attuale per il movimento

// Funzione per aggiornare l'immagine visualizzata
function updateImageDisplay(translateX = 0) {
    // Applica la traslazione in base all'offset attuale
    const offset = -currentIndex * 100 + translateX; // Sposta le immagini di 100% per ogni cambio di immagine
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`; // Applica la traslazione
}

// Funzione per andare avanti
function nextImage() {
    if (currentIndex < totalImages - 1) { // Controlla se non è l'ultima immagine
        currentIndex++;
        offsetX = 0; // Reset dell'offset
        updateImageDisplay(); // Aggiorna l'immagine
    }
}

// Funzione per andare indietro
function prevImage() {
    if (currentIndex > 0) { // Controlla se non è la prima immagine
        currentIndex--;
        offsetX = 0; // Reset dell'offset
        updateImageDisplay(); // Aggiorna l'immagine
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
    offsetX = 0; // Reset dell'offset
};

const touchMove = (event) => {
    if (!isDragging) return; // Non fare nulla se non si sta trascinando

    const currentX = event.touches[0].clientX; // Posizione attuale del tocco
    offsetX = currentX - startX; // Calcola l'offset

    // Aggiorna la visualizzazione mentre si trascina
    updateImageDisplay(offsetX * 100 / window.innerWidth); // Trasla l'immagine in base al movimento del tocco
};

const touchEnd = () => {
    isDragging = false; // Termina il trascinamento

    // Se l'offset supera la soglia, cambia immagine
    if (Math.abs(offsetX) > threshold) {
        if (offsetX > 0) {
            prevImage(); // Scorrimento verso destra, torna indietro
        } else {
            nextImage(); // Scorrimento verso sinistra, vai avanti
        }
    } else {
        // Torna alla posizione originale
        updateImageDisplay();
    }
};

// Aggiungi gli event listener per il trascinamento
document.getElementById('carousel1').addEventListener('touchstart', touchStart);
document.getElementById('carousel1').addEventListener('touchmove', touchMove);
document.getElementById('carousel1').addEventListener('touchend', touchEnd);
document.addEventListener('touchcancel', () => isDragging = false); // Termina il trascinamento se annullato

// Inizializza la visualizzazione dell'immagine
updateImageDisplay();