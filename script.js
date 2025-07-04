document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navigationDiv = document.getElementById('navigation');
    const markdownFiles = [
        'startseite.md',
        'ueber-mich.md',
        'kontakt.md'
    ]; // Füge hier die Namen deiner Markdown-Dateien hinzu

    // Funktion zum Laden und Anzeigen einer Markdown-Datei
    async function loadMarkdownFile(filename) {
        try {
            const response = await fetch(`./content/${filename}`);
            if (!response.ok) {
                throw new Error(`Fehler beim Laden von ${filename}: ${response.statusText}`);
            }
            const markdownText = await response.text();
            // Umwandlung von Markdown zu HTML mit der marked-Bibliothek
            contentDiv.innerHTML = marked.parse(markdownText);
            document.title = `Meine Markdown-Seiten - ${filename.replace('.md', '').replace(/-/g, ' ')}`;
        } catch (error) {
            console.error(error);
            contentDiv.innerHTML = `<p style="color: red;">Seite konnte nicht geladen werden: ${filename}</p>`;
        }
    }

    // Navigation erstellen und Event Listener hinzufügen
    function createNavigation() {
        navigationDiv.innerHTML = ''; // Vorherige Navigation löschen
        markdownFiles.forEach(file => {
            const link = document.createElement('a');
            const pageName = file.replace('.md', '').replace(/-/g, ' '); // Dateinamen für Link aufbereiten
            link.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1); // Ersten Buchstaben groß
            link.href = `#${file.replace('.md', '')}`; // Hash-Link für Navigation
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Standard-Link-Verhalten verhindern
                loadMarkdownFile(file);
                history.pushState(null, '', `#${file.replace('.md', '')}`); // URL im Browser aktualisieren
            });
            navigationDiv.appendChild(link);
        });
    }

    // Initialer Ladevorgang basierend auf URL-Hash oder erster Datei
    function handleInitialLoad() {
        const hash = window.location.hash.substring(1); // Hash ohne '#'
        const initialFile = hash ? `${hash}.md` : markdownFiles[0];

        if (initialFile && markdownFiles.includes(initialFile)) {
            loadMarkdownFile(initialFile);
        } else if (markdownFiles.length > 0) {
            loadMarkdownFile(markdownFiles[0]); // Lade die erste Datei, wenn kein Hash vorhanden ist oder ungültig
            history.replaceState(null, '', `#${markdownFiles[0].replace('.md', '')}`);
        } else {
            contentDiv.innerHTML = "<p>Keine Markdown-Dateien zum Anzeigen gefunden.</p>";
        }
    }

    // Navigation beim Laden erstellen
    createNavigation();

    // Initialen Inhalt laden
    handleInitialLoad();

    // Event Listener für Änderungen am URL-Hash (z.B. bei Vor-/Zurück-Buttons im Browser)
    window.addEventListener('hashchange', () => {
        handleInitialLoad();
    });
});