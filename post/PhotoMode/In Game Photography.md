---
layout: "default"
permalink: "/in-game-photography"
---

# In-Game Photography

---

<style> @import url("/post/PhotoMode/photomode.css"); </style>
<div id="container"></div>
<script type="module">
import { seasons } from "{{ '/post/PhotoMode/scriptListGames.js' | relative_url }}";
const thumbSize = 800;
const container = document.getElementById('container');
seasons.forEach(season => {
    if (!season.show) return;

    const card = document.createElement('div');
    card.classList.add('trail-card');

    const img = document.createElement('img');
    img.src = "https://lh3.googleusercontent.com/d/" + season.banner + "=w" + thumbSize;

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
    card.addEventListener("click", () => {window.location.href = "/" + encodeURIComponent(season.path);});
});

const tres = 0.7
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio >= tres) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  },
  {
    threshold: [0, tres, 1]
  }
);

document.querySelectorAll('.trail-card img').forEach(img => {
  observer.observe(img);
});
</script>
---
