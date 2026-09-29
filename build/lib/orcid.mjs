/*
 * ORCID-Werke fuer die Research-Seite, beim Bauen.
 *
 * Das oeffentliche ORCID-Profil wird abgefragt und die Liste fest ins HTML
 * geschrieben: die Seite zeigt die Publikationen also auch ohne JavaScript.
 * Jeder erfolgreiche Abruf landet in src/data/orcid.json; ist ORCID beim
 * Bauen nicht erreichbar, baut die Seite mit diesem letzten guten Stand.
 *
 * Normalisierung und Markup kommen aus src/js/orcid-normalize.js, das auch
 * das Live-Skript im Browser benutzt.
 */
import { readFile, writeFile } from "node:fs/promises";
import { WORKS_URL, normalizeWorks } from "../../src/js/orcid-normalize.js";

export async function loadWorks(cacheFile) {
  try {
    const res = await fetch(WORKS_URL, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const works = normalizeWorks(await res.json());
    if (!works.length) throw new Error("keine Werke im Profil");
    // Den Cache nur neu schreiben, wenn sich die Werke geaendert haben; so
    // bleibt der Build reproduzierbar und das Datum zeigt die letzte Aenderung.
    let cached = null;
    try { cached = JSON.parse(await readFile(cacheFile, "utf8")); } catch {}
    if (!cached || JSON.stringify(cached.works) !== JSON.stringify(works)) {
      await writeFile(cacheFile, JSON.stringify({ fetched: new Date().toISOString().slice(0, 10), works }, null, 2) + "\n");
    }
    return { works, source: "live" };
  } catch (err) {
    const cached = JSON.parse(await readFile(cacheFile, "utf8"));
    return { works: cached.works, source: `Stand ${cached.fetched}, ORCID nicht erreichbar (${err.message})` };
  }
}
