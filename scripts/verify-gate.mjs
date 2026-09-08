/*
 * Verified-Gate (Briefing v3, Abschnitt 6 und 7.8).
 *
 * Laeuft vor jedem Build. Sammelt alle Felder in src/content/*.json, die
 * `verified: false` tragen, und listet sie mit Pfad. Ist PRODUCTION=true
 * gesetzt, schlaegt der Build fehl, solange ein solches Feld offen ist -
 * die Seite geht erst live, wenn Jonas jede [VERIFY]-Stelle bestaetigt hat.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../src/content/", import.meta.url).pathname;
const open = [];

function walk(node, path) {
  if (Array.isArray(node)) {
    node.forEach((item, i) => walk(item, `${path}[${i}]`));
    return;
  }
  if (node && typeof node === "object") {
    if (node.verified === false) {
      const value = typeof node.value === "string" ? node.value : node.name ?? node.src ?? node.href ?? "";
      open.push({ path, value, note: node.note });
    }
    for (const [key, child] of Object.entries(node)) {
      if (key === "verified" || key === "note") continue;
      walk(child, path ? `${path}.${key}` : key);
    }
  }
}

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  walk(JSON.parse(readFileSync(join(dir, file), "utf8")), file.replace(/\.json$/, ""));
}

const production = process.env.PRODUCTION === "true";

if (open.length === 0) {
  console.log("verify-gate: all content fields verified.");
} else {
  console.log(`verify-gate: ${open.length} field(s) still marked verified: false\n`);
  for (const f of open) {
    console.log(`  ${f.path}${f.value ? `  = ${JSON.stringify(f.value)}` : ""}${f.note ? `  // ${f.note}` : ""}`);
  }
  console.log("");
  if (production) {
    console.error("verify-gate: PRODUCTION=true - build blocked until every field above is verified.");
    process.exit(1);
  }
  console.log("verify-gate: draft build allowed (PRODUCTION not set).");
}
