# Beiträge Verzeichnis

## Automatisches System für Beiträge

Dieses Verzeichnis verwendet ein automatisches System zur Verwaltung von Blog-Beiträgen.

## Wie man neue Beiträge hinzufügt:

### 1. Erstellen Sie eine neue Markdown-Datei

Erstellen Sie eine neue `.md` Datei in diesem Verzeichnis (z.B. `mein-neuer-beitrag.md`)

### 2. Schreiben Sie Ihren Beitrag im Markdown-Format:

```markdown
# Titel des Beitrags

*Datum: 22. Juli 2025*

Hier beginnt Ihr Beitragstext. Die erste Zeile nach dem Datum wird automatisch
als Beschreibung in der Übersicht verwendet.

## Unterüberschrift

Weitere Inhalte...

- Listenpunkt 1
- Listenpunkt 2

**Fetter Text** und *kursiver Text* werden unterstützt.
```

### 3. Aktualisieren Sie die Beitragsliste

Die Beitragsliste wird automatisch aus der `index.json` Datei geladen. 
Um diese zu aktualisieren, führen Sie eines der folgenden Scripts aus:

**Mit Node.js:**
```bash
node update-beitraege.js
```

**Mit Python 3:**
```bash
python3 update-beitraege.py
```

Das Script wird:
- Alle Markdown-Dateien im Verzeichnis scannen
- Titel, Datum und Beschreibung extrahieren
- Die `index.json` automatisch aktualisieren

## Unterstützte Markdown-Formatierungen:

- `# Überschrift 1`
- `## Überschrift 2`
- `### Überschrift 3`
- `*Kursiv*`
- `**Fett**`
- `***Fett und Kursiv***`
- `- Listenpunkt` oder `* Listenpunkt`
- `[Link-Text](https://example.com)`

## Datumsformat:

Sie können das Datum in folgenden Formaten angeben:
- Deutsch: `*Datum: 22. Juli 2025*`
- ISO-Format: `*Datum: 2025-07-22*`

## Automatische Metadaten-Extraktion:

- **Titel**: Die erste H1-Überschrift (`# ...`) wird als Titel verwendet
- **Datum**: Text nach `*Datum: ...*` wird als Datum erkannt
- **Beschreibung**: Die ersten 150 Zeichen des ersten Absatzes

## Hinweis für lokale Entwicklung:

Die Beiträge werden clientseitig mit JavaScript geladen. Für die lokale Entwicklung benötigen Sie einen Webserver:

**Python:**
```bash
python3 -m http.server 8000
```

**Node.js (mit http-server):**
```bash
npx http-server
```

Dann öffnen Sie `http://localhost:8000` in Ihrem Browser.