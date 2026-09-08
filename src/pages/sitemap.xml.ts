import type { APIRoute } from "astro";
import site from "../content/site.json";

/* Alle oeffentlichen Seiten der Informationsarchitektur (Briefing Abschnitt 3). */
const paths = [
  "/",
  "/work",
  "/work/advisory",
  "/work/entrepreneurship",
  "/work/investing",
  "/work/technology-creative",
  "/research",
  "/research/family-governance",
  "/research/family-offices",
  "/research/publications",
  "/about",
  "/cv",
];

export const GET: APIRoute = () => {
  const base = site.domain.value.replace(/\/$/, "");
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map((p) => `  <url><loc>${base}${p === "/" ? "/" : p}</loc></url>`).join("\n") +
    `\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
