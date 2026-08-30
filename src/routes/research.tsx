import { Hono } from "hono";
import { raw } from "hono/html";
import { Layout } from "../components/Layout";
import { SiteShell } from "../components/SiteShell";
import { fetchOrcidProfile, ORCID_ID, ORCID_URL } from "../lib/orcid";

const research = new Hono();

/* Offizielles ORCID-iD-Symbol (vereinfacht, Markenfarbe #A6CE39). */
const orcidIcon = `<svg class="w-4 h-4 flex-none" viewBox="0 0 256 256" aria-hidden="true"><path fill="#A6CE39" d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z"/><path fill="#fff" d="M86.3 186.2H70.9V79.1h15.4v107.1zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7 0-21.5-13.7-39.7-43.7-39.7h-23.7v79.4zM88.7 56.8c0 5.5-4.5 10.1-10.1 10.1s-10.1-4.6-10.1-10.1c0-5.6 4.5-10.1 10.1-10.1s10.1 4.6 10.1 10.1z"/></svg>`;

research.get("/research", async (c) => {
  const profile = await fetchOrcidProfile();

  return c.html(
    <Layout
      title="Research – Jonas Hartmann"
      description="Publikationen und Forschungsschwerpunkte von Jonas Hartmann, live aus ORCID"
    >
      <SiteShell currentPath="/research">
        <div class="mb-6">
          <h1 class="text-xl font-semibold">Research</h1>
          <p class="text-th-text-tertiary text-sm mt-1">
            Publikationen und Forschungsschwerpunkte
          </p>
        </div>

        <div class="max-w-2xl space-y-5">
          {/* ORCID-Badge: verlinkt das verifizierte Profil. */}
          <a
            href={ORCID_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-th-bg-secondary border border-th-border text-sm text-th-text-muted hover:bg-th-bg-tertiary hover:border-th-border-strong transition-all"
          >
            {raw(orcidIcon)}
            <span>{ORCID_ID}</span>
          </a>

          {profile ? (
            <>
              {profile.keywords.length > 0 && (
                <ul class="flex flex-wrap gap-2">
                  {profile.keywords.map((kw) => (
                    <li class="px-3 py-1.5 rounded-lg bg-th-bg-tertiary border border-th-border text-sm text-th-text-muted">
                      {kw}
                    </li>
                  ))}
                </ul>
              )}

              <div class="space-y-3">
                {profile.works.map((w) => {
                  const meta = [w.typeLabel, w.journal, w.year].filter(Boolean).join(" · ");
                  const inner = (
                    <>
                      <div class="text-sm font-medium leading-snug">{w.title}</div>
                      {meta && (
                        <div class="text-xs text-th-text-tertiary mt-1.5">{meta}</div>
                      )}
                      {w.doi && (
                        <div class="text-xs text-th-text-tertiary mt-0.5">DOI: {w.doi}</div>
                      )}
                    </>
                  );
                  return w.href ? (
                    <a
                      href={w.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="block bg-th-bg-secondary border border-th-border rounded-2xl p-4 hover:bg-th-bg-tertiary hover:border-th-border-strong transition-all"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div class="bg-th-bg-secondary border border-th-border rounded-2xl p-4">
                      {inner}
                    </div>
                  );
                })}
                {profile.works.length === 0 && (
                  <div class="bg-th-bg-secondary border border-th-border rounded-2xl p-4 text-sm text-th-text-tertiary">
                    Im ORCID-Profil sind derzeit keine öffentlichen Publikationen hinterlegt.
                  </div>
                )}
              </div>

              <p class="text-xs text-th-text-tertiary">
                Live aus dem <a href={ORCID_URL} target="_blank" rel="noopener noreferrer" class="underline hover:text-th-text">ORCID-Profil</a> geladen.
              </p>
            </>
          ) : (
            /* API nicht erreichbar: Hinweis statt Fehlerseite. */
            <div class="bg-th-bg-secondary border border-th-border rounded-2xl p-5">
              <p class="text-sm text-th-text-muted leading-relaxed">
                Die Publikationsliste kann gerade nicht von ORCID geladen werden.
                Das vollständige Profil ist direkt erreichbar unter{" "}
                <a href={ORCID_URL} target="_blank" rel="noopener noreferrer" class="underline hover:text-th-text">
                  orcid.org/{ORCID_ID}
                </a>.
              </p>
            </div>
          )}
        </div>
      </SiteShell>
    </Layout>
  );
});

export default research;
