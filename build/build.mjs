/*
 * Baut die Website nach site/. Ohne Abhaengigkeiten, ohne Browser: Node 20+.
 *
 *   src/data/record.json   Lebenslauf, Beteiligungen, Stationen (eine Quelle
 *                          fuer Work, CV, Research und About)
 *   src/data/orcid.json    letzter guter Stand der ORCID-Werke
 *   build/pages/*.mjs      die Seiten
 *   src/styles/site.css    das einzige Stylesheet
 *
 * Aufruf: npm run build  (danach laufen die Pruefungen aus build/check.mjs)
 */
import { readFile, writeFile, mkdir, rm, cp, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { page, SITE_URL } from "./lib/layout.mjs";
import { loadWorks } from "./lib/orcid.mjs";
import { ORCID_URL } from "../src/js/orcid-normalize.js";
import home from "./pages/home.mjs";
import work from "./pages/work.mjs";
import research from "./pages/research.mjs";
import about from "./pages/about.mjs";
import cv from "./pages/cv.mjs";
import notfound from "./pages/notfound.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const SRC = join(root, "src");
const OUT = join(root, "site");

const record = JSON.parse(await readFile(join(SRC, "data", "record.json"), "utf8"));
const { works, source } = await loadWorks(join(SRC, "data", "orcid.json"));
if (!works.length) throw new Error("Keine ORCID-Werke - src/data/orcid.json pruefen.");
console.log(`  ORCID: ${works.length} Werke (${source})`);

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const year = new Date().getFullYear();
const pages = [home, work, research, about, cv, notfound].map((make) => make({ record, works }));
for (const pg of pages) {
  const out = page({ ...pg, year, orcidUrl: ORCID_URL });
  await writeFile(join(OUT, pg.file), out, "utf8");
  console.log(`  ${pg.file.padEnd(14)} ${(out.length / 1024).toFixed(1).padStart(5)} KB`);
}

/* Stylesheet, Skripte, Schriften, Bilder, statische Dateien. */
await cp(join(SRC, "styles", "site.css"), join(OUT, "site.css"));
await cp(join(SRC, "js", "orcid.js"), join(OUT, "orcid.js"));
await cp(join(SRC, "js", "orcid-normalize.js"), join(OUT, "orcid-normalize.js"));
await mkdir(join(OUT, "fonts"));
for (const f of [
  "outfit-latin-400-normal.woff2",
  "outfit-latin-500-normal.woff2",
  "cormorant-latin-500-normal.woff2",
  "cormorant-latin-600-italic.woff2",
]) {
  await cp(join(SRC, "fonts", f), join(OUT, "fonts", f));
}
await cp(join(SRC, "assets"), join(OUT, "assets"), { recursive: true });
await cp(join(SRC, "static"), OUT, { recursive: true });

const urls = pages.filter((pg) => !pg.noindex).map((pg) => `  <url><loc>${SITE_URL}${pg.path}</loc></url>`);
await writeFile(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
);

/*
 * Die eigenstaendige Seite unter Kleidung/ wird unter /kleidung ausgeliefert.
 * Ihre Bildpfade stehen relativ im Quelltext ("img/xy.jpg"); das traegt nur,
 * solange die URL auf einen Schraegstrich endet. Beim Kopieren werden sie
 * deshalb absolut gesetzt. Die Quelle in Kleidung/ bleibt unveraendert.
 */
{
  const src = join(root, "Kleidung");
  const dst = join(OUT, "kleidung");
  if (existsSync(src)) {
    await cp(src, dst, { recursive: true });
    const file = join(dst, "index.html");
    const html = await readFile(file, "utf8");
    await writeFile(file, html.replace(/(src|href)="(img\/[^"]+)"/g, '$1="/kleidung/$2"'), "utf8");
    console.log("  kleidung/      kopiert");
  }
}

/*
 * Die archivierte Live-Seite aus v1/ wird unter /v1/ mit ausgeliefert. Ihre
 * root-absoluten URLs (/site.css, /work, /fonts/...) wuerden sonst auf die
 * aktuelle Seite zeigen; beim Kopieren werden sie auf /v1/ umgeschrieben.
 */
{
  const src = join(root, "v1");
  const dst = join(OUT, "v1");
  if (existsSync(src)) {
    await cp(src, dst, { recursive: true });
    const rewrite = (s) =>
      s
        .replace(/(href|src|srcset)="\/(?!\/)/g, '$1="/v1/')
        .replace(/url\("\/(?!\/)/g, 'url("/v1/')
        .replace(/url\(\/(?!\/)/g, "url(/v1/");
    const walk = async (dir) => {
      for (const e of await readdir(dir, { withFileTypes: true })) {
        const p = join(dir, e.name);
        if (e.isDirectory()) await walk(p);
        else if (/\.(html|css)$/.test(e.name)) await writeFile(p, rewrite(await readFile(p, "utf8")), "utf8");
      }
    };
    await walk(dst);
    console.log("  v1/            kopiert (erreichbar unter /v1/)");
  }
}

console.log(`\nfertig: ${pages.length} Seiten in site/\n`);
await import("./check.mjs");
