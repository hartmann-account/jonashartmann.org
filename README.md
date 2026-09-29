# jonashartmann.org

Persönliche Website von Jonas Hartmann. Live unter
[jonashartmann.org](https://jonashartmann.org), ausgeliefert vom Cloudflare-Worker
`jonashartmann-org`.

## Aufbau

```
src/       Quelle: Inhalte, Stylesheet, Schriften, Bilder, Skripte
build/     Bauschritt, Vorschau und Prüfungen
site/      Ergebnis: das, was ausgeliefert wird (im Repository, siehe unten)
Kleidung/  eigenständige Seite, wird unter /kleidung ausgeliefert
backup1/   die Website vom 29.09.2026 vor der Überarbeitung (Claude-Design-Export)
v2/ v1/    frühere Fassungen der Website
old/       die ursprüngliche statische Seite
```

## Gestaltung

Ein Briefkopf, keine Broschüre: Name oben links, Navigation oben rechts, im Fuss
die Kanäle. Dazwischen eine ruhige Lesespalte mit kurzen Zwischentiteln links
daneben. Die Regeln:

- **Eine Schrift, zwei Schnitte, fünf Grössen.** Outfit 400 und 500;
  14 / 17 / 18–20 / 24 / 36–56 px. Keine Kursive, keine Versalien, keine Monospace.
- **Farben nur aus dem Design-System.** Papier, drei Tinten, Nebel für Haarlinien,
  Blau nur für Hover und Fokus.
- **Unterstrichen heisst Link.** Nichts anderes ist unterstrichen. Keine Pfeile:
  Outfit hat das Zeichen nicht, es käme aus einer Ersatzschrift.
- **Drei Listenformen tragen alles:** Eintragszeile (alles mit Rolle oder Datum),
  Paarliste (Name und eine Zeile), Publikationszeile.
- **Jede Angabe hat einen Ort.** Die Stationen stehen einmal auf Work und
  gekürzt im CV, beide aus derselben Datei. Das Muster Create → Structure →
  Professionalize → Automate steht nur auf About.
- **Nur Bestätigtes.** Was im Briefing als unbestätigt markiert war, erscheint
  nicht, oder nur mit dem bestätigten Teil (Liste unten).

## Inhalte

| Datei | Inhalt |
|---|---|
| `src/data/record.json` | Stationen, Praktika, Gremien, Unternehmungen, Beteiligungen, Ausbildung, Zertifikate, Sprachen, die vier Phasen. Eine Quelle für Work, CV, Research und About |
| `src/data/orcid.json` | letzter guter Stand der ORCID-Werke (wird beim Bauen aktualisiert) |
| `build/pages/*.mjs` | die Seiten mit ihren Texten |

**Beteiligungen:** Namen und Anlageform, keine Beträge, keine Bewertungen.
Datenbasis ist die Notion-Datenbank *ME / Beteiligungen*, Stand 07.08.2026;
insolvente Positionen erscheinen nicht.

**Publikationen:** Beim Bauen wird das ORCID-Profil abgefragt und die Liste fest
ins HTML geschrieben — sie steht also auch ohne JavaScript da. Auf `/research`
gleicht ein kleines Skript die Liste im Browser live mit ORCID ab und ersetzt
sie nur, wenn sich etwas geändert hat. Build und Browser nutzen dasselbe Modul
(`src/js/orcid-normalize.js`).

**Nicht angezeigt, bis bestätigt:** ~350 Kunden (Managed IT services); die
Unternehmungen finivia, Virtual App Container und Feelbelt (Feelbelt steht im
Portfolio); „15+ Unternehmen“ und „seit 2012“; Thema und Hochschule der
Promotion; Law studies; der Absatz „Family offices“; Jahr und Ort der
Fotounterschriften. Projekt-Screenshots gibt es noch keine. Das Porträt ist
auf About eine ruhige Fläche (erst ab 1024 px), auf der Startseite gibt es
keines.

## Bauen

```bash
npm run build          # src/ → site/, danach die statischen Prüfungen
npm run preview        # http://127.0.0.1:4500 (URLs wie live, ohne dessen /x/ → /x)
npm install && npx playwright install chromium   # einmalig, nur für die Browser-Schritte
npm run check:layout   # Überlauf, Navigation, Überschriften, Kontrast, Weiterleitungen
npm run og             # Vorschaubild und Apple-Icon neu rendern (src/static/)
```

Die Browser-Schritte nehmen Playwrights Chromium; `CHROMIUM_PATH` kann auf
ein anderes zeigen.

Der Bauschritt braucht nur Node 20+ und keine Abhängigkeiten. `site/` liegt im
Repository und Cloudflare liefert es unverändert aus — in `wrangler.toml` steht
kein Build-Befehl. Nach Änderungen also: bauen, prüfen, `site/` committen.

`build/check.mjs` läuft nach jedem Build und hält fest, was die Seite ausmacht:
keine Platzhalter, keine unbestätigten Angaben, keine Beträge im Portfolio,
nur die Farben und die fünf Schriftgrössen des Systems, keine neuen
Kontaktkanäle, keine toten internen Links.

## Seiten

`/` · `/work` · `/research` · `/about` · `/cv`, dazu `404.html`, `robots.txt`
und `sitemap.xml`. `/learning` gibt es nicht mehr: Zertifikate, Sprachen und
Werkzeuge stehen jetzt im CV, die alte Adresse leitet per `site/_redirects`
dauerhaft (301) auf `/cv#certificates` weiter. Ebenso leiten die Adressen der
früheren Fassungen, die noch in Suchmaschinen stehen (`/ueber-mich`,
`/kontakt`, `/beitraege`, `/work/advisory` usw.), auf ihre heutige Entsprechung.

Der Lebenslauf als PDF enthält Kontaktdaten und trägt deshalb
`X-Robots-Tag: noindex` (`site/_headers`): herunterladbar, aber nicht im
Suchindex.

Unter **`/kleidung`** liegt die eigenständige Seite aus `Kleidung/`. Sie gehört
nicht zur Navigation und steht nicht in der Sitemap. Der Bauschritt kopiert sie
nach `site/kleidung/` und setzt dabei ihre Bildpfade absolut, damit sie unter
`/kleidung` und `/kleidung/` gleichermassen vollständig lädt.

## Deploy

Cloudflare baut von `main` und liefert `site/` als statische Assets aus.
