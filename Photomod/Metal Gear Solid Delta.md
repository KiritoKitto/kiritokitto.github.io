---
layout: "default"
permalink: "/PhotoMode/Metal Gear Solid Delta"
---

# Metal Gear Solid Delta: Snake Eater

<div id="gallery"></div>

<style>
#gallery img {
  display: block;
  width: 100%;
  height: auto;
  margin: 16px 0;
}
</style>

<script>
const API_BASE = "https://folder-list.phonemix-shawn.workers.dev/?folder=";
const API_PATH = "Website/Photomod/Metal%20Gear%20Solid%20Delta/";
const API_URL = API_BASE + API_PATH;

fetch(API_URL)
  .then(res => res.json())
  .then(images => {
    const container = document.getElementById("gallery");
    const folders = {};

    images.forEach(img => {
      const parts = img.key.split("/");
      parts.pop();
      const folder = parts.join("/") + "/";

      if (!folders[folder]) {
        folders[folder] = [];
      }

      if (img.url.match(/\.(jpg|jpeg|png|webp)$/i)) {
        folders[folder].push(img.url);
      }
    });

    Object.keys(folders).forEach(folderName => {
      const section = document.createElement("div");
      section.className = "folder";

      folders[folderName].forEach(url => {
        const image = document.createElement("img");
        image.src = encodeURI(url);
        image.loading = "lazy";
        section.appendChild(image);
      });

      container.appendChild(section);
    });
  });
</script>

---