# jonashartmann.org - Custom Markdown Website Generator

Ein eigenes, einfaches System, das Markdown-Dateien in eine moderne, responsive Website konvertiert - komplett mit JavaScript entwickelt!

## 🚀 Features

- ✅ **Markdown zu HTML** - Automatische Konvertierung mit Syntax-Highlighting
- ✅ **Live Development Server** - Mit Auto-Reload bei Änderungen
- ✅ **Responsive Design** - Sieht auf allen Geräten gut aus
- ✅ **Fast & Lightweight** - Keine schweren Frameworks
- ✅ **SEO-optimiert** - Meta-Tags, Sitemap, strukturierte Daten
- ✅ **GitHub Pages / Cloudflare Pages ready** - Einfaches Deployment
- ✅ **Dark Mode** - Automatischer Dark/Light Mode Toggle
- ✅ **Image Optimization** - Lazy Loading und Zoom-Funktionalität
- ✅ **Search** - Einfache Client-seitige Suche
- ✅ **Code Highlighting** - Mit Copy-to-Clipboard Funktion

## 🏁 Quick Start

### 1. Abhängigkeiten installieren
```bash
npm install
```

### 2. Development Server starten
```bash
npm run dev
```
Öffne dann http://localhost:3000 in deinem Browser.

### 3. Website für Produktion bauen
```bash
npm run build
```
Die fertige Website wird im `dist/` Ordner erstellt.

## 📁 Projekt-Struktur

```
jonashartmann.org/
├── content/                 # Deine Markdown-Dateien
│   ├── _index.md           # Homepage
│   └── posts/              # Blog-Beiträge
│       ├── _index.md       # Blog-Übersicht
│       ├── post-1.md       # Beispiel-Post
│       └── post-2.md       # Weiterer Post
├── templates/              # HTML-Templates
│   ├── base.html          # Basis-Template
│   ├── index.html         # Homepage-Template
│   ├── post.html          # Blog-Post Template
│   ├── page.html          # Seiten-Template
│   └── blog.html          # Blog-Übersicht Template
├── static/                 # Statische Dateien
│   ├── css/
│   │   ├── style.css      # Haupt-Stylesheet
│   │   └── highlight.css  # Syntax-Highlighting
│   └── js/
│       └── main.js        # JavaScript-Funktionalität
├── dist/                   # Generierte Website (nach Build)
├── build.js               # Build-System
├── dev-server.js          # Development Server
├── package.json           # NPM-Konfiguration
└── README.md             # Diese Datei
```

## ✍️ Content erstellen

### Neuen Blog-Post erstellen

1. Erstelle eine neue `.md` Datei in `content/posts/`
2. Füge Front Matter hinzu:

```markdown
---
title: "Mein neuer Beitrag"
date: "2025-07-18"
tags: ["javascript", "web"]
---

# Hallo Welt!

Hier kommt dein **Markdown-Content**...

\`\`\`javascript
console.log('Hello World!');
\`\`\`
```

### Neue Seite erstellen

1. Erstelle eine neue `.md` Datei in `content/`
2. Füge Front Matter hinzu:

```markdown
---
title: "Über mich"
---

Hier steht etwas über mich...
```

## 🎨 Design anpassen

### CSS bearbeiten
- **Haupt-Styles**: `static/css/style.css`
- **Code-Highlighting**: `static/css/highlight.css`
- CSS verwendet moderne CSS-Variablen für einfache Anpassungen

### Templates ändern
- **Base Layout**: `templates/base.html` - Grundstruktur aller Seiten
- **Homepage**: `templates/index.html` - Startseite
- **Blog Posts**: `templates/post.html` - Einzelne Artikel
- **Seiten**: `templates/page.html` - Statische Seiten
- **Blog-Index**: `templates/blog.html` - Übersicht aller Posts

### Template-Syntax
Das System verwendet eine einfache Template-Engine:

```html
<!-- Variablen -->
{{title}} {{content}} {{author}}

<!-- Loops -->
{{#each posts}}
    <h2>{{title}}</h2>
    <p>{{excerpt}}</p>
{{/each}}

<!-- Bedingte Inhalte -->
{{#if tags}}
    <div class="tags">...</div>
{{/if}}

<!-- Spezielle Funktionen -->
{{#recent_posts 6}}
    <article>{{title}}</article>
{{/recent_posts}}
```

## ⚙️ Konfiguration

### Build-Konfiguration (build.js)
```javascript
const config = {
  contentDir: './content',      // Markdown-Dateien
  outputDir: './dist',          // Ausgabe-Verzeichnis
  templateDir: './templates',   // Templates
  staticDir: './static',        // Statische Dateien
  siteTitle: 'Jonas Hartmann',  // Website-Titel
  siteUrl: 'https://jonashartmann.org',
  author: 'Jonas Hartmann',
  description: 'Beschreibung der Website'
};
```

### Development Server (dev-server.js)
- Port: 3000 (konfigurierbar)
- Auto-Reload bei Datei-Änderungen
- Live-Reload für alle Clients

## 🌐 Deployment

### Cloudflare Pages (Empfohlen)
1. Verknüpfe dein GitHub-Repository mit Cloudflare Pages
2. Build Command: `npm run build`
3. Build Output Directory: `dist`
4. Node.js Version: 18 oder höher

### GitHub Pages
1. Erstelle `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Netlify
1. Build Command: `npm run build`
2. Publish Directory: `dist`

### Manuell
1. Führe `npm run build` aus
2. Lade den Inhalt des `dist/` Ordners auf deinen Webserver hoch

## 🛠️ Entwicklung

### NPM Scripts
```bash
npm run build     # Website bauen
npm run dev       # Development Server starten
npm start         # Alias für npm run dev
```

### File Watching
Der Development Server überwacht automatisch:
- `content/**/*.md` - Markdown-Dateien
- `templates/**/*.html` - Templates
- `static/**/*` - Statische Dateien

### Debugging
- Console-Logs im Build-Prozess
- Detaillierte Fehler-Meldungen
- Source-Maps für JavaScript

## 📦 Dependencies

### Production
- **marked**: Markdown-Parser
- **highlight.js**: Syntax-Highlighting
- **chokidar**: File-Watching für Development

### Development
- **http-server**: Backup HTTP-Server

## 🧩 Features im Detail

### Syntax-Highlighting
- Automatisches Highlighting für alle gängigen Sprachen
- GitHub-Theme
- Copy-to-Clipboard Buttons

### SEO-Optimierung
- Automatische Meta-Tags
- Open Graph Tags
- XML-Sitemap
- Strukturierte URLs

### Performance
- Minimales JavaScript
- Optimierte CSS
- Lazy Loading für Bilder
- Statische HTML-Generierung

### Accessibility
- Semantisches HTML
- Keyboard-Navigation
- Screen-Reader freundlich
- Focus-Styles

## 🔧 Troubleshooting

### Build schlägt fehl
```bash
# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install

# Ausgabe-Verzeichnis löschen
rm -rf dist
npm run build
```

### Development Server startet nicht
```bash
# Port bereits belegt? Anderen Port verwenden:
# Ändere in dev-server.js: this.port = 3001
```

### Markdown wird nicht korrekt dargestellt
- Prüfe Front Matter Format (YAML zwischen `---`)
- Stelle sicher, dass Dateien UTF-8 kodiert sind
- Verwende gültige Markdown-Syntax

## 🤝 Contributing

1. Fork das Repository
2. Erstelle einen Feature-Branch
3. Committe deine Änderungen
4. Push zum Branch
5. Erstelle eine Pull Request

## 📄 Lizenz

MIT License - siehe LICENSE Datei für Details.

---

**Made with ❤️ and Vanilla JavaScript**

Keine Frameworks, keine Build-Tools-Komplexität - nur einfaches, modernes JavaScript!