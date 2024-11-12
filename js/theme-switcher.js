// Funzione per cambiare il tema
function switchTheme(event) {
    event.preventDefault();

    const themeLink = document.getElementById("theme-link");
    const currentTheme = themeLink.getAttribute("href");
    handleThemeLoad();

    // Cambia il tema e salva la scelta nel localStorage
    if (currentTheme === "/css/light.css") {
        themeLink.setAttribute("href", "/css/dark.css");
        localStorage.setItem("theme", "dark");
        handleThemeLoad();
    } else {
        themeLink.setAttribute("href", "/css/light.css");
        localStorage.setItem("theme", "light");
        handleThemeLoad();
    }

    // Rimuove qualsiasi listener precedente per evitare duplicazioni
    themeLink.removeEventListener("load", handleThemeLoad);

    // Aggiunge il listener `load` per ridisegnare il grafico al caricamento del tema
    themeLink.addEventListener("load", handleThemeLoad);
}

let graphbaseprimary, graphbasesecondary, font, colorPrimary, colorSecondary;

function handleThemeLoad() {
    setTimeout(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        graphbaseprimary = rootStyles.getPropertyValue('--graph-base-primary').trim();
        graphbasesecondary = rootStyles.getPropertyValue('--graph-base-secondary').trim();
        font = rootStyles.getPropertyValue('--font').trim();
        colorPrimary = rootStyles.getPropertyValue('--color-primary').trim();
        colorSecondary = rootStyles.getPropertyValue('--color-secondary').trim();
        drawVisualization();
    }, 500);
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
