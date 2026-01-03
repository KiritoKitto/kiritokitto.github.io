---
layout: "default"
permalink: "/year-in-videogames"
---

# Year in Videogames

Year in Videogames is an annual series to celebrate and remember all the games I played during the years.

-   [2025 Edition](/year-recap-2025)
-   [2024 Edition](/year-recap-2024)
-   [2023 Edition](/year-recap-2023)
-   [2022 Edition](/year-recap-2022)

---

<script src="{{'/post/year-in-videogames/list.js' | relative_url }}"></script>
<style>
p { margin-top:0px; }
.kpi-section h2 { margin-top:0px; }
.kpi-container { display: flex; flex-direction: column; }
.kpi-section { display: flex; flex-direction: column; }
.kpi-bars { display: flex; flex-direction: column; gap: 0.3rem; }

.kpi-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 30px;
  border-radius: 4px;
  padding-right: 5px;
  background-color: var(--color-background-tertiary);
  color: var(--color-secondary);
  font-weight: bold;
  transition: all 0.2s ease;
    padding-right: 10px;
}

.kpi-bar:hover {
  filter: brightness(0.5); /* ora transita gradualmente */
}
.kpi-bar.latest { color: white; font-weight: bold; background-color: var(--color-highlight-bar);}

.kpi-title { display: inline-flex; align-items: center; gap: 0.5rem; }

.kpi-title svg { width: 16px; height: 16px; vertical-align: middle; }
</style>

<div id="kpi-container" class="kpi-container"></div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("kpi-container");
  const years = [...new Set(games.map(g => g.year).filter(y => y >= 2022))].sort((a,b)=>b-a);
  const kpis = [
    { key: "played",
     title: "# Games Played",
     desc: "Number of games played in each edition",
     calc: year => games.filter(g => g.type === "Game" && g.year == year).length
    },

    { key: "percentCompleted", title: "% Completed", desc: "Percentage of games completed in each edition", calc: year => {
        const all = games.filter(g => g.type === "Game" && g.year == year);
        const completed = all.filter(g => g.status === "Completed").length;
        return all.length ? Math.round((completed / all.length) * 100) : 0;
      }
    },

    {
  key: "scoreAvg",
  title: "Score Average",
  desc: "Average score of completed games",
  calc: year => {
    const completed = games.filter(g => g.type === "Game" && g.year == year && g.status === "Completed" && g.score > 0);
    if(!completed.length) return 0;
    const avg = completed.reduce((sum,g)=>sum+(g.score?parseFloat(g.score):0),0)/completed.length;
    return (Math.round(avg*100)/100).toFixed(2); // arrotondato a 2 decimali
  }
},
    { key: "percentReleaseMatch", title: "% on release", desc: "Percentage of games played in the same year as their release", calc: year => {
        const all = games.filter(g => g.type === "Game" && g.year == year);
        const match = all.filter(g => g.release == year).length;
        return all.length ? Math.round((match / all.length) * 100) : 0;
      }
    }
  ];

  kpis.forEach(kpi => {
    const section = document.createElement("div");
    section.className = "kpi-section";

    const values = years.map(y => kpi.calc(y));
    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);
    const minWidth = 30;
    const maxWidth = 80;

    const title = document.createElement("h2");
    title.className = "kpi-title";
    title.textContent = kpi.title;

    // SVG icon inline
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS,"svg");
    svg.setAttribute("viewBox","0 0 14 16");
    svg.setAttribute("fill","currentColor");
    const path = document.createElementNS(svgNS,"path");
    path.setAttribute("d","M14 2H5.50003L4.00003 3.5L6.83581 6.33579L0.585815 12.5858L3.41424 15.4142L9.66424 9.16421L12.5 12L14 10.5L14 2Z");
    const lastVal = values[0], prevVal = values[1] ?? lastVal;
    path.setAttribute("fill", lastVal > prevVal ? "var(--color-highlight)" : "var(--color-secondary)");
    if(lastVal <= prevVal) svg.style.transform = "rotate(90deg)";
    svg.appendChild(path);
    title.appendChild(svg);

    const desc = document.createElement("p");
    desc.textContent = kpi.desc;

    const bars = document.createElement("div");
    bars.className = "kpi-bars";

    years.forEach((year,i) => {
      const val = values[i];
      const widthPercent = maxVal > minVal
        ? ((val - minVal)/(maxVal - minVal)*(maxWidth-minWidth)+minWidth)
        : maxWidth;
      const bar = document.createElement("div");
      bar.className = i===0 ? "kpi-bar latest" : "kpi-bar";
      bar.style.width = `${widthPercent}%`;
      bar.textContent = val + (kpi.key.includes("percent") ? "%" : "");
      bars.appendChild(bar);
    });

    section.appendChild(title);
    section.appendChild(desc);
    section.appendChild(bars);
    section.appendChild(document.createElement("hr"));
    container.appendChild(section);

  });
});



</script>

**What is “redundancy”?** — When a game wins Game of the Year or Replay Award, it is visually muted in other awards to
showcase a wider range of games played over the years. <br><br> **If a game is started in one year and finished in the
next, what happens?** — Each game can participate in only one edition. The edition is determined by the last completion
date. <br><br> **How many games can win the same award?** — Up to 8 games. <br><br> **How many awards can the same game
win?** — There is no limit.

---

_Awards, categories, and rules may change over time._

_Last update: January 2026_
