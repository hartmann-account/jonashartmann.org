import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        th: {
          bg: "var(--th-bg)",
          "bg-secondary": "var(--th-bg-secondary)",
          "bg-tertiary": "var(--th-bg-tertiary)",
          sidebar: "var(--th-sidebar)",
          border: "var(--th-border)",
          "border-strong": "var(--th-border-strong)",
          text: "var(--th-text)",
          "text-secondary": "var(--th-text-secondary)",
          "text-tertiary": "var(--th-text-tertiary)",
          "text-muted": "var(--th-text-muted)",
          btn: "var(--th-btn)",
          "btn-text": "var(--th-btn-text)",
          "btn-hover": "var(--th-btn-hover)",
          active: "var(--th-active)",
          hover: "var(--th-hover)",
          overlay: "var(--th-overlay)",
          header: "var(--th-header)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
