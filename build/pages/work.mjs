import { html } from "../lib/html.mjs";
import { intro, section, entries, pairs, p, h3, more } from "../lib/components.mjs";
import { positionRow, boardRow, venturePairs, portfolioPairs } from "../lib/record.mjs";

const SECTIONS = [
  { id: "advisory", label: "Advisory" },
  { id: "entrepreneurship", label: "Entrepreneurship" },
  { id: "investing", label: "Investing" },
  { id: "boards", label: "Board and advisory roles" },
  { id: "technology", label: "Technology and creative" },
];

export default function work({ record }) {
  const positions = record.positions.filter((x) => x.pages.includes("work"));
  return {
    path: "/work",
    file: "work.html",
    title: "Work — Jonas Hartmann",
    description: "Advisory, entrepreneurship, investing, board roles, and technology and creative work.",
    body: [
      intro({
        title: "Work",
        lead: "Advisory work in consulting firms, banks and family offices, ventures since 2016, investments across private and public markets, and board and advisory roles.",
        toc: SECTIONS,
      }),
      section({
        id: "advisory",
        title: "Advisory",
        body: [
          p("I have worked in professional advisory environments across consulting firms, banks and family offices, on transformation programs, investigations, due diligence, transactions and corporate structuring. This is the conventional part of my profile, and it anchors the rest."),
          h3("Positions and mandates"),
          entries(positions.map((x) => positionRow(x)), { level: "h4" }),
          h3("Internships"),
          entries(record.internships.map((x) => positionRow(x)), { level: "h4" }),
        ],
      }),
      section({
        id: "entrepreneurship",
        title: "Entrepreneurship",
        body: [
          p(html`Entrepreneurship has been a continuous part of my work since 2016. The ventures differ; <a href="/about#pattern">the pattern behind them</a> does not.`),
          pairs(venturePairs(record)),
        ],
      }),
      section({
        id: "investing",
        title: "Investing",
        body: [
          p("I invest across private and public markets, including early-stage companies and listed securities."),
          p(html`<strong>Personal investing.</strong> Early-stage investments, listed below, alongside a public-markets strategy run via Wikifolio with a multi-asset allocation.`),
          p(html`<strong>Family capital.</strong> Alongside my personal investment activities, I serve on the board of the Hartmann Family Office and chair the Investment Committee of the <span lang="de">Vereinigung der Familie Hartmann</span>, contributing to the governance and strategic allocation of a long-term multi-asset portfolio.`),
          p(html`<strong>Family enterprise infrastructure.</strong> Founding and development of the family office, a digital family governance platform, e-voting, and the administration and reporting systems behind the family association.`),
          h3("Early-stage portfolio", "portfolio"),
          p("Companies I hold a position in, and the form it takes. No amounts, no valuations."),
          pairs(portfolioPairs(record)),
          p("Listing is not an endorsement.", "note"),
        ],
      }),
      section({
        id: "boards",
        title: "Board and advisory roles",
        body: [entries(record.boards.map((x) => boardRow(x)), { level: "h3" })],
      }),
      section({
        id: "technology",
        title: "Technology and creative",
        body: [
          p("I was trained in graphic design and video production, and produced music and worked as a DJ, before I worked in finance. That background, combined with years of running IT and hosting infrastructure, is why I build things myself rather than specify them for others."),
          p("The work spans branding, web development, automated customer platforms, IT infrastructure, hosting, app and container projects, and AI and automation."),
          more("https://soma-suru.de", "Music and DJ references"),
        ],
      }),
    ],
  };
}
