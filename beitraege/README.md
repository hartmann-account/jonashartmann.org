# Beiträge Verzeichnis

## Wie man neue Beiträge hinzufügt:

1. **Erstellen Sie eine neue Markdown-Datei** in diesem Verzeichnis (z.B. `mein-neuer-beitrag.md`)

2. **Schreiben Sie Ihren Beitrag** im Markdown-Format:
   ```markdown
   # Titel des Beitrags
   
   *Datum: TT. Monat JJJJ*
   
   Ihr Beitragstext hier...
   
   ## Unterüberschrift
   
   Weitere Inhalte...
   ```

3. **Aktualisieren Sie die Beitragsliste** in der Datei `beitraege.html`:
   - Öffnen Sie `beitraege.html`
   - Suchen Sie nach dem JavaScript-Array `const beitraege = [`
   - Fügen Sie einen neuen Eintrag hinzu:
   ```javascript
   {
     datei: 'mein-neuer-beitrag.md',
     titel: 'Titel des Beitrags',
     datum: 'TT. Monat JJJJ',
     beschreibung: 'Kurze Beschreibung des Beitrags.'
   }
   ```

## Unterstützte Markdown-Formatierungen:

- `# Überschrift 1`
- `## Überschrift 2`
- `### Überschrift 3`
- `*Kursiv*`
- `**Fett**`
- `***Fett und Kursiv***`
- `- Listenpunkt` oder `* Listenpunkt`

## Hinweis:

Die Beiträge werden clientseitig mit JavaScript geladen. Für die lokale Entwicklung benötigen Sie einen Webserver (z.B. Python's `http.server` oder Live Server in VS Code), damit die Markdown-Dateien geladen werden können.