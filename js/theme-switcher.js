// Funzione per cambiare il tema
function switchTheme(event) {
    event.preventDefault();

    const themeLink = document.getElementById("theme-link");
    const currentTheme = themeLink.getAttribute("href");

    // Cambia il tema e salva la scelta nel localStorage
    if (currentTheme === "/css/light.css") {
        themeLink.setAttribute("href", "/css/dark.css");
        localStorage.setItem("theme", "dark");
    } else {
        themeLink.setAttribute("href", "/css/light.css");
        localStorage.setItem("theme", "light");
    }

    // Rimuove qualsiasi listener precedente per evitare duplicazioni
    themeLink.removeEventListener("load", handleThemeLoad);

    // Aggiunge il listener `load` per ridisegnare il grafico al caricamento del tema
    themeLink.addEventListener("load", handleThemeLoad);
}

// Funzione che gestisce il caricamento del tema e ridisegna il grafico
function handleThemeLoad() {
    // Attendi 100 ms per garantire che il nuovo tema sia completamente caricato
    setTimeout(drawVisualization, 100);

    // Attiva un controllo di fallback per ridisegnare il grafico se il tema non è stato aggiornato
    checkAndRedraw();
}

// Funzione di fallback per assicurarsi che il grafico venga ridisegnato correttamente
function checkAndRedraw() {
    // Esempio di condizione di controllo (modifica in base alle tue esigenze)
    const rootStyles = getComputedStyle(document.documentElement);
    const currentColor = rootStyles.getPropertyValue('--color-primary').trim();

    // Controlla se il tema è stato correttamente applicato
    if (document.body.classList.contains('dark-mode') && currentColor === 'expected-dark-color') {
        drawVisualization();
    } else {
        // Ricontrolla dopo 100 ms se la condizione non è soddisfatta
        setTimeout(checkAndRedraw, 100);
    }
}

// Al caricamento della pagina, controlla il tema nel localStorage o la preferenza di sistema
window.addEventListener("load", function() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Imposta il tema in base a quanto salvato o alla preferenza di sistema
    document.getElementById("theme-link").setAttribute("href", "/css/" + (savedTheme || (prefersDark ? "dark" : "light")) + ".css");
});

// Aggiunge un event listener al link per cambiare tema
document.getElementById("theme-link-switcher").addEventListener("click", switchTheme);
document.getElementById("theme-link-switcher").addEventListener("click", drawVisualization);
