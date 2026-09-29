/*
 * Seitenrahmen: <head>, Kopf und Fuss. Jede Seite traegt dieselbe Anatomie -
 * Name oben links, Navigation oben rechts, im Fuss Copyright links und die
 * drei Kanaele rechts (die Ecken-Anordnung des Design-Systems).
 */
import { html, raw } from "./html.mjs";

export const SITE_URL = "https://jonashartmann.org";
export const LINKEDIN = "https://www.linkedin.com/in/hartmann-jonas/";
export const CV_PDF = "/assets/jonas-hartmann-cv-2026-09.pdf";
export const HOME_TITLE = "Jonas Hartmann — Advisor, entrepreneur, investor, researcher";
export const HOME_DESCRIPTION = "Building structures for businesses, families and capital. A decade across entrepreneurship, corporate advisory, technology and family governance.";
const OG_ALT = "Jonas Hartmann — Advisor, entrepreneur, investor, researcher. Building structures for businesses, families and capital.";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
];

export function page({ path, title, description, body, head = "", noindex = false, year, orcidUrl }) {
  // Auf der 404-Seite gibt es weder Canonical noch eine aktuelle Seite; ihre
  // Open-Graph-Angaben zeigen auf die Startseite.
  const url = SITE_URL + (noindex ? "/" : path);
  const ogTitle = noindex ? HOME_TITLE : title;
  const current = (href) => (!noindex && href === path ? raw(' aria-current="page"') : "");
  return `<!doctype html>\n` + html`<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#f5f6f7">
<title>${title}</title>
<meta name="description" content="${description}">
${noindex ? raw('<meta name="robots" content="noindex">') : html`<link rel="canonical" href="${url}">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Jonas Hartmann">
<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="${noindex ? HOME_DESCRIPTION : description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/png">
<meta property="og:image:alt" content="${OG_ALT}">
<meta name="twitter:image:alt" content="${OG_ALT}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/outfit-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/outfit-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/site.css">
${head}
</head>
<body>
<a class="skip" href="#content">Skip to content</a>
<header class="site-header">
  <div class="frame site-header__inner">
    <a class="site-header__name" href="/"${current("/")}>Jonas Hartmann</a>
    <nav class="site-nav" aria-label="Main">
      <ul>
${NAV.map((n) => html`        <li><a href="${n.href}"${current(n.href)}>${n.label}</a></li>\n`)}      </ul>
    </nav>
  </div>
</header>
<main id="content" class="frame" tabindex="-1">
${body}
</main>
<footer class="site-footer">
  <div class="frame">
    <div class="site-footer__inner">
      <p>© ${year} Jonas Hartmann · Zug, Switzerland</p>
      <ul class="site-footer__links">
        <li><a href="${LINKEDIN}">LinkedIn</a></li>
        <li><a href="${orcidUrl}">ORCID</a></li>
        <li><a href="${CV_PDF}">CV (PDF)</a></li>
      </ul>
    </div>
  </div>
</footer>
</body>
</html>
`;
}
