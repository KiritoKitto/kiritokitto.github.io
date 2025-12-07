---
layout: default
permalink: "/tracker"
---

## All-Tracker

**All-Tracker** è una lista di Giochi, Anime, Film e Serie TV che ho iniziato.

*Ultima aggiornamento: Luglio 2025*

---

<div class="track-filters">
<button class="track-type-btn active" data-type="All">All</button>
<button class="track-type-btn" data-type="Game">Games</button>
<button class="track-type-btn" data-type="Movie">Movie</button>
  <button class="track-type-btn" data-type="Show">Show</button>
<button class="track-type-btn" data-type="Anime">Anime</button>
</div>

<div class="track-filters">
<button class="track-status-btn active" data-status="All">All</button>
<button class="track-status-btn" data-status="Completed">Completed</button>
<button class="track-status-btn" data-status="Paused">Not Finished</button>
</div>

<div class="track-filters">
<button class="track-year-btn active" data-year="All">All</button>
<button class="track-year-btn" data-year="2025">2025</button>
<button class="track-year-btn" data-year="2024">2024</button>
<button class="track-year-btn" data-year="2023">2023</button>
</div>

<div class="track-filters">
<button class="track-fav-btn" data-fav="All">All</button>
<button class="track-fav-btn active" data-fav="Favorites">Favorites</button>
</div>

<div style="display:flex;">

  <div style="width:50%; text-align:center;">
    <p id="counter" style="font-weight:bold; font-size:24px; margin:0;">0</p>
    <p style="font-style:italic; font-size:14px; margin:0;">Titoli presenti</p>
  </div>

  <div style="width:50%; text-align:center;">
    <p id="average" style="font-weight:bold; font-size:24px; margin:0;">0</p>
    <p style="font-style:italic; font-size:14px; margin:0;">Average voti</p>
  </div>

</div>

<div id="track-summary" style="margin: 1rem 0; font-size: calc(0.7*var(--font-size)); color: var(--color-secondary);"></div>
<div class="track-grid" id="track-grid"></div>
<script src= "{{ '/js/list/games.js' | relative_url }}"></script>
<script src= "{{ '/js/tracker-script.js' | relative_url }}"></script>