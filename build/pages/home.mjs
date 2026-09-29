import { html, raw } from "../lib/html.mjs";
import { intro, section, entries, pubs, p, more } from "../lib/components.mjs";
import { SITE_URL, LINKEDIN } from "../lib/layout.mjs";
import { ORCID_URL } from "../../src/js/orcid-normalize.js";

export default function home({ record, works }) {
  const current = record.positions[0];
  const boards = Object.fromEntries(record.boards.map((b) => [b.org, b]));

  const areas = [
    {
      title: "Advisory", href: "/work#advisory",
      roles: ["Advising organizations on transformation, transactions, risk and strategic challenges."],
      details: [`${current.role} at ${current.org}, ${current.place}, ${current.period}.`],
    },
    {
      title: "Entrepreneurship", href: "/work#entrepreneurship",
      roles: ["Building companies, products, brands and digital infrastructure."],
      details: ["Ventures since 2016, from managed IT services and web hosting to a recording label."],
    },
    {
      title: "Investing", href: "/work#investing",
      roles: ["Investing across private and public markets, and in the governance of family capital."],
      details: [html`${boards["Vereinigung der Familie Hartmann"].role}, <span lang="de">Vereinigung der Familie Hartmann</span>; advisory boards of Swiss Champions Fund and HWH Capital.`],
    },
    {
      title: "Research", href: "/research",
      roles: ["Researching family enterprise, governance, finance and institutional structures."],
      details: ["Doctoral research since 2026."],
    },
  ];

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jonas Hartmann",
    url: SITE_URL + "/",
    sameAs: [LINKEDIN, ORCID_URL],
    jobTitle: current.role,
    worksFor: { "@type": "Organization", name: current.org },
    homeLocation: { "@type": "Place", name: "Zug, Switzerland" },
  };

  return {
    path: "/",
    file: "index.html",
    title: "Jonas Hartmann — Advisor, entrepreneur, investor, researcher",
    description: "Building structures for businesses, families and capital. A decade across entrepreneurship, corporate advisory, technology and family governance.",
    head: raw(`<script type="application/ld+json">${JSON.stringify(person).replace(/</g, "\\u003c")}</script>`),
    body: [
      intro({
        title: "Building structures for businesses, families and capital.",
        lead: "I am an advisor, entrepreneur, investor and researcher in Zug.",
        paragraphs: [
          "For the past decade, I have worked across entrepreneurship, corporate advisory, technology and family governance — building companies, digital systems and organizational structures while developing an academic focus on finance, law and family enterprise.",
        ],
        actions: html`<a href="/cv">Full CV</a>`,
      }),
      section({
        id: "areas",
        title: "Four areas",
        body: [
          p("The four areas developed in parallel rather than in sequence, and they inform each other: advising is sharper for having built, investing is more disciplined for having advised, and research is grounded in all three."),
          entries(areas, { level: "h3" }),
        ],
      }),
      section({
        id: "publications",
        title: "Recent publications",
        body: [pubs(works.slice(0, 3)), more("/research#publications", "All publications")],
      }),
    ],
  };
}
