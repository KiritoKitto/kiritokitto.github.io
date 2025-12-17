---
layout: "default"
permalink: "/in-game-photography"
---

# In-Game Photography

---

<style> @import url("css/showroom.css"); </style>

<div id="container">
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
</script>
</div>
---
