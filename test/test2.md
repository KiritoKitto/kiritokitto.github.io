---
layout: default
year: 2023
permalink: "/2025t"
---

# 2025 IN VIDEOGAMES
KIRITO KITTO RECAP


<style>
    hr {
        margin: 15px 40px 25px;
    }
.track-grid {
  display: flex;
  flex-direction: column;
}

.track-section {
  width: 100%;
  display: block;
}

.track-section p {
  margin-top: 0px;
}

.track-section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 5px;
}

.trackcard .image-wrapper img {
  width: 100%;
  display: block;
}

.not-award-title {
  color: #888; /* grigio per titoli non premiati */
}

.not-award-card img {
  filter: grayscale(100%);
}
</style>

<div class="track-grid" id="track-grid"></div>
<script src="{{ '/js/list/games.js' | relative_url }}"></script>
<script src="{{ '/js/list/game-awards.js' | relative_url }}"></script>

<script>
const currentYear = {{ page.year }};
const grid = document.getElementById("track-grid");
const gameItems = games.filter(g => g.type === "Game" && g.year == currentYear);

function renderAwards() {
  grid.innerHTML = "";

  // 1️⃣ Sezioni premi
  game_awards.forEach(award => {
    const awardedGames = gameItems.filter(g => g[award.key] === "TRUE");
    if (!awardedGames.length) return;

    const section = document.createElement("div");
    section.className = "track-section";
    section.innerHTML = `<p><b>${award.title}</b>: ${award.description}</p>`;

    const sectionGrid = document.createElement("div");
    sectionGrid.className = "track-section-grid";

    awardedGames.forEach(g => {
      const card = document.createElement("div");
      card.className = "trackcard";
      card.innerHTML = `
        <div class="image-wrapper">
          <img class="trackcard-image" src="${g.banner}" alt="${g.title}" loading="lazy">
        </div>
      `;
      sectionGrid.appendChild(card);
    });

    section.appendChild(sectionGrid);
    section.appendChild(document.createElement("hr"));
    grid.appendChild(section);
  });

  // 2️⃣ Not finished
  const notFinishedGames = gameItems.filter(g => {
    const hasAward = game_awards.some(a => g[a.key] === "TRUE");
    return !hasAward && g.status !== "Completed";
  });

  if (notFinishedGames.length) {
    const section = document.createElement("div");
    section.className = "track-section";
    section.innerHTML = `<p class="not-award-title"><b>Not finished</b></p>`;

    const sectionGrid = document.createElement("div");
    sectionGrid.className = "track-section-grid";

    notFinishedGames.forEach(g => {
      const card = document.createElement("div");
      card.className = "trackcard not-award-card";
      card.innerHTML = `
        <div class="image-wrapper">
          <img class="trackcard-image" src="${g.banner}" alt="${g.title}" loading="lazy">
        </div>
      `;
      sectionGrid.appendChild(card);
    });

    section.appendChild(sectionGrid);
    section.appendChild(document.createElement("hr"));
    grid.appendChild(section);
  }

  // 3️⃣ Other titles
  const otherGames = gameItems.filter(g => {
    const hasAward = game_awards.some(a => g[a.key] === "TRUE");
    return !hasAward && g.status === "Completed";
  });

  if (otherGames.length) {
    const section = document.createElement("div");
    section.className = "track-section";
    section.innerHTML = `<p class="not-award-title"><b>Other titles</b></p>`;

    const sectionGrid = document.createElement("div");
    sectionGrid.className = "track-section-grid";

    otherGames.forEach(g => {
      const card = document.createElement("div");
      card.className = "trackcard not-award-card";
      card.innerHTML = `
        <div class="image-wrapper">
          <img class="trackcard-image" src="${g.banner}" alt="${g.title}" loading="lazy">
        </div>
      `;
      sectionGrid.appendChild(card);
    });

    section.appendChild(sectionGrid);
    section.appendChild(document.createElement("hr"));
    grid.appendChild(section);
  }
}

console.log(games, game_awards);
renderAwards();
</script>
