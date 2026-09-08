# jonashartmann.org

Statisch gerenderte Website auf Cloudflare Workers.

## Stack

- **Hono** mit serverseitigem JSX (`hono/jsx`) - kein Client-Framework
- **Cloudflare Workers** (`wrangler`), statische Dateien aus `public/`
- **Tailwind CSS 3** mit `--th-*`-Variablen fuer Light- und Dark-Theme
- **TypeScript**, strict

## Struktur

```
src/index.tsx            Worker-Einstieg: Security-Header, CSP, Routen
src/routes/home.tsx      Startseite
src/components/Layout    <html>-Huelle, Meta, Assets
src/components/SiteShell Seitenleiste, mobiler Header, Inhaltsbereich
src/lib/version.ts       Asset-Version fuer Cache-Busting
src/styles.css           Theme-Variablen + Tailwind
public/static/app.js     Menue-Toggle, Lade-Indikator
old/                     frueherer Stand der Seite
```

## Entwicklung

```bash
npm install
npm run build:css   # oder: npm run dev:css (watch)
npm run dev
```

## Deploy

```bash
npm run deploy
```

Nach jeder Aenderung an `public/static/app.js` oder `src/styles.css` die
`ASSET_VERSION` in `wrangler.toml` erhoehen, sonst halten Browser-Caches an
der alten Datei fest.

## Neue Seite hinzufuegen

1. Route unter `src/routes/` anlegen und in `src/index.tsx` registrieren.
2. Eintrag in `navItems` in `src/components/SiteShell.tsx` ergaenzen.
