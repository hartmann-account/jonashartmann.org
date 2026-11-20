import { html, raw } from "../lib/html.mjs";
import { intro, section, entries, pairs, pubs, p, more } from "../lib/components.mjs";
import { SITE_URL, LINKEDIN, HOME_TITLE, HOME_DESCRIPTION } from "../lib/layout.mjs";
import { ORCID_URL } from "../../src/js/orcid-normalize.js";

export default function home({ record, works }) {
  const current = record.positions[0];

  const areas = [
    {
      title: "Advisory", href: "/work#advisory",
      roles: ["Advising organizations on transformation, transactions, risk and strategic challenges."],
    },
    {
      title: "Creating and ventures", href: "/work#creating",
      roles: ["Building companies, products, brands and digital infrastructure."],
    },
    {
      title: "Investing", href: "/work#investing",
      roles: ["Investing across private and public markets, and in the governance of family capital."],
    },
    {
      title: "Research", href: "/research",
      roles: ["Researching family enterprise, governance, finance and institutional structures."],
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
        title: html`Create <span class="arrow">→</span> Structure <span class="arrow">→</span> Professionalize <span class="arrow">→</span> Automate`,
        lead: "Advisor, creator, investor and researcher in Zug, Switzerland.",
        media: { src: "/assets/lego-workshop.jpg", alt: "Jonas Hartmann building a model during a workshop", width: 1050, height: 1400 },
        paragraphs: [
          "Over the past decade, my work has spanned creating, corporate advisory, technology and family governance — building companies and digital systems, advising institutions on transformation and risk, and developing a research focus on finance, law and family enterprise.",
        ],
        actions: html`<a href="/cv">Full CV</a>`,
      }),
      section({
        id: "areas",
        title: "Four areas",
        num: "01",
        body: [
          p("The four areas developed in parallel, and each informs the others: advising is sharper for having built, investing is more disciplined for having advised, and the research is grounded in both."),
          entries(areas, { level: "h3" }),
        ],
      }),
      section({
        id: "principles",
        title: "What drives me",
        num: "02",
        body: [
          pairs([
            { term: "Framework", desc: "The pattern behind everything I build — from first idea to lasting institution." },
            { term: "Personal trait", desc: "Continuous and obsessive learner." },
          ]),
          more("/about#pattern", "The pattern in detail on About"),
        ],
      }),
      section({
        id: "publications",
        title: "Recent publications",
        num: "03",
        body: [pubs(works.slice(0, 3)), more("/research#publications", "All publications")],
      }),
    ],
  };
}
