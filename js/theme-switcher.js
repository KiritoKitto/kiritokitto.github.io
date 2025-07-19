function switchTheme(event) {
    event.preventDefault();

    const themeLink = document.getElementById("theme-link");
    const currentTheme = themeLink.getAttribute("href");
    handleThemeLoad();

    if (currentTheme === "/css/light.css") {
        themeLink.setAttribute("href", "/css/dark.css");
        localStorage.setItem("theme", "dark");
        handleThemeLoad();
    } else {
        themeLink.setAttribute("href", "/css/light.css");
        localStorage.setItem("theme", "light");
        handleThemeLoad();
    }

    themeLink.removeEventListener("load", handleThemeLoad);
    themeLink.addEventListener("load", handleThemeLoad);
}

window.addEventListener("load", function() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.getElementById("theme-link").setAttribute("href", "/css/" + (savedTheme || (prefersDark ? "dark" : "light")) + ".css");
});

function handleThemeLoad() { setTimeout(() => {drawVisualization();}, 500);}
document.getElementById("theme-link-switcher").addEventListener("click", switchTheme);