import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { cache } from "hono/cache";
import { setAssetVersion } from "./lib/version";
import homeRoutes from "./routes/home";
import researchRoutes from "./routes/research";

type Bindings = { ASSET_VERSION?: string };

const app = new Hono<{ Bindings: Bindings }>();

// Asset-Version einmal pro Request in das Modul schreiben (siehe lib/version).
app.use("*", async (c, next) => {
  setAssetVersion(c.env.ASSET_VERSION);
  await next();
});

// secureHeaders setzt seine Header NACH den nachgelagerten Middlewares. Die
// Referrer-Policy gehoert deshalb hierher und nicht in die CSP-Middleware -
// dort wuerde sie wieder ueberschrieben.
app.use("*", secureHeaders({
  referrerPolicy: "strict-origin-when-cross-origin",
}));

// Content-Security-Policy: eigene Origin, keine fremden Skripte oder Styles.
app.use("*", async (c, next) => {
  await next();

  if (c.req.path.startsWith("/static/")) return;

  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  if (!c.res.headers.has("Content-Security-Policy")) {
    c.res.headers.set("Content-Security-Policy", csp);
  }
});

// Statische Dateien cachen
app.use("/static/*", cache({ cacheName: "static-assets", cacheControl: "public, max-age=86400" }));

app.route("/", homeRoutes);
app.route("/", researchRoutes);

app.notFound((c) => c.redirect("/"));

export default app;
