document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("track-grid");
  const gameItems = games.filter(g => g.type === "Game" && g.year == currentYear)
    .map(g => ({ ...g, scoreNum: g.score ? parseFloat(g.score) : 0 }));

  function getBadgesForGame(game) {
    return game_awards.filter(a => game[a.key] === "TRUE" && a.badge_path && a.badge_color)
      .map(a => ({ badge_path: a.badge_path, badge_color: a.badge_color }));
  }

  function createBadge(badge) {
    return `<span class="badge" style="--badge-color:${badge.badge_color}">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d="${badge.badge_path}" fill="white"/>
      </svg></span>`;
  }

  function createGameCard(game, extraClass = "") {
    const badgeHTML = "";
    const card = document.createElement("div");
    card.className = `trackcard ${extraClass}`;
    card.innerHTML = `${badgeHTML}<div class="image-wrapper"><img class="trackcard-image" src="${game.banner}" alt="${game.title}" loading="lazy"></div>`;
    return card;
  }

  function renderHome() {
    const section = document.createElement("div");
    section.innerHTML = `<h2>Year in Videogames ${currentYear}</h2>
      <p>Welcome to the ${currentYear} edition of the <b>Year in Videogames</b>: an annual series to celebrate and remember all the games I played during the year.</p>
      <ul><li><a href="/year-in-videogames">Rules and list of all editions</a></li></ul>
      <hr style="margin-bottom:0px;">`;
    grid.appendChild(section);
  }

  function renderStatistics() {
    const gamesPlayed = gameItems.filter(g => g.last).length;
    const gamesCompleted = gameItems.filter(g => g.last && g.status === "Completed").length;
    const completedWithScore = gameItems.filter(g => g.last && g.status === "Completed" && g.scoreNum > 0);
    const averageScore = completedWithScore.length ? (completedWithScore.reduce((sum, g) => sum + g.scoreNum, 0) / completedWithScore.length).toFixed(2) : 0;
    const section = document.createElement("div");
    section.className = "track-section";
    section.innerHTML = `<h2>Stats</h2><ul class="stats-list"><li>Played Games: ${gamesPlayed}</li><li>Completed Games: ${gamesCompleted}</li><li>Score Average of completed games: ${averageScore}</li></ul>`;
    grid.appendChild(section);
  }

  function renderAwardList() {
    const section = document.createElement("div");
    section.className = "track-section";
    section.innerHTML = `<h2>Awards</h2>`;
    const ul = document.createElement("ul");
    ul.className = "award-list";
    game_awards.forEach(a => { const li = document.createElement("li"); li.innerHTML = `<a href="#${a.key}">${a.title}</a>`; ul.appendChild(li); });
    section.appendChild(ul); section.appendChild(document.createElement("hr")); grid.appendChild(section);
  }

  function renderAwards() {
    const categoryMap = {}, redundantGamesKeys = new Set();
    game_awards.forEach(a => { if (!categoryMap[a.category]) categoryMap[a.category] = []; categoryMap[a.category].push(a); });
    Object.keys(categoryMap).forEach(category => {
      const categorySection = document.createElement("div"); categorySection.className = "track-section";
      categoryMap[category].forEach(award => {
        let awardedGames = gameItems.filter(g => g[award.key] === "TRUE").sort((a, b) => b.scoreNum - a.scoreNum);
        if (!awardedGames.length) return;
        let filteredGames = award.redundant === "TRUE" ? awardedGames : awardedGames.filter(g => !redundantGamesKeys.has(g.title));
        if (!filteredGames.length) return;
        if (award.redundant === "TRUE") awardedGames.forEach(g => redundantGamesKeys.add(g.title));
        const section = document.createElement("div"); section.className = "track-section"; section.id = award.key;
        section.innerHTML = `<h2>${award.title}</h2><p>${award.description}</p>`;
        const sectionGrid = document.createElement("div"); sectionGrid.className = "track-section-grid";
        filteredGames.forEach(g => sectionGrid.appendChild(createGameCard(g)));
        section.appendChild(sectionGrid); categorySection.appendChild(section); categorySection.appendChild(document.createElement("hr"));
      });
      grid.appendChild(categorySection);
    });

    const notFinishedGames = gameItems.filter(g => !game_awards.some(a => g[a.key] === "TRUE") && g.status !== "Completed").sort((a, b) => b.scoreNum - a.scoreNum);
    if (notFinishedGames.length) { const section = document.createElement("div"); section.className = "track-section"; section.innerHTML = `<p class="not-award-title"><b>Games not finished and without awards</b></p>`; const sectionGrid = document.createElement("div"); sectionGrid.className = "track-section-grid"; notFinishedGames.forEach(g => { const card = document.createElement("div"); card.className = "trackcard not-award-card"; card.innerHTML = `<div class="image-wrapper"><img class="trackcard-image" src="${g.banner}" alt="${g.title}" loading="lazy"></div>`; sectionGrid.appendChild(card); }); section.appendChild(sectionGrid); grid.appendChild(section); }

    const otherGames = gameItems.filter(g => !game_awards.some(a => g[a.key] === "TRUE") && g.status === "Completed").sort((a, b) => b.scoreNum - a.scoreNum);
    if (otherGames.length) { const section = document.createElement("div"); section.className = "track-section"; section.innerHTML = `<hr><p class="not-award-title"><b>Other titles without awards</b></p>`; const sectionGrid = document.createElement("div"); sectionGrid.className = "track-section-grid"; otherGames.forEach(g => { const card = document.createElement("div"); card.className = "trackcard not-award-card"; card.innerHTML = `<div class="image-wrapper"><img class="trackcard-image" src="${g.banner}" alt="${g.title}" loading="lazy"></div>`; sectionGrid.appendChild(card); }); section.appendChild(sectionGrid); section.appendChild(document.createElement("hr")); grid.appendChild(section); }
  }

  function renderScoreCategories() {
    const highScores = gameItems.filter(g => g.scoreNum >= 9).sort((a, b) => b.scoreNum - a.scoreNum);
    const goodScores = gameItems.filter(g => g.scoreNum >= 7 && g.scoreNum < 9).sort((a, b) => b.scoreNum - a.scoreNum);
    const others = gameItems.filter(g => g.scoreNum < 7).sort((a, b) => b.scoreNum - a.scoreNum);
    renderScoreSection("Top Rated Games (9–10)", highScores);
    renderScoreSection("Good Games (7–8)", goodScores);
    renderScoreSection("Other Games", others);
  }

  function renderScoreSection(title, games) {
    if (!games.length) return;
    const section = document.createElement("div"); section.className = "track-section"; section.innerHTML = `<hr><h2>${title}</h2>`;
    const gridSection = document.createElement("div"); gridSection.className = "track-section-grid";
    games.forEach(g => gridSection.appendChild(createGameCard(g)));
    section.appendChild(gridSection); grid.appendChild(section);
  }

  renderHome();
  renderStatistics();
  renderAwardList();
  renderAwards();
  // renderScoreCategories();
});
