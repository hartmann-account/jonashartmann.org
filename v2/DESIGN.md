# Design-System

Grundlage: Hartmann Brand Book 2026 (Marke, Farben, Schriftcharakter, Bildsprache)
und Website-Briefing v3 (Struktur, Inhalt, Hierarchie). Dieses Dokument hält fest,
wie beides in ein Web-System übersetzt ist — und warum an zwei Stellen bewusst vom
Brand Book abgewichen wird.

---

## 1. Das Ordnungsprinzip

Das Brand Book beschreibt für Visitenkarte, Briefpapier und Präsentation dieselbe
Anatomie: **Ecken-Anordnung, Haarlinien, Nummern-Motiv, Bildmarke als stiller
Abschluss.** Das ist der rote Faden. Auf der Website ist es das Layout-Gesetz:

```
[Nr]   Titel                                         [Randnotiz]
──────────────────────────────────────────────────────────────── Haarlinie
[Meta] Inhalt in Lesebreite                          [Marginalie]
```

Jede Sektion jeder Seite baut sich so auf. Daraus folgt:

- **Die Nummern tragen die Navigation.** Startseite: 01 Four roles, 02 A decade of
  building, 03 Selected experience. Die vier Stufen: 01–04. Unterseiten-Verzeichnis:
  01–04. Wer die Seite scrollt, weiß immer, wo er steht.
- **Haarlinien statt Kästen.** Es gibt keine Karten mit Schatten und Radien. Trennung
  entsteht durch 1px-Linien und Weißraum.
- **Die rechte Rasterzone ist Absicht, nicht Rest.** Sie trägt Randnotizen, Bilder
  oder bleibt bewusst leer — aber nie, weil der Text zufällig aufhört.

---

## 2. Typografie

### Zwei Schriften, strikt getrennte Aufgaben

| Rolle | Schrift | Einsatz |
|---|---|---|
| Display | **Cormorant** Semibold / Italic | Wortmarke, alle Überschriften ab 24px, Kennzahlen, das Band, Qualifizierer (kursiv) |
| Text | **Inter** 400–500 | Alles unter 24px: Fließtext, Tabellen, Labels, Navigation, Meta |

**Abweichung vom Brand Book, begründet.** Das Brand Book nennt Cormorant als einzige
Schrift. Das gilt für Print und Deck, wo Cormorant in großen Graden gesetzt wird.
Im Web trägt es nicht: Cormorant hat sehr dünne Haarstriche und eine kleine x-Höhe,
bei 15–17px Fließtext wird die Seite grau und schwer lesbar — genau das war die
Schwäche der Vorversion. Die Lösung ist ein klassisches Editorial-Pairing: die
Marken-Serif behält jede sichtbare, große Position, eine neutrale Grotesk übernimmt
die Lesearbeit. Der Markencharakter bleibt dort, wo er wahrgenommen wird.

### Skala

Zwei abgestimmte Leitern statt einer durchgehenden — Text braucht feine Stufen,
Display braucht weite Sprünge.

```
Text     11 · 12 · 13 · 15 · 17 · 20        (--text-2xs … --text-lead)
Display  24 · 28 · 36 · 48 · 64 · 88        (--display-xs … --display-2xl)
```

Zeilenhöhen: 1.08 (Display), 1.25 (Lead), 1.6 (Text), 1.7 (langer Fließtext).
Laufweite: −0.011em für Inter bei Lesegröße, 0.14em für Eyebrows in Versalien.
Zeilenlänge: max. 64ch, Lead max. 48ch.

Versalien gibt es an genau zwei Stellen: im Band und in den Eyebrows. Nirgends sonst.

---

## 3. Farbe

Rohwerte aus dem Brand Book, Zwischenstufen interpoliert. Komponenten benutzen
**ausschließlich** die semantischen Rollen, nie die Rohwerte.

```
Monochrom   #060707  #171a1c  #3d4245  #5a5e60  #6b7073  #a8aeb2  #cdd2d7
Papier      #faf9f7  #f4f3f0  #e9e8e4  #dbdad5  #c6c5bf
Blau        #082742  #395b75  #d2d8db
```

| Rolle | Wert | Verwendung |
|---|---|---|
| `--bg` | paper-100 | Seitengrund |
| `--bg-inverse` | ink-800 | Fußzeile |
| `--fg` | ink-800 | Haupttext, Überschriften |
| `--fg-secondary` | ink-500 | Fließtext-Sekundärebene |
| `--fg-tertiary` | ink-400 | Meta, Nummern, Bildunterschriften |
| `--border` | paper-300 | Haarlinien |
| `--border-strong` | paper-400 | betonte Trennung |
| `--accent` | blue-600 | Links, aktive Stufe, Pfeile |

Regeln: Schwarz und Weiß nie pur. Blau ist die **einzige** Farbe und markiert
ausschließlich Interaktion und Zustand — nie Dekoration. Flächen nur ton-in-ton.

---

## 4. Raster und Rhythmus

```
Container   1240px, Rinne 24px, Rand 32px (mobil 20px)
Spalten     12
Zonen       zone-meta  1–2    Nummer, Zeitraum, Eyebrow
            zone-main  3–9    Inhalt in Lesebreite
            zone-side  10–12  Randnotiz, Bild
```

Ab 1024px rücken Meta auf 1–3 und Main auf 4–12; unter 640px läuft alles einspaltig.

Abstände folgen einer 4px-Basis (`--space-1` … `--space-10` = 4…128px). Der
vertikale Rhythmus liegt **nur** an der Sektion (`--section-space`), nie an den
Komponenten — dadurch bleibt der Abstand zwischen zwei Blöcken überall gleich,
egal was in ihnen steht.

---

## 5. Komponenten

Jede Komponente hat genau eine Aufgabe und wird nirgends per Seiten-CSS umdefiniert.
Ausnahme: der Hero teilt das Raster anders auf (6/4 statt 7/3), das steht als
kommentierte Ausnahme in `index.astro`.

| Komponente | Zweck |
|---|---|
| `.roles` | Vier gleichwertige Felder mit Nummer — Startseite |
| `.band` | Create → Structure → Professionalize → Automate; das einzige auffällige Element |
| `.stage` | Eine Stufe der Klammer: Nummer und Zeitraum links, Text rechts |
| `.metrics` | Kennzahlen-Reihe, Zahl in Cormorant |
| `.capabilities` | Begriff + Beschreibung als Definitionsliste |
| `.index-list` | Verzeichnis der Unterseiten mit Nummer und Pfeil |
| `.data-table` | Stationen, Ventures, Ausbildung; `.is-major` / `.is-minor` steuern die Gewichtung |
| `.logo-grid` | Beteiligungen, Marken ton-in-ton, erst im Hover farbig |
| `.timeline` | Klammer als Zeitleiste — About |
| `.pub-list` | Publikationen aus ORCID |

**Hierarchie über Modifier, nicht über Reihenfolge.** In der Datentabelle bekommt
AlixPartners `.is-major` (eine Stufe größer, in Cormorant), Praktika `.is-minor`
(eine Stufe kleiner, zurückgenommen). Das erfüllt die Briefing-Regel, dass ein
Praktikum nie dasselbe Gewicht trägt wie Jahre Unternehmertum.

---

## 6. Bewegung

Genau eine: beim Scrollen durch die Klammer färbt sich die Nummer der Stufe, die
gerade im Lesefeld steht (`IntersectionObserver`). Bei `prefers-reduced-motion`
und ohne JavaScript bleiben alle Nummern neutral — die Seite funktioniert
unverändert. Hover-Übergänge laufen 150ms.

Kein Parallax, keine Einblend-Animationen beim Scrollen, keine Zähler.

---

## 7. Bildsprache

Brand Book 4.0: minimalistische, geradlinige Motive in Schwarz-Weiß mit starken
Schattenkontrasten. Umgesetzt als `filter: grayscale(1) contrast(1.06)` auf allen
Fotos, harte Kanten statt Rundungen, Hochformat 4:5 für Porträts. Das Porträt steht
im Hero in der Marginalie — damit ist die Bildsprache ab der ersten Bildschirmhöhe
präsent und die rechte Rasterzone gefüllt.

---

## 8. Barrierefreiheit

- Kontrast, gemessen gegen `--bg` (#f4f3f0): Haupttext 15.8:1, Fließtext
  (`--fg-secondary`) 5.9:1, Meta (`--fg-tertiary`) 4.5:1, Links (`--accent`)
  6.5:1. In der Fußzeile gegen `--bg-inverse`: 15.8:1 / 11.5:1 / 4.6:1.
  Alle Textrollen erfüllen AA. `--fg-tertiary` wurde dafür gegenüber der
  reinen Farbleiter-Interpolation abgedunkelt.
- Sichtbarer Fokusrahmen in `--accent`, Offset 3px, auf allen fokussierbaren Elementen.
- Skip-Link als erstes Element, semantische Landmarks (`header`/`main`/`footer`/`nav`).
- Nummern und Pfeile sind dekorativ und `aria-hidden`; die Reihenfolge trägt die
  Bedeutung.
- Die Stufen-Färbung ist rein zusätzlich, nie alleiniger Informationsträger.

---

## 9. Wenn etwas Neues dazukommt

1. Braucht es einen neuen Wert? Erst in `tokens.css` prüfen, ob es ihn schon gibt.
2. Passt es in eine bestehende Komponente? Dann Modifier statt neuer Klasse.
3. Ist es ein neuer Seitentyp? `PageHeader` + `Section` verwenden, nichts eigenes.
4. Seiten-CSS nur für echte Ausnahmen, und dann mit Begründung im Kommentar.
