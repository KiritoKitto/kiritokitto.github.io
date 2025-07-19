---
layout: default
permalink: "/test01"
---

  <style>
    .track-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 80px));
      gap: 0.1rem 0.3rem;
      justify-content: space-between;
    }

    .trackcard {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      text-align: center;
    transition: transform 0.2s ease;
}

.trackcard:hover {
  transform: scale(1.1); /* ingrandisce leggermente */
  z-index: 1; /* opzionale: porta la card in primo piano */
  opacity: 0.25;
}
    .trackcard-image {
      width: 100%;
      border: 2px solid var(--color-background-secondary);
      border-radius: 5px;
      object-fit: cover;
      aspect-ratio: 0.75;
    }
    .trackcard-image.favorite {
    border-color: var(--color-highlight);
    }
    .card-content {
        font-size: calc(0.7*var(--font-size));
    }
  button.disabled {
  opacity: 0.4;
}
    button:disabled {
  opacity: 0.4;
}

  .card-content.favorite {
        color: var(--color-highlight);
    }
    .track-filters {
      /* justify-content: center; */
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      font-size: calc(0.7*var(--font-size));
    }
    .track-filters button {
      padding: 0.4rem 1rem 0.3rem;
      background-color: var(--color-background);
      border: 1px solid var(--color-tertiary);
      border-radius: 8px;
      color: var(--color-secondary);
      cursor: pointer;
      transition: background 0.3s;
    }
    .track-filters button.active,
    .track-filters button:hover {
      background-color: var(--color-background-secondary);
      color: var(--color-secondary);
    }
  </style>

## All-Tracker

Questa è una pagina di test. 

---

<div class="track-filters">
  <button class="track-type-btn active" data-type="All">All</button>
  <button class="track-type-btn" data-type="Game">Games</button>
  <button class="track-type-btn" data-type="Anime">Anime</button>
  <button class="track-type-btn" data-type="Cinema">Cinema</button>
</div>

<div class="track-filters">
  <button class="track-status-btn active" data-status="All">All</button>
  <button class="track-status-btn" data-status="Completed">Completed</button>
  <button class="track-status-btn" data-status="Paused">Paused</button>
  <button class="track-status-btn" data-status="Dropped">Dropped</button>
</div>

<div class="track-filters">
  <button class="track-year-btn active" data-year="All">All</button>
  <button class="track-year-btn" data-year="2025">2025</button>
  <button class="track-year-btn" data-year="2024">2024</button>
  <button class="track-year-btn" data-year="2023">2023</button>
</div>

<div class="track-filters">
  <button class="track-fav-btn" data-fav="All">All</button>
  <button class="track-fav-btn active" data-fav="Favorites">Favorites</button>
</div>


<div class="track-grid" id="track-grid"></div>

<script>
const games = [
{ title: "Albatroz", type: "Game", last: "Feb 9", year: "2025", status: "Completed", order: "45697", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7ouw.jpg" },
{ title: "Animal Well", type: "Game", last: "May 11", year: "2024", status: "Completed", order: "45423", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4hdh.jpg" },
{ title: "Another Crab's Treasure", type: "Game", last: "May 1", year: "2024", status: "Completed", order: "45413", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6mrs.jpg" },
{ title: "Arcane", type: "Cinema", fav: "TRUE", last: "Jul 18", year: "2025", status: "Paused", order: "45856", banner: "https://image.tmdb.org/t/p/w300/6FMWx79iAtZx8WHtOrRj0VlM8Tp.jpg" },
{ title: "Attack on Titan Final Season Part 2", type: "Anime", fav: "FALSE", last: "Nov 5", year: "2023", status: "Completed", order: "45235", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx131681-5ooUqvqNtee1.jpg" },
{ title: "Attack on Titan Final Season", type: "Anime", fav: "FALSE", last: "May 19", year: "2022", status: "Completed", order: "44700", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx110277-sKUNXAsWMNFw.jpg" },
{ title: "Attack on Titan Season 2", type: "Anime", fav: "FALSE", last: "May 9", year: "2022", status: "Completed", order: "44690", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20958-HuFJyr54Mmir.jpg" },
{ title: "Attack on Titan Season 3 Part 2", type: "Anime", fav: "FALSE", last: "May 15", year: "2022", status: "Completed", order: "44696", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx104578-k61nx3LPjvgd.jpg" },
{ title: "Attack on Titan Season 3", type: "Anime", fav: "FALSE", last: "May 15", year: "2022", status: "Completed", order: "44696", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx99147-AiPDD8cwlCfi.jpg" },
{ title: "Attack on Titan", type: "Anime", fav: "TRUE", last: "May 4", year: "2022", status: "Completed", order: "44685", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16498-buvcRTBx4NSm.jpg" },
{ title: "Balatro", type: "Game", last: "Mar 16", year: "2024", status: "Completed", order: "45367", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9f4g.jpg" },
{ title: "Black Myth: Wukong", type: "Game", last: "Sep 22", year: "2024", status: "Completed", order: "45557", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8h3y.jpg" },
{ title: "Blasphemous", type: "Game", last: "Dec 22", year: "2024", status: "Completed", order: "45648", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9yoj.jpg" },
{ title: "Blue Prince", type: "Game", last: "Apr 20", year: "2025", status: "Completed", order: "45767", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9mzd.jpg" },
{ title: "Call of Duty: Black Ops 6", type: "Game", last: "Nov 30", year: "2024", status: "Completed", order: "45626", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8zis.jpg" },
{ title: "Chasing the Unseen", type: "Game", last: "Mar 23", year: "2024", status: "Completed", order: "45374", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6phg.jpg" },
{ title: "Clair Obscur: Expedition 33", type: "Game", last: "May 10", year: "2025", status: "Completed", order: "45787", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9gam.jpg" },
{ title: "Clone Drone in the Danger Zone", type: "Game", last: "Jan 19", year: "2024", status: "Completed", order: "45310", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6f1a.jpg" },
{ title: "CrossCode", type: "Game", last: "Jun 14", year: "2025", status: "Playing", order: "45822", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co28wy.jpg" },
{ title: "Cyberpunk: Edgerunners", type: "Anime", fav: "TRUE", last: "Sep 29", year: "2022", status: "Completed", order: "44833", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx120377-ayZPoxiWt4Li.jpg" },
{ title: "Dark Souls III", type: "Game", last: "Sep 4", year: "2024", status: "Completed", order: "45539", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcf.jpg" },
{ title: "Detroit: Become Human", type: "Game", last: "Apr 26", year: "2024", status: "Completed", order: "45408", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6mzf.jpg" },
{ title: "Duck Detective: The Secret Salami", type: "Game", last: "Jun 19", year: "2024", status: "Completed", order: "45462", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7gxl.jpg" },
{ title: "Elden Ring: Nightreign", type: "Game", last: "Jun 1", year: "2025", status: "Dropped", order: "45809", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co95gk.jpg" },
{ title: "Elden Ring: Shadow of the Erdtree", type: "Game", last: "Jul 1", year: "2024", status: "Completed", order: "45474", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7sly.jpg" },
{ title: "Eldest Souls", type: "Game", last: "Aug 3", year: "2024", status: "Completed", order: "45507", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co20yj.jpg" },
{ title: "Everything Everywhere All at Once", type: "Cinema", fav: "FALSE", last: "Jun 5", year: "2023", status: "Completed", order: "45082", banner: "https://image.tmdb.org/t/p/w300/u68AjlvlutfEIcpmbYpKcdi09ut.jpg" },
{ title: "Factorio", type: "Game", last: "Oct 25", year: "2024", status: "Paused", order: "45590", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tfy.jpg" },
{ title: "Flow", type: "Cinema", fav: "FALSE", last: "Jan 19", year: "2025", status: "Completed", order: "45676", banner: "https://image.tmdb.org/t/p/w300/imKSymKBK7o73sajciEmndJoVkR.jpg" },
{ title: "Furi", type: "Game", last: "Feb 16", year: "2025", status: "Completed", order: "45704", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7yso.jpg" },
{ title: "Ghost of Tsushima", type: "Game", last: "Jul 14", year: "2024", status: "Paused", order: "45487", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2crj.jpg" },
{ title: "Grave of the Fireflies", type: "Anime", fav: "FALSE", last: "Mar 3", year: "2023", status: "Completed", order: "44988", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx578-vU6XcOlb1XFU.jpg" },
{ title: "Horizon Forbidden West", type: "Game", last: "Jun 19", year: "2024", status: "Completed", order: "45462", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2gvu.jpg" },
{ title: "Horizon Forbidden West: Burning Shores", type: "Game", last: "Jul 6", year: "2024", status: "Completed", order: "45479", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6a9w.jpg" },
{ title: "Horizon Zero Dawn", type: "Game", last: "Apr 15", year: "2024", status: "Completed", order: "45397", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2una.jpg" },
{ title: "Horizon Zero Dawn: The Frozen Wilds", type: "Game", last: "Apr 20", year: "2024", status: "Completed", order: "45402", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4hjg.jpg" },
{ title: "Hyrule Warriors: Age of Calamity - Expansion Pass", type: "Game", last: "Jan 1", year: "2024", status: "Paused", order: "45292", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/coa4nb.jpg" },
{ title: "Immortals Fenyx Rising", type: "Game", last: "Jan 14", year: "2024", status: "Paused", order: "45305", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9kcb.jpg" },
{ title: "Inazuma Eleven: Victory Road", type: "Game", last: "May 26", year: "2024", status: "Completed", order: "45438", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9nsw.jpg" },
{ title: "Inception", type: "Cinema", fav: "FALSE", last: "Dec 25", year: "2024", status: "Completed", order: "45651", banner: "https://image.tmdb.org/t/p/w300/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" },
{ title: "Interstellar", type: "Cinema", fav: "FALSE", last: "Jun 1", year: "2023", status: "Completed", order: "45078", banner: "https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
{ title: "JoJo's Bizarre Adventure (TV)", type: "Anime", fav: "FALSE", last: "Apr 13", year: "2022", status: "Completed", order: "44664", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx14719-VT5dRzTBSZ0w.jpg" },
{ title: "King of the Bridge", type: "Game", last: "Jan 24", year: "2025", status: "Completed", order: "45681", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co82oy.jpg" },
{ title: "Lycoris Recoil", type: "Anime", fav: "FALSE", last: "Jan 17", year: "2024", status: "Paused", order: "45308", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx143270-rfkyiYXhek5w.jpg" },
{ title: "Metaphor: ReFantazio", type: "Game", last: "Feb 2", year: "2025", status: "Completed", order: "45690", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8d9t.jpg" },
{ title: "Microsoft Flight Simulator 2024", type: "Game", last: "Nov 23", year: "2024", status: "Dropped", order: "45619", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co91qm.jpg" },
{ title: "MotoGP 24", type: "Game", last: "May 4", year: "2024", status: "Completed", order: "45416", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co80e3.jpg" },
{ title: "Mouthwashing", type: "Game", last: "Nov 17", year: "2024", status: "Completed", order: "45613", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co70oi.jpg" },
{ title: "New Star GP", type: "Game", last: "Mar 9", year: "2024", status: "Completed", order: "45360", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6uv4.jpg" },
{ title: "NieR:Automata Ver1.1a", type: "Anime", fav: "FALSE", last: "Jan 8", year: "2023", status: "Paused", order: "44934", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx145665-Qs53Mta5ngqs.jpg" },
{ title: "Nine Sols", type: "Game", last: "Oct 28", year: "2024", status: "Completed", order: "45593", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4l2s.jpg" },
{ title: "Pacific Drive", type: "Game", last: "Mar 3", year: "2024", status: "Completed", order: "45354", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7t2e.jpg" },
{ title: "Paper Mario: The Thousand-Year Door", type: "Game", last: "Jun 6", year: "2024", status: "Completed", order: "45449", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co83vd.jpg" },
{ title: "Parasite", type: "Cinema", fav: "FALSE", last: "Jun 6", year: "2023", status: "Completed", order: "45083", banner: "https://image.tmdb.org/t/p/w300/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
{ title: "Perfect Days", type: "Cinema", fav: "FALSE", last: "Jan 13", year: "2025", status: "Completed", order: "45670", banner: "https://image.tmdb.org/t/p/w300/tvUHVSTJV9ITON3oyHaWp7oaAc8.jpg" },
{ title: "Persona 3 Reload", type: "Game", last: "Feb 2", year: "2024", status: "Dropped", order: "45324", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6z12.jpg" },
{ title: "Princess Mononoke", type: "Anime", fav: "FALSE", last: "Nov 17", year: "2021", status: "Completed", order: "44517", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx164-ySuGzCWVw2cL.jpg" },
{ title: "Professor Layton and the Last Specter", type: "Game", last: "Mar 13", year: "2024", status: "Completed", order: "45364", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wtl.jpg" },
{ title: "Pulp Fiction", type: "Cinema", fav: "FALSE", last: "Dec 25", year: "2024", status: "Completed", order: "45651", banner: "https://image.tmdb.org/t/p/w300/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg" },
{ title: "Puss in Boots: The Last Wish", type: "Cinema", fav: "FALSE", last: "Feb 4", year: "2023", status: "Completed", order: "44961", banner: "https://image.tmdb.org/t/p/w300/aV1KGO9X3S4kzqEptVDAvGjccql.jpg" },
{ title: "Rain World", type: "Game", last: "Jan 9", year: "2024", status: "Paused", order: "45300", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co24pm.jpg" },
{ title: "Rematch", type: "Game", last: "Jun 19", year: "2025", status: "Completed", order: "45827", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co95fx.jpg" },
{ title: "Saving Private Ryan", type: "Cinema", fav: "FALSE", last: "May 27", year: "2024", status: "Completed", order: "45439", banner: "https://image.tmdb.org/t/p/w300/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg" },
{ title: "Senua's Saga: Hellblade II", type: "Game", last: "May 24", year: "2024", status: "Completed", order: "45436", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co81i4.jpg" },
{ title: "SHAMAN KING (2021)", type: "Anime", fav: "FALSE", last: "Jan 10", year: "2024", status: "Completed", order: "45301", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx119675-ziQ6Lb80zEx4.png" },
{ title: "SHAMAN KING FLOWERS", type: "Anime", fav: "FALSE", last: "Apr 2", year: "2024", status: "Completed", order: "45384", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b147850-USIKDjVK7xTn.jpg" },
{ title: "Shutter Island", type: "Cinema", fav: "FALSE", last: "Jul 24", year: "2024", status: "Completed", order: "45497", banner: "https://image.tmdb.org/t/p/w300/nrmXQ0zcZUL8jFLrakWc90IR8z9.jpg" },
{ title: "Silent Hill 2", type: "Game", last: "Nov 16", year: "2024", status: "Completed", order: "45612", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5l7s.jpg" },
{ title: "Split Fiction", type: "Game", last: "Mar 17", year: "2025", status: "Completed", order: "45733", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co95gf.jpg" },
{ title: "SPY x FAMILY", type: "Anime", fav: "FALSE", last: "Apr 30", year: "2022", status: "Dropped", order: "44681", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx140960-Kb6R5nYQfjmP.jpg" },
{ title: "Squid Game", type: "Cinema", fav: "FALSE", last: "Feb 20", year: "2025", status: "Completed", order: "45708", banner: "https://image.tmdb.org/t/p/w300/sXZhtWLo3fecavpDuOyJiayjt32.jpg" },
{ title: "Squid Game", type: "Cinema", fav: "FALSE", last: "Jan 24", year: "2025", status: "Completed", order: "45681", banner: "https://image.tmdb.org/t/p/w300/jlbrV1Kl4Y8pWXu12SppebRs7On.jpg" },
{ title: "Squid Game", type: "Cinema", fav: "FALSE", last: "Jun 29", year: "2025", status: "Completed", order: "45837", banner: "https://image.tmdb.org/t/p/w300/6VZsJ37aJDvf45PLJk7Z0UVhzxt.jpg" },
{ title: "The Boy and the Heron", type: "Anime", fav: "FALSE", last: "Jan 2", year: "2024", status: "Completed", order: "45293", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx109979-BRHXpBkCw4oc.jpg" },
{ title: "The Forgotten City", type: "Game", last: "Apr 22", year: "2025", status: "Completed", order: "45769", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3muu.jpg" },
{ title: "The Hateful Eight", type: "Cinema", fav: "FALSE", last: "Dec 25", year: "2024", status: "Completed", order: "45651", banner: "https://image.tmdb.org/t/p/w300/jIywvdPjia2t3eKYbjVTcwBQlG8.jpg" },
{ title: "The Last of Us Part II", type: "Game", last: "Apr 14", year: "2025", status: "Completed", order: "45761", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5ziw.jpg" },
{ title: "The Legend of Zelda: Echoes of Wisdom", type: "Game", last: "Oct 5", year: "2024", status: "Completed", order: "45570", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8d9b.jpg" },
{ title: "The Legend of Zelda: Link's Awakening", type: "Game", last: "Aug 11", year: "2024", status: "Completed", order: "45515", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qve.jpg" },
{ title: "The Midnight Walk", type: "Game", last: "May 17", year: "2025", status: "Completed", order: "45794", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8ur3.jpg" },
{ title: "The Platform", type: "Cinema", fav: "FALSE", last: "May 31", year: "2023", status: "Completed", order: "45077", banner: "https://image.tmdb.org/t/p/w300/iXvQnzy6JCAx1PiQEKXuTY04ZHl.jpg" },
{ title: "The Super Mario Bros. Movie", type: "Cinema", fav: "FALSE", last: "Apr 27", year: "2023", status: "Completed", order: "45043", banner: "https://image.tmdb.org/t/p/w300/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg" },
{ title: "The Talos Principle", type: "Game", last: "Feb 22", year: "2024", status: "Completed", order: "45344", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rb5.jpg" },
{ title: "The Truman Show", type: "Cinema", fav: "FALSE", last: "May 27", year: "2024", status: "Completed", order: "45439", banner: "https://image.tmdb.org/t/p/w300/vuza0WqY239yBXOadKlGwJsZJFE.jpg" },
{ title: "The Wild Robot", type: "Cinema", fav: "FALSE", last: "Jan 19", year: "2025", status: "Completed", order: "45676", banner: "https://image.tmdb.org/t/p/w300/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg" },
{ title: "Vinland Saga Season 2", type: "Anime", fav: "FALSE", last: "Jan 16", year: "2024", status: "Completed", order: "45307", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx136430-gsBsJjA7hGh9.jpg" },
{ title: "Vinland Saga", type: "Anime", fav: "TRUE", last: "Jan 21", year: "2023", status: "Completed", order: "44947", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101348-2fhDFPCuMNiz.jpg" },
{ title: "Violet Evergarden", type: "Anime", fav: "TRUE", last: "Feb 16", year: "2023", status: "Completed", order: "44973", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21827-ubzq619ZA2E9.png" },
{ title: "Voices of the Void", type: "Game", last: "Jan 29", year: "2024", status: "Paused", order: "45320", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8uks.jpg" },
{ title: "Weathering With You", type: "Anime", fav: "FALSE", last: "Oct 19", year: "2022", status: "Completed", order: "44853", banner: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx106286-5COcpd0J9VbL.png" },
{ title: "Wild Hearts", type: "Game", last: "Apr 2", year: "2024", status: "Completed", order: "45384", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co66d3.jpg" },
{ title: "Xenoblade Chronicles X", type: "Game", last: "Mar 20", year: "2025", status: "Paused", order: "45736", banner: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1nwh.jpg" },
];

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
  console.log("Filters:", currentStatus, currentYear, currentType, currentFav);
  console.log("Games count before filter:", games.length);

  grid.innerHTML = '';
  const filtered = games
    .filter(game =>
      (currentStatus === "All" || game.status === currentStatus) &&
      (currentYear === "All" || game.year === currentYear) &&
      (currentType === "All" || game.type === currentType) &&
      (currentFav === "All" || game.fav === "TRUE")
    )
    .sort((a, b) => parseInt(b.order) - parseInt(a.order));

  console.log("Filtered games count:", filtered.length);

  if (filtered.length === 0) {
    grid.innerHTML = '<div style="padding:1rem; color:#999;">No items match the filters.</div>';
  }

  filtered.forEach(g => {
    const card = document.createElement('div');
    card.className = 'trackcard';
    card.innerHTML = `
      <img class="trackcard-image${g.fav === "TRUE" ? ' favorite' : ''}" src="${g.banner}" alt="${g.title}">
      <div class="card-content">${g.last}, ${g.year}</div>`;
    grid.appendChild(card);
  });

  updateButtonStates();
}

// I tuoi event listener restano come li hai scritti, ma assicurati che dataset siano giusti:
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