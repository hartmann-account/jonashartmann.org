const fs = require('fs');
const path = require('path');
const http = require('http');
const chokidar = require('chokidar');
const MarkdownSiteBuilder = require('./build.js');

class DevServer {
    constructor() {
        this.port = 3000;
        this.builder = new MarkdownSiteBuilder();
        this.clients = new Set();
    }

    // Statische Dateien servieren
    serveStaticFile(filePath, res) {
        const extname = path.extname(filePath);
        const mimeTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon'
        };

        const contentType = mimeTypes[extname] || 'text/plain';

        if (fs.existsSync(filePath)) {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error');
                    return;
                }

                res.writeHead(200, { 
                    'Content-Type': contentType,
                    'Cache-Control': 'no-cache'
                });
                
                // Live-Reload Script für HTML-Dateien hinzufügen
                if (extname === '.html') {
                    const htmlString = data.toString();
                    const liveReloadScript = `
                        <script>
                            // Live Reload für Development
                            (function() {
                                const eventSource = new EventSource('/live-reload');
                                eventSource.onmessage = function(event) {
                                    if (event.data === 'reload') {
                                        window.location.reload();
                                    }
                                };
                                eventSource.onerror = function() {
                                    setTimeout(() => window.location.reload(), 1000);
                                };
                            })();
                        </script>
                    `;
                    const modifiedHtml = htmlString.replace('</body>', liveReloadScript + '</body>');
                    res.end(modifiedHtml);
                } else {
                    res.end(data);
                }
            });
        } else {
            res.writeHead(404);
            res.end('File not found');
        }
    }

    // HTTP Server erstellen
    createServer() {
        return http.createServer((req, res) => {
            // CORS Headers für Development
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            let url = req.url;
            
            // Live-Reload Endpoint
            if (url === '/live-reload') {
                res.writeHead(200, {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Access-Control-Allow-Origin': '*'
                });
                
                this.clients.add(res);
                
                // Heartbeat senden
                const heartbeat = setInterval(() => {
                    res.write('data: heartbeat\n\n');
                }, 30000);
                
                req.on('close', () => {
                    clearInterval(heartbeat);
                    this.clients.delete(res);
                });
                
                return;
            }

            // Root-Pfad zu index.html umleiten
            if (url === '/') {
                url = '/index.html';
            }

            // URL zu Dateipfad konvertieren
            let filePath = path.join('./dist', url);

            // Wenn es kein File-Extension hat, nach index.html suchen
            if (!path.extname(filePath)) {
                filePath = path.join(filePath, 'index.html');
            }

            this.serveStaticFile(filePath, res);
        });
    }

    // File Watcher für automatisches Rebuild
    setupFileWatcher() {
        console.log('👀 Watching for file changes...');
        
        // Watch content, templates, and static files
        const watcher = chokidar.watch([
            './content/**/*.md',
            './templates/**/*.html', 
            './static/**/*'
        ], {
            ignoreInitial: true,
            ignored: /(^|[\/\\])\../ // Ignore dotfiles
        });

        watcher.on('change', (filePath) => {
            console.log(`📝 File changed: ${filePath}`);
            this.rebuild();
        });

        watcher.on('add', (filePath) => {
            console.log(`➕ File added: ${filePath}`);
            this.rebuild();
        });

        watcher.on('unlink', (filePath) => {
            console.log(`🗑️  File deleted: ${filePath}`);
            this.rebuild();
        });
    }

    // Rebuild und Browser-Reload
    async rebuild() {
        console.log('🔄 Rebuilding...');
        
        try {
            await this.builder.build();
            console.log('✅ Rebuild completed');
            
            // Browser-Reload auslösen
            this.clients.forEach(client => {
                try {
                    client.write('data: reload\n\n');
                } catch (err) {
                    // Client disconnected
                    this.clients.delete(client);
                }
            });
            
        } catch (error) {
            console.error('❌ Rebuild failed:', error);
        }
    }

    // Server starten
    async start() {
        console.log('🛠️  Starting development server...');
        
        // Initial build
        await this.builder.build();
        
        // Server erstellen
        const server = this.createServer();
        
        // File Watcher setup
        this.setupFileWatcher();
        
        // Server starten
        server.listen(this.port, () => {
            console.log('');
            console.log('🚀 Development server started!');
            console.log(`📱 Local:    http://localhost:${this.port}`);
            console.log(`🌐 Network:  http://${this.getNetworkIP()}:${this.port}`);
            console.log('');
            console.log('📁 Serving files from: ./dist/');
            console.log('👀 Watching for changes in: content/, templates/, static/');
            console.log('🔄 Auto-reload enabled');
            console.log('');
            console.log('Press Ctrl+C to stop the server');
        });

        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Shutting down development server...');
            server.close(() => {
                console.log('✅ Server stopped');
                process.exit(0);
            });
        });
    }

    // Netzwerk-IP ermitteln
    getNetworkIP() {
        const interfaces = require('os').networkInterfaces();
        
        for (const interfaceName of Object.keys(interfaces)) {
            const interfaceInfo = interfaces[interfaceName];
            for (const alias of interfaceInfo) {
                if (alias.family === 'IPv4' && !alias.internal) {
                    return alias.address;
                }
            }
        }
        
        return 'localhost';
    }
}

// Development Server starten wenn direkt ausgeführt
if (require.main === module) {
    const devServer = new DevServer();
    devServer.start().catch(console.error);
}

module.exports = DevServer;