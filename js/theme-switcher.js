// Funzione per cambiare il tema
function switchTheme(event) {
    event.preventDefault();  // Evita il comportamento predefinito del link

    const themeLink = document.getElementById("theme-link");
    const currentTheme = themeLink.getAttribute("href");

    // Cambia il tema e salva la scelta nel localStorage
    if (currentTheme === "css/light.css") {
        themeLink.setAttribute("href", "/css/dark.css");
        localStorage.setItem("theme", "dark");
    } else {
        themeLink.setAttribute("href", "/css/light.css");
        localStorage.setItem("theme", "light");
    }
}

// Al caricamento della pagina, controlla il tema nel localStorage
window.addEventListener("load", function() {
    const savedTheme = localStorage.getItem("theme");

    // Se c'è un tema salvato, applicalo; altrimenti imposta il tema di default (light.css)
    if (savedTheme) {
        document.getElementById("theme-link").setAttribute("href", "/css/" + savedTheme + ".css");
    } else {
        document.getElementById("theme-link").setAttribute("href", "/css/dark.css");
    }
});

// Aggiungi un event listener al link per cambiare tema
document.getElementById("theme-link-switcher").addEventListener("click", switchTheme);