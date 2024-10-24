// Funzione per cambiare il tema
function switchTheme(event) {
    event.preventDefault();  // Evita il comportamento predefinito del link
    const themeLink = document.getElementById("theme-link");
    const currentTheme = themeLink.getAttribute("href");

    // Cambia il tema e salva la scelta nel localStorage
    if (currentTheme === "css/dark.css") {
        themeLink.setAttribute("href", "css/light.css");
        localStorage.setItem("theme", "light");
    } else {
        themeLink.setAttribute("href", "css/dark.css");
        localStorage.setItem("theme", "dark");
    }
}

// Al caricamento della pagina, controlla il tema nel localStorage
window.addEventListener("load", function() {
    const savedTheme = localStorage.getItem("theme");

    // Se c'è un tema salvato
    if (savedTheme === "dark") {
        document.getElementById("theme-link").setAttribute("href", "css/dark.css");
    } else if (savedTheme === "light") {
        document.getElementById("theme-link").setAttribute("href", "css/light.css");
    } else {
        document.getElementById("theme-link").setAttribute("href", "css/dark.css");
        localStorage.setItem("theme", "dark"); // Imposta light come default per i nuovi visitatori
    }
});

// Aggiungi un event listener al link per cambiare tema
document.getElementById("theme-link-switcher").addEventListener("click", switchTheme);