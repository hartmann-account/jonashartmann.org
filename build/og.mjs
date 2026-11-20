/*
 * Rendert das Vorschaubild fuer geteilte Links (src/static/og.png, 1200x630)
 * im Stil der Website: Outfit, Papierfarbe, eine Haarlinie. Braucht einen
 * Browser (Playwright) und wird deshalb nur bei Textaenderungen von Hand
 * aufgerufen, nicht bei jedem Build:  node build/og.mjs
 */
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const font = async (f) => (await readFile(join(root, "src", "fonts", f))).toString("base64");

const faces = `
@font-face { font-family: Outfit; font-weight: 400; src: url(data:font/woff2;base64,${await font("outfit-latin-400-normal.woff2")}) format("woff2"); }
@font-face { font-family: Outfit; font-weight: 500; src: url(data:font/woff2;base64,${await font("outfit-latin-500-normal.woff2")}) format("woff2"); }
@font-face { font-family: Cormorant; font-weight: 600; src: url(data:font/woff2;base64,${await font("cormorant-latin-500-normal.woff2")}) format("woff2"); }
@font-face { font-family: Cormorant; font-style: italic; font-weight: 600; src: url(data:font/woff2;base64,${await font("cormorant-latin-600-italic.woff2")}) format("woff2"); }`;

const html = `<!doctype html><html><head><style>${faces}
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #f7f5f0; color: #2e2a24; font-family: Outfit;
  padding: 72px 88px 64px; display: flex; flex-direction: column; }
.name { font-family: Cormorant, Georgia, serif; font-size: 36px; font-weight: 600; color: #1a1713; }
.who { margin-top: 6px; font-size: 24px; color: #6b655b; }
h1 { margin-top: auto; font-family: Cormorant, Georgia, serif; font-size: 84px; line-height: 1.04;
  letter-spacing: -0.015em; font-weight: 600; color: #1a1713; max-width: 16ch; text-wrap: balance; }
.foot { margin-top: 56px; padding-top: 22px; border-top: 1px solid #ddd7ca; display: flex; justify-content: space-between;
  font-size: 22px; color: #6b655b; }
</style></head><body>
<p class="name">Jonas Hartmann</p>
<p class="who">Advisor, entrepreneur, investor, researcher</p>
<h1>Building structures for <em>businesses, families and capital</em>.</h1>
<div class="foot"><span>Zug, Switzerland</span><span>jonashartmann.org</span></div>
</body></html>`;

const exe = process.env.CHROMIUM_PATH || (existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, "src", "static", "og.png") });
/* Icon fuer Startbildschirme (iOS), im selben Stil: Initialen in Outfit. */
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<!doctype html><html><head><style>
@font-face { font-family: Outfit; font-weight: 500; src: url(data:font/woff2;base64,${await font("outfit-latin-500-normal.woff2")}) format("woff2"); }
body { margin: 0; width: 180px; height: 180px; background: #1a1713; color: #f7f5f0; font: 500 84px/180px Outfit;
  text-align: center; letter-spacing: -0.02em; }
</style></head><body>JH</body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, "src", "static", "apple-touch-icon.png") });
await browser.close();
console.log("src/static/og.png und apple-touch-icon.png geschrieben");
