/*
 * Layout-Pruefung im Browser (Playwright, Chromium), mit abgeschaltetem
 * JavaScript - so, wie die Seite ohne Skripte ankommt:
 *   - kein horizontaler Ueberlauf von 320 bis 1920 px
 *   - Navigation bei 320 px in einer Zeile
 *   - genau eine h1, keine uebersprungenen Ueberschriftsebenen
 *   - Kontrast jedes sichtbaren Textes mindestens 4.5:1 (WCAG AA)
 *   - Portraet-Flaeche nur auf About und erst ab 1024 px
 *   - Weiterleitungen aus site/_redirects (wie sie die Vorschau umsetzt;
 *     Cloudflare liest dieselbe Datei), Unbekanntes liefert 404
 *   - Hoehenbudget auf dem Telefon
 *
 * Aufruf: npm run check:layout  (nach npm run build)
 */
import { chromium } from "playwright";
import { existsSync } from "node:fs";
import { serve } from "./preview.mjs";

const PORT = 4517;
const BASE = `http://127.0.0.1:${PORT}`;
const PAGES = ["/", "/work", "/research", "/about", "/cv", "/does-not-exist"];
const WIDTHS = [320, 390, 768, 1024, 1440, 1920];
/* Hoehenbudget bei 390 px: die Seiten sollen auf dem Telefon kurz bleiben. */
const BUDGET = { "/": 3200, "/work": 6000 };

const server = serve(PORT);
await new Promise((r) => server.on("listening", r));
const exe = process.env.CHROMIUM_PATH || (existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const failures = [];

for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const r = await page.evaluate(() => {
      const over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      const nav = document.querySelector(".site-nav ul").getBoundingClientRect().height;
      const navItem = document.querySelector(".site-nav a").getBoundingClientRect().height;
      const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => +h.tagName[1]);
      let skipped = null;
      levels.reduce((prev, l) => { if (l > prev + 1 && !skipped) skipped = `h${prev} -> h${l}`; return l; }, 1);
      const portrait = document.querySelector(".portrait");
      return {
        over, navLines: Math.round(nav / navItem), h1: levels.filter((l) => l === 1).length, skipped,
        portrait: portrait ? getComputedStyle(portrait).display !== "none" : null,
        height: document.documentElement.scrollHeight,
      };
    });
    if (r.over > 0) failures.push(`${path} @${width}: ${r.over}px horizontaler Ueberlauf`);
    if (width === 320 && r.navLines > 1) failures.push(`${path} @320: Navigation bricht um`);
    if (r.h1 !== 1) failures.push(`${path}: ${r.h1} h1`);
    if (r.skipped) failures.push(`${path}: Ueberschriftsebene uebersprungen (${r.skipped})`);
    if (r.portrait !== null && (path !== "/about" || r.portrait !== width >= 1024)) {
      failures.push(`${path} @${width}: Portraet-Flaeche ${r.portrait ? "sichtbar" : "unsichtbar"}`);
    }
    if (width === 390 && BUDGET[path] && r.height > BUDGET[path]) failures.push(`${path} @390: ${r.height}px > ${BUDGET[path]}px`);
    if (path === "/about" && width >= 1024 && r.portrait !== true) failures.push(`/about @${width}: Portraet-Flaeche fehlt`);
    if (width === 390) console.log(`  ${path.padEnd(16)} ${String(r.height).padStart(5)} px hoch bei 390`);
  }
  await ctx.close();
}

/* Kontrast: jede Textfarbe gegen den Seitenhintergrund, bei 1440 px. */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    const low = await page.evaluate(() => {
      const rgb = (c) => c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
      const lum = ([r, g, b]) => {
        const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const bgOf = (el) => {
        for (let e = el; e; e = e.parentElement) {
          const c = getComputedStyle(e).backgroundColor;
          if (!/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return rgb(c);
        }
        return [255, 255, 255];
      };
      const out = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const el = walker.currentNode.parentElement;
        if (!walker.currentNode.textContent.trim() || !el.getClientRects().length) continue;
        if (el.closest(".skip")) continue;
        const a = lum(rgb(getComputedStyle(el).color)), b = lum(bgOf(el));
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        if (ratio < 4.5) out.push(`${walker.currentNode.textContent.trim().slice(0, 30)} ${ratio.toFixed(2)}:1`);
      }
      return out;
    });
    for (const l of low) failures.push(`${path}: Kontrast ${l}`);
  }
  await ctx.close();
}

/* Weiterleitungen und Statuscodes, wie im Worker. */
for (const [path, status, location] of [["/learning", 301, "/cv#certificates"], ["/learning/", 301, "/cv#certificates"], ["/learning.html", 301, "/cv#certificates"], ["/kontakt/", 301, "/cv"], ["/does-not-exist", 404]]) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  if (res.status !== status) failures.push(`${path}: Status ${res.status} statt ${status}`);
  if (location && res.headers.get("location") !== location) failures.push(`${path}: Ziel ${res.headers.get("location")}`);
}

await browser.close();
server.close();
if (failures.length) {
  console.error(`Layout-Pruefung fehlgeschlagen (${failures.length}):`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log("Layout-Pruefung: alle bestanden");
