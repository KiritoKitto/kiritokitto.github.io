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

    // Aggiungi un listener per ridisegnare il grafico dopo che il nuovo tema è stato caricato
    themeLink.addEventListener("load", function onLoad() {
        drawVisualization();
    });
}

// Al caricamento della pagina, controlla il tema nel localStorage o la preferenza di sistema
window.addEventListener("load", function() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Imposta il tema in base a quanto salvato o alla preferenza di sistema
    document.getElementById("theme-link").setAttribute("href", "/css/" + (savedTheme || (prefersDark ? "dark" : "light")) + ".css");
});

// Aggiungi un event listener al link per cambiare tema
document.getElementById("theme-link-switcher").addEventListener("click", switchTheme);
document.getElementById("theme-link-switcher").addEventListener("click", drawVisualization);
