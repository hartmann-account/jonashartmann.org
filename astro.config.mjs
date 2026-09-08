import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://mein-hartmann.de",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
});
