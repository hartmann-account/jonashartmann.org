# jonashartmann.org — v3

Persönliche Website nach Briefing v3 (08.09.2026): reduzierte Plattform mit den vier
Rollen Advise · Build · Invest · Research und der Klammer Create → Structure →
Professionalize → Automate.

## Stack

- **Astro 5**, statisch gebaut, `lang="en"`
- **Vanilla CSS** mit Custom Properties (`src/styles/global.css`), kein Tailwind
- **Self-hosted Fonts**: Fraunces (Display) und Inter (Text), woff2, `font-display: swap`
- **Client-JS nur an zwei Stellen**: Stufenmarker auf Home (IntersectionObserver,
  aus bei `prefers-reduced-motion`) und der ORCID-Abruf auf `/research/publications`
- **Hosting**: Cloudflare Worker `jonashartmann-org` (Assets-only aus `dist/`), siehe `wrangler.toml`

## Struktur

```
src/content/*.json      alle Texte und Zahlen aus Briefing Abschnitt 4
                        [VERIFY]-Stellen als { value, verified: false, note? }
src/pages/              /  /work(+4)  /research(+3)  /about  /cv  /404  sitemap.xml
src/layouts/Base.astro  Kopf, Navigation, Footer, SEO/OG
src/components/         V (Verify-Feld), PageHead, SubList
src/styles/global.css   Tokens, Typografie, Layout-Bausteine
scripts/verify-gate.mjs Verified-Gate (siehe unten)
public/fonts            woff2
public/images           Portraet, OG-Bild, investments/ (Logos aus Notion)
public/cv               PDF-Lebenslauf (jonas-hartmann-cv-YYYY-MM.pdf)
v1/                     vorherige Seite (Hono-Worker mit ORCID-Live-Seite)
old/                    statische Seite davor
```

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # listet alle Felder mit verified: false
npm run build      # Gate + Astro-Build nach dist/
```

## Verified-Gate

Jede `[VERIFY]`-Stelle des Briefings liegt in `src/content/*.json` als Objekt mit
`verified: false`. `npm run build` listet die offenen Felder; mit `PRODUCTION=true`
bricht der Build ab, solange eines offen ist. Vor dem Launch also:

```bash
npm run check                 # offene Felder ansehen
# ... Werte bestaetigen, verified: true setzen ...
PRODUCTION=true npm run build # muss durchlaufen
```

Im Entwurf sind unverifizierte Werte gepunktet unterstrichen (`.unverified`).

## Beteiligungen

`src/content/investments.json` stammt aus der Notion-Datenbank *ME / Beteiligungen*
(Stand 2026-08-07): Name, Sektor, Instrument, Status, Kurzbeschreibung, Website, Logo.
Bewusst **ohne** Beträge, Stückzahlen oder Zeitwerte. Anzeige auf `/work/investing`
ueber `work.json → investing.personal.showPortfolio`; `hideStatuses` blendet Status
aus (Standard: Insolvenz).

## Deploy

Cloudflare baut von `main` (`[build] command = "npm run build"`) und liefert `dist/`
als statische Assets aus. Cache-Header stehen in `public/_headers`.
