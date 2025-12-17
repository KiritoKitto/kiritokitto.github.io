---
layout: "default"
permalink: "/in-game-photography"
---

# In-Game Photography

---

<style> @import url("css/showroom.css"); </style>

<div id="container"></div>
<script src= "{{ '/js/list/photomod.js' | relative_url }}"></script>
    
<script>
const container = document.getElementById('container');
seasons.forEach(season => {
    if (!season.show) return;

    const card = document.createElement('div');
    card.classList.add('trail-card');

    const img = document.createElement('img');
    img.src = season.banner;

    const info = document.createElement('div');
    info.classList.add('trail-info');

    const title = document.createElement('div');
    title.textContent = season.title;
    title.classList.add('trail-title');

    const date = document.createElement('div');
    date.textContent = season.date;
    date.classList.add('trail-date');

    card.appendChild(img);
    card.appendChild(info);
    info.appendChild(title);
    info.appendChild(date);
    container.appendChild(card);

    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
        window.location.href = "/" + encodeURIComponent(season.path);
    });
});
    
const observer = new IntersectionObserver(
    entries => {entries.forEach(entry => {
        if (entry.intersectionRatio === 1) { entry.target.classList.add('is-visible');} 
        else {entry.target.classList.remove('is-visible');}});},
    {threshold: 1.0}
);
document.querySelectorAll('.trail-card').forEach(card => {observer.observe(card);});
</script>
---
