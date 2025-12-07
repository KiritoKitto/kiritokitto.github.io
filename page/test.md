---
layout: "default"
permalink: "/test"
---


Gallery R2
<style>
    body { font-family: sans-serif; }
    h1 { margin-top: 40px; }

    .folder {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .folder img {
      width: 200px;
      height: auto;
      object-fit: cover;
    }
  </style>

<div id="gallery"></div>

<script>
const API_URL = "https://folder-list.phonemix-shawn.workers.dev/";

fetch(API_URL)
  .then(res => res.json())
  .then(images => {

    const container = document.getElementById("gallery");
    const folders = {};

    // Raggruppa le immagini per cartella
    images.forEach(img => {
      const parts = img.key.split("/");
      parts.pop(); // rimuove il nome file
      const folder = parts.join("/") + "/";

      if (!folders[folder]) {
        folders[folder] = [];
      }

      folders[folder].push(img.url);
    });

    // Crea le sezioni HTML
    Object.keys(folders).forEach(folderName => {
      const title = document.createElement("h1");
      title.textContent = folderName;

      const section = document.createElement("div");
      section.className = "folder";

      folders[folderName].forEach(url => {
        const image = document.createElement("img");
        image.src = encodeURI(url);
        image.loading = "lazy";
        section.appendChild(image);
      });

      container.appendChild(title);
      container.appendChild(section);
    });
  });
</script>
