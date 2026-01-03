document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("track-grid");
  const gameItems = games
    .filter((g) => g.type === "Game" && g.year == currentYear)
    .map((g) => ({ ...g, scoreNum: g.score ? parseFloat(g.score) : 0 }));

  function createGameCard(game, extraClass = "") {
    const card = document.createElement("div");
    card.className = `trackcard ${extraClass}`;
    card.innerHTML = `<div class="image-wrapper">
      <img class="trackcard-image" src="${game.banner}" alt="${game.title}" loading="lazy">
    </div>`;
    return card;
  }

  function createPlaceholderCard(count, expanded, onClick) {
    const card = document.createElement("div");
    card.className = "trackcard placeholder-card";
    // card.innerHTML = `<div class="placeholder-inner">${expanded ? "−" : "+"}${count ? ` ${count}` : ""}</div>`;
    card.innerHTML = `<div class="placeholder-inner">${expanded ? "−" : "+"}</div>`;
    card.addEventListener("click", onClick);
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
    const gamesPlayed = gameItems.filter((g) => g.last).length;
    const gamesCompleted = gameItems.filter((g) => g.last && g.status === "Completed").length;
    const completedWithScore = gameItems.filter((g) => g.last && g.status === "Completed" && g.scoreNum > 0);
    const averageScore = completedWithScore.length
      ? (completedWithScore.reduce((s, g) => s + g.scoreNum, 0) / completedWithScore.length).toFixed(2)
      : 0;

    const section = document.createElement("div");
    section.className = "track-section";
    section.innerHTML = `<h2>Stats</h2>
      <ul class="stats-list">
        <li>Played Games: ${gamesPlayed}</li>
        <li>Completed Games: ${gamesCompleted}</li>
        <li>Score Average of completed games: ${averageScore}</li>
      </ul>`;
    grid.appendChild(section);
  }

  function renderAwardList() {
    const section = document.createElement("div");
    section.className = "track-section";
    section.innerHTML = `<h2>Awards</h2>`;
    const ul = document.createElement("ul");
    ul.className = "award-list";
    game_awards
      .filter((a) => gameItems.some((g) => g.year == currentYear && g[a.key] === "TRUE"))
      .forEach((a) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#${a.key}">${a.title}</a>`;
        ul.appendChild(li);
      });
    section.appendChild(ul);
    section.appendChild(document.createElement("hr"));
    grid.appendChild(section);
  }

  function renderAwards() {
    const categoryMap = {};
    const redundantGames = new Set();

    game_awards.forEach((a) => {
      if (!categoryMap[a.category]) categoryMap[a.category] = [];
      categoryMap[a.category].push(a);
    });

    Object.values(categoryMap).forEach((awards) => {
      const categorySection = document.createElement("div");
      categorySection.className = "track-section";

      awards.forEach((award) => {
        const awarded = gameItems.filter((g) => g[award.key] === "TRUE").sort((a, b) => b.scoreNum - a.scoreNum);

        if (!awarded.length) return;

        let visible = [];
        let hidden = [];

        if (award.redundant === "TRUE") {
          visible = awarded;
          awarded.forEach((g) => redundantGames.add(g.title));
        } else {
          visible = awarded.filter((g) => !redundantGames.has(g.title));
          hidden = awarded.filter((g) => redundantGames.has(g.title));
        }

        if (!visible.length && !hidden.length) return;

        let expanded = false;

        const section = document.createElement("div");
        section.className = "track-section";
        section.id = award.key;
        section.innerHTML = `<h2>${award.title}</h2><p>${award.description}</p>`;

        const gridSection = document.createElement("div");
        gridSection.className = "track-section-grid";

        visible.forEach((g) => gridSection.appendChild(createGameCard(g)));

        if (hidden.length) {
          let hiddenNodes = [];

          const toggle = () => {
            if (!expanded) {
              hiddenNodes = hidden.map((g) => createGameCard(g, "redundant-card"));
              hiddenNodes.forEach((node) => {
                node.classList.add("hidden-game"); // aggiunge la classe per desaturazione
                gridSection.insertBefore(node, placeholder); // inserisce prima della placeholder
              });
              // Aggiorna solo il testo del placeholder
              placeholder.querySelector(".placeholder-inner").textContent = `−`;
            } else {
              hiddenNodes.forEach((n) => n.remove()); // rimuove i nodi creati
              placeholder.querySelector(".placeholder-inner").textContent = `+`;
            }
            expanded = !expanded;
          };

          const placeholder = createPlaceholderCard(hidden.length, expanded, toggle);
          gridSection.appendChild(placeholder);
        }

        section.appendChild(gridSection);
        categorySection.appendChild(section);
        categorySection.appendChild(document.createElement("hr"));
      });

      grid.appendChild(categorySection);
    });

    const notFinishedGames = gameItems
      .filter((g) => !game_awards.some((a) => g[a.key] === "TRUE") && g.status !== "Completed")
      .sort((a, b) => b.scoreNum - a.scoreNum);
    if (notFinishedGames.length) {
      const section = document.createElement("div");
      section.className = "track-section";
      section.innerHTML = `<p class="not-award-title"><b>Games not finished and without awards</b></p>`;
      const sectionGrid = document.createElement("div");
      sectionGrid.className = "track-section-grid";
      notFinishedGames.forEach((g) => {
        const card = document.createElement("div");
        card.className = "trackcard not-award-card";
        card.innerHTML = `<div class="image-wrapper"><img class="trackcard-image" src="${g.banner}" alt="${g.title}" loading="lazy"></div>`;
        sectionGrid.appendChild(card);
      });
      section.appendChild(sectionGrid);
      grid.appendChild(section);
    }

    const otherGames = gameItems
      .filter((g) => !game_awards.some((a) => g[a.key] === "TRUE") && g.status === "Completed")
      .sort((a, b) => b.scoreNum - a.scoreNum);
    if (otherGames.length) {
      const section = document.createElement("div");
      section.className = "track-section";
      section.innerHTML = `<hr><p class="not-award-title"><b>Other titles without awards</b></p>`;
      const sectionGrid = document.createElement("div");
      sectionGrid.className = "track-section-grid";
      otherGames.forEach((g) => {
        const card = document.createElement("div");
        card.className = "trackcard not-award-card";
        card.innerHTML = `<div class="image-wrapper"><img class="trackcard-image" src="${g.banner}" alt="${g.title}" loading="lazy"></div>`;
        sectionGrid.appendChild(card);
      });
      section.appendChild(sectionGrid);
      section.appendChild(document.createElement("hr"));
      grid.appendChild(section);
    }
  }

  renderHome();
  renderStatistics();
  renderAwardList();
  renderAwards();
});
