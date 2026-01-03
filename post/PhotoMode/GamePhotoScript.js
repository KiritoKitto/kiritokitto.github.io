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