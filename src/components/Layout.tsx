import type { FC } from "hono/jsx";
import { raw } from "hono/html";
import { getAssetVersion } from "../lib/version";

interface LayoutProps {
  title?: string;
  description?: string;
  children: unknown;
}

export const Layout: FC<LayoutProps> = ({ title, description, children }) => {
  const assetVersion = getAssetVersion();

  return (
    <>
      {raw("<!DOCTYPE html>")}
      <html lang="de">
      <head>
        <meta charset="UTF-8" />
        {/* viewport-fit=cover ist Voraussetzung dafuer, dass env(safe-area-inset-*)
            auf dem iPhone ueberhaupt einen Wert liefert. */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <title>{title || "Jonas Hartmann"}</title>
        <meta name="description" content={description || "Jonas Hartmann"} />
        <link rel="stylesheet" href={`/static/styles.css?v=${assetVersion}`} />
        <script src={`/static/app.js?v=${assetVersion}`} defer />
      </head>
      <body class="bg-th-bg text-th-text min-h-screen font-sans">
        {children}
      </body>
      </html>
    </>
  );
};
