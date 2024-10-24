// Funzione per cambiare il tema
function switchTheme(event) {
    event.preventDefault();  // Evita che il link faccia il comportamento predefinito

    const themeLink = document.getElementById("theme-link");
    const currentTheme = themeLink.getAttribute("href");

    // Cambia il tema e salva la scelta nel localStorage
    if (currentTheme === "css/light.css") {
        themeLink.setAttribute("href", "css/dark.css");
        localStorage.setItem("theme", "dark");
    } else {
        themeLink.setAttribute("href", "css/light.css");
        localStorage.setItem("theme", "light");
    }
}

// Al caricamento della pagina, controlla il tema nel localStorage
window.addEventListener("load", function() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        // Se c'è un tema salvato, applicalo
        document.getElementById("theme-link").setAttribute("href", savedTheme + ".css");
    }
});

// Aggiungi un event listener al link per cambiare tema
document.getElementById("theme-link-switcher").addEventListener("click", switchTheme);
