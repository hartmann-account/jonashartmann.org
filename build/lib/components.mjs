/*
 * Die Bausteine der Seiten. Drei Listenformen tragen alles: die Eintragszeile
 * (alles mit Rolle oder Datum), die Paarliste (Name und eine Zeile) und die
 * Publikationszeile. Leere Teile werden weggelassen, nie leer gerendert.
 */
import { html, raw } from "./html.mjs";
import { pubItemHTML } from "../../src/js/orcid-normalize.js";

/* Meta-Zeile: "Ort · Zeitraum". Beginnt sie mit "since", wird es gross
   geschrieben ("Since 2026"), sonst bleibt es klein ("Zurich · since 04/2026"). */
export function metaLine(place, period) {
  const s = [place, period].filter(Boolean).join(" · ");
  return s.replace(/^since\b/, "Since");
}

/* Ein Wert, der nur in einer anderen Sprache steht, bekommt lang="…". */
const text = (value, lang) => (lang ? html`<span lang="${lang}">${value}</span>` : value);

export function intro({ title, lead, paragraphs = [], actions, toc, portrait = false }) {
  return html`<div class="intro grid">
${portrait ? raw('  <div class="portrait" aria-hidden="true"></div>\n') : ""}  <div class="intro__body">
    <h1>${title}</h1>
${lead ? html`    <p class="lead">${lead}</p>\n` : ""}${paragraphs.map((p) => html`    <p>${p}</p>\n`)}${actions ? html`    <div class="actions">${actions}</div>\n` : ""}${toc ? tocNav(toc) : ""}  </div>
</div>
`;
}

function tocNav(items) {
  return html`    <nav class="toc" aria-label="On this page">
      <ul>${items.map((i) => html`<li><a href="#${i.id}">${i.label}</a></li>`)}</ul>
    </nav>
`;
}

export function section({ id, title, body }) {
  return html`<section class="section grid" id="${id}" aria-labelledby="${id}-h">
  <h2 class="section__title" id="${id}-h">${title}</h2>
  <div class="section__body">
${body}  </div>
</section>
`;
}

export const p = (content, cls) => html`    <p${cls ? raw(` class="${cls}"`) : ""}>${content}</p>\n`;
export const h3 = (content, id) => html`    <h3 class="group-title"${id ? raw(` id="${id}"`) : ""}>${content}</h3>\n`;
export const more = (href, label) => html`    <p class="more"><a href="${href}">${label}</a></p>\n`;

/*
 * Eintragszeilen. level: "h3" / "h4" fuer volle Listen, "p" fuer kompakte
 * (CV, Research), damit die Gliederung nicht mit Ueberschriften vollaeuft.
 */
export function entries(rows, { level = "h3", compact = false } = {}) {
  const tag = raw(level);
  return html`    <ol class="entries${compact ? " entries--compact" : ""}">
${rows.map(
  (r) => html`      <li class="entry">
        <${tag} class="entry__title">${r.href ? html`<a href="${r.href}">${r.title}</a>` : text(r.title, r.lang)}</${tag}>
${r.meta ? html`        <p class="entry__meta">${r.meta}</p>\n` : ""}${(r.roles ?? []).map((x) => html`        <p class="entry__role">${x}</p>\n`)}${(r.texts ?? []).map((x) => html`        <p class="entry__text">${x}</p>\n`)}${(r.details ?? []).map((x) => html`        <p class="entry__detail">${x}</p>\n`)}      </li>
`
)}    </ol>
`;
}

/* Paarliste; desc ist Text oder eine Liste verlinkter Namen. */
export function pairs(rows) {
  return html`    <ul class="pairs">
${rows.map(
  (r) => html`      <li class="pairs__row">
        <p class="pairs__term">${r.term}</p>
${r.names
  ? html`        <div class="pairs__desc"><ul class="names">${r.names.map((n) => html`<li><a href="${n.url}" rel="noopener">${n.name.replace(/ /g, "\u00a0")}</a></li>`)}</ul></div>\n`
  : r.desc
    ? html`        <p class="pairs__desc">${r.desc}</p>\n`
    : ""}      </li>
`
)}    </ul>
`;
}

export function pubs(works, { live = false } = {}) {
  return html`    <ol class="pubs"${live ? raw(" data-orcid") : ""}>
${works.map((w) => raw("      " + pubItemHTML(w) + "\n"))}    </ol>
`;
}

export function figures(items) {
  return html`    <div class="figures">
${items.map(
  (f) => html`      <figure class="figure${f.modifier ? " figure--" + f.modifier : ""}">
        <img src="${f.src}" alt="${f.alt}" width="${f.width}" height="${f.height}" loading="lazy" decoding="async">
        <figcaption>${f.caption}</figcaption>
      </figure>
`
)}    </div>
`;
}
