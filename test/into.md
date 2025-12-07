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
    transform: scale(1.02);
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
<script src= "{{ '/js/list/trails.js' | relative_url }}"></script>
<script>
    
const container = document.getElementById('container');
seasons.forEach(season => {
    const h3 = document.createElement('h3');
    h3.textContent = season.title;
    container.appendChild(h3);
    
    const seasonDiv = document.createElement('div');
    seasonDiv.classList.add('season');
    season.trails.forEach(trail => {
        
        const card = document.createElement('div');
        card.classList.add('trail-card');
        
        const img = document.createElement('img');
        img.src = trail.banner;
        
        const info = document.createElement('div');
        info.classList.add('trail-info');
        
        const title = document.createElement('div');
        title.textContent = trail.title;
        title.classList.add('trail-title');
        
        const subtitle = document.createElement('div');
        subtitle.textContent = trail.subtitle;
        subtitle.classList.add('trail-subtitle');
        
        const date = document.createElement('div');
        date.textContent = trail.date;
        date.classList.add('trail-date');
        
        card.appendChild(img);
        card.appendChild(info);
        info.appendChild(title);
        info.appendChild(subtitle);
        info.appendChild(date);
        seasonDiv.appendChild(card);
    });
    container.appendChild(seasonDiv);
});
    
</script>
</div>
---