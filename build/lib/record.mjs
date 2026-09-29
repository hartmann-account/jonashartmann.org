/*
 * Aus src/data/record.json werden die Zeilen fuer Work, CV, Research und
 * About. Eine Quelle, damit sich der Lebenslauf und die Work-Seite nie
 * widersprechen.
 */
import { metaLine } from "./components.mjs";

export const positionRow = (x, { detail = true } = {}) => ({
  title: x.org,
  meta: metaLine(x.place, x.period),
  roles: [x.role],
  details: detail && x.detail ? [x.detail] : [],
});

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
  details: [x.text, x.milestones],
});

export const venturePairs = (record) => record.ventures.map((v) => ({ term: v.name, desc: v.description }));

export const portfolioPairs = (record) => record.portfolio.map((g) => ({ term: g.instrument, names: g.companies }));

export const languagePairs = (record) => [
  { term: "Languages", desc: record.languages },
  { term: "Tools in daily use", desc: record.tools },
];
