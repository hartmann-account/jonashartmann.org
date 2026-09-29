import { html } from "../lib/html.mjs";
import { intro } from "../lib/components.mjs";

export default function notfound() {
  return {
    path: "/404",
    file: "404.html",
    noindex: true,
    title: "Page not found — Jonas Hartmann",
    description: "This page does not exist.",
    body: [
      intro({
        title: "Page not found",
        lead: "This page does not exist. The navigation above leads everywhere this site goes.",
        actions: html`<a href="/">Back to the start</a>`,
      }),
    ],
  };
}
