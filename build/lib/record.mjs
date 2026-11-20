/*
 * Aus src/data/record.json werden die Zeilen fuer Work, CV, Research und
 * About. Eine Quelle, damit sich der Lebenslauf und die Work-Seite nie
 * widersprechen.
 *
 * Positionen und Praktika tragen ein "category" (Kompetenzfeld); Work und CV
 * clustern danach, statt jede Einzelposition flach zu listen.
 */
import { metaLine } from "./components.mjs";

export const positionRow = (x, { detail = true } = {}) => ({
  title: x.org,
  meta: metaLine(x.place, x.period),
  roles: [x.internship ? `${x.role} (internship)` : x.role],
  details: detail && x.detail ? [x.detail] : [],
});

/* Kompetenzfelder in fester Reihenfolge; Praktika werden als solche markiert. */
export const COMPETENCY_ORDER = [
  "Transformation, risk and investigations",
  "Transactions and deal advisory",
  "Venture capital and early-stage investing",
  "Audit, assurance and compliance",
  "Legal, tax and structuring",
  "Research",
];

export const competencyClusters = (record, page) =>
  COMPETENCY_ORDER.map((title) => ({
    title,
    items: [
      ...record.positions.filter((x) => x.pages.includes(page) && x.category === title),
      ...record.internships.filter((x) => x.category === title).map((x) => ({ ...x, internship: true })),
    ],
  })).filter((c) => c.items.length);

export const boardRow = (x, { detail = true } = {}) => ({
  title: x.org,
  lang: x.lang,
  meta: metaLine(null, x.period),
  roles: [x.role],
  details: detail && x.detail ? [x.detail] : [],
});

export const educationRow = (x) => ({
  title: x.title,
  meta: metaLine(null, x.period),
  roles: x.lines,
  details: x.detail ? [x.detail] : [],
});

export const certificateRow = (x) => ({
  title: x.title,
  meta: x.year,
  roles: [[x.issuer, x.distinction].filter(Boolean).join(" · ")],
  details: x.detail ? [x.detail] : [],
});

export const phaseRow = (x) => ({
  title: x.title,
  meta: x.period,
  roles: [x.motto],
  texts: [x.text],
  details: [x.milestones],
});

/* Zeilen ohne Beschreibung ans Ende, damit die Tabelle mit vollen Zeilen beginnt. */
export const venturePairs = (record) =>
  [...record.ventures]
    .sort((a, b) => !a.description - !b.description)
    .map((v) => ({ term: v.name, desc: v.description }));

export const portfolioPairs = (record) => record.portfolio.map((g) => ({ term: g.instrument, names: g.companies }));

export const languagePairs = (record) => [
  { term: "Languages", desc: record.languages },
  { term: "Tools in daily use", desc: record.tools },
];
