/*
 * Minimales HTML-Templating ohne Abhaengigkeiten.
 *
 * html`...` escapt jeden eingesetzten Wert, ausser er ist selbst ein Ergebnis
 * von html`` oder raw(). Arrays werden aneinandergehaengt, null, undefined und
 * false fallen weg - so lassen sich Listen und Bedingungen direkt einsetzen.
 */
class Safe {
  constructor(value) { this.value = value; }
  toString() { return this.value; }
}

export const raw = (s) => new Safe(String(s));

export const escape = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function render(value) {
  if (value === null || value === undefined || value === false) return "";
  if (value instanceof Safe) return value.value;
  if (Array.isArray(value)) return value.map(render).join("");
  return escape(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) out += render(values[i]) + strings[i + 1];
  return new Safe(out);
}
