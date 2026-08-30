/*
 * Live-Einbindung des oeffentlichen ORCID-Profils.
 *
 * Die Daten kommen serverseitig von der ORCID Public API (pub.orcid.org) -
 * kein Client-JavaScript, keine fremden Skripte, die CSP bleibt streng.
 * "Live" heisst: jede Aenderung im ORCID-Profil erscheint spaetestens nach
 * Ablauf der Frische-Spanne (eine Stunde) von selbst auf der Seite.
 *
 * Caching bewusst ueber die Cache API statt cf.cacheTtl: gespeichert wird
 * nur eine Antwort, die erfolgreich geparst wurde - eine kaputte 200 oder
 * ein 4xx kann sich also nie fuer eine Stunde festsetzen. Die Kopie lebt
 * einen Tag und dient nach Ablauf der Frische als Notvorrat: faellt die API
 * aus, liefert die Seite den letzten guten Stand statt des Hinweistexts.
 *
 * Ohne Kopie und ohne API liefert fetchOrcidProfile null und die
 * Research-Seite zeigt einen Hinweis mit Link auf das Profil statt eines
 * Fehlers.
 */

export const ORCID_ID = "0009-0004-2447-8989";
export const ORCID_URL = `https://orcid.org/${ORCID_ID}`;

const RECORD_URL = `https://pub.orcid.org/v3.0/${ORCID_ID}/record`;
/* Synthetischer Cache-Schluessel - keine echte Adresse. */
const CACHE_KEY = "https://orcid-cache.invalid/record";
/* So lange gilt eine Kopie als frisch; danach wird live nachgeladen. */
const FRESH_MS = 3600 * 1000;
/* So lange haelt die Cache API die Kopie als Notvorrat vor. */
const KEEP_SECONDS = 86400;
/* Antwortzeit-Limit: danach greift Notvorrat oder Hinweistext. */
const TIMEOUT_MS = 5000;

export interface OrcidWork {
  title: string;
  /** Deutsches Label des Publikationstyps (z. B. "Working Paper"). */
  typeLabel: string;
  year?: string;
  journal?: string;
  /** Ziel-Link: bevorzugt die Werk-URL, sonst der DOI-Resolver. */
  href?: string;
  doi?: string;
}

export interface OrcidProfile {
  name: string;
  keywords: string[];
  works: OrcidWork[];
}

/** ORCID-Werktypen in deutscher Anzeige; unbekannte Typen erscheinen roh. */
const TYPE_LABELS: Record<string, string> = {
  "journal-article": "Fachartikel",
  "working-paper": "Working Paper",
  "dissertation-thesis": "Abschlussarbeit",
  "book": "Buch",
  "book-chapter": "Buchkapitel",
  "conference-paper": "Konferenzbeitrag",
  "report": "Bericht",
  "preprint": "Preprint",
  "other": "Sonstiges",
};

/*
 * Minimale Typen fuer die Felder, die tatsaechlich gelesen werden. Die API
 * liefert deutlich mehr; alles Gelesene ist optional gehalten, damit ein
 * unvollstaendiger Datensatz nie die ganze Seite reisst.
 */
interface ApiValue { value?: string }
interface ApiRecord {
  person?: {
    name?: { "given-names"?: ApiValue; "family-name"?: ApiValue };
    keywords?: { keyword?: { content?: string }[] };
  };
  "activities-summary"?: {
    works?: { group?: { "work-summary"?: ApiWorkSummary[] }[] };
  };
}
interface ApiWorkSummary {
  title?: { title?: ApiValue };
  type?: string;
  "publication-date"?: { year?: ApiValue };
  "journal-title"?: ApiValue;
  url?: ApiValue;
  "external-ids"?: { "external-id"?: {
    "external-id-type"?: string;
    "external-id-value"?: string;
    "external-id-url"?: ApiValue;
  }[] };
}

/*
 * Nur http(s)-Links duerfen in ein href. Die URL-Felder eines ORCID-Werks
 * sind Freitext unter Kontrolle des Profil-Schreibers - ein javascript:-Wert
 * gehoert nicht in die Seite, auch wenn die CSP ihn heute stoppen wuerde.
 */
function safeHttpUrl(u?: string): string | undefined {
  if (!u) return undefined;
  try {
    const p = new URL(u);
    if (p.protocol === "https:" || p.protocol === "http:") return u;
  } catch { /* keine absolute URL */ }
  return undefined;
}

function parseRecord(record: ApiRecord): OrcidProfile {
  const nameObj = record.person?.name;
  const name = [nameObj?.["given-names"]?.value, nameObj?.["family-name"]?.value]
    .filter(Boolean)
    .join(" ");

  const keywords = (record.person?.keywords?.keyword ?? [])
    .map((k) => k.content)
    .filter((k): k is string => Boolean(k));

  const works = (record["activities-summary"]?.works?.group ?? [])
    .map((g) => g["work-summary"]?.[0])
    .filter((s): s is ApiWorkSummary => Boolean(s))
    .map((s): OrcidWork | null => {
      const title = s.title?.title?.value;
      if (!title) return null;
      const ids = s["external-ids"]?.["external-id"] ?? [];
      const doiId = ids.find((i) => i["external-id-type"] === "doi");
      const doi = doiId?.["external-id-value"];
      // DOIs duerfen URL-Sonderzeichen wie # enthalten (alte SICI-DOIs):
      // segmentweise kodieren, damit der Resolver den vollen Handle bekommt.
      const doiHref = doi
        ? `https://doi.org/${doi.split("/").map(encodeURIComponent).join("/")}`
        : undefined;
      const href =
        safeHttpUrl(s.url?.value) ??
        safeHttpUrl(doiId?.["external-id-url"]?.value) ??
        doiHref;
      return {
        title,
        typeLabel: (s.type && TYPE_LABELS[s.type]) || s.type || "",
        year: s["publication-date"]?.year?.value,
        journal: s["journal-title"]?.value,
        href,
        doi,
      };
    })
    .filter((w): w is OrcidWork => Boolean(w))
    // Neueste zuerst; Werke ohne Jahr ans Ende.
    .sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));

  return { name: name || "Jonas Hartmann", keywords, works };
}

export async function fetchOrcidProfile(): Promise<OrcidProfile | null> {
  // Gespeicherte Kopie lesen. Jeder Cache-Schritt ist geschuetzt: ohne
  // Cache API (lokale Tests) laeuft alles ueber den Live-Abruf.
  let cachedBody: string | null = null;
  let cachedAt = 0;
  try {
    const hit = await caches.default.match(CACHE_KEY);
    if (hit) {
      cachedBody = await hit.text();
      cachedAt = Number(hit.headers.get("x-fetched-at") ?? 0);
    }
  } catch { /* Cache nicht verfuegbar */ }

  // Frische Kopie: direkt verwenden, kein Netzwerk.
  if (cachedBody && Date.now() - cachedAt < FRESH_MS) {
    try {
      return parseRecord(JSON.parse(cachedBody) as ApiRecord);
    } catch { /* Kopie kaputt - live versuchen */ }
  }

  // Live von der API. Das Zeitlimit sorgt dafuer, dass ein haengender
  // Upstream die Seite nie laenger als TIMEOUT_MS aufhaelt.
  try {
    const res = await fetch(RECORD_URL, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.ok) {
      const body = await res.text();
      // Erst parsen, dann cachen: nur nachweislich gute Antworten werden
      // gespeichert.
      const profile = parseRecord(JSON.parse(body) as ApiRecord);
      try {
        await caches.default.put(
          CACHE_KEY,
          new Response(body, {
            headers: {
              "content-type": "application/json",
              "cache-control": `public, max-age=${KEEP_SECONDS}`,
              "x-fetched-at": String(Date.now()),
            },
          })
        );
      } catch { /* Cache nicht verfuegbar */ }
      return profile;
    }
  } catch { /* Timeout, Netzfehler oder kaputtes JSON */ }

  // Live fehlgeschlagen: eine abgelaufene Kopie ist besser als der Hinweis.
  if (cachedBody) {
    try {
      return parseRecord(JSON.parse(cachedBody) as ApiRecord);
    } catch { /* auch das nicht */ }
  }
  return null;
}
