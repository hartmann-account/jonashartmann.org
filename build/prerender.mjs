/*
 * Prerender: aus dem Design-Canvas werden echte statische Seiten.
 *
 * Der Export aus Claude Design ist ein Canvas-Dokument: ein einziges HTML mit
 * eigenem Runtime (support.js), das im Browser React und @babel/standalone
 * nachlaedt, die Vorlagen zur Laufzeit kompiliert und per Hash-Routing (#/work)
 * zwischen den Screens umschaltet. Fuer eine Vorschau ist das richtig, fuer
 * eine oeffentliche Website nicht: gut drei Megabyte Laufzeit vor dem ersten
 * sichtbaren Pixel, keine echten URLs, nichts fuer Suchmaschinen.
 *
 * Dieses Skript oeffnet jede Route im Browser, laesst sie fertig rendern,
 * ersetzt alles, was ohne Runtime nicht mehr traegt, und schreibt das Ergebnis
 * als eigenstaendige HTML-Datei heraus. Die ausgelieferte Seite braucht danach
 * kein JavaScript mehr.
 *
 * Aufruf:  npm run build
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, rm, cp, readdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const CANVAS = join(root, "canvas");
const OUT = join(root, "site");
const SITE_URL = "https://mein-hartmann.de";

const ROUTES = [
  { slug: "", hash: "#/", file: "index.html",
    title: "Jonas Hartmann — Entrepreneur · Advisor · Investor · Researcher",
    description: "Building structures for businesses, families and capital. A decade across entrepreneurship, corporate advisory, technology and family governance." },
  { slug: "work", hash: "#/work", file: "work.html",
    title: "Work — Jonas Hartmann",
    description: "Advisory, entrepreneurship, investing, and technology and creative work." },
  { slug: "research", hash: "#/research", file: "research.html",
    title: "Research — Jonas Hartmann",
    description: "Doctoral research on family office governance, at the intersection of finance, law and family enterprise." },
  { slug: "learning", hash: "#/learning", file: "learning.html",
    title: "Learning — Jonas Hartmann",
    description: "Courses, certificates and continuing education." },
  { slug: "about", hash: "#/about", file: "about.html",
    title: "About — Jonas Hartmann",
    description: "From creating things to building institutions: create, structure, professionalize, automate." },
  { slug: "cv", hash: "#/cv", file: "cv.html",
    title: "Curriculum vitae — Jonas Hartmann",
    description: "Complete record of positions, ventures, education and memberships." },
];

/* Beschriftung der Tab-Leiste auf die Route abbilden. */
const TAB_TO_SLUG = { work: "work", research: "research", learning: "learning", about: "about", cv: "cv" };

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".woff2": "font/woff2", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png", ".svg": "image/svg+xml", ".pdf": "application/pdf",
};

/* Kleiner Dateiserver: der Browser braucht eine echte Origin, damit relative
   Pfade und die CSS-Dateien des Design-Systems aufloesen. */
function serve(dir, extraDir) {
  return new Promise((ok) => {
    const server = createServer(async (req, res) => {
      try {
        const path = decodeURIComponent(req.url.split("?")[0]);
        let file = join(dir, path === "/" ? "/site.dc.html" : path);
        // Die statischen Beigaben (site.css, favicon) liegen ausserhalb des
        // Canvas; sie werden hier mitbedient, damit die Seite beim Rendern
        // genauso aussieht wie spaeter ausgeliefert.
        if (!existsSync(file) && extraDir) {
          const alt = join(extraDir, path);
          if (alt.startsWith(extraDir) && existsSync(alt)) file = alt;
        }
        if (!(file.startsWith(dir) || (extraDir && file.startsWith(extraDir))) || !existsSync(file)) {
          return void res.writeHead(404).end("not found");
        }
        res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
        res.end(await readFile(file));
      } catch {
        res.writeHead(500).end("error");
      }
    });
    server.listen(0, "127.0.0.1", () => ok({ server, port: server.address().port }));
  });
}

/* Laeuft im Browser auf dem fertig gerenderten DOM. */
function staticify({ tabMap, meta }) {
  // Die Tab-Leiste besteht aus <button> mit JS-Handlern; ohne Runtime waere
  // die Navigation tot. Sie wird zu echten Links, Stil und Zustand bleiben.
  for (const button of document.querySelectorAll('button[role="tab"]')) {
    const label = button.textContent.replace(/^[\d.\s]+/, "").trim().toLowerCase();
    const slug = tabMap[label];
    if (slug === undefined) continue;
    const a = document.createElement("a");
    a.setAttribute("href", "/" + slug);
    a.setAttribute("role", "tab");
    a.setAttribute("aria-selected", button.getAttribute("aria-selected") ?? "false");
    if (button.getAttribute("aria-selected") === "true") a.setAttribute("aria-current", "page");
    a.setAttribute("style", (button.getAttribute("style") ?? "") + ";text-decoration:none;");
    a.innerHTML = button.innerHTML;
    button.replaceWith(a);
  }

  // Alles, was jetzt noch ein Button ohne Funktion waere, faellt weg.
  for (const button of document.querySelectorAll("button")) button.remove();

  // Hash-Routen in echte Pfade uebersetzen.
  for (const a of document.querySelectorAll('a[href^="#/"]')) {
    const target = a.getAttribute("href").slice(1);
    a.setAttribute("href", target === "/" ? "/" : target);
  }

  // Relative Pfade absolut machen, damit sie auch von /work aufloesen.
  for (const el of document.querySelectorAll("[src],[href]")) {
    for (const attr of ["src", "href"]) {
      const v = el.getAttribute(attr);
      if (v && !/^(https?:|\/|#|mailto:|data:)/.test(v)) {
        el.setAttribute(attr, "/" + v.replace(/^\.\//, ""));
      }
    }
  }

  // Runtime entfernen - die Seite ist fertig.
  for (const s of document.querySelectorAll("script")) s.remove();

  // Canvas-Attribute aufraeumen.
  for (const attr of ["data-dc-tpl", "data-world", "data-props", "data-screen-label"]) {
    for (const el of document.querySelectorAll(`[${attr}]`)) el.removeAttribute(attr);
  }

  /* Der Export legt Raster fest auf drei oder vier Spalten, ohne Media
     Query; auf schmalen Schirmen wird das zu eng und der Inhalt laeuft aus
     den Kacheln. Hier bekommt jedes solche Raster eine Klasse, site.css
     laesst es darunter umbrechen. Die Spaltenzahl wird am gerenderten
     Zustand gemessen, nicht am style-Attribut geraten. */
  for (const el of document.querySelectorAll('[style*="grid-template-columns"]')) {
    const tracks = getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length;
    if (tracks >= 3) el.classList.add("cols-" + Math.min(tracks, 4));
  }

  document.documentElement.setAttribute("lang", "en");

  // Kopf-Metadaten: das Canvas bringt keine mit.
  const head = document.head;
  for (const el of head.querySelectorAll("title, meta[name=description], link[rel=canonical], meta[property^='og:'], meta[name^='twitter:'], link[rel=icon]")) {
    el.remove();
  }
  const title = document.createElement("title");
  title.textContent = meta.title;
  head.appendChild(title);
  const add = (tag, attrs) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    head.appendChild(el);
  };
  add("link", { rel: "stylesheet", href: "/site.css" });
  add("meta", { name: "description", content: meta.description });
  add("link", { rel: "canonical", href: meta.canonical });
  add("link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" });
  add("meta", { property: "og:type", content: "website" });
  add("meta", { property: "og:site_name", content: "Jonas Hartmann" });
  add("meta", { property: "og:title", content: meta.title });
  add("meta", { property: "og:description", content: meta.description });
  add("meta", { property: "og:url", content: meta.canonical });
  add("meta", { property: "og:image", content: meta.ogImage });
  add("meta", { name: "twitter:card", content: "summary_large_image" });
}

/*
 * Die Canvas-Runtime laedt React und @babel/standalone zur Laufzeit von unpkg.
 * Fuer den Bauschritt werden sie einmal lokal zwischengelegt (build/vendor/,
 * nicht im Repository) und die Anfragen des Browsers dorthin umgeleitet. Die
 * Canvas-Quelle bleibt dadurch unveraendert, und der Build braucht das Netz
 * nur beim ersten Lauf.
 */
const VENDOR = join(root, "build", "vendor");
const CDN = {
  "https://unpkg.com/react@18.3.1/umd/react.production.min.js": "react.production.min.js",
  "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js": "react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone@7.29.0/babel.min.js": "babel.min.js",
};

await mkdir(VENDOR, { recursive: true });
for (const [url, name] of Object.entries(CDN)) {
  const file = join(VENDOR, name);
  if (existsSync(file)) continue;
  console.log(`  lade ${name} …`);
  await promisify(execFile)("curl", ["-sSL", "--fail", "-o", file, url], { maxBuffer: 1 << 28 });
}

const { server, port } = await serve(CANVAS, join(root, "build", "static"));
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium",
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const problems = [];

for (const route of ROUTES) {
  const page = await context.newPage();
  // Die CDN-Anfragen der Runtime aus dem lokalen Zwischenlager bedienen.
  await page.route("https://unpkg.com/**", async (r) => {
    const name = CDN[r.request().url()];
    if (!name) return r.abort();
    await r.fulfill({ status: 200, contentType: "text/javascript; charset=utf-8", body: await readFile(join(VENDOR, name)) });
  });
  page.on("pageerror", (e) => problems.push(`${route.file}: ${e.message}`));
  page.on("requestfailed", (r) => problems.push(`${route.file}: ${r.url()}`));

  await page.goto(base + "/site.dc.html" + route.hash, { waitUntil: "load", timeout: 90000 });
  await page.waitForFunction(() => document.body.innerText.trim().length > 400, null, { timeout: 90000 });
  await page.waitForTimeout(400);

  await page.evaluate(staticify, {
    tabMap: TAB_TO_SLUG,
    meta: {
      title: route.title,
      description: route.description,
      canonical: SITE_URL + (route.slug ? "/" + route.slug : "/"),
      ogImage: SITE_URL + "/assets/portrait-bw.jpg",
    },
  });

  const html = await page.content();
  await writeFile(join(OUT, route.file), html, "utf8");
  const words = await page.evaluate(() => document.body.innerText.trim().split(/\s+/).length);
  console.log(`  ${route.file.padEnd(16)} ${(html.length / 1024).toFixed(0).padStart(4)} KB  ${String(words).padStart(4)} Woerter`);
  await page.close();
}

await browser.close();
server.close();

/* Design-System und Bilder uebernehmen. Das React-Bundle und die
   Werkzeugdateien des Canvas bleiben draussen - gerendert wird daraus nichts
   mehr, ausgeliefert werden nur CSS, Fonts und Bilder. */
await cp(join(CANVAS, "_ds"), join(OUT, "_ds"), { recursive: true });
for (const dir of await readdir(join(OUT, "_ds"))) {
  for (const f of ["_ds_bundle.js", "_adherence.oxlintrc.json", "_ds_manifest.json", "readme.md"]) {
    await rm(join(OUT, "_ds", dir, f), { force: true });
  }
}
await cp(join(CANVAS, "assets"), join(OUT, "assets"), { recursive: true });
await cp(join(root, "build", "static"), OUT, { recursive: true });

/* 404: Kopf und Fuss der Startseite uebernehmen, den Inhalt ersetzen. So
   traegt die Fehlerseite dieselbe Anatomie wie der Rest der Website. */
{
  const home = await readFile(join(OUT, "index.html"), "utf8");
  const mainOpen = home.indexOf("<main");
  const mainEnd = home.indexOf("</main>");
  if (mainOpen > -1 && mainEnd > -1) {
    const openTagEnd = home.indexOf(">", mainOpen) + 1;
    const body = `
      <div style="display:grid;gap:var(--space-5);padding-top:clamp(24px,6vw,72px);">
        <div style="display:flex;align-items:baseline;gap:var(--space-4);border-bottom:1px solid var(--rule);padding-bottom:var(--space-3);">
          <span style="font-family:var(--font-body);font-size:var(--text-meta);letter-spacing:var(--tracking-meta);color:var(--text-secondary);">404</span>
          <h1 style="margin:0;font-family:var(--font-display);font-weight:var(--weight-semibold);font-size:var(--text-h1);line-height:1.1;">Page not found</h1>
        </div>
        <p style="margin:0;max-width:46ch;color:var(--text-body);">This page does not exist. The sections above lead everywhere this site goes.</p>
        <p style="margin:0;"><a href="/" style="color:var(--text-primary);">Back to the start &rarr;</a></p>
      </div>`;
    let page = home.slice(0, openTagEnd) + body + home.slice(mainEnd);
    page = page
      .replace(/<title>[\s\S]*?<\/title>/, "<title>Page not found — Jonas Hartmann</title>")
      .replace(/(<meta name="description" content=")[^"]*(")/, "$1This page does not exist.$2")
      .replace(/<link rel="canonical"[^>]*>/, "")
      .replace(/ aria-current="page"/g, "");
    await writeFile(join(OUT, "404.html"), page, "utf8");
    console.log("  404.html          erzeugt");
  }
}

if (problems.length) {
  console.log("\nWarnungen:");
  for (const p of [...new Set(problems)].slice(0, 10)) console.log("  " + p);
}
console.log(`\nfertig: ${ROUTES.length} Seiten in site/`);
