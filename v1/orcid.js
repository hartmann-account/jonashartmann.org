/*
 * Progressive Verbesserung fuer /research: die Publikationsliste steht beim
 * Bauen fest im HTML. Dieses Skript fragt ORCID live ab und ersetzt die Liste
 * nur, wenn sich etwas geaendert hat. Kein Ladezustand, kein Flackern; faellt
 * ORCID aus, bleibt die gebaute Liste einfach stehen.
 */
import { WORKS_URL, normalizeWorks, pubItemHTML, pubKey } from "./orcid-normalize.js";

const list = document.querySelector("ol.pubs[data-orcid]");
if (list) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  fetch(WORKS_URL, { headers: { Accept: "application/json" }, signal: ctrl.signal })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((json) => {
      const works = normalizeWorks(json);
      if (!works.length) return; // eine leere Antwort loescht nie die Liste
      const now = [...list.children].map((li) => li.dataset.key).join("\n");
      const next = works.map(pubKey).join("\n");
      if (now !== next) list.innerHTML = works.map(pubItemHTML).join("");
    })
    .catch(() => {})
    .finally(() => clearTimeout(timer));
}
