let currentIndex = 0; // Indice dell'immagine corrente
const images = document.querySelectorAll('#carousel1 .carousel-item img'); // Seleziona tutte le immagini nel carosello
const totalImages = images.length;

// Funzione per aggiornare l'immagine visualizzata
function updateImageDisplay() {
    images.forEach((img, index) => {
        img.parentElement.style.display = index === currentIndex ? 'block' : 'none'; // Mostra solo il contenitore dell'immagine attiva
    });
}

// Funzione per andare avanti
function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateImageDisplay();
}

// Funzione per andare indietro
function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateImageDisplay();
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
document.addEventListener('touchend', () => isDragging = false); // Termina il trascinamento
document.addEventListener('touchcancel', () => isDragging = false); // Termina il trascinamento se annullato

// Inizializza la visualizzazione dell'immagine
updateImageDisplay();