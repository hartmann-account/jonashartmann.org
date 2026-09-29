import { raw } from "../lib/html.mjs";
import { intro, section, entries, pubs, p, more } from "../lib/components.mjs";
import { educationRow, positionRow } from "../lib/record.mjs";
import { ORCID_ID, ORCID_URL } from "../../src/js/orcid-normalize.js";

export default function research({ record, works }) {
  const doctoral = record.education.find((x) => x.id === "doctoral");
  const seca = record.positions.find((x) => x.id === "seca");
  return {
    path: "/research",
    file: "research.html",
    title: "Research — Jonas Hartmann",
    description: "Research on family governance at the intersection of finance, law and family enterprise, with publications and research roles.",
    head: raw('<script type="module" src="/orcid.js"></script>'),
    body: [
      intro({
        title: "Research",
        lead: "My academic work sits at the intersection of finance, law and family enterprise.",
        paragraphs: [
          "I did not come to family governance from the literature. I built governance and administration structures for a family association and a family office first, then began to study why such structures hold or fail. The research asks how ownership, capital and decision rights in families can be organized to endure across generations.",
        ],
      }),
      section({
        id: "publications",
        title: "Publications",
        body: [
          p("Works as recorded on ORCID, newest first."),
          pubs(works, { live: true }),
          more(ORCID_URL, `ORCID record ${ORCID_ID}`),
        ],
      }),
      section({
        id: "roles",
        title: "Research roles",
        body: [
          entries([educationRow(doctoral), positionRow(seca)], { level: "p", compact: true }),
          more("/cv#education", "Education in the CV"),
        ],
      }),
    ],
  };
}
