# Jonas Hartmann — Design System

Personal brand for **Jonas Hartmann** (Principal, Hartmann family office, Zug), derived from the **Hartmann** family brand. Hartmann has a brand book and a logo; Jonas Hartmann has neither — this system carries the family's typography, colours and anatomy over into a personal identity that is quieter still: monochrome by default, the name set in type instead of a logo, blue or red only as a minimal, optional accent on the website.

Brand values (from the brand book): **klar, traditionell, loyal, edel, zukunftsorientiert.**

## Sources

- `research/Hartmann-BrandBook-2026.pdf` — copy of the uploaded `uploads/BrandBook.pdf` (8 pages, German, A4 landscape). Extracted text and geometry: `research/brandbook-notes.md`, `research/brandbook-lines.txt`, `research/brandbook-structure.txt`.
- `uploads/Wortmarke_schwarz.png` (627×190) and `uploads/Bildmarke_schwarz.png` (214×190) — the Hartmann word mark and the notched-H mark, black on transparent. Copied to `assets/`.
- No Figma file, codebase, website or slide deck was provided. The website UI kit is therefore a *proposal* built from the brand book's anatomy, not a recreation of an existing product.

Contact data used in examples (from the brand book's business-card example): Jonas Hartmann · Principal, family office · Aabachstrasse 6, 6300 Zug · +41 76 442 86 26 · jonas@hartmann.id.

## Relationship to the Hartmann brand

| | Hartmann (family brand) | Jonas Hartmann (personal) |
|---|---|---|
| Mark | Wortmarke with notched H; Bildmarke | **No logo.** Name set in Outfit Medium (`NameMark`). The Hartmann Bildmarke may appear small, as the "stiller Abschluss" in a corner. |
| Typeface | Cormorant (serif), italic extensions | Outfit (geometric sans, modern and abstract); qualifiers light instead of italic |
| Qualifier | italic extension: *family office*, *stiftung* | light, lowercase, tracked: principal, family office · zug |
| Colour worlds | mono, blue, red — all three used | mono only; blue/red as a single accent (link hover, one marker), never a surface |
| Anatomy | corner arrangement, hairlines, number motif | identical |

## CONTENT FUNDAMENTALS

- **Language:** German (Swiss context: `ss` instead of `ß` in addresses — "Aabachstrasse"; the brand book itself uses `ß` in prose, e.g. "Fließtext", "Weißraum"). Use the form the source uses; for new copy on the personal site prefer Swiss `ss`.
- **Tone:** matter-of-fact, sparse, declarative. Sentences state rules and facts; no marketing adjectives, no exclamation marks, no rhetorical questions. Example from the brand book: „Schwarz und »Weiß« werden nie pur genutzt. Viel Weißraum steht für Klarheit."
- **Person:** the brand book speaks impersonally (no "wir", no "Sie"). On the personal site, first person singular is allowed but rare ("Ich führe das Family Office in Zug."). Address readers with **Sie** in forms and dialogs.
- **Casing:** Sentence case throughout. **Qualifiers and captions are lowercase, light weight** ("principal, family office", "s/w architektur, harte schatten"). Never ALL CAPS, never small caps, never italic (Outfit has none).
- **Numbers as structure:** sections carry numbers ("1.0 Das Logo", "1.1 Wortmarke & Bildmarke"), pages carry counters ("2/8", "1/5"), dates are written long ("31. März 2026").
- **Punctuation:** German chevrons »…« for quotes; em dash with spaces ( — ); the middle dot · separates qualifiers ("family office · stiftung · private equity"); semicolons join related rules.
- **Emoji:** never. **Icons in copy:** never; typographic marks only (→, ×, ·).
- **Vibe:** a well-set letterhead — restrained, precise, slightly old-world (serif, hairlines) but not ornamental.
- **Microcopy examples:** buttons "Anfrage senden", "Werdegang lesen", "Abbrechen"; toast "Nachricht gesendet."; hint "Antwort innerhalb von zwei Werktagen."; error "Bitte eine gültige Adresse eingeben."

## VISUAL FOUNDATIONS

**Colour.** Black and "white" are never pure. Paper is `--paper-50 #f5f6f7`; ink is `--ink-900 #060707` / `--ink-800 #171a1c`; graphite `--ink-500 #5a5e60` for secondary text; mist `--ink-200 #cdd2d7` for hairlines, the business-card surface and text on Anthrazit. Intermediate tones `--ink-700 #3a3e41` (image placeholder grey from the brand book), `--ink-100`, `--paper-100 #eceef0` were added for web surfaces — same hue as mist. **Ton-in-Ton** is the core motif: mist on Anthrazit, graphite on black, ink on mist. Blue (`#082742 / #395b75 / #d2d8db`) and red (`#330809 / #5b1414 / #d8d8d8`) exist as `[data-world="blue|red"]` scopes that move only `--accent`, `--text-link-hover` and `--focus-ring` — one word, one hover, one 6px marker; never a background. Red-600 also marks form errors. `[data-theme="dark"]` flips paper and ink for Anthrazit sections.

**Type.** One family for the personal brand: **Outfit** (Rodrigo Fuenzalida, OFL — a geometric grotesque; loaded from Fontsource/jsDelivr, weights 300/400/500/600). Medium 500 for the name and all headings (the optical equivalent of the family brand's Cormorant Semibold); Regular 400 for body; **Light 300, lowercase, tracked 0.03em for qualifiers, captions and meta** — Outfit has no italic, and faux italics are forbidden, so the family brand's italic qualifier becomes a light one (`--font-qualifier`, `--weight-qualifier`, `--style-qualifier`, `--tracking-qualifier`; switching those four tokens to Cormorant italic restores the bridge to the family brand). Semibold 600 only for rare titles. Scale: body 16px/1.6, small 14, caption 12, meta 11 with 0.06em tracking; h3 20, h2 26, h1 36, display clamp(36–56), hero clamp(44–96) at line-height 0.95–1.1, tracking −0.01em. Measure 62ch. No uppercase. **Cormorant** stays available as `--font-serif` (600 + 400 italic) solely for the Hartmann Wortmarke and its italic extensions.

**Spacing & layout.** 4px scale (`--space-1 … --space-11`, 4→192). Page margin 5% of width (`--page-margin`, the brand book's 42pt on A4), content max 880px, page max 1280px. **Corner arrangement (Ecken-Anordnung):** meta lives in the four corners — role/section top-left, address or nav top-right, date/phone bottom-left, counter/email bottom-right — the core sits in the middle with generous whitespace. Header and footer are not boxes but corner text on the page.

**Lines, corners, depth.** Hairlines only: 1px mist on paper, 1px ink under titles (exactly as wide as the title text), 1px graphite on Anthrazit. **Radius 0 everywhere**; the circle is reserved for the avatar (and the radio control). **No shadows, no blur, no gradients**: depth is tone-on-tone stacking (paper-50 → paper-100 → mist). The dialog scrim is opaque paper at 82%, not a blur.

**Cards.** Flat tone-on-tone surfaces (`paper-100`), or paper with a hairline, or mist (`#cdd2d7`, like the business card), or Anthrazit. Number top-left, meta top-right, semibold title, body, hairline footer. Padding 24.

**Imagery.** Black-and-white, minimalist, straight-lined, one motif, hard shadows ("s/w architektur, harte schatten" · "s/w stillleben, ein motiv" · "hochformat, lichtkante"). Sparse colour is allowed only in the red world. Until photographs are supplied, use `--bg-image-placeholder` (#3a3e41) blocks with an italic caption, exactly as the brand book does. No illustrations, no patterns, no textures, no full-bleed hero photos on the personal site — images sit inside the margins.

**Motion.** Colour and opacity only: 220ms ease-out for hover/focus, 120ms for tooltips, 420ms for reveals (opacity 0→1 plus 6px upward). No scaling, bounce, parallax or auto-playing motion. `prefers-reduced-motion` zeroes all durations.

**States.** Hover: ink → graphite (text/ghost), primary fill → graphite; secondary gains a paper-100 fill. Press: one step darker (ink-800 / mist), no shrink. Focus: 1px ring in ink, 3px offset. Disabled: 38% opacity. Links: underlined 1px in mist, offset 0.14em; hover turns text graphite and the underline current-colour.

**Transparency & blur.** Not used, except the 82% paper scrim behind dialogs.

## ICONOGRAPHY

The brand book defines **no icon system**: navigation and meta are text; the only non-letter marks are the Bildmarke, the middle dot ·, chevrons »«, the dash — and counters. Follow that:

1. **Prefer typographic marks:** → for "weiter/öffnen", × for close/remove, ↓ for download, ▾ for select chevrons, · as a separator. These are Outfit glyphs, so they match weight and colour automatically.
2. **Only when a glyph is unavoidable** (menu, external link, social), use **Lucide** from CDN at `stroke-width: 1.5`, sized 1em, coloured with `currentColor`. This is a **substitution flagged for review** — Lucide is not in the brand book; its thin geometric stroke is the closest neutral match. `components/core/core.card.html` shows the pattern (`lucide.createElement(lucide.Menu, {'stroke-width': 1.5})`).
3. **Bildmarke:** `assets/hartmann-bildmarke-schwarz.png` via the `Mark` component (CSS mask, any token colour). Small, in a corner, as the last element. As `circle` it is the avatar: ink-800 circle with an ink-500 H (ton-in-ton), or the red/blue world equivalents.
4. **Never** emoji, never filled icon fonts, never coloured icons.

Assets in `assets/`: `hartmann-wortmarke-schwarz.png`, `hartmann-bildmarke-schwarz.png`. There is **no Jonas Hartmann logo** and none was created; `NameMark` renders the name in type wherever a mark would go.

## Components

All under `components/`, one `.jsx` + `.d.ts` + `.prompt.md` per component, one `@dsCard` per group. Namespace: `window.JonasHartmannDesignSystem_a175b0`.

- `components/core/` — **Button**, **IconButton**, **Badge**, **Tag**, **Card** (`core.card.html`)
- `components/forms/` — **Input**, **Select**, **Checkbox**, **Radio**, **Switch** (`forms.card.html`)
- `components/navigation/` — **Tabs** (`navigation.card.html`)
- `components/feedback/` — **Dialog**, **Toast**, **Tooltip** (`feedback.card.html`)
- `components/brand/` — **NameMark**, **SectionTitle**, **Mark**, **Hairline** (`brand.card.html`)

### Intentional additions
No source defines a component inventory, so the standard set above was authored to the brand's needs. Four brand components encode motifs the brand book names explicitly:
- **NameMark** — the typographic name + italic qualifier (there is no logo).
- **SectionTitle** — the number motif ("1.0 Titel") with the title-width hairline.
- **Mark** — the Bildmarke as "stiller Abschluss" / avatar.
- **Hairline** — the 1px rule that structures every surface.

## UI kits

- `ui_kits/website/` — **jonashartmann.org, personal website (proposal).** Four screens: Start (hero with NameMark and short statement), Werdegang (sticky Kurzvita + year-anchored chronicle), Texte (Aufmacher + compact index, filter tags, one open essay), Kontakt (business-card anatomy + form with Dialog/Toast). The postal address is not published on the site. Click-through via the numbered Tabs navigation. See `ui_kits/website/README.md`.

## Index

- `styles.css` — entry point; imports `fonts/fonts.css`, `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/shape.css`, `tokens/motion.css`, `tokens/base.css`.
- `fonts/fonts.css` — Outfit @font-face (300/400/500/600) plus Cormorant 600 and 400 italic for the Hartmann Wortmarke context (remote woff2; replace with self-hosted files when available).
- `tokens/` — colour worlds and semantic aliases, type scale, spacing, shape (radius/hairline), motion, base element styles.
- `assets/` — Hartmann Wortmarke and Bildmarke (PNG).
- `guidelines/` — specimen cards: `brand/` (Bildmarke, Wortmarke, Namenszug, Anatomie, Nummern-Motiv, Bildsprache), `colors/` (mono, blau, rot, semantisch, ton-in-ton, akzent), `type/` (Schnitte, Display, Fließtext, Qualifizierer, Zeichen), `spacing/` (Skala, Seitenraster, Haarlinien), `shape/form.html`, `motion/zustaende.html`; `card.css` is a local helper for these cards only.
- `components/` — see above.
- `ui_kits/website/` — screens + README; `ui_kits/website/schrift/` — the typeface exploration (18 candidates, `uebersicht.html`), kept for reference.
- `brandbook/` — **Jonas Hartmann Brand Book 2026** (`Brandbook.html`, A4 landscape, 8 pages, print-ready) — the personal-brand counterpart to the Hartmann brand book.
- `slides/` — two 16:9 slide specimens after the brand book's presentation example (`titelfolie.html`, `inhaltsfolie.html`), plain HTML.
- `research/` — brand book copy and extracted notes.
- `thumbnail.html` — homepage tile. `SKILL.md` — agent skill entry point.

## Caveats

- **Fonts:** Outfit and Cormorant are loaded from Fontsource (jsDelivr) as open-source releases; to self-host, download the woff2 files and repoint `fonts/fonts.css`. Outfit has no italic — never let the browser synthesize one.
- **Colours beyond the brand book** (`--ink-700`, `--ink-100`, `--paper-100`, `--paper-50`, dark-theme `--text-secondary #9aa0a5`) are derived, not official.
- **Imagery:** no photographs were provided; all image areas are grey placeholders with captions.
- **Website:** no existing site was provided; `ui_kits/website` is a proposal for review, its copy is placeholder-level and must be replaced with Jonas Hartmann's own text.
- **Lucide** icons are a flagged substitution; the brand book has no icon system.
