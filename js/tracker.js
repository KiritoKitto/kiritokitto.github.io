const games = [
{ title: "Inazuma Eleven: Victory Road", type: "Game", last: "45413", score: "", status: "Retired", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9nsw.jpg" },
{ title: "Split Fiction", type: "Game", last: "45717", score: "9", status: "Completed", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co95gf.jpg" },
{ title: "Blue Prince", type: "Game", last: "45748", score: "8", status: "Completed", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9mzd.jpg" },
{ title: "Clair Obscur: Expedition 33", type: "Game", last: "45778", score: "10", status: "Completed", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9gam.jpg" },
{ title: "The Midnight Walk", type: "Game", last: "45778", score: "7", status: "Completed", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8ur3.jpg" },
{ title: "Elden Ring: Nightreign", type: "Game", last: "45809", score: "6", status: "Abandoned", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co95gk.jpg" },
{ title: "Rematch", type: "Game", last: "45809", score: "8", status: "Retired", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co95fx.jpg" },
];

const grid = document.getElementById("grid");
const buttons = document.querySelectorAll(".filter-btn");

function renderCards(statusFilter = "All") {
    grid.innerHTML = '';
    games
    .filter(game => statusFilter === "All" || game.status === statusFilter)
    .forEach(g => {
        const card = document.createElement('div');
        card.className = 'trackcard';
        card.innerHTML = `
        <img class="trackcard-image" src="${g.banner}" alt="${g.title}">
        <div class="card-content">${g.status}</div>`;
        grid.appendChild(card);
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    renderCards(button.dataset.status);
    });
});

// Initial render
renderCards();