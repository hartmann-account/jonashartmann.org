import { html } from "../lib/html.mjs";
import { intro, section, entries, pairs, p, h3, more } from "../lib/components.mjs";
import { competencyClusters, positionRow, boardRow, educationRow, certificateRow, venturePairs, languagePairs } from "../lib/record.mjs";
import { LINKEDIN } from "../lib/layout.mjs";

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
    description: "Curriculum vitae of Jonas Hartmann: experience, board and advisory roles, ventures, education, certificates and languages.",
    body: [
      intro({
        title: "Curriculum vitae",
        lead: "Complete record of positions, ventures, education and memberships.",
        actions: html`<a href="${LINKEDIN}">LinkedIn profile</a>`,
        toc: SECTIONS,
      }),
      section({
        id: "experience",
        title: "Experience",
        body: [
          ...competencyClusters(record, "cv").flatMap((c) => [
            h3(c.title),
            entries(c.items.map((x) => positionRow(x, { detail: false })), compact),
          ]),
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
