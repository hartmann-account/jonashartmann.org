import { intro, section, entries, figures, p } from "../lib/components.mjs";
import { phaseRow } from "../lib/record.mjs";

export default function about({ record }) {
  return {
    path: "/about",
    file: "about.html",
    title: "About — Jonas Hartmann",
    description: "From creating things to building institutions: create, structure, professionalize, automate.",
    body: [
      intro({
        title: "About",
        portrait: true,
        lead: "I started building things early.",
        paragraphs: [
          "My first work was creative: music, design, film. From 2016, that turned into companies, then technology infrastructure, then financial services and corporate consulting, and eventually into family governance and academic research.",
          "Together, these experiences have developed into one central interest: understanding how organizations, ownership and capital can be structured to endure.",
          "I have lived and worked in ten cities. I live in Zug, Switzerland.",
        ],
      }),
      section({
        id: "pattern",
        title: "The pattern",
        body: [
          p("From creating things to building institutions. The pattern has been the same each time."),
          entries(record.phases.map(phaseRow), { level: "h3" }),
          p("The research is the last step of that sequence: asking how such structures become institutions."),
        ],
      }),
      section({
        id: "photographs",
        title: "Photographs",
        body: [
          figures([
            { src: "/assets/lego-workshop.jpg", alt: "Jonas Hartmann building a model during a workshop", width: 1050, height: 1400, caption: "Workshop" },
            { src: "/assets/hanseatic-help.jpg", alt: "Loading donated goods for Hanseatic Help", width: 787, height: 1400, caption: "Hanseatic Help", modifier: "hanseatic" },
          ]),
        ],
      }),
    ],
  };
}
