---
layout: "default"
permalink: "/into"
---

<img src="images/banners/into-the-wilds.jpg">

Il **Diario di un Viaggiatore** è una raccolta di pensieri diareschi scritti durante o subito dopo un viaggio. Potete leggere i post passati e commentare le future avventure nel [Diario di Kirito Kitto](https://t.me/+eYDpkG161AY4YzI0).

---

- <a href="#s4">S4 - RainFall</a>
- <a href="#s3">S3 - Into the Wilds 2</a>
- <a href="#s2">S2 - Into the Wilds</a>
- <a href="#s1">S1 - Oltre il Firmamento</a>

<hr id="s4">

<style>
  .season {
    margin-bottom: 2rem;
  }

  .trail-card {
    width: 200px; /* puoi adattare */
    background-color: var(--color-background-secondary);
    border-radius: 8px;
    overflow: hidden;
    margin: 0.5rem;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    font-family: sans-serif;
  }

  .trail-card img {
    width: 100%;
    height: 200px; /* altezza fissa per croppare in 1:1 */
    object-fit: cover;
  }

  .trail-info {
    padding: 0.5rem;
  }

  h3 {
    font-family: sans-serif;
    margin-top: 2rem;
  }
</style>

<div id="container"></div>

<script>
const seasons = [
  {
    title: "Season 4 - RainFall",
    year: "2025",
    trails: [
      { title: "Milano", date: "Dec 18", banner: "https://pub-6a75fc66f72e4a47a683fa56714dc173.r2.dev/Website/Into%20the%20Wilds/s4/milano/m2.jpg" },
      { title: "Barberino", date: "Dec 20", banner: "https://pub-6a75fc66f72e4a47a683fa56714dc173.r2.dev/Website/Into%20the%20Wilds/s4/barberino/b1.jpg" }
    ]
  },
  {
    title: "Season 3 - OK",
    year: "2024",
    trails: [
      { title: "Roma", date: "Dec 18", banner: "https://pub-6a75fc66f72e4a47a683fa56714dc173.r2.dev/Website/Into%20the%20Wilds/s4/roma/Roma01.jpg" }
    ]
  }
];

const container = document.getElementById('container');

seasons.forEach(season => {
  // titolo della season
  const h3 = document.createElement('h3');
  h3.textContent = season.title;
  container.appendChild(h3);

  // container per le card
  const seasonDiv = document.createElement('div');
  seasonDiv.classList.add('season');

  season.trails.forEach(trail => {
    const card = document.createElement('div');
    card.classList.add('trail-card');

    const img = document.createElement('img');
    img.src = trail.banner;
    card.appendChild(img);

    const info = document.createElement('div');
    info.classList.add('trail-info');

    const title = document.createElement('div');
    title.textContent = trail.title;
    info.appendChild(title);

    const date = document.createElement('div');
    date.textContent = trail.date;
    info.appendChild(date);

    card.appendChild(info);
    seasonDiv.appendChild(card);
  });

  container.appendChild(seasonDiv);
});
</script>

---
