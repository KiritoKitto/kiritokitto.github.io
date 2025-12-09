---
layout: "default"
permalink: "/in-game-photography"
---

# In-Game Photography

---

<style>
  .trail-card {
    background-color: var(--color-background-secondary);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
      transition: transform 0.3s ease, filter 0.3s ease;
      filter: saturate(0%)
  }

  .trail-card img {
    width: 60%;
    height: 40vmin;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease, filter 0.3s ease; /* animazione fluida */
}

    .trail-card:hover  {
    transform: scale(1.00);
    filter: saturate(105%);
}

    .trail-title {
    font-weight: bold;
    margin-bottom: 1rem;
    }

    .trail-subtitle {
    /* margin-bottom: 1rem; */
    }

    .trail-date {
    color: grey;
    }

  .trail-info {
    padding: 0.5rem;
    text-align: center;
    flex: 1;
  }

  @media (max-width: 500px) {
    .trail-card {
      flex-direction: column;
    }
    .trail-card img {
      width: 100%;
      height: 300px;
    }
  }
</style>

<div id="container">
<script src= "{{ '/js/list/photomod.js' | relative_url }}"></script>
<script>

const container = document.getElementById('container');
seasons.forEach(season => {
    if (!season.show) return;

    const card = document.createElement('div');
    card.classList.add('trail-card');

    const img = document.createElement('img');
    img.src = season.banner;

    const info = document.createElement('div');
    info.classList.add('trail-info');

    const title = document.createElement('div');
    title.textContent = season.title;
    title.classList.add('trail-title');

    const date = document.createElement('div');
    date.textContent = season.date;
    date.classList.add('trail-date');

    card.appendChild(img);
    card.appendChild(info);
    info.appendChild(title);
    info.appendChild(date);
    container.appendChild(card);

    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
        window.location.href = "/" + encodeURIComponent(season.path);
    });
});

</script>
</div>
---
