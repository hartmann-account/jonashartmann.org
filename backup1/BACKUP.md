# backup1

Stand der Website vom 29.09.2026, wie sie zu diesem Zeitpunkt unter
[jonashartmann.org](https://jonashartmann.org) live war (Commit `9d3605c`).

Die Seite war der vorgerenderte Export aus Claude Design:

```
canvas/    Quelle (Design-Canvas + Design-System)
build/     Bauschritt (Playwright rendert canvas/ zu statischem HTML)
site/      ausgeliefertes Ergebnis, inkl. site/kleidung
Kleidung/  Quelle der Seite unter /kleidung
```

Ausgeliefert wird hier nichts — Cloudflare liefert nur das `site/` im
Wurzelverzeichnis aus. Zum Ansehen: `site/` mit einem beliebigen statischen
Server öffnen, oder hier `npm install && npm run preview`.
