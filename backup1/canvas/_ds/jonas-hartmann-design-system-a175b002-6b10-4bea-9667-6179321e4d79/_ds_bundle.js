/* @ds-bundle: {"format":4,"namespace":"JonasHartmannDesignSystem_a175b0","components":[{"name":"Hairline","sourcePath":"components/brand/Hairline.jsx"},{"name":"Mark","sourcePath":"components/brand/Mark.jsx"},{"name":"NameMark","sourcePath":"components/brand/NameMark.jsx"},{"name":"SectionTitle","sourcePath":"components/brand/SectionTitle.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"brandbook/doc-page.js":"f52ae9c02fca","components/brand/Hairline.jsx":"fda74c204474","components/brand/Mark.jsx":"58b7e3857bfc","components/brand/NameMark.jsx":"6f85da3097c7","components/brand/SectionTitle.jsx":"963167e960df","components/core/Badge.jsx":"8b49d39ec149","components/core/Button.jsx":"e6ac26b84f6c","components/core/Card.jsx":"d2528cc871ba","components/core/IconButton.jsx":"ced3f259cbcf","components/core/Tag.jsx":"ec8c6cdd3118","components/feedback/Dialog.jsx":"f9e13845fe55","components/feedback/Toast.jsx":"6c7d1a469639","components/feedback/Tooltip.jsx":"d37a22a16f8f","components/forms/Checkbox.jsx":"6dcce6059e15","components/forms/Input.jsx":"22dade7eff53","components/forms/Radio.jsx":"aa3b48c452f8","components/forms/Select.jsx":"cae3ef0c6b05","components/forms/Switch.jsx":"bf6f690eb091","components/navigation/Tabs.jsx":"cce4b24a1b56","ui_kits/website/KontaktScreen.jsx":"1bfb529bd060","ui_kits/website/SiteFrame.jsx":"7a038793f82b","ui_kits/website/StartScreen.jsx":"e35a06a7b8ce","ui_kits/website/TexteScreen.jsx":"010df4e3b341","ui_kits/website/WerdegangScreen.jsx":"9125ff344f1e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.JonasHartmannDesignSystem_a175b0 = window.JonasHartmannDesignSystem_a175b0 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// brandbook/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    /* Monolithic at print: Blink slices a transform-scaled child at
     * fragmentainer boundaries mapped in UNSCALED layout coordinates
     * (transforms are paint-time), so the .fit box (authored size, e.g.
     * 1400x990) gets cut at the page's free block space and spills onto
     * a second sheet even though its SCALED footprint fits the page by
     * construction. overflow:hidden makes .fit-box a scroll container —
     * monolithic under fragmentation (css-break-3) — so the scaled
     * content prints atomically on one sheet. No clipping for content
     * within the authored box: .fit-box is calc-sized to exactly the
     * scaled footprint. (Content that bleeds past content-width/height
     * is clipped at the footprint — fit mode's contract; it previously
     * painted beyond it at print.) Print-only, so the screen rendering
     * keeps visible overflow for editor affordances.
     * The export path injects the same rule into frozen copies
     * (print-eval.ts om-print-fit-contain). The .fit-mode scope is
     * load-bearing: .fit-box wraps slotted content in EVERY mode, and an
     * unscoped overflow:hidden would make whole flowing documents
     * monolithic (one truncated sheet). overflow:hidden, never clip —
     * clip is not a scroll container, so not monolithic. */
    @media print {
      .fit-mode .fit-box { overflow: hidden; }
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "brandbook/doc-page.js", error: String((e && e.message) || e) }); }

// components/brand/Hairline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hairline — die 1px-Linie der Marke. Horizontal oder vertikal, in Nebel, Tinte oder Graphit (auf Anthrazit). */
function Hairline({
  tone = 'default',
  vertical = false,
  length,
  spacing = 0,
  style,
  ...rest
}) {
  const color = tone === 'strong' ? 'var(--rule-strong)' : tone === 'inverse' ? 'var(--rule-on-inverse)' : 'var(--rule)';
  const base = vertical ? {
    display: 'inline-block',
    width: 'var(--hairline-w)',
    height: length || '1em',
    alignSelf: 'stretch',
    background: color,
    margin: `0 ${spacing}`
  } : {
    display: 'block',
    width: length || '100%',
    height: 'var(--hairline-w)',
    background: color,
    margin: `${spacing} 0`,
    border: 0
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "separator",
    "aria-orientation": vertical ? 'vertical' : 'horizontal',
    style: {
      flex: 'none',
      ...base,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Hairline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Hairline.jsx", error: String((e && e.message) || e) }); }

// components/brand/Mark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Hartmann Bildmarke (assets/hartmann-bildmarke-schwarz.png, 214×190) embedded as data URL so the mask resolves in every host. */
const MARK_DATA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANYAAAC+CAYAAABJRPEZAAAWfmNhQlgAABZ+anVtYgAAAB5qdW1kYzJwYQARABCAAACqADibcQNjMnBhAAAAFlhqdW1iAAAAR2p1bWRjMm1hABEAEIAAAKoAOJtxA3VybjpjMnBhOjg4ZmFkOGZkLWJkNGMtNGZhNy1iZDI2LWQyNWMyYjVmYWI3MgAAAAOTanVtYgAAAClqdW1kYzJhcwARABCAAACqADibcQNjMnBhLmFzc2VydGlvbnMAAAAAuGp1bWIAAABEanVtZGNib3IAEQAQgAAAqgA4m3ETYzJwYS5pbmdyZWRpZW50LnYzAAAAABhjMnNofM11UkiLR2jPYqPbrl7weAAAAGxjYm9yo2lkYzpmb3JtYXRpaW1hZ2UvcG5namluc3RhbmNlSUR4LHhtcDppaWQ6ZTg3YTMwMDEtZTRlZS00MjAwLTlhODktNjJhYjBlMGY0MzhlbHJlbGF0aW9uc2hpcGhwYXJlbnRPZgAAAeJqdW1iAAAAQWp1bWRjYm9yABEAEIAAAKoAOJtxE2MycGEuYWN0aW9ucy52MgAAAAAYYzJzaMrNlLlvDxgLsfsUV+0ZZOcAAAGZY2JvcqJnYWN0aW9uc4KiZmFjdGlvbmtjMnBhLm9wZW5lZGpwYXJhbWV0ZXJzoWtpbmdyZWRpZW50c4GiY3VybHgtc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5pbmdyZWRpZW50LnYzZGhhc2hYIBkY/n8Jw/V9IyPk3d8EkVCfqWVdHJjONkRK0axzBxyBpGZhY3Rpb254HWNvbS5hbnRocm9waWMuY2xhdWRlLnByb3ZpZGVkanBhcmFtZXRlcnOheB9jb20uYW50aHJvcGljLm9yaWdpbi1jb25maWRlbmNlZ3Vua25vd25rZGVzY3JpcHRpb254ZkNsYXVkZSBwcm92aWRlZCB0aGlzIGZpbGUgYXQgdGhlIHJlcXVlc3Qgb2YgYSB1c2VyIGFuZCBtYXkgaGF2ZSBjcmVhdGVkIG9yIG1vZGlmaWVkIHRoZSBmaWxlIGNvbnRlbnRzLm1zb2Z0d2FyZUFnZW50oWRuYW1lZkNsYXVkZXJhbGxBY3Rpb25zSW5jbHVkZWT1AAAAyGp1bWIAAABAanVtZGNib3IAEQAQgAAAqgA4m3ETYzJwYS5oYXNoLmRhdGEAAAAAGGMyc2iBoBacl/h1ImbTsMPVzl/kAAAAgGNib3KlY2FsZ2ZzaGEyNTZjcGFkTQAAAAAAAAAAAAAAAABkaGFzaFgg6LB8x7TPTh9QQXm+SU1aE5v3jVpKSbsbTCY4MsK9+hRkbmFtZW5qdW1iZiBtYW5pZmVzdGpleGNsdXNpb25zgaJlc3RhcnQYIWZsZW5ndGgZFooAAAI+anVtYgAAACdqdW1kYzJjbAARABCAAACqADibcQNjMnBhLmNsYWltLnYyAAAAAg9jYm9ypWNhbGdmc2hhMjU2aXNpZ25hdHVyZXhNc2VsZiNqdW1iZj0vYzJwYS91cm46YzJwYTo4OGZhZDhmZC1iZDRjLTRmYTctYmQyNi1kMjVjMmI1ZmFiNzIvYzJwYS5zaWduYXR1cmVqaW5zdGFuY2VJRHgseG1wOmlpZDo3ODZjMjE2Ni04MTBkLTQ0MDktODRkOC1jNDIzYzk4ZmViZGRyY3JlYXRlZF9hc3NlcnRpb25zg6JjdXJseC1zZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLmluZ3JlZGllbnQudjNkaGFzaFggGRj+fwnD9X0jI+Td3wSRUJ+pZV0cmM42RErRrHMHHIGiY3VybHgqc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5hY3Rpb25zLnYyZGhhc2hYIHyBBJKdQq2IgfZ8mJ5igvMmKK7EVLTMMKnQa8uWt126omN1cmx4KXNlbGYjanVtYmY9YzJwYS5hc3NlcnRpb25zL2MycGEuaGFzaC5kYXRhZGhhc2hYIFi7rEj4PjKMTLf8G5PIEDQu/n/xvqG439rCY6BiW8pbdGNsYWltX2dlbmVyYXRvcl9pbmZvo2RuYW1lb0FudGhyb3BpYyBGaWxlc2d2ZXJzaW9uZTEuMC4wa3NwZWNWZXJzaW9uZTIuNC4wAAAQOGp1bWIAAAAoanVtZGMyY3MAEQAQgAAAqgA4m3EDYzJwYS5zaWduYXR1cmUAAAAQCGNib3LShFkCEqIBJhghWQIKMIICBjCCAY2gAwIBAgIUQOWgCu7COdC+uIP6BkIFPWdVEwAwCgYIKoZIzj0EAwMwSTEXMBUGA1UEChMOQW50aHJvcGljLCBQQkMxLjAsBgNVBAMTJUFudGhyb3BpYyBDb250ZW50IENyZWRlbnRpYWxzIFJvb3QgQ0EwHhcNMjYwODA3MTg0MzU2WhcNMjgwODA2MTk0MzU2WjBEMRcwFQYDVQQKEw5BbnRocm9waWMsIFBCQzEpMCcGA1UEAxMgQW50aHJvcGljIENsYXVkZSBDb250ZW50IFNpZ25pbmcwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAASYegpry1AYBRTVNL1CpTlbROnY3dey+UrsF9C3phYrATN3ZHf93Mo8RQN0KOUuOn19P4oWNFWe5n2/She9N7eTo1gwVjAOBgNVHQ8BAf8EBAMCB4AwFQYDVR0lBA4wDAYKKwYBBAGD6F4CATAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFM5R4gSBTmRbI/jjxM+aPpzB11zCMAoGCCqGSM49BAMDA2cAMGQCMDFzHRSeAXrSy1WOzkbhPZ6Km2wGTmZ/2gK18k8BQGXyqz88Rdrz6CTX9flAnYNVxgIwcF9c3fVhqmJKpi+UhasNUMko69cyX6STPfta3Q8EjyzDjzoyrol46FP6VFHhvUcJoWNwYWRZDZ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2WECp16drbiN9qMOJvvlp6aBNZKWSw93lXSw5cSye+cxtgFwRgasrKdgIzSDt30QmhkT4vTydBsaZ/Sbpyg0a9IE/9zKKZgAAAAlwSFlzAAAXEQAAFxEByibzPwAAB7hJREFUeJzt3f9VG8cehvH3e4//Nx14UwF0gDpwUoF1K7hOBehWEDqwXcGlgywVBCqIqCBQwdw/dpZgBwEr7Tszkp7POTqBWNKMkZ79MRJWpJQEYF7vplw5IjpJ3Ruvvk4pradNp6yIWLzxqs3/XeYSEUtJ6ym3SSn1jrnUEBFnkk62uGmXUvo6fjMpLElLSRdvvXJEbPqjO21+8O4l3UyYU6eXYz+fcF+bXEtazHA/TctPqi9b3O6lP37psR71U8d8xUtxnEg6nXk8SVJErMeNzNSwtin5OR/yZZOPM42DaeZ6fJ967bGW5tn4taAbv/jXxBvezzuPvXGsf29Msx6/iF0WLzYcjy7yf7t8OZP0futBPG41xNLn79f64XDlkM4bpoiIz9q851o8+fpQ9jJvcf3k637Dde5TSpfjNzuF9VZ50WORL5/sA/7TnaQrSVfHGoxLXgDqNGxAFzKdvxRypyGcXsOCVb/tHRUJ67sBI04kfc4X957sWtKKmMrJG9Flvrx2btWKb5IuU0pTFs1eVDysx4GHB+BKni3cg4agLl+9JmwiYqUyG9BtXUtaOl5KqRaW9Lj36jVvXA+SFnNufbC9fB5+pfb2Xt9SSkvXnVcNS3qMa635tmq/pJSuZrovzMDwGO/KGpU0fbl9dimlew2HC3O4Jqr25Md4UXse2Z3me75tVD0sScpvBXmY4a5WM9wHDPKh+bfa89Bw7m1/XbL6oeAoIr5qt6X4u5RSN89s4JAXrP6sOIWHlJLj3SX/0MQeK+sr3x5mefXttuIUip0mtBTWrqt4/RyTgF3Nc+DjC2uG5fH1HPOAXV9x7GIvwTRzjiUNb7vXlq93pJRe/N0FtCEvvf9VY+ySz5Fm9ljZuvYE4JVX5OZYAZ7q+vWrzKe1sLZV9IeGnR38u2JaC2tdewI4WH3JwQgLNbDHAgwO/jeyCQswICzAgLAAA8ICDAgLMCAswICwAAPCAgwICzAgLMCAsAADwgIMCAswICzAgLAAA8ICDAgLMCAswKC1sA7+V7ZxHJoKK38C4y8aPmoF2FtNhSVJ+fOtziT9t/ZcgG01F5Y0/GupKaWVpJ/EP8aJPdRkWKOU0jqltBCHh9gzRcOKiKuImPwxlRweYt+U3mOdSPotIvr8aepvxuEh9kmtQ8FzSX9ExCp/rMubcXiIfVD7HOtC0k1ELKbekMNDtKx2WNLwQXO/R8TXLfZe9ymlVd6DAc1oIazRJ0nriFjWngiwq5bCkqT3kr7kxY2u8lyArbUW1uhc0p8Rsao9EWAbrYY1uoiI9TaLG0BNrYcl/b24cTl1cQOoZR/CGv1Hw+LGz7UnArxmn8KShsWN/7G4gdbtW1ijcw0vLK9qTwR4zr6GJQ17r4uI2OqdG4DTPoc1OhWLG2jMIYQ1YnEDzTiksKS/FzeuWNxATYcW1uijhsWNZe2J4DgdaljSsPda1p4EjtMhhwVUQ1iAAWEBBoQFGBAWYEBYgAFhAQaEBRgQFmBAWIABYQEGhAUYEBZgQFiAAWEBBoQFGBAWYEBYgAFhAQaEBRgQFmBAWIDBu9oTMDuPiFR7Ejg+7LEAA8ICDAgLMCAswICwAAPCAgwICzA49NexrlNKi9qTwPfyh7Jf1J6HE3sswICwAAPCAgwICzAgLMCAsAADwgIMCAswICzAgLAAA8ICDAgLMCAswICwAAPCAgwICzAgLMCAsAADwgIMCAswICzAgLAAA8ICDAgLMCAswICwAAPCAgwICzAgLMCAsAADwgIMCAswICzAgLAAA8ICDAgLMCAswICwAAPCAgwICzAgLMCAsAADwgIMCAswICzAgLAAA8ICDAgLMCAswICwAAPCAgwICzAgLMCAsAADwgIMCAswICzAgLAAA8ICDAgLMCAswICwAAPCAgwICzAgLMCAsAADwgIMCAswICzAgLAAA8ICDA49rK72BHCcSod1Xni8D4XHAyQd/h4LbVpUGLMrOVixsCLipNRYP4zb1RgXzelKDlZyj3VWcKynukrjYrPu0McsGVZXcKynagWNzWqc+xYd8xj2WITVkIhYHMPYJcNaFBzrKcJqS83Ho9jYRcLKCwinJcZ6xikLGE1ZHMPYpfZYPxcaZ5Nl5fGhx5XhjxWn8LHURrZUWJ8LjbPJstZyP75T+3kgFdrI2sOKiJXqvwPig9p4UI9WRJypjcfgIs/FKlJKvjuPWEr6Yhtgun+nlL7WnsSxyUcLveqdZ//oVtIipXTvGsC2x2owKkn6EhEtbDWPRt479GonKmmYS+8835o9rIg4i4he7UU1+i0i+pqvpxyDiDjJpwF/qK2oRqeSbiJi5Tj/nuVQMG+VFhpODFv8IW5yK+lKUp9S6ivPZe/lPcAiXz5VnMpUDxqeB+NzYedDxFfDyjU/Pdk7k3Si4S1Kncr/KojTraR7DYcuknSTv5ckHXN8zzwPunwZ//+ZpPfFJ+ZxJ2mt558H9ymlm9fu4DGsiPiq/drKtOTXlNJl7UnsKu9xbnQ4gZT2U0ppLX1/jtVVmcphqP0C+Fw6EdUuHvfo/KLjPGzLtthP7558fbXlfdxrOHyYqt9yvNeM54Alb7vtz641N5Kut7hdv8OYu9z2JT+eE77VLs+fxw6sLxADx4pDQcDg/4ign/DV4E3PAAAAAElFTkSuQmCC';
const WORLD = {
  mono: {
    circle: 'var(--ink-800)',
    glyph: 'var(--ink-500)'
  },
  red: {
    circle: 'var(--red-900)',
    glyph: 'var(--red-600)'
  },
  blue: {
    circle: 'var(--blue-900)',
    glyph: 'var(--blue-600)'
  }
};

/** Mark — die Hartmann-Bildmarke (Kerben-H) als »stiller Abschluss«. Nimmt jede Tokenfarbe an; als Avatar im Kreis ton-in-ton. */
function Mark({
  size = 24,
  color = 'var(--ink-900)',
  circle = false,
  world = 'mono',
  src,
  label = 'Hartmann',
  style,
  ...rest
}) {
  const url = src || MARK_DATA;
  const w = WORLD[world] || WORLD.mono;
  const h = Math.round(size * 190 / 214);
  const glyph = /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'block',
      width: size,
      height: h,
      background: circle ? w.glyph : color,
      WebkitMaskImage: `url("${url}")`,
      maskImage: `url("${url}")`,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskSize: 'contain',
      maskSize: 'contain'
    }
  });
  if (!circle) return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": label,
    style: {
      display: 'inline-flex',
      flex: 'none',
      ...style
    }
  }, rest), glyph);
  const d = Math.round(size * 2.1);
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": label,
    style: {
      display: 'inline-flex',
      flex: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: d,
      height: d,
      borderRadius: 'var(--radius-circle)',
      background: w.circle,
      ...style
    }
  }, rest), glyph);
}
Object.assign(__ds_scope, { Mark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Mark.jsx", error: String((e && e.message) || e) }); }

// components/brand/NameMark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZE = {
  sm: {
    fs: '20px',
    q: '13px',
    gap: '3px'
  },
  md: {
    fs: '30px',
    q: '15px',
    gap: '6px'
  },
  lg: {
    fs: '44px',
    q: '16px',
    gap: '8px'
  },
  hero: {
    fs: 'var(--text-hero)',
    q: '22px',
    gap: '14px'
  }
};

/** NameMark — der Namenszug »Jonas Hartmann« in Outfit Medium, Qualifizierer leicht (300) darunter. Kein Logo, reine Typografie. */
function NameMark({
  name = 'Jonas Hartmann',
  qualifier,
  size = 'md',
  inverse = false,
  short = false,
  href,
  align = 'left',
  style,
  ...rest
}) {
  const s = SIZE[size] || SIZE.md;
  const shown = short ? name.replace(/^(\S)\S*\s+/, '$1. ') : name;
  const color = inverse ? 'var(--text-on-inverse-strong)' : 'var(--text-primary)';
  const qColor = inverse ? 'var(--text-on-inverse)' : 'var(--text-body)';
  const Comp = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Comp, _extends({
    href: href,
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
      textAlign: align,
      textDecoration: 'none',
      color,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: s.fs,
      lineHeight: size === 'hero' ? 'var(--leading-hero)' : 1,
      letterSpacing: 'var(--tracking-display)',
      whiteSpace: 'nowrap'
    }
  }, shown), qualifier && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-qualifier)',
      fontStyle: 'var(--style-qualifier)',
      fontWeight: 'var(--weight-qualifier)',
      letterSpacing: 'var(--tracking-qualifier)',
      fontSize: s.q,
      lineHeight: 1.2,
      marginTop: s.gap,
      color: qColor,
      textTransform: 'lowercase',
      whiteSpace: 'nowrap'
    }
  }, qualifier));
}
Object.assign(__ds_scope, { NameMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/NameMark.jsx", error: String((e && e.message) || e) }); }

// components/brand/SectionTitle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LEVEL = {
  1: {
    fs: 'var(--text-h1)',
    gap: '22px',
    pb: '8px'
  },
  2: {
    fs: 'var(--text-h2)',
    gap: '18px',
    pb: '6px'
  },
  3: {
    fs: 'var(--text-h3)',
    gap: '14px',
    pb: '5px'
  }
};

/** SectionTitle — Nummern-Motiv der Marke: "1.0" vor dem Titel, Haarlinie in Titelbreite darunter. */
function SectionTitle({
  number,
  children,
  level = 2,
  inverse = false,
  rule = true,
  id,
  style,
  ...rest
}) {
  const L = LEVEL[level] || LEVEL[2];
  const Tag = `h${level}`;
  const color = inverse ? 'var(--text-on-inverse-strong)' : 'var(--text-primary)';
  const ruleColor = inverse ? 'var(--rule-on-inverse)' : 'var(--rule-strong)';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    id: id,
    style: {
      display: 'inline-grid',
      width: 'fit-content',
      maxWidth: '100%',
      gridTemplateColumns: number ? 'auto auto' : 'auto',
      columnGap: L.gap,
      alignItems: 'baseline',
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: L.fs,
      lineHeight: 'var(--leading-heading)',
      letterSpacing: 'var(--tracking-display)',
      color,
      textWrap: 'balance',
      ...style
    }
  }, rest), number && /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'proportional-nums'
    }
  }, number), /*#__PURE__*/React.createElement("span", {
    style: {
      paddingBottom: rule ? L.pb : 0,
      borderBottom: rule ? `1px solid ${ruleColor}` : 'none'
    }
  }, children));
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Badge — kleine gesperrte Meta-Marke: Zähler (1/5), Status, Jahr. Radius 0, 1px Haarlinie oder gefüllt. */
function Badge({
  tone = 'neutral',
  children,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      bg: 'transparent',
      fg: 'var(--text-secondary)',
      bd: 'var(--rule)'
    },
    ink: {
      bg: 'var(--ink-900)',
      fg: 'var(--paper-50)',
      bd: 'var(--ink-900)'
    },
    soft: {
      bg: 'var(--bg-surface-strong)',
      fg: 'var(--ink-900)',
      bd: 'var(--bg-surface-strong)'
    },
    inverse: {
      bg: 'transparent',
      fg: 'var(--ink-200)',
      bd: 'var(--ink-500)'
    },
    accent: {
      bg: 'var(--accent)',
      fg: 'var(--accent-ink)',
      bd: 'var(--accent)'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: '22px',
      padding: '0 8px',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-meta)',
      letterSpacing: 'var(--tracking-meta)',
      lineHeight: 1,
      fontWeight: 'var(--weight-medium)',
      color: t.fg,
      background: t.bg,
      border: `1px solid ${t.bd}`,
      borderRadius: 0,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  sm: {
    h: 'var(--control-h-sm)',
    px: '14px',
    fs: '14px'
  },
  md: {
    h: 'var(--control-h-md)',
    px: 'var(--pad-control-x)',
    fs: '15px'
  },
  lg: {
    h: 'var(--control-h-lg)',
    px: '24px',
    fs: '17px'
  }
};
function palette(variant, inverse) {
  if (inverse) {
    return {
      primary: {
        bg: 'var(--ink-200)',
        fg: 'var(--ink-900)',
        bd: 'var(--ink-200)',
        hbg: 'var(--paper-50)',
        hfg: 'var(--ink-900)',
        hbd: 'var(--paper-50)',
        abg: 'var(--ink-100)',
        afg: 'var(--ink-900)'
      },
      secondary: {
        bg: 'transparent',
        fg: 'var(--ink-200)',
        bd: 'var(--ink-500)',
        hbg: 'transparent',
        hfg: 'var(--paper-50)',
        hbd: 'var(--ink-200)',
        abg: 'var(--ink-900)',
        afg: 'var(--paper-50)'
      },
      ghost: {
        bg: 'transparent',
        fg: 'var(--ink-200)',
        bd: 'transparent',
        hbg: 'transparent',
        hfg: 'var(--paper-50)',
        hbd: 'transparent',
        abg: 'transparent',
        afg: 'var(--ink-500)'
      }
    }[variant];
  }
  return {
    primary: {
      bg: 'var(--ink-900)',
      fg: 'var(--paper-50)',
      bd: 'var(--ink-900)',
      hbg: 'var(--ink-500)',
      hfg: 'var(--paper-50)',
      hbd: 'var(--ink-500)',
      abg: 'var(--ink-800)',
      afg: 'var(--paper-50)'
    },
    secondary: {
      bg: 'transparent',
      fg: 'var(--ink-900)',
      bd: 'var(--ink-900)',
      hbg: 'var(--paper-100)',
      hfg: 'var(--ink-900)',
      hbd: 'var(--ink-900)',
      abg: 'var(--ink-200)',
      afg: 'var(--ink-900)'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--ink-900)',
      bd: 'transparent',
      hbg: 'transparent',
      hfg: 'var(--ink-500)',
      hbd: 'transparent',
      abg: 'transparent',
      afg: 'var(--ink-800)'
    },
    accent: {
      bg: 'var(--accent)',
      fg: 'var(--accent-ink)',
      bd: 'var(--accent)',
      hbg: 'var(--ink-500)',
      hfg: 'var(--paper-50)',
      hbd: 'var(--ink-500)',
      abg: 'var(--ink-800)',
      afg: 'var(--paper-50)'
    }
  }[variant];
}

/** Button — flächig Tinte, Kontur oder reiner Text. Radius 0, keine Schatten; Hover wechselt nur die Farbe. */
function Button({
  variant = 'primary',
  size = 'md',
  inverse = false,
  disabled = false,
  fullWidth = false,
  href,
  iconLeft,
  iconRight,
  type = 'button',
  onClick,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const p = palette(variant, inverse) || palette('primary', inverse);
  const on = !disabled;
  const bg = on && active ? p.abg : on && hover ? p.hbg : p.bg;
  const fg = on && active ? p.afg : on && hover ? p.hfg : p.fg;
  const bd = on && hover ? p.hbd : p.bd;
  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxSizing: 'border-box',
    height: s.h,
    padding: `0 ${s.px}`,
    fontFamily: 'var(--font-body)',
    fontSize: s.fs,
    fontWeight: 'var(--weight-medium)',
    lineHeight: 1,
    letterSpacing: '0.01em',
    background: bg,
    color: fg,
    border: `1px solid ${bd}`,
    borderRadius: 'var(--radius-none)',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 'var(--state-disabled-opacity)' : 1,
    textDecoration: variant === 'ghost' && hover && on ? 'underline' : 'none',
    textUnderlineOffset: '0.18em',
    textDecorationThickness: '1px',
    transition: 'var(--transition-color)',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  };
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: '1em',
      height: '1em'
    },
    "aria-hidden": "true"
  }, iconLeft), /*#__PURE__*/React.createElement("span", null, children), iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: '1em',
      height: '1em'
    },
    "aria-hidden": "true"
  }, iconRight));
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: base,
    onClick: onClick
  }, handlers, rest), content);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: base,
    onClick: onClick
  }, handlers, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Card — Fläche ton-in-ton (paper-100), mit Haarlinie oder auf Anthrazit. Nummer und Meta sitzen in den Ecken, Titel darunter, Inhalt folgt. */
function Card({
  variant = 'surface',
  number,
  title,
  meta,
  footer,
  padding = 'var(--pad-card)',
  href,
  onClick,
  children,
  style,
  ...rest
}) {
  const v = {
    surface: {
      bg: 'var(--bg-surface)',
      fg: 'var(--text-body)',
      head: 'var(--text-primary)',
      sub: 'var(--text-secondary)',
      bd: '1px solid transparent',
      rule: 'var(--rule)'
    },
    outline: {
      bg: 'var(--bg-page)',
      fg: 'var(--text-body)',
      head: 'var(--text-primary)',
      sub: 'var(--text-secondary)',
      bd: 'var(--hairline)',
      rule: 'var(--rule)'
    },
    strong: {
      bg: 'var(--bg-surface-strong)',
      fg: 'var(--ink-900)',
      head: 'var(--ink-900)',
      sub: 'var(--ink-500)',
      bd: '1px solid transparent',
      rule: 'var(--ink-500)'
    },
    inverse: {
      bg: 'var(--bg-inverse)',
      fg: 'var(--text-on-inverse)',
      head: 'var(--text-on-inverse-strong)',
      sub: 'var(--text-on-inverse)',
      bd: '1px solid transparent',
      rule: 'var(--rule-on-inverse)'
    }
  }[variant] || {};
  const Comp = href ? 'a' : 'div';
  const hasHead = number || meta || title;
  return /*#__PURE__*/React.createElement(Comp, _extends({
    href: href,
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      padding,
      background: v.bg,
      color: v.fg,
      border: v.bd,
      borderRadius: 0,
      textDecoration: 'none',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--leading-body)',
      cursor: href || onClick ? 'pointer' : undefined,
      ...style
    }
  }, rest), hasHead && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: children ? '16px' : 0
    }
  }, (number || meta) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: '12px',
      fontSize: 'var(--text-meta)',
      letterSpacing: 'var(--tracking-meta)',
      color: v.sub
    }
  }, /*#__PURE__*/React.createElement("span", null, number), /*#__PURE__*/React.createElement("span", null, meta)), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-h3)',
      lineHeight: 'var(--leading-heading)',
      letterSpacing: 'var(--tracking-display)',
      color: v.head,
      textWrap: 'balance'
    }
  }, title)), children && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '20px',
      paddingTop: '12px',
      borderTop: `1px solid ${v.rule}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
      fontSize: 'var(--text-small)'
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/** IconButton — quadratische Schaltfläche für ein einzelnes Glyph. Ohne sichtbaren Rahmen (ghost) oder mit 1px Kontur. */
function IconButton({
  label,
  variant = 'ghost',
  size = 'md',
  inverse = false,
  disabled = false,
  href,
  onClick,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const dim = size === 'sm' ? 'var(--control-h-sm)' : size === 'lg' ? 'var(--control-h-lg)' : 'var(--control-h-md)';
  const glyph = size === 'sm' ? '16px' : size === 'lg' ? '22px' : '18px';
  const fg = inverse ? hover ? 'var(--paper-50)' : 'var(--ink-200)' : hover ? 'var(--ink-500)' : 'var(--ink-900)';
  const bd = variant === 'outline' ? `1px solid ${inverse ? hover ? 'var(--ink-200)' : 'var(--ink-500)' : 'var(--ink-900)'}` : '1px solid transparent';
  const bg = variant === 'outline' && active ? inverse ? 'var(--ink-900)' : 'var(--ink-200)' : variant === 'outline' && hover ? inverse ? 'transparent' : 'var(--paper-100)' : 'transparent';
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim,
    height: dim,
    boxSizing: 'border-box',
    padding: 0,
    background: bg,
    color: fg,
    border: bd,
    borderRadius: 0,
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 'var(--state-disabled-opacity)' : 1,
    fontFamily: 'var(--font-body)',
    fontSize: glyph,
    lineHeight: 1,
    transition: 'var(--transition-color)',
    textDecoration: 'none',
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  };
  const inner = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: glyph,
      height: glyph,
      alignItems: 'center',
      justifyContent: 'center'
    },
    "aria-hidden": "true"
  }, children);
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    "aria-label": label,
    title: label,
    style: base,
    onClick: onClick
  }, handlers, rest), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    style: base,
    onClick: onClick
  }, handlers, rest), inner);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/** Tag — leichter, klein geschriebener Qualifizierer als Chip (»family office«, »zug«). Wählbar oder entfernbar. */
function Tag({
  selected = false,
  inverse = false,
  onClick,
  onRemove,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const interactive = !!onClick;
  const fg = inverse ? selected ? 'var(--ink-900)' : 'var(--ink-200)' : selected ? 'var(--paper-50)' : 'var(--ink-800)';
  const bg = inverse ? selected ? 'var(--ink-200)' : 'transparent' : selected ? 'var(--ink-900)' : hover && interactive ? 'var(--paper-100)' : 'transparent';
  const bd = inverse ? selected ? 'var(--ink-200)' : hover && interactive ? 'var(--ink-200)' : 'var(--ink-500)' : selected ? 'var(--ink-900)' : hover && interactive ? 'var(--ink-900)' : 'var(--rule)';
  const Comp = interactive ? 'button' : 'span';
  return /*#__PURE__*/React.createElement(Comp, _extends({
    type: interactive ? 'button' : undefined,
    "aria-pressed": interactive ? selected : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      height: '30px',
      padding: '0 12px',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-qualifier)',
      fontStyle: 'var(--style-qualifier)',
      fontWeight: 'var(--weight-qualifier)',
      letterSpacing: 'var(--tracking-qualifier)',
      fontSize: 'var(--text-small)',
      lineHeight: 1,
      color: fg,
      background: bg,
      border: `1px solid ${bd}`,
      borderRadius: 0,
      cursor: interactive ? 'pointer' : 'default',
      transition: 'var(--transition-color)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, children), onRemove && /*#__PURE__*/React.createElement("span", {
    role: "button",
    tabIndex: 0,
    "aria-label": "Entfernen",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onRemove(e);
      }
    },
    style: {
      fontStyle: 'normal',
      fontSize: '17px',
      lineHeight: 1,
      opacity: 0.7,
      cursor: 'pointer',
      marginRight: '-2px'
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect,
  useRef
} = React;
/** Dialog — Papierfläche mit Haarlinie über einem deckenden Papier-Scrim. Ecken-Anordnung: Titel oben links, × oben rechts, Meta unten links, Aktionen unten rechts. */
function Dialog({
  open = false,
  onClose,
  title,
  number,
  meta,
  actions,
  width = 520,
  inverse = false,
  children,
  style,
  ...rest
}) {
  const panel = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  const bg = inverse ? 'var(--ink-800)' : 'var(--bg-page)';
  const fg = inverse ? 'var(--text-on-inverse)' : 'var(--text-body)';
  const head = inverse ? 'var(--text-on-inverse-strong)' : 'var(--text-primary)';
  const sub = inverse ? 'var(--text-on-inverse)' : 'var(--text-secondary)';
  const bd = inverse ? 'var(--ink-500)' : 'var(--rule-strong)';
  return /*#__PURE__*/React.createElement("div", {
    role: "presentation",
    onMouseDown: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 'var(--z-overlay)',
      background: 'var(--bg-scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-5)',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    ref: panel,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": typeof title === 'string' ? title : undefined,
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: width,
      maxHeight: '100%',
      overflow: 'auto',
      boxSizing: 'border-box',
      padding: 'var(--pad-dialog)',
      background: bg,
      color: fg,
      border: `1px solid ${bd}`,
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, number && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-meta)',
      letterSpacing: 'var(--tracking-meta)',
      color: sub
    }
  }, number), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-h2)',
      lineHeight: 'var(--leading-heading)',
      letterSpacing: 'var(--tracking-display)',
      color: head
    }
  }, title)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Schlie\xDFen",
    onClick: onClose,
    style: {
      flex: 'none',
      width: '36px',
      height: '36px',
      margin: '-8px -8px 0 0',
      padding: 0,
      background: 'transparent',
      border: 0,
      color: head,
      fontFamily: 'inherit',
      fontSize: '26px',
      lineHeight: 1,
      cursor: 'pointer'
    }
  }, "\xD7")), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--leading-body)'
    }
  }, children), (actions || meta) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 'var(--space-4)',
      paddingTop: 'var(--space-4)',
      borderTop: `1px solid ${inverse ? 'var(--rule-on-inverse)' : 'var(--rule)'}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-meta)',
      letterSpacing: 'var(--tracking-meta)',
      color: sub
    }
  }, meta), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)'
    }
  }, actions))));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect
} = React;
/** Toast — kurze Meldung in Anthrazit, unten links (Ecken-Anordnung). Blendet ein, verschwindet nach `duration`. */
function Toast({
  open = true,
  message,
  action,
  onAction,
  onDismiss,
  duration = 6000,
  inline = false,
  tone = 'inverse',
  style,
  ...rest
}) {
  useEffect(() => {
    if (!open || !duration || !onDismiss) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [open, duration, onDismiss]);
  if (!open) return null;
  const inv = tone === 'inverse';
  const pos = inline ? {
    position: 'relative'
  } : {
    position: 'fixed',
    left: 'var(--page-margin)',
    bottom: 'var(--page-margin)',
    zIndex: 'var(--z-toast)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    "aria-live": "polite",
    style: {
      ...pos,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      minWidth: '280px',
      maxWidth: '440px',
      boxSizing: 'border-box',
      padding: '14px 18px',
      background: inv ? 'var(--ink-800)' : 'var(--bg-page)',
      color: inv ? 'var(--ink-200)' : 'var(--text-body)',
      border: `1px solid ${inv ? 'var(--ink-500)' : 'var(--rule-strong)'}`,
      borderRadius: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-small)',
      lineHeight: 1.35,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, message), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      flex: 'none',
      background: 'transparent',
      border: 0,
      padding: 0,
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'var(--weight-medium)',
      color: inv ? 'var(--paper-50)' : 'var(--text-primary)',
      textDecoration: 'underline',
      textUnderlineOffset: '0.16em',
      textDecorationThickness: '1px',
      cursor: 'pointer'
    }
  }, action), onDismiss && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Schlie\xDFen",
    onClick: onDismiss,
    style: {
      flex: 'none',
      width: '24px',
      height: '24px',
      margin: '-4px -6px -4px 0',
      padding: 0,
      background: 'transparent',
      border: 0,
      color: 'inherit',
      fontFamily: 'inherit',
      fontSize: '20px',
      lineHeight: 1,
      cursor: 'pointer',
      opacity: 0.8
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/** Tooltip — kleine Anthrazit-Marke über dem Element, erscheint bei Hover/Fokus mit kurzer Blende. */
function Tooltip({
  label,
  placement = 'top',
  children,
  style,
  ...rest
}) {
  const [show, setShow] = useState(false);
  const pos = placement === 'bottom' ? {
    top: 'calc(100% + 8px)',
    left: '50%',
    transform: `translate(-50%, ${show ? 0 : '-4px'})`
  } : placement === 'left' ? {
    right: 'calc(100% + 8px)',
    top: '50%',
    transform: `translate(${show ? 0 : '4px'}, -50%)`
  } : placement === 'right' ? {
    left: 'calc(100% + 8px)',
    top: '50%',
    transform: `translate(${show ? 0 : '-4px'}, -50%)`
  } : {
    bottom: 'calc(100% + 8px)',
    left: '50%',
    transform: `translate(-50%, ${show ? 0 : '4px'})`
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    "aria-hidden": !show,
    style: {
      position: 'absolute',
      ...pos,
      zIndex: 'var(--z-overlay)',
      padding: '6px 10px',
      background: 'var(--ink-800)',
      color: 'var(--ink-200)',
      border: '1px solid var(--ink-500)',
      borderRadius: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-caption)',
      letterSpacing: '0.02em',
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      opacity: show ? 1 : 0,
      transition: `opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)`
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useId
} = React;
/** Checkbox — 18px Quadrat mit 1px Kontur; gewählt füllt Tinte, Häkchen aus zwei Linien. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  inverse = false,
  indeterminate = false,
  id,
  name,
  style,
  ...rest
}) {
  const [inner, setInner] = useState(!!defaultChecked);
  const [focus, setFocus] = useState(false);
  const isCtl = checked !== undefined;
  const on = isCtl ? checked : inner;
  const auto = useId();
  const fid = id || `cb-${auto}`;
  const ink = inverse ? 'var(--ink-200)' : 'var(--ink-900)';
  const paper = inverse ? 'var(--ink-800)' : 'var(--paper-50)';
  const bd = on || indeterminate ? ink : inverse ? 'var(--ink-500)' : 'var(--border-field)';
  return /*#__PURE__*/React.createElement("label", _extends({
    htmlFor: fid,
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: '12px',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 'var(--state-disabled-opacity)' : 1,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body)',
      lineHeight: 1.3,
      color: inverse ? 'var(--text-on-inverse)' : 'var(--text-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      flex: 'none',
      width: '18px',
      height: '18px',
      marginTop: '2px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: fid,
    name: name,
    type: "checkbox",
    checked: on,
    disabled: disabled,
    onChange: e => {
      if (!isCtl) setInner(e.target.checked);
      onChange && onChange(e);
    },
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      opacity: 0,
      cursor: 'inherit'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      boxSizing: 'border-box',
      border: `1px solid ${bd}`,
      background: on || indeterminate ? ink : 'transparent',
      outline: focus ? `1px solid ${ink}` : 'none',
      outlineOffset: '3px',
      transition: 'var(--transition-color)'
    }
  }, on && !indeterminate && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '5px',
      top: '1px',
      width: '5px',
      height: '10px',
      borderRight: `1.5px solid ${paper}`,
      borderBottom: `1.5px solid ${paper}`,
      transform: 'rotate(45deg)'
    }
  }), indeterminate && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '4px',
      right: '4px',
      top: '8px',
      height: '1.5px',
      background: paper
    }
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useId
} = React;
/** Input — Eingabefeld als Haarlinie: nur eine Unterkante, Label leicht darüber. Fokus zieht die Linie in Tinte. */
function Input({
  label,
  hint,
  error,
  value,
  defaultValue,
  onChange,
  placeholder,
  type = 'text',
  multiline = false,
  rows = 3,
  disabled = false,
  required = false,
  inverse = false,
  size = 'md',
  id,
  name,
  autoComplete,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const auto = useId();
  const fid = id || `in-${auto}`;
  const line = error ? 'var(--red-600)' : focus ? inverse ? 'var(--ink-200)' : 'var(--border-field-focus)' : inverse ? 'var(--ink-500)' : 'var(--border-field)';
  const fg = inverse ? 'var(--text-on-inverse-strong)' : 'var(--text-primary)';
  const sub = inverse ? 'var(--text-on-inverse)' : 'var(--text-secondary)';
  const h = size === 'sm' ? 'var(--control-h-sm)' : size === 'lg' ? 'var(--control-h-lg)' : 'var(--control-h-md)';
  const field = {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    height: multiline ? 'auto' : h,
    minHeight: multiline ? h : undefined,
    padding: multiline ? '10px 0' : '0',
    margin: 0,
    background: 'transparent',
    color: fg,
    border: 0,
    borderBottom: `1px solid ${line}`,
    borderRadius: 0,
    outline: 'none',
    resize: multiline ? 'vertical' : undefined,
    fontFamily: 'var(--font-body)',
    fontSize: size === 'sm' ? '16px' : 'var(--text-body)',
    lineHeight: multiline ? 'var(--leading-body)' : 1,
    transition: 'var(--transition-color)',
    opacity: disabled ? 'var(--state-disabled-opacity)' : 1
  };
  const common = {
    id: fid,
    name,
    value,
    defaultValue,
    onChange,
    placeholder,
    disabled,
    required,
    autoComplete,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field,
    'aria-invalid': !!error || undefined,
    'aria-describedby': hint || error ? `${fid}-h` : undefined
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontSize: 'var(--text-small)',
      fontFamily: 'var(--font-qualifier)',
      fontStyle: 'var(--style-qualifier)',
      fontWeight: 'var(--weight-qualifier)',
      letterSpacing: 'var(--tracking-qualifier)',
      color: focus ? fg : sub,
      lineHeight: 1.2,
      transition: 'var(--transition-color)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, " *")), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, common)) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, common)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    id: `${fid}-h`,
    style: {
      fontSize: 'var(--text-caption)',
      letterSpacing: '0.02em',
      color: error ? 'var(--red-600)' : sub,
      marginTop: '4px'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useId
} = React;
/** Radio — 18px Kreis, 1px Kontur; gewählt setzt einen Tintenpunkt. Der Kreis ist neben dem Avatar die einzige runde Form. */
function Radio({
  label,
  name,
  value,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  inverse = false,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const auto = useId();
  const fid = id || `rd-${auto}`;
  const ink = inverse ? 'var(--ink-200)' : 'var(--ink-900)';
  const bd = checked || defaultChecked ? ink : inverse ? 'var(--ink-500)' : 'var(--border-field)';
  return /*#__PURE__*/React.createElement("label", _extends({
    htmlFor: fid,
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: '12px',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 'var(--state-disabled-opacity)' : 1,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body)',
      lineHeight: 1.3,
      color: inverse ? 'var(--text-on-inverse)' : 'var(--text-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      flex: 'none',
      width: '18px',
      height: '18px',
      marginTop: '2px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: fid,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    defaultChecked: defaultChecked,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      opacity: 0,
      cursor: 'inherit'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      boxSizing: 'border-box',
      border: `1px solid ${bd}`,
      borderRadius: '50%',
      outline: focus ? `1px solid ${ink}` : 'none',
      outlineOffset: '3px',
      transition: 'var(--transition-color)'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: '4px',
      borderRadius: '50%',
      background: ink
    }
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useId
} = React;
/** Select — natives <select> im Haarlinien-Stil des Input; Chevron als Schriftzeichen. */
function Select({
  label,
  hint,
  error,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  inverse = false,
  id,
  name,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const auto = useId();
  const fid = id || `sel-${auto}`;
  const line = error ? 'var(--red-600)' : focus ? inverse ? 'var(--ink-200)' : 'var(--border-field-focus)' : inverse ? 'var(--ink-500)' : 'var(--border-field)';
  const fg = inverse ? 'var(--text-on-inverse-strong)' : 'var(--text-primary)';
  const sub = inverse ? 'var(--text-on-inverse)' : 'var(--text-secondary)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontSize: 'var(--text-small)',
      fontFamily: 'var(--font-qualifier)',
      fontStyle: 'var(--style-qualifier)',
      fontWeight: 'var(--weight-qualifier)',
      letterSpacing: 'var(--tracking-qualifier)',
      color: focus ? fg : sub,
      lineHeight: 1.2,
      transition: 'var(--transition-color)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, " *")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: fid,
    name: name,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    required: required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    "aria-invalid": !!error || undefined,
    style: {
      display: 'block',
      width: '100%',
      boxSizing: 'border-box',
      height: 'var(--control-h-md)',
      padding: '0 28px 0 0',
      margin: 0,
      background: 'transparent',
      color: fg,
      border: 0,
      borderBottom: `1px solid ${line}`,
      borderRadius: 0,
      outline: 'none',
      appearance: 'none',
      WebkitAppearance: 'none',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body)',
      lineHeight: 1,
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 'var(--state-disabled-opacity)' : 1,
      transition: 'var(--transition-color)'
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true,
    hidden: value !== undefined && value !== ''
  }, placeholder), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value,
    disabled: o.disabled
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: '4px',
      top: '50%',
      transform: 'translateY(-58%)',
      fontSize: '18px',
      lineHeight: 1,
      color: sub,
      pointerEvents: 'none'
    }
  }, "\u25BE")), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      letterSpacing: '0.02em',
      color: error ? 'var(--red-600)' : sub,
      marginTop: '4px'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useId
} = React;
/** Switch — rechteckiger Schalter (40×20), Knopf ein 16px-Quadrat. Geradlinig statt Pille. */
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  inverse = false,
  id,
  name,
  style,
  ...rest
}) {
  const [inner, setInner] = useState(!!defaultChecked);
  const [focus, setFocus] = useState(false);
  const isCtl = checked !== undefined;
  const on = isCtl ? checked : inner;
  const auto = useId();
  const fid = id || `sw-${auto}`;
  const ink = inverse ? 'var(--ink-200)' : 'var(--ink-900)';
  const paper = inverse ? 'var(--ink-800)' : 'var(--paper-50)';
  const off = inverse ? 'var(--ink-500)' : 'var(--border-field)';
  return /*#__PURE__*/React.createElement("label", _extends({
    htmlFor: fid,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 'var(--state-disabled-opacity)' : 1,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body)',
      lineHeight: 1.3,
      color: inverse ? 'var(--text-on-inverse)' : 'var(--text-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      flex: 'none',
      width: '40px',
      height: '20px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: fid,
    name: name,
    type: "checkbox",
    role: "switch",
    "aria-checked": on,
    checked: on,
    disabled: disabled,
    onChange: e => {
      if (!isCtl) setInner(e.target.checked);
      onChange && onChange(e);
    },
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      opacity: 0,
      cursor: 'inherit'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      boxSizing: 'border-box',
      border: `1px solid ${on ? ink : off}`,
      background: on ? ink : 'transparent',
      outline: focus ? `1px solid ${ink}` : 'none',
      outlineOffset: '3px',
      transition: 'var(--transition-color)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '1px',
      left: on ? '21px' : '1px',
      width: '16px',
      height: '16px',
      background: on ? paper : off,
      transition: `left var(--dur-base) var(--ease-out), background-color var(--dur-base) var(--ease-out)`
    }
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/** Tabs — Textreiter über einer Haarlinie; der aktive Reiter ist Semibold und trägt die Linie in Tinte. Optional mit Nummern-Motiv. */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  inverse = false,
  size = 'md',
  style,
  ...rest
}) {
  const [inner, setInner] = useState(defaultValue ?? (items[0] && items[0].id));
  const [hover, setHover] = useState(null);
  const active = value !== undefined ? value : inner;
  const fs = size === 'sm' ? 'var(--text-small)' : 'var(--text-body)';
  const fg = inverse ? 'var(--text-on-inverse)' : 'var(--text-secondary)';
  const fgOn = inverse ? 'var(--text-on-inverse-strong)' : 'var(--text-primary)';
  const rule = inverse ? 'var(--rule-on-inverse)' : 'var(--rule)';
  const ruleOn = inverse ? 'var(--ink-200)' : 'var(--rule-strong)';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      borderBottom: `1px solid ${rule}`,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), items.map(it => {
    const on = it.id === active;
    const hv = hover === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      role: "tab",
      type: "button",
      "aria-selected": on,
      disabled: it.disabled,
      onClick: () => {
        if (value === undefined) setInner(it.id);
        onChange && onChange(it.id);
      },
      onMouseEnter: () => setHover(it.id),
      onMouseLeave: () => setHover(null),
      style: {
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '10px',
        margin: '0 0 -1px 0',
        padding: '8px 0 10px',
        background: 'transparent',
        border: 0,
        borderBottom: `1px solid ${on ? ruleOn : 'transparent'}`,
        borderRadius: 0,
        cursor: it.disabled ? 'default' : 'pointer',
        opacity: it.disabled ? 'var(--state-disabled-opacity)' : 1,
        fontFamily: 'inherit',
        fontSize: fs,
        lineHeight: 1.2,
        fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-regular)',
        color: on || hv ? fgOn : fg,
        transition: 'var(--transition-color)',
        whiteSpace: 'nowrap'
      }
    }, it.number && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-meta)',
        letterSpacing: 'var(--tracking-meta)',
        fontWeight: 'var(--weight-regular)'
      }
    }, it.number), /*#__PURE__*/React.createElement("span", null, it.label));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/KontaktScreen.jsx
try { (() => {
const {
  SectionTitle,
  Input,
  Select,
  Checkbox,
  Button,
  Dialog,
  Toast,
  Mark,
  Hairline
} = window.JonasHartmannDesignSystem_a175b0;
function Visitenkarte() {
  const corner = {
    position: 'absolute',
    fontSize: 'var(--text-caption)',
    letterSpacing: '0.02em',
    lineHeight: 1.35,
    color: 'var(--ink-900)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '85 / 55',
      background: 'var(--bg-surface-strong)',
      color: 'var(--ink-900)',
      padding: '16px 18px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...corner,
      top: 16,
      left: 18,
      fontWeight: 'var(--weight-qualifier)',
      letterSpacing: 'var(--tracking-qualifier)'
    }
  }, "principal, family office"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...corner,
      top: 16,
      right: 18,
      textAlign: 'right'
    }
  }, "jonashartmann.org"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'clamp(26px, 3.2vw, 38px)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--ink-900)'
    }
  }, "Jonas Hartmann"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+41764428626",
    style: {
      ...corner,
      bottom: 16,
      left: 18,
      textDecoration: 'none'
    }
  }, "+41 76 442 86 26"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...corner,
      bottom: 16,
      right: 18,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:jonas@hartmann.id",
    style: {
      textDecoration: 'none',
      color: 'inherit'
    }
  }, "jonas@hartmann.id"), /*#__PURE__*/React.createElement(Mark, {
    size: 13,
    color: "var(--ink-500)"
  })));
}
function KontaktScreen() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    anliegen: '',
    nachricht: '',
    ok: false
  });
  const [errors, setErrors] = React.useState({});
  const [confirm, setConfirm] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const set = k => e => setForm({
    ...form,
    [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
  });
  const submit = e => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Bitte einen Namen eingeben.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'Bitte eine gültige Adresse eingeben.';
    if (!form.nachricht.trim()) er.nachricht = 'Bitte eine Nachricht eingeben.';
    if (!form.ok) er.ok = 'Bitte zustimmen.';
    setErrors(er);
    if (Object.keys(er).length === 0) setConfirm(true);
  };
  const send = () => {
    setConfirm(false);
    setSent(true);
    setForm({
      name: '',
      email: '',
      anliegen: '',
      nachricht: '',
      ok: false
    });
  };
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Kontakt",
    style: {
      display: 'grid',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    number: "3.0",
    level: 1
  }, "Kontakt"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
      gap: 'var(--space-9)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Visitenkarte, null), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 'var(--measure-narrow)',
      color: 'var(--text-body)'
    }
  }, "Anfragen zu Family Office, Stiftung und Beteiligungen bitte \xFCber das Formular oder direkt per E-Mail. Antwort innerhalb von zwei Werktagen."), /*#__PURE__*/React.createElement(Hairline, null), /*#__PURE__*/React.createElement("dl", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '8px var(--space-6)',
      margin: 0,
      fontSize: 'var(--text-small)'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontWeight: 'var(--weight-qualifier)',
      letterSpacing: 'var(--tracking-qualifier)',
      color: 'var(--text-secondary)'
    }
  }, "telefon"), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0
    }
  }, "+41 76 442 86 26"), /*#__PURE__*/React.createElement("dt", {
    style: {
      fontWeight: 'var(--weight-qualifier)',
      letterSpacing: 'var(--tracking-qualifier)',
      color: 'var(--text-secondary)'
    }
  }, "e-mail"), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:jonas@hartmann.id"
  }, "jonas@hartmann.id")))), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    style: {
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    number: "3.1",
    level: 3
  }, "Anfrage"), /*#__PURE__*/React.createElement(Input, {
    label: "name",
    value: form.name,
    onChange: set('name'),
    error: errors.name,
    required: true,
    autoComplete: "name"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "e-mail",
    type: "email",
    value: form.email,
    onChange: set('email'),
    error: errors.email,
    required: true,
    autoComplete: "email"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "anliegen",
    placeholder: "bitte w\xE4hlen",
    value: form.anliegen,
    onChange: set('anliegen'),
    options: [{
      value: 'family office',
      label: 'Family Office'
    }, {
      value: 'stiftung',
      label: 'Stiftung'
    }, {
      value: 'private equity',
      label: 'Private Equity'
    }, {
      value: 'sonstiges',
      label: 'Sonstiges'
    }]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "nachricht",
    multiline: true,
    rows: 4,
    value: form.nachricht,
    onChange: set('nachricht'),
    error: errors.nachricht,
    required: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: /*#__PURE__*/React.createElement("span", null, "Ich stimme der Verarbeitung meiner Angaben zur Beantwortung der Anfrage zu.", errors.ok && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 'var(--text-caption)',
        color: 'var(--red-600)',
        marginTop: 4
      }
    }, errors.ok)),
    checked: form.ok,
    onChange: set('ok')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 'var(--space-4)',
      paddingTop: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-secondary)',
      letterSpacing: '0.02em'
    }
  }, "* Pflichtfelder"), /*#__PURE__*/React.createElement(Button, {
    type: "submit"
  }, "Anfrage senden")))), /*#__PURE__*/React.createElement(Dialog, {
    open: confirm,
    onClose: () => setConfirm(false),
    number: "3.1",
    title: "Anfrage senden?",
    meta: "15. September 2026",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setConfirm(false)
    }, "Abbrechen"), /*#__PURE__*/React.createElement(Button, {
      onClick: send
    }, "Senden"))
  }, "Ihre Nachricht geht an jonas@hartmann.id. Eine Kopie erhalten Sie an ", form.email || 'Ihre Adresse', "."), /*#__PURE__*/React.createElement(Toast, {
    open: sent,
    message: "Nachricht gesendet.",
    onDismiss: () => setSent(false)
  }));
}
Object.assign(window, {
  KontaktScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/KontaktScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteFrame.jsx
try { (() => {
const {
  NameMark,
  Tabs,
  Mark
} = window.JonasHartmannDesignSystem_a175b0;
const NAV = [{
  id: 'werdegang',
  number: '1.0',
  label: 'Werdegang'
}, {
  id: 'texte',
  number: '2.0',
  label: 'Texte'
}, {
  id: 'kontakt',
  number: '3.0',
  label: 'Kontakt'
}];
function SiteFrame({
  route,
  onNavigate,
  counter,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      padding: 'var(--page-margin)',
      maxWidth: 'var(--page-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 'var(--space-5)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(NameMark, {
    size: "sm",
    href: "#start",
    onClick: e => {
      e.preventDefault();
      onNavigate('start');
    },
    style: {
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement(Tabs, {
    size: "sm",
    items: NAV,
    value: route === 'start' ? '' : route,
    onChange: onNavigate,
    style: {
      borderBottom: 0,
      gap: 'var(--space-5)'
    }
  })), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      paddingTop: 'clamp(48px, 8vw, 112px)',
      paddingBottom: 'clamp(48px, 8vw, 112px)'
    }
  }, children), /*#__PURE__*/React.createElement("footer", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 'var(--space-5)',
      fontSize: 'var(--text-meta)',
      letterSpacing: 'var(--tracking-meta)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Jonas Hartmann \xB7 Zug"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14
    }
  }, counter, /*#__PURE__*/React.createElement(Mark, {
    size: 12,
    color: "var(--ink-500)"
  }))));
}
function ImagePlaceholder({
  caption,
  ratio = '3 / 4',
  tone = 'var(--bg-image-placeholder)',
  style
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      aspectRatio: ratio,
      background: tone,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: 12,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("figcaption", {
    style: {
      color: 'var(--ink-200)',
      fontSize: 'var(--text-caption)',
      fontWeight: 'var(--weight-qualifier)',
      letterSpacing: 'var(--tracking-qualifier)',
      letterSpacing: '0.02em',
      textAlign: 'center'
    }
  }, caption));
}
Object.assign(window, {
  SiteFrame,
  ImagePlaceholder,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteFrame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/StartScreen.jsx
try { (() => {
const {
  NameMark,
  Button,
  Card,
  Hairline
} = window.JonasHartmannDesignSystem_a175b0;
function StartScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Start"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
      gap: 'var(--space-8)',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NameMark, {
    size: "hero",
    qualifier: "principal, family office"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lead)',
      lineHeight: 1.35,
      maxWidth: 'var(--measure-narrow)',
      marginTop: 'var(--space-7)',
      color: 'var(--text-body)'
    }
  }, "Ich f\xFChre das Family Office der Familie Hartmann in Zug. Diese Seite sammelt Werdegang, Mandate und ausgew\xE4hlte Texte \u2014 knapp, ohne Umwege."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-6)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNavigate('werdegang')
  }, "Werdegang lesen"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192"),
    onClick: () => onNavigate('kontakt')
  }, "Kontakt"))), /*#__PURE__*/React.createElement(ImagePlaceholder, {
    caption: "hochformat, lichtkante",
    ratio: "3 / 4",
    tone: "var(--ink-800)",
    style: {
      maxWidth: 360,
      justifySelf: 'end',
      width: '100%'
    }
  })), /*#__PURE__*/React.createElement(Hairline, {
    spacing: "var(--space-9)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    number: "1.0",
    meta: "seit 2026",
    title: "Werdegang",
    onClick: () => onNavigate('werdegang'),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--weight-qualifier)',
        letterSpacing: 'var(--tracking-qualifier)'
      }
    }, "stationen, mandate, ausbildung"), /*#__PURE__*/React.createElement("span", null, "\u2192"))
  }, "Chronologisch, ohne Selbstbeschreibung: was, wo, wann."), /*#__PURE__*/React.createElement(Card, {
    number: "2.0",
    meta: "3 texte",
    title: "Texte",
    onClick: () => onNavigate('texte'),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--weight-qualifier)',
        letterSpacing: 'var(--tracking-qualifier)'
      }
    }, "essays, notizen"), /*#__PURE__*/React.createElement("span", null, "\u2192"))
  }, "Kurze Texte zu Family Office, Stiftung und Standort."), /*#__PURE__*/React.createElement(Card, {
    number: "3.0",
    meta: "zug",
    title: "Kontakt",
    onClick: () => onNavigate('kontakt'),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--weight-qualifier)',
        letterSpacing: 'var(--tracking-qualifier)'
      }
    }, "anfrage, e-mail"), /*#__PURE__*/React.createElement("span", null, "\u2192"))
  }, "Anfragen per Formular oder E-Mail. Antwort innerhalb von zwei Werktagen.")));
}
Object.assign(window, {
  StartScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/StartScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/TexteScreen.jsx
try { (() => {
const {
  SectionTitle,
  Tag,
  Hairline,
  Button,
  Badge
} = window.JonasHartmannDesignSystem_a175b0;
const TEXTE = [{
  nr: '2.1',
  titel: 'Über Verantwortung im Familienunternehmen',
  datum: '12. Juni 2026',
  thema: 'family office',
  teaser: 'Warum ein Family Office zuerst eine Frage der Ordnung ist und erst dann eine der Rendite.',
  absaetze: ['Ein Family Office verwaltet kein Vermögen, es verwaltet Zuständigkeiten. Wer entscheidet, wer berichtet, wer trägt — diese drei Fragen sind vor jeder Anlageentscheidung zu klären.', 'Die Antwort steht selten in einem Dokument. Sie zeigt sich darin, wie Gremien tagen, wie Berichte aussehen und ob unangenehme Zahlen denselben Weg nehmen wie angenehme.', 'Ordnung ist deshalb kein Verwaltungsakt, sondern die Voraussetzung dafür, dass Rendite überhaupt zurechenbar wird.']
}, {
  nr: '2.2',
  titel: 'Was eine Stiftung nicht ist',
  datum: '3. März 2026',
  thema: 'stiftung',
  teaser: 'Über den Unterschied zwischen Zweck und Absicht — und warum die Satzung beides trennen sollte.',
  absaetze: ['Eine Stiftung ist kein Sparkonto mit gutem Gewissen. Ihr Zweck ist bindend, ihre Absicht wandelbar; die Satzung sollte beides auseinanderhalten.', 'Wer den Zweck zu eng fasst, bindet die nächste Generation an Fragen, die sich bis dahin erledigt haben. Wer ihn zu weit fasst, gibt die Stiftung der Beliebigkeit preis.']
}, {
  nr: '2.3',
  titel: 'Zug als Standort',
  datum: '18. Januar 2026',
  thema: 'private equity',
  teaser: 'Kurze Wege, lange Fristen: Notizen zu einem Kanton, der beides kann.',
  absaetze: ['Zug ist klein genug, dass man sich kennt, und gross genug, dass man sich nicht kennen muss. Für langfristiges Kapital ist das eine seltene Kombination.', 'Die kurzen Wege zwischen Verwaltung, Beratern und Unternehmern ersetzen keine Sorgfalt — sie verkürzen nur die Zeit zwischen Frage und Antwort.']
}];
const THEMEN = ['alle', 'family office', 'stiftung', 'private equity'];
function TexteScreen({
  open,
  onOpen
}) {
  const [filter, setFilter] = React.useState('alle');
  const text = TEXTE.find(t => t.nr === open);
  if (text) {
    return /*#__PURE__*/React.createElement("article", {
      "data-screen-label": "Text",
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 320px)',
        gap: 'var(--space-9)',
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement("span", null, "\u2190"),
      onClick: () => onOpen(null),
      style: {
        marginLeft: -14
      }
    }, "Alle Texte"), /*#__PURE__*/React.createElement(SectionTitle, {
      number: text.nr,
      level: 1
    }, text.titel), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-4)',
        alignItems: 'center',
        fontSize: 'var(--text-meta)',
        letterSpacing: 'var(--tracking-meta)',
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", null, text.datum), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--weight-qualifier)',
        letterSpacing: 'var(--tracking-qualifier)',
        fontSize: 'var(--text-small)'
      }
    }, text.thema)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 'var(--space-5)',
        maxWidth: 'var(--measure)',
        fontSize: 'var(--text-body)'
      }
    }, text.absaetze.map((a, i) => /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        fontSize: i === 0 ? 'var(--text-lead)' : undefined,
        lineHeight: i === 0 ? 1.4 : undefined,
        color: i === 0 ? 'var(--text-primary)' : 'var(--text-body)'
      }
    }, a))), /*#__PURE__*/React.createElement(Hairline, {
      spacing: "var(--space-4)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "Jonas Hartmann, Zug"), /*#__PURE__*/React.createElement(Badge, null, text.nr.replace('2.', ''), "/", TEXTE.length))), /*#__PURE__*/React.createElement(ImagePlaceholder, {
      caption: "s/w stillleben, ein motiv",
      ratio: "4 / 5",
      style: {
        marginTop: 56
      }
    }));
  }
  const list = TEXTE.filter(t => filter === 'alle' || t.thema === filter);
  const [lead, ...rest] = list;
  const meta = {
    fontSize: 'var(--text-meta)',
    letterSpacing: 'var(--tracking-meta)',
    color: 'var(--text-secondary)',
    whiteSpace: 'nowrap'
  };
  const thema = t => /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-qualifier)',
      letterSpacing: 'var(--tracking-qualifier)',
      fontSize: 'var(--text-small)'
    }
  }, t.thema);
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Texte",
    style: {
      display: 'grid',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 'var(--space-5)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    number: "2.0",
    level: 1
  }, "Texte"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      flexWrap: 'wrap'
    }
  }, THEMEN.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    selected: filter === t,
    onClick: () => setFilter(t)
  }, t)))), lead && /*#__PURE__*/React.createElement("article", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)',
      gap: 'var(--space-9)',
      alignItems: 'end',
      paddingTop: 'var(--space-6)',
      borderTop: 'var(--hairline-strong)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-5)',
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...meta,
      display: 'flex',
      gap: 10,
      alignItems: 'baseline',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, lead.nr), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, lead.datum), /*#__PURE__*/React.createElement("span", null, "\xB7"), thema(lead)), /*#__PURE__*/React.createElement("a", {
    href: '#' + lead.nr,
    onClick: e => {
      e.preventDefault();
      onOpen(lead.nr);
    },
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-display)',
      lineHeight: 'var(--leading-display)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--text-primary)',
      textDecoration: 'none',
      textWrap: 'balance',
      maxWidth: '18ch'
    }
  }, lead.titel), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lead)',
      lineHeight: 1.4,
      color: 'var(--text-body)',
      maxWidth: 'var(--measure-narrow)'
    }
  }, lead.teaser), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192"),
    onClick: () => onOpen(lead.nr),
    style: {
      marginLeft: -18
    }
  }, "Lesen")), /*#__PURE__*/React.createElement("div", {
    onClick: () => onOpen(lead.nr),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(ImagePlaceholder, {
    caption: "s/w architektur, harte schatten",
    ratio: "4 / 3",
    tone: "var(--ink-800)"
  }))), rest.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: '0 var(--space-8)'
    }
  }, rest.map(t => /*#__PURE__*/React.createElement("a", {
    key: t.nr,
    href: '#' + t.nr,
    onClick: e => {
      e.preventDefault();
      onOpen(t.nr);
    },
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(40px, auto) minmax(0, 1fr) auto',
      gap: 'var(--space-5)',
      alignItems: 'baseline',
      padding: 'var(--space-5) 0',
      borderTop: 'var(--hairline)',
      textDecoration: 'none',
      color: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: meta
  }, t.nr), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-h3)',
      lineHeight: 'var(--leading-heading)',
      color: 'var(--text-primary)',
      textWrap: 'balance'
    }
  }, t.titel), /*#__PURE__*/React.createElement("span", {
    style: {
      ...meta,
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, t.datum), /*#__PURE__*/React.createElement("span", null, "\xB7"), thema(t))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "\u2192")))), list.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      padding: '22px 0',
      color: 'var(--text-secondary)',
      borderTop: 'var(--hairline-strong)'
    }
  }, "Keine Texte zu diesem Thema."));
}
Object.assign(window, {
  TexteScreen,
  TEXTE
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/TexteScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/WerdegangScreen.jsx
try { (() => {
const {
  SectionTitle,
  Hairline,
  Badge,
  Tag
} = window.JonasHartmannDesignSystem_a175b0;

// Einträge mit ph: true sind Platzhalter (exemplarisch) und werden durch eigene Angaben ersetzt.
const EINTRAEGE = [{
  von: 2026,
  bis: null,
  rolle: 'Principal',
  wo: 'Hartmann family office',
  ort: 'Zug',
  art: 'station'
}, {
  von: 2026,
  bis: null,
  rolle: 'Stiftungsrat',
  wo: 'Hartmann Stiftung',
  ort: 'Zug',
  art: 'mandat'
}, {
  von: 2025,
  bis: null,
  rolle: 'Beirat',
  wo: 'Beteiligung',
  ort: 'Luzern',
  art: 'mandat',
  ph: true
}, {
  von: 2023,
  bis: 2026,
  rolle: 'Investment Analyst',
  wo: 'Family Office',
  ort: 'Zürich',
  art: 'station',
  ph: true
}, {
  von: 2022,
  bis: 2022,
  rolle: 'Praktikum, Investment Banking',
  wo: 'Bank',
  ort: 'Frankfurt',
  art: 'station',
  ph: true
}, {
  von: 2021,
  bis: 2021,
  rolle: 'Praktikum, Strategieberatung',
  wo: 'Beratung',
  ort: 'Zürich',
  art: 'station',
  ph: true
}, {
  von: 2019,
  bis: 2023,
  rolle: 'M.A. Banking & Finance',
  wo: 'Universität',
  ort: 'Zürich',
  art: 'ausbildung',
  ph: true
}, {
  von: 2016,
  bis: 2019,
  rolle: 'B.A. Wirtschaftswissenschaften',
  wo: 'Universität',
  ort: 'St. Gallen',
  art: 'ausbildung',
  ph: true
}];
const ARTEN = ['alle', 'stationen', 'mandate', 'ausbildung'];
const ART_KEY = {
  stationen: 'station',
  mandate: 'mandat',
  ausbildung: 'ausbildung'
};
const zeitraum = e => e.bis === null ? `seit ${e.von}` : e.bis === e.von ? '' : `${e.von} – ${e.bis}`;
function WerdegangScreen() {
  const [filter, setFilter] = React.useState('alle');
  const list = EINTRAEGE.filter(e => filter === 'alle' || e.art === ART_KEY[filter]);
  const years = [...new Set(list.map(e => e.von))].sort((a, b) => b - a);
  const meta = {
    fontSize: 'var(--text-meta)',
    letterSpacing: 'var(--tracking-meta)',
    color: 'var(--text-secondary)'
  };
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Werdegang",
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 7fr)',
      gap: 'var(--space-9)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 'var(--page-margin)',
      display: 'grid',
      gap: 'var(--space-6)',
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    number: "1.0",
    level: 1
  }, "Werdegang"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lead)',
      lineHeight: 1.4,
      color: 'var(--text-primary)',
      maxWidth: 'var(--measure-narrow)'
    }
  }, "Seit 2026 f\xFChre ich das Family Office der Familie Hartmann in Zug. Davor Analyse und Beratung in Z\xFCrich und Frankfurt; Studium in St. Gallen und Z\xFCrich."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      flexWrap: 'wrap'
    }
  }, ARTEN.map(a => /*#__PURE__*/React.createElement(Tag, {
    key: a,
    selected: filter === a,
    onClick: () => setFilter(a)
  }, a))), /*#__PURE__*/React.createElement(Hairline, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      fontSize: 'var(--text-small)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-qualifier)',
      letterSpacing: 'var(--tracking-qualifier)'
    }
  }, "* Platzhalter \u2014 wird durch eigene Angaben ersetzt."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'center'
    }
  }, "Lebenslauf als PDF auf Anfrage. ", /*#__PURE__*/React.createElement(Badge, null, "stand 09/2026")))), /*#__PURE__*/React.createElement("div", null, years.map((y, yi) => /*#__PURE__*/React.createElement("div", {
    key: y,
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(96px, 128px) minmax(0, 1fr)',
      gap: 'var(--space-6)',
      padding: 'var(--space-6) 0',
      borderTop: yi === 0 ? 'var(--hairline-strong)' : 'var(--hairline)',
      borderBottom: yi === years.length - 1 ? 'var(--hairline)' : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 52,
      lineHeight: 0.9,
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--text-primary)'
    }
  }, y), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, list.filter(e => e.von === y).map(e => /*#__PURE__*/React.createElement("div", {
    key: e.rolle,
    style: {
      display: 'grid',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-h3)',
      lineHeight: 'var(--leading-heading)',
      color: 'var(--text-primary)'
    }
  }, e.rolle, e.ph && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "*")), /*#__PURE__*/React.createElement(Badge, {
    style: {
      flex: 'none',
      position: 'relative',
      top: -3
    }
  }, e.art)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'baseline',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-qualifier)',
      letterSpacing: 'var(--tracking-qualifier)',
      color: 'var(--text-body)'
    }
  }, e.wo), /*#__PURE__*/React.createElement("span", {
    style: meta
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, e.ort)), /*#__PURE__*/React.createElement("span", {
    style: {
      ...meta,
      whiteSpace: 'nowrap'
    }
  }, zeitraum(e))))))))));
}
Object.assign(window, {
  WerdegangScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/WerdegangScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Hairline = __ds_scope.Hairline;

__ds_ns.Mark = __ds_scope.Mark;

__ds_ns.NameMark = __ds_scope.NameMark;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
