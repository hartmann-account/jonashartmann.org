const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const hljs = require('highlight.js');

// Konfiguration
const config = {
  contentDir: './content',
  outputDir: './dist',
  templateDir: './templates',
  staticDir: './static',
  siteTitle: 'Jonas Hartmann',
  siteUrl: 'https://jonashartmann.org',
  author: 'Jonas Hartmann',
  description: 'Persönliche Website von Jonas Hartmann'
};

// Markdown-Konfiguration mit Syntax-Highlighting
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {}
    }
    return hljs.highlightAuto(code).value;
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true
});

class MarkdownSiteBuilder {
  constructor() {
    this.posts = [];
    this.pages = [];
    this.templates = {};
  }

  // Parse Front Matter aus Markdown-Dateien
  parseFrontMatter(content) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
      return { frontMatter: {}, content };
    }

    const frontMatter = {};
    const frontMatterLines = match[1].split('\n');
    
    frontMatterLines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > -1) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        // Parse arrays (tags)
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
        }
        
        frontMatter[key] = value;
      }
    });

    return { frontMatter, content: match[2] };
  }

  // Lade Templates
  loadTemplates() {
    const templateFiles = ['base.html', 'post.html', 'page.html', 'index.html', 'blog.html'];
    
    templateFiles.forEach(file => {
      const templatePath = path.join(config.templateDir, file);
      if (fs.existsSync(templatePath)) {
        const templateName = path.basename(file, '.html');
        this.templates[templateName] = fs.readFileSync(templatePath, 'utf8');
      }
    });
  }

  // Lese alle Markdown-Dateien
  readMarkdownFiles() {
    this.readPostsRecursively(config.contentDir);
  }

  readPostsRecursively(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.readPostsRecursively(fullPath);
      } else if (item.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const { frontMatter, content: markdownContent } = this.parseFrontMatter(content);
        
        const relativePath = path.relative(config.contentDir, fullPath);
        const urlPath = this.generateUrlPath(relativePath);
        
        const post = {
          ...frontMatter,
          content: markdownContent,
          htmlContent: marked(markdownContent),
          filePath: fullPath,
          urlPath: urlPath,
          slug: this.generateSlug(relativePath),
          date: frontMatter.date ? new Date(frontMatter.date) : new Date(),
          excerpt: this.generateExcerpt(markdownContent)
        };

        if (relativePath.startsWith('posts/') || frontMatter.type === 'post') {
          this.posts.push(post);
        } else {
          this.pages.push(post);
        }
      }
    });

    // Sortiere Posts nach Datum (neueste zuerst)
    this.posts.sort((a, b) => b.date - a.date);
  }

  generateUrlPath(relativePath) {
    let urlPath = relativePath.replace(/\.md$/, '');
    if (urlPath === '_index' || urlPath === 'index') {
      return '/';
    }
    if (urlPath.endsWith('/_index') || urlPath.endsWith('/index')) {
      urlPath = urlPath.replace(/\/_?index$/, '');
    }
    return '/' + urlPath + '/';
  }

  generateSlug(relativePath) {
    return path.basename(relativePath, '.md')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  generateExcerpt(content, maxLength = 200) {
    const plainText = content.replace(/[#*`_\[\]()]/g, '').trim();
    return plainText.length > maxLength ? 
      plainText.substring(0, maxLength) + '...' : plainText;
  }

  // Template-Engine
  renderTemplate(templateName, data) {
    let template = this.templates[templateName] || this.templates.base;
    
    // Einfache Template-Variable Ersetzung
    template = template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : match;
    });

    // Spezielle Template-Funktionen
    template = template.replace(/\{\{#each posts\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, content) => {
      return this.posts.map(post => {
        return content.replace(/\{\{(\w+)\}\}/g, (m, k) => post[k] || m);
      }).join('');
    });

    template = template.replace(/\{\{#recent_posts (\d+)\}\}([\s\S]*?)\{\{\/recent_posts\}\}/g, (match, count, content) => {
      return this.posts.slice(0, parseInt(count)).map(post => {
        return content.replace(/\{\{(\w+)\}\}/g, (m, k) => post[k] || m);
      }).join('');
    });

    return template;
  }

  // Erstelle Ausgabe-Verzeichnis
  createOutputDir() {
    if (fs.existsSync(config.outputDir)) {
      fs.rmSync(config.outputDir, { recursive: true });
    }
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  // Kopiere statische Dateien
  copyStaticFiles() {
    if (fs.existsSync(config.staticDir)) {
      this.copyRecursive(config.staticDir, config.outputDir);
    }
  }

  copyRecursive(src, dest) {
    const items = fs.readdirSync(src);
    
    items.forEach(item => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        this.copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }

  // Generiere HTML-Dateien
  generatePages() {
    // Homepage
    this.generateHomepage();
    
    // Blog-Übersicht
    this.generateBlogIndex();
    
    // Einzelne Posts
    this.posts.forEach(post => this.generatePost(post));
    
    // Einzelne Seiten
    this.pages.forEach(page => this.generatePage(page));

    // Sitemap
    this.generateSitemap();
  }

  generateHomepage() {
    const homePage = this.pages.find(p => p.urlPath === '/') || {
      title: config.siteTitle,
      content: 'Willkommen auf meiner Website',
      htmlContent: '<p>Willkommen auf meiner Website</p>'
    };

    const data = {
      ...config,
      ...homePage,
      recent_posts: this.posts.slice(0, 6),
      current_year: new Date().getFullYear()
    };

    const html = this.renderTemplate('index', data);
    const outputPath = path.join(config.outputDir, 'index.html');
    fs.writeFileSync(outputPath, html);
    console.log(`✅ Homepage generiert: ${outputPath}`);
  }

  generateBlogIndex() {
    const data = {
      ...config,
      title: 'Blog',
      posts: this.posts,
      current_year: new Date().getFullYear()
    };

    const html = this.renderTemplate('blog', data);
    const outputDir = path.join(config.outputDir, 'blog');
    fs.mkdirSync(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, 'index.html');
    fs.writeFileSync(outputPath, html);
    console.log(`✅ Blog-Index generiert: ${outputPath}`);
  }

  generatePost(post) {
    const data = {
      ...config,
      ...post,
      current_year: new Date().getFullYear(),
      formatted_date: post.date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    const html = this.renderTemplate('post', data);
    const outputDir = path.join(config.outputDir, post.urlPath);
    fs.mkdirSync(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, 'index.html');
    fs.writeFileSync(outputPath, html);
    console.log(`✅ Post generiert: ${post.title} -> ${outputPath}`);
  }

  generatePage(page) {
    if (page.urlPath === '/') return; // Homepage bereits generiert

    const data = {
      ...config,
      ...page,
      current_year: new Date().getFullYear()
    };

    const html = this.renderTemplate('page', data);
    const outputDir = path.join(config.outputDir, page.urlPath);
    fs.mkdirSync(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, 'index.html');
    fs.writeFileSync(outputPath, html);
    console.log(`✅ Seite generiert: ${page.title} -> ${outputPath}`);
  }

  generateSitemap() {
    const urls = [
      { url: '/', lastmod: new Date().toISOString() },
      { url: '/blog/', lastmod: new Date().toISOString() },
      ...this.posts.map(post => ({
        url: post.urlPath,
        lastmod: post.date.toISOString()
      })),
      ...this.pages.filter(p => p.urlPath !== '/').map(page => ({
        url: page.urlPath,
        lastmod: new Date().toISOString()
      }))
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${config.siteUrl}${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(config.outputDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generiert');
  }

  // Haupt-Build-Prozess
  async build() {
    console.log('🚀 Starte Build-Prozess...');
    
    try {
      this.createOutputDir();
      this.loadTemplates();
      this.readMarkdownFiles();
      this.copyStaticFiles();
      this.generatePages();
      
      console.log('');
      console.log('📊 Build-Statistiken:');
      console.log(`   Posts: ${this.posts.length}`);
      console.log(`   Seiten: ${this.pages.length}`);
      console.log(`   Templates: ${Object.keys(this.templates).length}`);
      console.log('');
      console.log('✅ Build erfolgreich abgeschlossen!');
      console.log(`📁 Ausgabe: ${config.outputDir}/`);
      
    } catch (error) {
      console.error('❌ Build fehlgeschlagen:', error);
      process.exit(1);
    }
  }
}

// Build ausführen
if (require.main === module) {
  const builder = new MarkdownSiteBuilder();
  builder.build();
}

module.exports = MarkdownSiteBuilder;