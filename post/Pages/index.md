---
layout: default
permalink: "/"
---

<style>
.random-screenshots {margin: 20px 0;}
.screenshot-card img {
    border-radius: var(--radius);
    display: block;
    margin: 10px 0;
    border: 1px solid var(--color-grey-40);
}
.profilepic {
    height: 100px;
    width: 100px;
    border-radius: var(--radius);
}
.random-awards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 5px;
    margin: 20px 0;
}

.award-card {
    overflow: hidden;
    border-radius: 5px;
    border: 1px solid var(--color-grey-40);
}
</style>

<br>
![Kitto](https://lh3.googleusercontent.com/d/1Q6qkpaN64m6wke8bibf6_sOkbGvBOL6-=w500){: .profilepic}

# Kirito Kitto

Videogame enthusiast and hiker. I enjoy both in-game and nature photography and work as a data analysis consultant.

---

## Year in Videogames

Annual series to celebrate and remember all the games I played during the years.

[Learn More >](/year-in-videogames){: .btn}

<style>

</style>

<div id="random-awards" class="random-awards"></div>

<script type="module">
import { games } from "/post/YearRecap/scriptListGame.js";
import { game_awards } from "/post/YearRecap/scriptListAward.js";
const container = document.getElementById("random-awards");
const validEntries = [];
games.forEach(game => {
    game_awards.forEach(award => {
    if (
        award.show === "TRUE" &&
        game[award.key] === "TRUE" &&
        Number(game.score) > 6 &&
        Number(game.year) < 2026
    )
{validEntries.push({game,award});}});});

const shuffled = [...validEntries].sort(() => Math.random() - 0.5);
const selected = shuffled.slice(0, 8);
selected.forEach(entry => {
    const { game, award } = entry;
    const card = document.createElement("div");
    card.className = "award-card";
    card.innerHTML = `
        <img src="${game.banner}" alt="${game.title}">`;
    container.appendChild(card);
});
</script>

---

## In-Game Photography

A new way to love videogames, after more than a decade of playing and exploring this medium and its many worlds.

[Full Gallery >](/in-game-photography){: .btn}


<div id="random-screenshots" class="random-screenshots"></div>
<script type="module">
import { gameScreenshots } from "/post/PhotoMode/scriptListScreenshots.js";
const container = document.getElementById("random-screenshots");
const shuffled = [...gameScreenshots].sort(() => Math.random() - 0.5);
const selected = shuffled.slice(0, 2);
selected.forEach(game => {
    const imageUrl = `https://drive.google.com/thumbnail?id=${game.id}&sz=w800`;
    const card = document.createElement("div");
    card.className = "screenshot-card";
    card.innerHTML = `<img src="${imageUrl}" alt="${game.title}">`;
    container.appendChild(card);
});
</script>

---

## Profiles

If you’d like to say hello or ask something, you can contact me on [Telegram](https://t.me/kiritokitto), where I also keep a diary to share my thoughts about what I play, watch and do.

* [Backloggd Profile >](https://www.backloggd.com/u/KiritoKitto/)
* [Telegram Diary >](https://t.me/+eYDpkG161AY4YzI0)

---
