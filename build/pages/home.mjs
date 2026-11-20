import { html, raw } from "../lib/html.mjs";
import { intro, section, entries, pubs, p, more } from "../lib/components.mjs";
import { SITE_URL, LINKEDIN, HOME_TITLE, HOME_DESCRIPTION } from "../lib/layout.mjs";
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
      details: [html`${boards["Vereinigung der Familie Hartmann"].role}, <span lang="de">Vereinigung der Familie Hartmann</span>; advisory board roles at HWH Capital and Amfion.`],
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
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    head: raw(`<script type="application/ld+json">${JSON.stringify(person).replace(/</g, "\\u003c")}</script>`),
    body: [
      intro({
        title: "Building structures for businesses, families and capital.",
        lead: "Advisor, entrepreneur, investor and researcher in Zug, Switzerland.",
        paragraphs: [
          "Over the past decade, my work has spanned entrepreneurship, corporate advisory, technology and family governance — building companies and digital systems, advising institutions on transformation and risk, and developing a research focus on finance, law and family enterprise.",
        ],
        actions: html`<a href="/cv">Full CV</a>`,
      }),
      section({
        id: "areas",
        title: "Four areas",
        body: [
          p("The four areas developed in parallel, and each informs the others: advising is sharper for having built, investing is more disciplined for having advised, and the research is grounded in both."),
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
