document.getElementById("theme-button").addEventListener("click", function() {
    // Prendi il link dell'attuale tema
    const themeLink = document.getElementById("theme-link");
    
    // Se il tema è chiaro, cambia a scuro, altrimenti cambia a chiaro
    if (themeLink.getAttribute("href") === "css/light.css") {
        themeLink.setAttribute("href", "css/dark.css");
    } else {
        themeLink.setAttribute("href", "css/light.css");
    }
});
