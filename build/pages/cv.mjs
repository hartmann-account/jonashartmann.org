import { html } from "../lib/html.mjs";
import { intro, section, entries, pairs, p, h3, more } from "../lib/components.mjs";
import { positionRow, boardRow, educationRow, certificateRow, venturePairs, languagePairs } from "../lib/record.mjs";
import { CV_PDF, LINKEDIN } from "../lib/layout.mjs";

const SECTIONS = [
  { id: "experience", label: "Experience" },
  { id: "boards", label: "Board and advisory roles" },
  { id: "ventures", label: "Ventures" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "languages", label: "Languages and tools" },
];

export default function cv({ record }) {
  const compact = { level: "p", compact: true };
  return {
    path: "/cv",
    file: "cv.html",
    title: "Curriculum vitae — Jonas Hartmann",
    description: "Curriculum vitae of Jonas Hartmann: experience, board roles, ventures, education, certificates and languages, with the full CV as PDF.",
    body: [
      intro({
        title: "Curriculum vitae",
        lead: "Complete record of positions, ventures, education and memberships.",
        paragraphs: ["The website maximizes clarity; the CV maximizes completeness. Everything that is not on these pages is in the document."],
        actions: html`<a class="button" href="${CV_PDF}" download>Download CV</a><span class="actions__meta">PDF · 2 pages · September 2026</span><a href="${LINKEDIN}">LinkedIn profile</a>`,
        toc: SECTIONS,
      }),
      section({
        id: "experience",
        title: "Experience",
        body: [
          h3("Positions and mandates"),
          entries(record.positions.map((x) => positionRow(x, { detail: false })), compact),
          h3("Internships"),
          entries(record.internships.map((x) => positionRow(x, { detail: false })), compact),
          more("/work#advisory", "Full descriptions on the Work page"),
        ],
      }),
      section({
        id: "boards",
        title: "Board and advisory roles",
        body: [entries(record.boards.map((x) => boardRow(x, { detail: false })), compact)],
      }),
      section({ id: "ventures", title: "Ventures", body: [pairs(venturePairs(record))] }),
      section({ id: "education", title: "Education", body: [entries(record.education.map(educationRow), compact)] }),
      section({
        id: "certificates",
        title: "Certificates",
        body: [
          p("Beyond degrees and work, I take a course wherever a question needs a better answer than the one I have. Listed here is what came with a certificate."),
          entries(record.certificates.map(certificateRow), compact),
        ],
      }),
      section({ id: "languages", title: "Languages and tools", body: [pairs(languagePairs(record))] }),
    ],
  };
}
