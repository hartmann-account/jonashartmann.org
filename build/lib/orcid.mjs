/*
 * ORCID-Werke fuer die Research-Seite.
 *
 * Beim Bauen wird das oeffentliche ORCID-Profil abgefragt und die Liste fest
 * ins HTML geschrieben: die Seite zeigt die Publikationen also auch ohne
 * JavaScript. Jeder erfolgreiche Abruf wird nach src/data/orcid.json
 * geschrieben; faellt die API beim Bauen aus, baut die Seite mit diesem
 * letzten guten Stand weiter statt ohne Publikationen.
 *
 * Im Browser gleicht ein kleines Skript (src/js/orcid.js) die Liste danach
 * live mit ORCID ab. Beide Seiten nutzen dieselbe Normalisierung, damit sich
 * das statische und das live nachgeladene Ergebnis nicht unterscheiden.
 */
import { readFile, writeFile } from "node:fs/promises";

export const ORCID_ID = "0009-0004-2447-8989";
export const ORCID_URL = `https://orcid.org/${ORCID_ID}`;
const WORKS_URL = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;

export const TYPE_LABELS = {
  "journal-article": "Journal article",
  "working-paper": "Working paper",
  "dissertation-thesis": "Thesis",
  "book": "Book",
  "book-chapter": "Book chapter",
  "conference-paper": "Conference paper",
  "report": "Report",
  "preprint": "Preprint",
  "other": "Other",
};

/* Nur http(s) darf in ein href: die URL-Felder eines ORCID-Werks sind Freitext. */
function safeHttpUrl(u) {
  if (!u) return undefined;
  try {
    const p = new URL(u);
    return p.protocol === "https:" || p.protocol === "http:" ? u : undefined;
  } catch {
    return undefined;
  }
}

/* Die Titel sind teils deutsch, teils englisch; die Seite ist englisch. Fuer
   Screenreader bekommt jeder deutsche Titel lang="de". */
export const guessLang = (title) =>
  /[äöüß]|\b(und|der|die|das|den|im|von|zwischen|bei|mit|für)\b/i.test(title) ? "de" : "en";

export function normalizeWorks(json) {
  return (json?.group ?? [])
    .map((g) => g?.["work-summary"]?.[0])
    .filter(Boolean)
    .map((s) => {
      const title = s.title?.title?.value?.trim();
      if (!title) return null;
      const ids = s["external-ids"]?.["external-id"] ?? [];
      const doiId = ids.find((i) => i["external-id-type"] === "doi");
      const doi = doiId?.["external-id-value"];
      // DOIs duerfen Sonderzeichen enthalten: segmentweise kodieren.
      const doiHref = doi ? `https://doi.org/${doi.split("/").map(encodeURIComponent).join("/")}` : undefined;
      return {
        title,
        lang: guessLang(title),
        type: TYPE_LABELS[s.type] ?? (s.type ? s.type.replace(/-/g, " ") : ""),
        year: s["publication-date"]?.year?.value ?? "",
        outlet: s["journal-title"]?.value ?? "",
        href: safeHttpUrl(s.url?.value) ?? safeHttpUrl(doiId?.["external-id-url"]?.value) ?? doiHref,
      };
    })
    .filter(Boolean)
    // Neueste zuerst; innerhalb eines Jahres bleibt die ORCID-Reihenfolge.
    .sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
}

export async function loadWorks(cacheFile) {
  try {
    const res = await fetch(WORKS_URL, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const works = normalizeWorks(await res.json());
    if (!works.length) throw new Error("keine Werke im Profil");
    await writeFile(cacheFile, JSON.stringify({ fetched: new Date().toISOString().slice(0, 10), works }, null, 2) + "\n");
    return { works, source: "live" };
  } catch (err) {
    const cached = JSON.parse(await readFile(cacheFile, "utf8"));
    return { works: cached.works, source: `Stand ${cached.fetched} (ORCID nicht erreichbar: ${err.message})` };
  }
}
