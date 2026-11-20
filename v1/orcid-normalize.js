/*
 * ORCID-Werke normalisieren und als Listeneintrag schreiben.
 *
 * Dasselbe Modul laeuft beim Bauen (Node) und im Browser: die Liste, die fest
 * im HTML steht, und die Liste, die das Skript live nachlaedt, entstehen aus
 * demselben Code und koennen nicht auseinanderlaufen.
 */
export const ORCID_ID = "0009-0004-2447-8989";
export const ORCID_URL = `https://orcid.org/${ORCID_ID}`;
export const WORKS_URL = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;

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

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const pubMeta = (w) =>
  [w.type, w.outlet, w.year, w.lang === "de" ? "In German" : ""].filter(Boolean).join(" · ");

/* Schluessel fuer den Live-Abgleich: aendert sich Link, Titel, Typ, Ort oder
   Jahr, ersetzt das Skript die Liste. */
export const pubKey = (w) => [w.href ?? "", w.title, pubMeta(w)].join("\u241f");

export function pubItemHTML(w) {
  const lang = w.lang === "de" ? ' lang="de"' : "";
  const title = w.href ? `<a href="${esc(w.href)}">${esc(w.title)}</a>` : `<span>${esc(w.title)}</span>`;
  return (
    `<li class="pub" data-key="${esc(pubKey(w))}"><p class="pub__title"${lang}>${title}</p>` +
    `<p class="pub__meta">${esc(pubMeta(w))}</p></li>`
  );
}
