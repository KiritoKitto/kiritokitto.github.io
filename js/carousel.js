document.querySelectorAll('.carousel').forEach((carousel) => {
    let currentIndex = 0; // Indice dell'immagine corrente
    const images = carousel.querySelectorAll('.carousel-item'); // Seleziona tutti i contenitori delle immagini nel carosello
    const totalImages = images.length;
    const indicators = carousel.parentNode.querySelectorAll('.indicator'); // Seleziona gli indicatori
    const threshold = 10; // Soglia per il cambiamento dell'immagine
    let startX; // Posizione iniziale del tocco
    let isDragging = false; // Stato del trascinamento
    let translateX = 0; // Traslazione attuale

    // Funzione per aggiornare l'immagine visualizzata
    function updateImageDisplay(offset = 0) {
        const currentOffset = -currentIndex * 100 + offset; // Sposta le immagini di 100% per ogni cambio di immagine
        const carouselInner = carousel.querySelector('.carousel-inner');

        // Rimuovi l'ease per lo scorrimento con il dito
        carouselInner.style.transition = isDragging ? 'none' : 'transform 0.5s ease';

        // Applica la traslazione
        carouselInner.style.transform = `translateX(${currentOffset}%)`;

        // Nascondi i pulsanti se siamo all'inizio o alla fine
        const backButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');

        backButton.style.display = currentIndex === 0 ? 'none' : 'block'; // Nascondi il pulsante "Indietro"
        nextButton.style.display = currentIndex === totalImages - 1 ? 'none' : 'block'; // Nascondi il pulsante "Avanti"

        // Aggiorna gli indicatori
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex); // Attiva il puntino corrente
        });
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
    carousel.querySelector('.next').addEventListener('click', nextImage);
    carousel.querySelector('.prev').addEventListener('click', prevImage);

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
            translateX = Math.min(translateX, 30); // Limita l'offset a un massimo di 30%
            updateImageDisplay(translateX); // Aggiorna per il rimbalzo
            setTimeout(() => {
                translateX = 0; // Reset dell'offset
                updateImageDisplay(); // Torna alla posizione originale
            }, 300); // Tempo del rimbalzo
        } else if (currentIndex === totalImages - 1 && translateX < 0) {
            translateX = Math.max(translateX, -30); // Limita l'offset a un minimo di -30%
            updateImageDisplay(translateX); // Aggiorna per il rimbalzo
            setTimeout(() => {
                translateX = 0; // Reset dell'offset
                updateImageDisplay(); // Torna alla posizione originale
            }, 300); // Tempo del rimbalzo
        }
    };

    // Aggiungi gli event listener per il trascinamento
    carousel.addEventListener('touchstart', touchStart);
    carousel.addEventListener('touchmove', touchMove);
    carousel.addEventListener('touchend', touchEnd);

    // Aggiorna gli indicatori al caricamento della pagina
    updateImageDisplay(); // Questa linea assicura che gli indicatori siano aggiornati subito al caricamento
});
