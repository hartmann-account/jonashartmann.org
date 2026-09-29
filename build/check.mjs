/*
 * Pruefungen nach jedem Build. Schlaegt eine fehl, endet der Build mit Fehler.
 * Sie halten fest, was die Seite ausmacht: keine Platzhalter, keine
 * unbestaetigten Angaben, keine Betraege, ein kleines Typo-System, die
 * Ursprungsfarben des Design-Systems und keine neuen Kontaktkanaele.
 */
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(fileURLToPath(new URL("../site", import.meta.url)));
const PAGES = ["index.html", "work.html", "research.html", "about.html", "cv.html", "404.html"];
const read = (f) => readFile(join(OUT, f), "utf8");
const html = Object.fromEntries(await Promise.all(PAGES.map(async (f) => [f, await read(f)])));
const css = await read("site.css");
const orcid = JSON.parse(await readFile(join(OUT, "..", "src", "data", "orcid.json"), "utf8"));

const failures = [];
const check = (ok, message) => { if (!ok) failures.push(message); };
const count = (s, re) => (s.match(re) ?? []).length;

// 1. Vollstaendig ohne JavaScript; Skripte nur JSON-LD (Home) und ORCID (Research).
check(count(html["research.html"], /class="pub"/g) === orcid.works.length, `research: ${orcid.works.length} Publikationen erwartet`);
check(count(html["index.html"], /class="pub"/g) === 3, "index: 3 Publikationen erwartet");
for (const [f, s] of Object.entries(html)) {
  const scripts = s.match(/<script\b[^>]*>/g) ?? [];
  const allowed = scripts.every((t) =>
    (f === "index.html" && t.includes('type="application/ld+json"')) ||
    (f === "research.html" && t.includes('src="/orcid.js"')));
  check(allowed, `${f}: unerwartetes <script>`);
  check(!/\sstyle="/.test(s), `${f}: Inline-Style`);
  check(count(s, /<h1[\s>]/g) === 1, `${f}: genau eine h1 erwartet`);
}

// 2. Keine Platzhalter und keine unbestaetigten Angaben.
const FORBIDDEN = /to be (confirmed|supplied|verified)|placeholder|loaded live|~350|350\+|15\+|\b2012\b|Witten|Herdecke|Law studies|finivia|Virtual App Container|workshop, 2026|hanseatic help, hamburg|at 26\b|obsessive/i;
for (const [f, s] of Object.entries(html)) {
  const m = s.match(FORBIDDEN);
  check(!m, `${f}: verbotener Text "${m?.[0]}"`);
}

// 3. Feelbelt nur einmal, im Portfolio.
check(count(html["work.html"], /Feelbelt/g) === 1, "work: Feelbelt genau einmal (Portfolio)");
for (const f of PAGES.filter((f) => f !== "work.html")) check(!/Feelbelt/.test(html[f]), `${f}: Feelbelt`);

// 4. Keine Pfeile: Outfit hat sie nicht, sie kaemen aus einer Ersatzschrift.
for (const [f, s] of [...Object.entries(html), ["site.css", css]]) {
  check(!/[←-⇿]/.test(s), `${f}: Pfeilzeichen`);
}

// 5. Nur die Farben des Design-Systems.
const HEX = new Set(["#f5f6f7", "#eceef0", "#060707", "#171a1c", "#5a5e60", "#cdd2d7", "#395b75", "#082742"]);
for (const h of css.match(/#[0-9a-f]{3,8}\b/gi) ?? []) check(HEX.has(h.toLowerCase()), `site.css: Farbe ${h} nicht erlaubt`);

// 6. Keine Schatten, Verlaeufe, Unschaerfe, Versalien, Kursive, Rundungen.
check(!/box-shadow|gradient|blur|backdrop-filter|text-transform|font-style:\s*italic/.test(css), "site.css: verbotene Eigenschaft");
for (const r of css.match(/border-radius:\s*[^;]+/g) ?? []) check(/:\s*0\s*$/.test(r), `site.css: ${r}`);

// 7. Fuenf Schriftgroessen, zwei Schnitte.
for (const fs of css.match(/font-size:\s*[^;}]+/g) ?? []) {
  check(/var\(--fs-(display|heading|lead|body|small)\)/.test(fs), `site.css: ${fs.trim()}`);
}
for (const fw of css.match(/font-weight:\s*[^;}]+/g) ?? []) {
  check(/var\(--fw-(regular|medium)\)|:\s*(400|500)\s*$/.test(fw), `site.css: ${fw.trim()}`);
}

// 8. Kein Portraet-Platzhalter mehr.
for (const [f, s] of Object.entries(html)) check(!/portrait-placeholder|alt="Placeholder"/.test(s), `${f}: Platzhalter-Bild`);
check(!existsSync(join(OUT, "assets", "portrait-placeholder.svg")), "assets: portrait-placeholder.svg existiert");

// 9. Keine neuen Tabs.
for (const [f, s] of Object.entries(html)) check(!/target="_blank"/.test(s), `${f}: target="_blank"`);

// 10. Keine Kontaktkanaele ausser LinkedIn, ORCID und dem CV-PDF.
for (const [f, s] of Object.entries(html)) check(!/mailto:|tel:|Aabach|\+41/.test(s), `${f}: Kontaktdaten`);

// 11. Portfolio: 19 Namen in 4 Gruppen, keine Betraege.
{
  const w = html["work.html"];
  const start = w.indexOf('id="portfolio"');
  const end = w.indexOf('id="boards"');
  const block = w.slice(start, end);
  check(count(block, /<li><a href="https?:\/\/[^"]+" rel="noopener">/g) === 19, "portfolio: 19 verlinkte Namen erwartet");
  check(count(block, /class="pairs__row"/g) === 4, "portfolio: 4 Gruppen erwartet");
  const visible = block.replace(/<[^>]+>/g, " ").replace("Next2Sun", "");
  check(!/\d|CHF|EUR|€/.test(visible), "portfolio: Ziffern oder Waehrung sichtbar");
}

// 12. Veraltete Seiten sind weg, die Weiterleitung steht.
check(!existsSync(join(OUT, "learning.html")), "learning.html existiert noch");
check(/^\/learning\s+\/cv#certificates\s+301$/m.test(await read("_redirects")), "_redirects: /learning fehlt");
check(!(await read("sitemap.xml")).includes("/learning"), "sitemap: /learning");

// 13. Jeder interne Link zeigt auf etwas, das es gibt (Datei oder Anker).
const files = new Set((await readdir(OUT, { recursive: true })).map((f) => "/" + f.replace(/\\/g, "/")));
const ids = Object.fromEntries(Object.entries(html).map(([f, s]) => [f, new Set([...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
const fileFor = (path) => (path === "/" ? "index.html" : path.slice(1) + ".html");
for (const [f, s] of Object.entries(html)) {
  for (const [, href] of s.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:)?\/\//.test(href)) continue;
    const [path, hash] = href.split("#");
    const target = path === "" ? f : fileFor(path);
    const exists = path === "" || files.has(path) || (html[target] !== undefined);
    check(exists, `${f}: Link ins Leere ${href}`);
    if (hash && html[target]) check(ids[target].has(hash), `${f}: Anker fehlt ${href}`);
  }
}

// 14. Externe Links nur zu bekannten Zielen: Identitaet, Portfolio, ORCID-Werke, Musik.
{
  const record = JSON.parse(await readFile(join(OUT, "..", "src", "data", "record.json"), "utf8"));
  const host = (u) => new URL(u).host;
  const allowed = new Set(["www.linkedin.com", "orcid.org", "jonashartmann.org", "soma-suru.de",
    ...record.portfolio.flatMap((g) => g.companies.map((c) => host(c.url))),
    ...orcid.works.filter((w) => w.href).map((w) => host(w.href))]);
  for (const [f, s] of Object.entries(html)) {
    for (const [, u] of s.matchAll(/(?:href|src|content)="(https?:\/\/[^"]+)"/g)) {
      check(allowed.has(host(u)), `${f}: externer Link zu ${host(u)}`);
    }
  }
}

if (failures.length) {
  console.error(`Pruefung fehlgeschlagen (${failures.length}):`);
  for (const m of failures) console.error("  - " + m);
  process.exit(1);
}
console.log("Pruefungen: alle bestanden");
