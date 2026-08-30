import type { FC } from "hono/jsx";
import { raw } from "hono/html";

interface SiteShellProps {
  /** Pfad der aktuellen Seite - markiert den aktiven Menuepunkt. */
  currentPath: string;
  children: unknown;
}

/*
 * Menue der Seite. Aktuell genau ein Punkt; weitere Seiten brauchen hier nur
 * einen Eintrag und eine Route, die Seitenleiste traegt sie automatisch.
 */
const navItems = [
  { href: "/", label: "Startseite", icon: "home" },
  { href: "/research", label: "Research", icon: "academic" },
];

const icons: Record<string, string> = {
  academic: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>`,
  home: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`,
};

export const SiteShell: FC<SiteShellProps> = ({ currentPath, children }) => {
  return (
    <div class="min-h-screen">
      {/* Mobile Header */}
      <header class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-th-header backdrop-blur border-b border-th-border px-4 h-14 flex items-center justify-between">
        <span class="font-semibold tracking-tight">Jonas Hartmann</span>
        <button
          id="menu-toggle"
          class="p-2 -mr-2 text-th-text-secondary hover:text-th-text transition-colors"
          aria-label="Menue"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </header>

      {/* Lade-Indikator (app.js schaltet .active) */}
      <div id="nav-progress" class="nav-progress lg:hidden" />

      {/* Overlay hinter dem ausgeklappten Menue */}
      <div id="menu-overlay" class="lg:hidden fixed inset-0 z-40 bg-th-overlay backdrop-blur-sm hidden" />

      {/* Seitenleiste */}
      <aside
        id="sidebar"
        class="fixed top-0 left-0 z-50 h-full w-64 bg-th-sidebar border-r border-th-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 -translate-x-full"
      >
        <div class="flex flex-col h-full">
          {/* Wortmarke */}
          <div class="h-14 flex items-center px-5 border-b border-th-border">
            <span class="font-semibold tracking-tight">Jonas Hartmann</span>
          </div>

          {/* Navigation */}
          <nav class="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <a
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  class={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-th-active text-th-text"
                      : "text-th-text-secondary hover:text-th-text hover:bg-th-hover"
                  }`}
                >
                  {raw(icons[item.icon])}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Fusszeile der Leiste */}
          <div class="border-t border-th-border p-3">
            <div class="px-3 py-2 text-xs text-th-text-tertiary">jonashartmann.org</div>
          </div>
        </div>
      </aside>

      {/* Inhalt */}
      <main class="pt-14 lg:pt-0 lg:pl-64">
        <div class="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};
