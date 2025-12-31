
const grid = document.getElementById("track-grid");

// Prepara giochi con score numerico
const gameItems = games
  .filter(g => g.type === "Game" && g.year == currentYear)
  .map(g => ({ ...g, scoreNum: g.score ? parseFloat(g.score) : 0 }));

// ===== 1️⃣ start =====
function renderHome() {

  const section = document.createElement("div");
  section.innerHTML = `
    <h2>Year in Videogames ${currentYear}</h2>
    <p> Welcome to the ${currentYear} edition of the <b>Year in Videogames</b>: an annual series to celebrate and remember all the games I played during the year.</p>
    <ul><li><a href="/year-in-videogames">Rules and list of all Editions</a></li></ul>
    <hr style="margin-bottom:0px;">
  `;
  grid.appendChild(section);
}

// ===== 1️⃣ Statistiche =====
function renderStatistics() {
  const gamesPlayed = gameItems.filter(g => g.last).length;
  const gamesCompleted = gameItems.filter(g => g.last && g.status === "Completed").length;
  const completedWithScore = gameItems.filter(g => g.last && g.status === "Completed" && g.scoreNum > 0);
  const averageScore = completedWithScore.length
    ? (completedWithScore.reduce((sum, g) => sum + g.scoreNum, 0) / completedWithScore.length).toFixed(2)
    : 0;

  const section = document.createElement("div");
  section.className = "track-section";
  section.innerHTML = `
    <h2>Stats</h2>
    <ul class="stats-list">
      <li>Played Games: ${gamesPlayed}</li>
      <li>Completed Games: ${gamesCompleted}</li>
      <li>Score Average of completed games: ${averageScore}</li>
    </ul>
  `;
  grid.appendChild(section);
}

// ===== 2️⃣ Premi linkabili =====
function renderAwardList() {
  const section = document.createElement("div");
  section.className = "track-section";
  section.innerHTML = `<h2>Awards</h2>`;

  const ul = document.createElement("ul");
  ul.className = "award-list";

  game_awards.forEach(a => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#${a.key}">${a.title}</a>`;
    ul.appendChild(li);
  });

  section.appendChild(ul);
  grid.appendChild(section);
}

// ===== 3️⃣ Sezioni giochi =====
function renderAwards() {
  // Premi veri e propri
  game_awards.forEach(award => {
    const awardedGames = gameItems
      .filter(g => g[award.key] === "TRUE")
      .sort((a,b) => b.scoreNum - a.scoreNum);
    if (!awardedGames.length) return;

    const section = document.createElement("div");
    section.className = "track-section";
    section.id = award.key; // ID per link nella lista premi
    
    
    section.innerHTML = `<hr><p><b>${award.title}</b>: ${award.description}</p>`;

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
    grid.appendChild(section);
  });

  // Not finished
  const notFinishedGames = gameItems
    .filter(g => !game_awards.some(a => g[a.key] === "TRUE") && g.status !== "Completed")
    .sort((a,b) => b.scoreNum - a.scoreNum);

  if (notFinishedGames.length) {
    const section = document.createElement("div");
    section.className = "track-section";
    section.innerHTML = `<hr><p class="not-award-title"><b>Games that didn't won any award and that I did not finished</b></p>`;

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
    
    grid.appendChild(section);
  }

  // Other titles
  const otherGames = gameItems
    .filter(g => !game_awards.some(a => g[a.key] === "TRUE") && g.status === "Completed")
    .sort((a,b) => b.scoreNum - a.scoreNum);

  if (otherGames.length) {
    const section = document.createElement("div");
    section.className = "track-section";
    section.innerHTML = `<hr><p class="not-award-title"><b>Other titles that did not won any award</b></p>`;

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

// ===== Render tutto =====
renderHome();
renderStatistics();
renderAwardList();
renderAwards();
