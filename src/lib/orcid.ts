/*
 * Live-Einbindung des oeffentlichen ORCID-Profils.
 *
 * Die Daten kommen serverseitig von der ORCID Public API (pub.orcid.org) -
 * kein Client-JavaScript, keine fremden Skripte, die CSP bleibt streng.
 * "Live" heisst: jede Aenderung im ORCID-Profil erscheint spaetestens nach
 * Ablauf des Edge-Caches (eine Stunde) von selbst auf der Seite.
 *
 * Faellt die API aus, liefert fetchOrcidProfile null und die Research-Seite
 * zeigt einen Hinweis mit Link auf das Profil statt eines Fehlers.
 */

export const ORCID_ID = "0009-0004-2447-8989";
export const ORCID_URL = `https://orcid.org/${ORCID_ID}`;

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

export async function fetchOrcidProfile(): Promise<OrcidProfile | null> {
  try {
    const res = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/record`, {
      headers: { Accept: "application/json" },
      // Edge-Cache: eine Stunde. cacheEverything ist noetig, weil die API
      // selbst kein Caching erlaubt. Im lokalen wrangler dev wird cf ignoriert.
      cf: { cacheTtl: 3600, cacheEverything: true },
    } as RequestInit);
    if (!res.ok) return null;
    const record = (await res.json()) as ApiRecord;

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
        const href =
          s.url?.value ??
          doiId?.["external-id-url"]?.value ??
          (doi ? `https://doi.org/${doi}` : undefined);
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
  } catch {
    return null;
  }
}
