import { Hono } from "hono";
import { Layout } from "../components/Layout";
import { SiteShell } from "../components/SiteShell";

const home = new Hono();

/** Kurzprofil unter der Ueberschrift. */
const rollen = ["Advisor", "Investor", "Researcher"];

const absaetze = [
  "Ich arbeite seit vielen Jahren in der Transformationsberatung. Einen besonderen Fokus hatte ich im Bereich des Change Managements, was ich neben meiner Erfahrung als Projektleiter auch gut mit meiner kommunikativen Stärke verbinden konnte.",
  "Mein persönliches Interesse gilt Finanzinstituten, weshalb ich von 2023 bis 2025 berufsbegleitend ein Studium in Economics & Banking absolvierte. Zeitgleich ging ich einen Schritt zurück und sammelte praktische Erfahrung in den Bereichen Privatbank, Family Office, M&A, Audit und Venture Capital.",
  "Anschließend absolvierte ich von 2025 bis 2026 einen Master of Finance mit Vertiefung in Wealth Management und Family Office – dem Bereich, in dem ich nun eine Promotion angehe.",
  "Da mich juristisches und evidenzbasiertes Arbeiten mit Gesetzen, Regularien und Prozessen innerhalb der Finanzbranche interessiert, begann ich meine Karriere mit einem Vollzeitengagement bei AlixPartners, wo ich bis heute in der Risk Advisory tätig bin.",
  "Nebenher arbeite ich für die TIE Capital Partners AG und den Swiss Champions Fund als Senior Associate im Bereich Operations.",
];

home.get("/", (c) => {
  return c.html(
    <Layout
      title="Startseite – Jonas Hartmann"
      description="Jonas Hartmann – Advisor, Investor, Researcher"
    >
      <SiteShell currentPath="/">
        <div class="mb-6">
          <h1 class="text-xl font-semibold">Über mich</h1>
          <p class="text-th-text-tertiary text-sm mt-1">Ich bin Jonas Hartmann</p>
        </div>

        <div class="max-w-2xl space-y-5">
          <ul class="flex flex-wrap gap-2">
            {rollen.map((rolle) => (
              <li class="px-3 py-1.5 rounded-lg bg-th-bg-tertiary border border-th-border text-sm text-th-text-muted">
                {rolle}
              </li>
            ))}
          </ul>

          <div class="bg-th-bg-secondary border border-th-border rounded-2xl p-5 space-y-4">
            {absaetze.map((text) => (
              <p class="text-sm text-th-text-muted leading-relaxed">{text}</p>
            ))}
          </div>
        </div>
      </SiteShell>
    </Layout>
  );
});

export default home;
