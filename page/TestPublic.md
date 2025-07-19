---
layout: default
permalink: "/test2518109"
---

<style>

.track-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 80px));
  gap: 0.1rem 0.3rem;
  justify-content: space-between;
}
.trackcard {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.trackcard-image {
  width: 100%;
  border: 1px solid var(--color-background-tertiary);
  border-radius: 5px;
  object-fit: cover;
  aspect-ratio: 0.75;
  transition: transform 0.2s ease;
  transition: opacity 0.2s ease;
}

.image-wrapper:hover .trackcard-image {
  opacity: 0.15;
}

.trackcard-image.favorite { border: 2px solid var(--color-highlight); }

.card-content { font-size: calc(0.7*var(--font-size)); }

.card-content.favorite { color: var(--color-highlight); }

.track-filters {
  /* justify-content: center; */
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  font-size: calc(0.7*var(--font-size));
}

.track-filters button {
  padding: 0.4rem 1rem 0.3rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-tertiary);
  border-radius: 8px;
  color: var(--color-secondary);
  cursor: pointer;
  transition: 0.3s;
}

.track-filters button.active, .track-filters button:hover {
  background-color: var(--color-background-secondary);
  color: var(--color-secondary);
}

.track-filters button.active { font-weight: bold; }

button.disabled, button:disabled { opacity: 0.4; }

.image-wrapper {
  position: relative;
  width: 100%;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
  opacity: 0;
  font-weight: bold;
  font-size: 0.75rem;
  text-align: center;
  padding: 0.5rem;
  transition: opacity 0.2s ease;
  border-radius: 5px;
}

.image-wrapper:hover .image-overlay {
  opacity: 1;
}

</style>

## All-Tracker

**All-Tracker** è un recap di tutti i Giochi, Anime, Film e Serie TV che ho iniziato. 

Questa pagina e la lista stessa sono ancora in sviluppo e non definitivi. Alcuni dati potrebbero essere placeholder.

---

<div class="track-filters">
<button class="track-type-btn active" data-type="All">All</button>
<button class="track-type-btn" data-type="Game">Games</button>
<button class="track-type-btn" data-type="Anime">Anime</button>
<button class="track-type-btn" data-type="Cinema">Cinema</button>
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

<div style="display:none;">

  <div style="width:50%;">
    <p id="counter">0</p>
    <p>Titoli presenti</p>
  </div>

  <div style="width:50%;">
    <p id="average">0</p>
    <p>Average voti</p>
  </div>

</div>

<div id="track-summary" style="margin: 1rem 0; font-size: calc(0.7*var(--font-size)); color: var(--color-secondary);"></div>
<div class="track-grid" id="track-grid"></div>
<script src= "{{ '/js/tracker-list.js' | relative_url }}"></script>

---

*Ultimo aggiornamento: Luglio 2025*

<script>
const grid = document.getElementById("track-grid");
const statusButtons = document.querySelectorAll(".track-status-btn");
const yearButtons = document.querySelectorAll(".track-year-btn");
const typeButtons = document.querySelectorAll(".track-type-btn");
const favButtons = document.querySelectorAll(".track-fav-btn");

let currentStatus = "All";
let currentYear = "All";
let currentType = "All";
let currentFav = "Favorites";

function updateButtonStates() {
  const filteredGames = games.filter(game =>
    (currentStatus === "All" || game.status === currentStatus) &&
    (currentYear === "All" || game.year === currentYear) &&
    (currentType === "All" || game.type === currentType) &&
    (currentFav === "All" || (currentFav === "Favorites" && game.fav === "TRUE"))
  );

  function toggleButtons(buttons, key, valueMapper) {
    const valuesInFiltered = new Set(filteredGames.map(game => valueMapper(game)));

    buttons.forEach(button => {
      const value = button.dataset[key];

      const alwaysActive = (key === "fav")
        ? (value === "All" || value === "Favorites")
        : value === "All";

      if (alwaysActive) {
        button.removeAttribute("disabled");
        button.style.opacity = "1";
        button.style.pointerEvents = "auto";
      } else {
        const isAvailable = valuesInFiltered.has(value);
        if (isAvailable) {
          button.removeAttribute("disabled");
          button.style.opacity = "1";
          button.style.pointerEvents = "auto";
        } else {
          button.setAttribute("disabled", "true");
          button.style.opacity = "0.4";
          button.style.pointerEvents = "none";
        }
      }
    });
  }

  toggleButtons(statusButtons, "status", g => g.status);
  toggleButtons(yearButtons, "year", g => g.year);
  toggleButtons(typeButtons, "type", g => g.type);
  toggleButtons(favButtons, "fav", g => (g.fav === "TRUE" ? "Favorites" : "All"));
}

function renderCards() {
  grid.innerHTML = '';
  const filtered = games
    .filter(game =>
      (currentStatus === "All" || game.status === currentStatus) &&
      (currentYear === "All" || game.year === currentYear) &&
      (currentType === "All" || game.type === currentType) &&
      (currentFav === "All" || game.fav === "TRUE")
    )
    .sort((a, b) => parseInt(b.order) - parseInt(a.order));

  // Aggiorna conteggio e media
  const summaryDiv = document.getElementById("track-summary");
  const counter = document.getElementById("counter");
  const totalCount = filtered.length;

  const completedWithScore = filtered.filter(g =>
    g.status === "Completed" &&
    typeof g.score !== 'undefined' &&
    g.score !== "" &&
    !isNaN(parseFloat(g.score))
  );

  const avgScore = completedWithScore.length
    ? (completedWithScore.reduce((acc, g) => acc + parseFloat(g.score), 0) / completedWithScore.length).toFixed(2)
    : "-";

  counter.innerHTML = `${totalCount}`
  average.innerHTML = `${avgScore}`

  if (filtered.length === 0) {
    grid.innerHTML = '<div style="padding:1rem; color:#999;">//</div>';
    return;
  }

  filtered.forEach(g => {
    const card = document.createElement('div');
    card.className = 'trackcard';
    card.innerHTML = `
      <div class="image-wrapper">
        <img class="trackcard-image${g.fav === "TRUE" ? ' favorite' : ''}" src="${g.banner}" alt="${g.title}">
        <div class="image-overlay">${g.title}${g.score && g.status === "Completed" && g.type === "Game" ? `<br><br>★ ${g.score}` : ""}</div>
      </div>
      <div class="card-content">
        ${g.last}, ${g.year}
      </div>`;
    grid.appendChild(card);
  });

  updateButtonStates();
}


statusButtons.forEach(button => {
  button.addEventListener('click', () => {
    statusButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    currentStatus = button.dataset.status;
    renderCards();
  });
});

yearButtons.forEach(button => {
  button.addEventListener('click', () => {
    yearButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    currentYear = button.dataset.year;
    renderCards();
  });
});

typeButtons.forEach(button => {
  button.addEventListener('click', () => {
    typeButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    currentType = button.dataset.type;
    renderCards();
  });
});

favButtons.forEach(button => {
  button.addEventListener("click", () => {
    favButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentFav = button.dataset.fav;
    renderCards();
  });
});

renderCards();