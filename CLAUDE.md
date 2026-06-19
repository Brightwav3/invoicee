# Invoicee

A Czech-market invoicing app prototype ("Invoicee" / pracovní název "Invoicer"), imported from a Claude Design project (`claude.ai/design`, project id `3328b63c-3809-4d47-9169-00a835298cad`). Marketing site + a working browser-based invoice editor, in Czech (`lang="cs"`).

## Stack

- No build step. Plain HTML files that load React 18 + ReactDOM + Babel Standalone from `unpkg.com` via `<script>` tags, with in-browser JSX transpilation (`<script type="text/babel" src="...">`).
- No package.json, no bundler, no npm install. Just open the `.html` files in a browser (or serve the folder with any static file server).

## Structure

- `Invoicee.html` — marketing/promo landing page. Loads (in order): `tweaks-panel.jsx`, `ledger-ui.jsx`, `invoicer-motion.jsx`, `invoicer-promo.jsx`, `invoicer-sections.jsx`. Renders `PromoApp` (defined at the bottom of `invoicer-sections.jsx`).
- `Editor.html` — the actual invoice editor (live form + scaled A4 preview). Loads: `tweaks-panel.jsx`, `ledger-ui.jsx`, `invoicer-promo.jsx`, `invoicer-editor.jsx`. Renders `EditorApp`.
- `tweaks-panel.jsx` — generic floating "Tweaks" settings panel + form controls (`useTweaks`, `TweaksPanel`, `TweakSlider`, `TweakColor`, etc.). Shared infra, not Invoicee-specific.
- `ledger-ui.jsx` — shared design-system primitives: `Icons`, `LedgerButton`, `LedgerInput/Select/Textarea`, `Modal`, `QRCode` (visual SPD QR approximation), currency/date formatters, and sample invoice data (`createSampleInvoice`, `createSampleHistory`, `INVOICE_MODES`).
- `invoicer-motion.jsx` — scroll-reveal (`Reveal`), tilt, magnetic-button, count-up, and scroll-progress-bar primitives used by the promo page.
- `invoicer-promo.jsx` — promo-page building blocks: `Brand`, nav, `Hero`, the `AppWindow` product-shot mock, OS detection, accent-color application.
- `invoicer-sections.jsx` — remaining promo sections (`Features`, `Pricing`, `Reviews`, `FAQ`, footer) and the `PromoApp` root that mounts everything.
- `invoicer-editor.jsx` — the actual editor app (`EditorApp`): resizable form sidebar + live-scaled A4 invoice preview, localStorage persistence, print-to-PDF via `window.print()`.
- `assets/invoicer-logo.png` — app logo, referenced as `assets/invoicer-logo.png` (relative path; keep both HTML files at the project root).

## Conventions

- All UI strings and content are in **Czech**. Keep new copy in Czech to match.
- Every component attaches its exports to `window` via `Object.assign(window, {...})` at the bottom of the file — there are no ES modules and no imports/exports. New files should follow the same pattern, and `<script>` load order in the HTML matters (shared/base files before files that consume their globals).
- Styling is plain inline `style={{...}}` objects plus a handful of global CSS classes defined in the `<style>` block of each HTML file (`.rv`/`.hov`/`.sheen`/glass-mode classes, custom scrollbars, etc.). CSS custom properties (`--primary`, `--ink`, `--canvas`, ...) drive theming and are flipped by `body.dark-mode` / `body.glassy`.
- The "Tweaks" floating panel (bottom-right) is a live settings UI wired to `TWEAK_DEFAULTS` in each HTML file's inline `<script>` block (`/*EDITMODE-BEGIN*/ ... /*EDITMODE-END*/`) — this was originally meant to be rewritten on disk by a host environment (Claude Design's edit mode); in this plain static copy it's just in-memory React state for the session.
- `INVOICE_MODES` in `ledger-ui.jsx` defines the three Czech VAT regimes (`neplatce`, `neplatce_ucetnictvi`, `platce`) — these gate which fields (DIČ, DUZP, VAT rate) appear in the editor and printed invoice.

## Running it

- Just open `Invoicee.html` or `Editor.html` directly in a browser, or serve the folder (e.g. `npx serve .` / `python -m http.server`) and navigate to either file. No build/install step.
