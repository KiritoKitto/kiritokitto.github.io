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
        <div class="image-overlay">${g.title}${g.score && g.status === "Completed" ? `<br><br>★ ${g.score}` : ""}</div>
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