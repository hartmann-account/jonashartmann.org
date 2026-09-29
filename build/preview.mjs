/* Vorschau des gebauten site/-Verzeichnisses unter http://127.0.0.1:4500,
   mit derselben URL-Aufloesung wie der Worker: /work liefert work.html,
   site/_redirects gilt, Unbekanntes bekommt die 404-Seite. */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
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

const redirects = new Map();
const rules = join(OUT, "_redirects");
if (existsSync(rules)) {
  for (const line of readFileSync(rules, "utf8").split("\n")) {
    const [from, to, status] = line.trim().split(/\s+/);
    if (from && to && !from.startsWith("#")) redirects.set(from, { to, status: Number(status) || 302 });
  }
}

export function serve(port = 4500) {
  return createServer(async (req, res) => {
  const path = decodeURIComponent(req.url.split("?")[0]);
  const redirect = redirects.get(path);
  if (redirect) {
    res.writeHead(redirect.status, { Location: redirect.to });
    return void res.end();
  }
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
  }).listen(port, "127.0.0.1");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  serve(4500).on("listening", () => console.log("preview: http://127.0.0.1:4500"));
}
