/* Vorschau des gebauten site/-Verzeichnisses unter http://127.0.0.1:4500,
   mit derselben URL-Aufloesung wie der Worker: /work liefert work.html. */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(fileURLToPath(new URL("../site", import.meta.url)));
const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8", ".woff2": "font/woff2",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".svg": "image/svg+xml", ".pdf": "application/pdf",
};

createServer(async (req, res) => {
  const path = decodeURIComponent(req.url.split("?")[0]);
  for (const candidate of [path === "/" ? "/index.html" : path, path + ".html", join(path, "index.html")]) {
    const file = join(OUT, candidate);
    if (file.startsWith(OUT) && existsSync(file) && extname(file)) {
      res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
      return void res.end(await readFile(file));
    }
  }
  const notFound = join(OUT, "404.html");
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end(existsSync(notFound) ? await readFile(notFound) : "not found");
}).listen(4500, "127.0.0.1", () => console.log("preview: http://127.0.0.1:4500"));
