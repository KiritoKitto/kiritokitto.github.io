// Funzione per caricare il tema
function loadTheme(theme) {
    const themeLink = document.createElement("link");
    themeLink.id = "theme-link"; // Assegna un ID per il link
    themeLink.rel = "stylesheet";
    themeLink.href = `{{ '/css/${theme}.css' | relative_url }}`; // Usa il tema passato come argomento
    document.head.appendChild(themeLink); // Aggiungi il link al <head>
}

// Funzione per cambiare il tema
function switchTheme(event) {
    event.preventDefault();  // Evita il comportamento predefinito del link

    const currentTheme = document.getElementById("theme-link").getAttribute("href");

    // Cambia il tema e salva la scelta nel localStorage
    if (currentTheme.includes("dark.css")) {
        loadTheme("light"); // Carica il tema chiaro
        localStorage.setItem("theme", "light");
    } else {
        loadTheme("dark"); // Carica il tema scuro
        localStorage.setItem("theme", "dark");
    }
}

// Al caricamento della pagina, controlla il tema nel localStorage
window.addEventListener("load", function() {
    const savedTheme = localStorage.getItem("theme") || "dark"; // Imposta il tema di default a "dark"

    loadTheme(savedTheme); // Carica il tema salvato o quello di default
});

// Aggiungi un event listener al link per cambiare tema
document.getElementById("theme-link-switcher").addEventListener("click", switchTheme);