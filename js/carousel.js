let currentIndex = 0; // Indice dell'immagine corrente
const images = document.querySelectorAll('#carousel1 .carousel-item'); // Seleziona tutti i contenitori delle immagini nel carosello
const totalImages = images.length;
const threshold = 30; // Soglia per il cambiamento dell'immagine
let startX; // Posizione iniziale del tocco
let isDragging = false; // Stato del trascinamento
let translateX = 0; // Traslazione attuale

// Funzione per aggiornare l'immagine visualizzata
function updateImageDisplay(offset = 0) {
    // Applica la traslazione in base all'indice corrente e all'offset
    const currentOffset = -currentIndex * 100 + offset; // Sposta le immagini di 100% per ogni cambio di immagine
    const carouselInner = document.querySelector('.carousel-inner');

    // Rimuovi l'ease per lo scorrimento con il dito
    carouselInner.style.transition = isDragging ? 'none' : 'transform 0.5s ease';
    
    // Applica la traslazione
    carouselInner.style.transform = `translateX(${currentOffset}%)`;
}

// Funzione per andare avanti
function nextImage() {
    if (currentIndex < totalImages - 1) { // Controlla se non è l'ultima immagine
        currentIndex++;
        translateX = 0; // Reset dell'offset
        updateImageDisplay(); // Aggiorna l'immagine
    }
}

// Funzione per andare indietro
function prevImage() {
    if (currentIndex > 0) { // Controlla se non è la prima immagine
        currentIndex--;
        translateX = 0; // Reset dell'offset
        updateImageDisplay(); // Aggiorna l'immagine
    }
}

// Aggiungi gli event listener ai pulsanti
document.getElementById('nextButton').addEventListener('click', nextImage);
document.getElementById('backButton').addEventListener('click', prevImage);

// Funzionalità di trascinamento
const touchStart = (event) => {
    startX = event.touches[0].clientX; // Prendi la posizione iniziale del tocco
    isDragging = true; // Inizia il trascinamento
    translateX = 0; // Reset dell'offset
};

const touchMove = (event) => {
    if (!isDragging) return; // Non fare nulla se non si sta trascinando

    const currentX = event.touches[0].clientX; // Posizione attuale del tocco
    translateX = (currentX - startX) / window.innerWidth * 100; // Calcola l'offset in percentuale

    // Aggiorna la visualizzazione mentre si trascina
    updateImageDisplay(translateX); // Passa l'offset alla funzione di aggiornamento
};

const touchEnd = () => {
    isDragging = false; // Termina il trascinamento

    // Controlla se l'offset supera la soglia
    if (Math.abs(translateX) > threshold) {
        if (translateX > 0 && currentIndex > 0) {
            prevImage(); // Scorrimento verso destra, torna indietro
        } else if (translateX < 0 && currentIndex < totalImages - 1) {
            nextImage(); // Scorrimento verso sinistra, vai avanti
        }
    } else {
        // Torna alla posizione originale
        translateX = 0; // Reset dell'offset
        updateImageDisplay(); // Ritorna alla posizione originale
    }

    // Gestione del rimbalzo oltre i limiti
    if (currentIndex === 0 && translateX > 0) {
        // Rimbalza se sei alla prima immagine
        translateX = Math.min(translateX, 50); // Limita l'offset a un massimo di 50%
        updateImageDisplay(translateX); // Aggiorna per il rimbalzo
        setTimeout(() => {
            translateX = 0; // Reset dell'offset
            updateImageDisplay(); // Torna alla posizione originale
        }, 300); // Tempo del rimbalzo
    } else if (currentIndex === totalImages - 1 && translateX < 0) {
        // Rimbalza se sei all'ultima immagine
        translateX = Math.max(translateX, -50); // Limita l'offset a un minimo di -50%
        updateImageDisplay(translateX); // Aggiorna per il rimbalzo
        setTimeout(() => {
            translateX = 0; // Reset dell'offset
            updateImageDisplay(); // Torna alla posizione originale
        }, 300); // Tempo del rimbalzo
    }
};

// Aggiungi gli event listener per il trascinamento
document.getElementById('carousel1').addEventListener('touchstart', touchStart);
document.getElementById('carousel1').addEventListener('touchmove', touchMove);
document.getElementById('carousel1').addEventListener('touchend', touchEnd);
document.addEventListener('touchcancel', () => isDragging = false); // Termina il trascinamento se annullato

// Inizializza la visualizzazione dell'immagine
updateImageDisplay();