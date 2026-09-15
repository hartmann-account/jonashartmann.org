# jonashartmann.org

Persönliche Website von Jonas Hartmann. Live unter
[mein-hartmann.de](https://mein-hartmann.de), ausgeliefert vom Cloudflare-Worker
`jonashartmann-org`.

## Aufbau

```
canvas/    Quelle: der Export aus Claude Design (Design-Canvas + Design-System)
build/     Bauschritt: rendert aus canvas/ die statischen Seiten
site/      Ergebnis: das, was ausgeliefert wird (im Repository, siehe unten)
v2/ v1/    frühere Fassungen der Website
old/       die ursprüngliche statische Seite
```

## Warum ein Bauschritt

Der Export aus Claude Design ist ein **Canvas-Dokument**: ein einziges HTML mit
eigenem Runtime (`support.js`), das im Browser React und `@babel/standalone`
nachlädt, die Vorlagen zur Laufzeit kompiliert und per Hash-Routing (`#/work`)
zwischen den Screens umschaltet.

Für eine Vorschau ist das genau richtig. Für eine öffentliche Website nicht:

| | Canvas direkt | statisch vorgerendert |
|---|---|---|
| Laufzeit vor dem ersten Pixel | ~3,3 MB (Babel 3,1 MB + React) | keine |
| URLs | `#/work` | `/work` |
| Ohne JavaScript | leere Seite | vollständig |
| Suchmaschinen | sehen erst nach Kompilierung etwas | sehen fertiges HTML |

`build/prerender.mjs` öffnet deshalb jede Route einmal im Browser, lässt sie
fertig rendern und schreibt das Ergebnis als eigenständige HTML-Datei. Dabei
werden die Tab-Buttons (die ohne Runtime tot wären) zu echten Links, Hash-Routen
zu Pfaden, und sämtliche `<script>` fliegen raus. **Die ausgelieferte Seite
enthält keine einzige Zeile JavaScript.**

## Bauen

```bash
npm install
npm run build     # canvas/ → site/
npm run preview   # http://127.0.0.1:4500, mit denselben URLs wie live
```

Der Bauschritt braucht einen Browser (Playwright) und läuft deshalb lokal, nicht
auf dem Build-Runner. Darum liegt `site/` im Repository und Cloudflare liefert es
unverändert aus — in `wrangler.toml` steht bewusst kein Build-Befehl.

Beim ersten Lauf lädt der Bauschritt React und Babel einmal nach `build/vendor/`
(nicht im Repository); danach läuft er ohne Netz.

## Seiten

`/` · `/work` · `/research` · `/learning` · `/about` · `/cv`, dazu `404.html`,
`robots.txt` und `sitemap.xml`.

## Nachbesserungen am Export

`build/static/site.css` enthält die wenigen Korrekturen, die der Export für den
Live-Betrieb braucht — bewusst klein gehalten, alles Gestalterische bleibt im
Design-System unter `canvas/_ds/`:

- Die **Tab-Leiste** steht im Export in einer festen Zeile und lief auf schmalen
  Schirmen über den Rand. Sie darf jetzt umbrechen.
- Die **Kachelraster** stehen fest auf drei bzw. vier Spalten ohne Media Query;
  bei 320 px blieben davon 80 px je Spalte und der Inhalt lief aus den Kacheln.
  Der Bauschritt markiert solche Raster (`cols-3`, `cols-4`), darunter brechen
  sie auf zwei bzw. eine Spalte um.
- Einzelne Zeilen im Inhalt standen auf `white-space: nowrap` und zogen die
  Seite auf; im Inhaltsbereich dürfen sie umbrechen, die Navigation nicht.

Geprüft mit deaktiviertem JavaScript bei 320, 390, 768, 1024 und 1440 px: kein
horizontaler Überlauf, alle Seiten vollständig, Navigation funktioniert.

## Schriften

Outfit und Cormorant liegen self-gehostet unter `canvas/_ds/*/fonts/`. Der Export
lud sie von jsDelivr; für die Live-Seite ist die CDN-Abhängigkeit entfernt.

## Deploy

Cloudflare baut von `main` und liefert `site/` als statische Assets aus. Nach
Änderungen am Canvas also: `npm run build`, Ergebnis prüfen, `site/` committen.
