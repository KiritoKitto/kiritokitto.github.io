import { seasons } from './scriptListGames.js';
import { gameScreenshots } from './scriptListScreenshots.js';
const imageSize = 800;
const pageTitle = document.getElementById("gallery").dataset.title;
const container = document.getElementById("gallery");
const section = document.createElement("div");
section.className = "folder";
gameScreenshots
  .filter(item => item.title === pageTitle)
  .forEach(item => {
    const image = document.createElement("img");
    image.src = `https://drive.google.com/thumbnail?id=${item.id}&sz=w800`;
    image.loading = "lazy";
    section.appendChild(image);
  });
container.appendChild(section);
