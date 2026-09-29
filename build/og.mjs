/*
 * Rendert das Vorschaubild fuer geteilte Links (src/static/og.png, 1200x630)
 * im Stil der Website: Outfit, Papierfarbe, eine Haarlinie. Braucht einen
 * Browser (Playwright) und wird deshalb nur bei Textaenderungen von Hand
 * aufgerufen, nicht bei jedem Build:  node build/og.mjs
 */
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const font = async (w) => (await readFile(join(root, "src", "fonts", `outfit-latin-${w}-normal.woff2`))).toString("base64");

const html = `<!doctype html><html><head><style>
@font-face { font-family: Outfit; font-weight: 400; src: url(data:font/woff2;base64,${await font(400)}) format("woff2"); }
@font-face { font-family: Outfit; font-weight: 500; src: url(data:font/woff2;base64,${await font(500)}) format("woff2"); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #f5f6f7; color: #171a1c; font-family: Outfit;
  padding: 72px 88px 64px; display: flex; flex-direction: column; }
.name { font-size: 30px; font-weight: 500; color: #060707; }
.who { margin-top: 6px; font-size: 24px; color: #5a5e60; }
h1 { margin-top: auto; font-size: 68px; line-height: 1.08; letter-spacing: -0.015em; font-weight: 500; color: #060707; max-width: 17ch; text-wrap: balance; }
.foot { margin-top: 56px; padding-top: 22px; border-top: 1px solid #cdd2d7; display: flex; justify-content: space-between;
  font-size: 22px; color: #5a5e60; }
</style></head><body>
<p class="name">Jonas Hartmann</p>
<p class="who">Advisor, entrepreneur, investor, researcher</p>
<h1>Building structures for businesses, families and capital.</h1>
<div class="foot"><span>Zug, Switzerland</span><span>jonashartmann.org</span></div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, "src", "static", "og.png") });
await browser.close();
console.log("src/static/og.png geschrieben");
