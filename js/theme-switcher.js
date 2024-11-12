// Funzione per cambiare il tema
function switchTheme(event) {
    event.preventDefault();  // Evita il comportamento predefinito del link

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

    // Chiama la funzione drawVisualization dopo aver cambiato il tema
    drawVisualization();
}


// Al caricamento della pagina, controlla il tema nel localStorage o la preferenza di sistema
window.addEventListener("load", function() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Se c'è un tema salvato, applicalo; altrimenti imposta secondo il sistema (se disponibile)
    if (savedTheme) {
        document.getElementById("theme-link").setAttribute("href", "/css/" + savedTheme + ".css");
    } else {
        document.getElementById("theme-link").setAttribute("href", prefersDark ? "/css/dark.css" : "/css/light.css");
    }
});

// Aggiungi un event listener al link per cambiare tema
document.getElementById("theme-link-switcher").addEventListener("click", switchTheme);