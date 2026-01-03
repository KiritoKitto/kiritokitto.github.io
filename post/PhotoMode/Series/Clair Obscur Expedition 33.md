---
layout: "default"
title: "Clair Obscur: Expedition 33"
permalink: "/photomode/clair obscur expedition 33"
---

# {{ page.title }}

<head><link id="theme" rel="stylesheet" href="{{ '/css/photomode.css' | relative_url }}"></head>
<div id="gallery"></div>

<script>
const permalink = "{{ page.url }}";
const parts = permalink.split("/");
const nameFixed = parts.slice(2).join("/");
const API_URL = "https://folder-list.phonemix-shawn.workers.dev/?folder=Website/Photomod/" + nameFixed;
</script>
<script src="{{ '/js/photomode.js' | relative_url }}"></script>

---