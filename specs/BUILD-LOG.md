# Build Log — EvoEarth Living Website

Newest entries first.

## 2026-09-06

### Session 5 — README, asset-casing fix, $10K self-grade
- **Bug fixed (deploy-blocking):** asset folder was `Assets/` (capital) but every reference
  in HTML/CSS is `/assets/` lowercase. Worked on the case-insensitive macOS filesystem;
  would have 404'd every font, image, favicon and the OG image on Hostinger (Linux,
  case-sensitive). Renamed `Assets/` → `assets/`; re-verified all paths return 200.
- **`README.md`** created at repo root — run instructions, file map, how to edit content
  (site.js / products.js / verbatim About / catalogue-in-place), conventions, Hostinger
  deploy steps.
- **`specs/GRADE.md`** — first full self-grade against the parent $10K checklist.
  Strong: point of view, typography, hierarchy, mobile. Mixed: motion, invisible-stuff.
  Missing: imagery. Colour strong but final accent still deferred. The soft grades are all
  gated on client assets (photography, logo, motion/accent refs, real PDF).

### Session 4 — spec 13 content-copy (closed out)
- All home + 3 category HTML copy confirmed in place and matching spec 13 (hero kicker/
  h1/lede, range intro, category ledes, breadcrumbs, CTA labels). `js/data/products.js`
  already fully populated — Dry 7 subcats, Wet 3, Aroma 2, each blurb one factual sentence.
- Customisation note (`data-customisation-note`) wired on all 3 category pages.
- Scanned index + category pages + `js/data/*` for third-party brand names (Colgate, Bajaj,
  Old Tree, Dettol, …) → none. Adjective-stack scan → "premium / exceptional / exquisite"
  only inside the verbatim About text (spec 03 forbids editing it).
- STATUS spec 13 → built `x` / reviewed `x`.
- **Open:** hero h1 "The bathroom shelf, considered." still needs client sign-off — the
  last `‹confirm›` line. Catalogue trace re-checks when the real PDF replaces the stub.

### Session 3 — spec 12 accessibility (built + reviewed)
- **Mobile panel `inert`** (`js/modules/nav.js`) — open state now sets `el.inert` on
  `#main`, `.site-footer`, `.wordmark`, `.header-cta`; cleared on close and on crossing
  the desktop breakpoint. Verified via Playwright: `inert` toggles correctly, focus lands
  on the Products button on open, Esc closes and returns focus to `.nav-toggle`.
- **Keyboard walk** (Playwright, 1440 + 390):
  - Dropdown — ArrowDown from button opens + focuses first item; ArrowUp/Down move;
    Home/End jump; Esc → button (collapsed); ArrowUp at first item closes → button;
    Tab past last item closes.
  - Mobile panel — focus moves in on open, Esc / link / toggle close, focus returns.
- **axe-core 4.10** (WCAG 2.0/2.1 A + AA) — **0 violations** on `index.html` and all
  three category pages. a11y tree: `banner` / `main` / `contentinfo` + `Primary` /
  `Breadcrumb` / `Footer` navs, one `<h1>` per page, no heading-level skips.
- **Bug fixed:** `css/main.css` `@import` paths were bare-relative (`layers/…`). Chrome's
  preload scanner resolves `@import` against the *document* URL, so each layer 404'd once
  (`/layers/…`, `/products/layers/…`) before the real load corrected itself — console
  noise only, styles always applied. Changed to root-relative `/css/layers/…` per the
  `CLAUDE.md` URL rule. Re-verified: console clean on a fresh load.
- **Not done:** Lighthouse a11y score (needs a full browser profile, not the MCP harness).
- STATUS spec 12 → built `x` / reviewed `x`; spec `12-accessibility.md` acceptance boxes ticked.

### Session 2 — responsive + a11y verification pass (spec 10, part of 12)
- Ran `frontend-design` + `ui-ux-pro-max` skills. The ui-ux `--design-system` output
  proposed a generic editorial-black + pink / Playfair kit — **rejected**: spec 00 +
  `CLAUDE.md` lock the espresso palette and Fraunces/Hanken. Kept only the universal
  checklist items (contrast, focus, touch targets, reduced motion, 320–1440 breakpoints).
- **Playwright pass** at 320 / 390 / 768 / 1440 on all 4 pages: no horizontal scroll,
  `<h1>` never overflows, exactly one `<h1>` per page, subcategory grids render.
  Mobile nav panel: opens with scroll-lock, focus moves into the panel, closes via
  Esc / link / (panel is full-screen so no outside tap), focus returns to the toggle.
  Contrast computed for every muted pairing — all ≥ 4.5:1 (recorded in STATUS).
  a11y tree: correct landmarks + 3 labelled navs, ordered headings, `aria-busy` cleared.
- **Bugs fixed during the pass:**
  - `.range-card__media img` / `.item-card img` had both `width`+`height` attrs, so the
    CSS `aspect-ratio` was ignored and images rendered at intrinsic 1000px height (home
    range section was 3872px tall on mobile). Added `width:100%; height:auto; object-fit:cover`.
  - `reset.css` only stripped list markers from `ul[class]/ol[class]`; the classless
    `<ul>`s in the header nav and footer showed disc bullets. Broadened to `ul, ol`
    (site has no content lists).
  - Hero / category `<h1>` was clamped to `40ch` (~400px) by `.split__text`, forcing the
    display headline to 5 stubby lines. Added `.hero .split__text, .cat-hero .split__text
    { max-width: 34rem }` and `text-wrap: pretty` on those h1s (balance over-fragmented them).
  - Mobile panel focus-in failed because `visibility` was mid-transition when `.focus()`
    ran. CSS: `transition: ... visibility 0s var(--dur)` (delay only on close),
    `.is-open { ... visibility 0s 0s }`; plus `requestAnimationFrame` around the focus call
    in `nav.js`.

### Session 2 — home + category pages + meta/SEO (in progress)
- **Spec 11 (performance / meta / SEO)** —
  - Per-page `<title>` + meta description set to the spec table wording; added
    `<meta name="robots" content="index,follow">` and `<meta name="theme-color" content="#2B2119">`
    on all 4 pages (canonical + OG + twitter card were already there).
  - JSON-LD: `Organization` on the home page (name/url/logo, `areaServed: IN`, two sales
    `contactPoint`s, email, Srinagar + Jammu `PostalAddress` with `addressRegion:
    "Jammu and Kashmir"`; no fabricated foundingDate/employee counts). `BreadcrumbList`
    on each category page matching the visible breadcrumb. All blocks `JSON.parse` clean.
  - `robots.txt` (allow all + sitemap pointer) and `sitemap.xml` (4 URLs, `lastmod`
    2026-09-06) at project root. Sitemap validates as XML.
  - Still pending: `favicon.ico` (placeholder — `icon.svg` + `favicon-32.png` cover it for
    now), Lighthouse/a11y run.

- **`products/{dry,wet,aroma}-amenities.html`** — category route pages (spec 05). Each:
  shared header/footer, `<main data-category>`, static breadcrumb + `<h1>` + intro + CTAs +
  empty `[data-customisation-note]`, ink `.cat-hero` split with placeholder figure, and a
  `[data-subcats]` container holding a no-JS "download the catalogue" fallback line.
  `category.js` replaces that with every subcategory (`.subcat` → `.item-grid` of
  `.item-card`) plus the "Other ranges" cross-links, all from `PRODUCT_GROUPS`.
  Current range gets `aria-current="page"` in the Products dropdown.
  Verified in Playwright: dry 7 subcats / 25 items, wet 3 / 11, aroma 2 / 7; one `<h1>` per
  page; customisation note auto-filled; console clean.
- **CSS fix** — `.cat-hero` no longer carries `.split` on the `<section>` (double-grid was
  breaking the `<h1>` mid-word); `split` stays on the inner `.container`. Added
  `list-style:none; padding:0` to `.cat-cross ul` (JS injects a classless `<ul>`).

- **`index.html`** — full home page built against specs 01–08, 13:
  header shell + Products dropdown + mobile panel hooks + WhatsApp CTA; hero (`#hero`,
  split, `scene.svg` placeholder for the missing `hero-1280x1600.svg`); about (`#about`,
  catalogue p2 verbatim); range (`#range`, no-JS `<li>` fallback + `data-range-list`);
  who-we-serve (`#who-we-serve`, audience list, no trust metrics); ordering process
  (`#process`, 4-step `<ol>`); contact (`#contact`); shared footer with `data-*` contact
  hooks. `<head>`: title/description/canonical, favicons, OG tags, font preload, module JS.
  All local URLs return 200 via `python3 -m http.server`.
- **Still to do this pass:** `README.md`, `favicon.ico`, formal axe/Lighthouse a11y run +
  keyboard walk of the Products dropdown, background `inert` on the open mobile panel,
  hero h1 `‹confirm›`, real photography drop into `assets/img/photos/`.

### Session 1 — foundation (done)
- **Project setup** — `CLAUDE.md`, all 14 specs `00`–`13`, `STATUS.md`, `BUILD-LOG.md`.
- **Fonts** — Fraunces + Hanken Grotesk variable `.woff2` (weight axis) self-hosted in
  `assets/fonts/` from fontsource. `css/layers/fonts.css`. → spec 00
- **Design system CSS** — `css/main.css` (`@layer` order) + `css/layers/`:
  - `reset.css` — modern reset, reduced-motion guard
  - `tokens.css` — espresso palette, fluid type scale, space scale, brass **stub** accent, motion **stub** tokens
  - `base.css` — element defaults, focus-visible, reveal rules (armed by JS only)
  - `layout.css` — `.container`, `.section--ink/paper`, `.split`, `.editorial`, `.prose`
  - `components.css` — header + Products dropdown + mobile panel, buttons, kicker, framed
    media, hero, range cards, who-we-serve list, ordering-process counter timeline,
    breadcrumb, category page, contact, footer
  - `utilities.css` — visually-hidden, no-scroll, hidden
  → specs 00, 01
- **JS** —
  - `js/data/site.js` — contact single source of truth + `waHref`/`mailHref`/`telHref`
  - `js/data/products.js` — full 3-group taxonomy with trimmed blurbs + helpers
  - `js/modules/contact.js` — wires `[data-wa]`/`[data-catalogue]`/`[data-call]`/`[data-email]`/`[data-year]`
  - `js/modules/nav.js` — dropdown disclosure + keyboard, mobile panel + scroll-lock,
    sticky scrolled state, active-section observer; `console.warn` on bad markup
  - `js/modules/reveal.js` — IntersectionObserver reveal, no-ops under reduced motion
  - `js/modules/products.js` — renders home range cards from data
  - `js/modules/category.js` — renders subcategory grids from `data-category`; `console.warn` on bad id
  - `js/main.js` — entry, per-module try/catch, removes `.no-js`
  → specs 01, 04, 05, 08, 09
- **Placeholder assets** — `assets/img/placeholders/{item,scene}.svg`,
  `assets/favicon/{icon.svg,favicon-32.png,apple-touch-icon.png}`,
  `assets/og/evoearth-og-1200x630.png`, `catalogue/evoearth-catalogue.pdf` (651-byte stub).

### Not done yet
- `index.html`, `products/{dry,wet,aroma}-amenities.html`
- `<head>` meta + JSON-LD, `robots.txt`, `sitemap.xml`, `README.md` (spec 11)
- Any browser / Playwright verification (specs 10, 12) — **nothing has been rendered yet**
- $10K checklist self-grade

### Awaiting client
Compressed catalogue PDF · vector logo + small monochrome mark · real photography
(brief ready — spec 14) · motion/button references (spec 09 stays a stub) ·
trust-metric values · branded-email decision · Hostinger HTTPS/`public_html`
confirmation · `‹confirm›` copy lines (hero h1).

---

## Session 2 — nav fix + imagery brief (2026-09-06)
- **Products dropdown bug.** Submenu sat `0.65rem` below the button with a visual
  gap; crossing it fired `mouseleave` on `.has-menu` → menu closed before the
  pointer reached the links. Fix: `.submenu::before` invisible bridge spanning the
  gap (`css/layers/components.css`) + 180ms close-grace timer + `clearTimeout` on
  re-enter (`js/modules/nav.js`). Also: submenu link font `0.85rem` desktop /
  `--step-0` mobile, panel `min-width` 15rem → 12.5rem, gap 0.65 → 0.5rem, bridge
  hidden under the mobile breakpoint. Playwright: hover-through + click-navigate OK.
- **Client reference review.** `References/Websites.txt` → kimirica.shop. Created
  `specs/14-imagery.md`: art direction (one consistent still-life set, warm-brown +
  off-white, blank labels, no people/text), 5 named image slots with pixel sizes,
  3-phase plan (7 launch shots → 12 subcat → 43 item), and generation prompts for
  every slot. Improvement backlog written into `EvoEarth/CLAUDE.md`.
- Noted: the "build out category pages" idea from the review was already done in
  Session 1 (spec 05 / `category.js`); the PDF-pointer paragraph in the HTML is
  only the no-JS fallback.
- Wrote `specs/REVIEW-kimirica.md` — full review, per-suggestion status.

**"Doable now" backlog — built the same session:**
- **Capabilities strip** (`specs/15-capabilities-strip.md`, new). `#capabilities`
  `<dl>` between `#about` and `#range`, home only. 4 qualitative claims, no
  metrics (content rule). Dim-paper (`--paper-2`) divider strip: `sp-5`
  padding, hairline `border-block`, 4/2/1-col grid, kraft-square `dt::before`
  (reuses the `.serve__loc` motif — one accent). `aria-label`, no visible h2.
  `css/layers/components.css` "Capabilities strip" block.
- **Footer wholesale line** — `index.html` footer brand column:
  "Distributors and trading houses — ask about wholesale terms.", link `data-wa` +
  distributor `data-wa-msg`. New rule `.site-footer__descr a` (kraft underline);
  `__descr` max-width 30ch → 34ch.
- **Home range-cards** — re-checked, already working from Session 1
  (`main.js` → `initRangeOverview` → `.range-card` ×3). No change.
- **Heading audit** — home + category: Fraunces for section h2 + product names,
  Hanken 600 for process/item h3. Consistent, no all-caps, no skips. No change.

Verified (Playwright, localhost): `#capabilities` renders 390 + 1280, no
horizontal scroll 390–1280, axe-core WCAG2.1-AA **0 violations** with the strip +
footer line in place, console clean, footer `data-wa` href resolves with the
prefilled message.

---

## Session 3 — palette lock + gradients (2026-09-06)
Client supplied the palette (via a ui-ux pass): near-black `#0A0908`, warm-ink
`#F5F2EC`, oxblood `#6E1F23`, brass `#C9A36B`, slate midtones.

- **`css/layers/tokens.css`** — replaced the espresso palette. `--kraft` kept as
  the var name but is now brass. `--accent*` promoted from stub to real oxblood
  (`--accent` / `--accent-hi` / `--accent-lo` / `--accent-hover` / `--accent-ink`).
  Muted text → slate `#54585C` (nudged from `#5C5F63` for AA headroom on
  `--paper-2`). Added elevation ramp `--ink-2 #191310` / `--ink-3 #241b16` /
  `--ink-hi #241713`, and `--grad-*` gradient tokens.
- **Gradients** (user: "just one single color and no shades") — every surface now
  carries a subtle same-hue depth gradient:
  - `base.css` — (body kept solid `--ink`).
  - `layout.css` — `.section--ink` → `--grad-ink`, `.section--paper` →
    `--grad-paper`, `.section--paper-2` → `--grad-paper-2`.
  - `components.css` — `.hero`/`.cat-hero` → `--grad-field` (warm radial haze);
    `.site-header` subtle linear; `.submenu` → `--grad-ink-2` + drop shadow;
    `.btn--wa` → `--grad-cta` / hover `--grad-cta-hover`; `.site-footer` →
    `--grad-ink-2`; `.range-card` top-lit lift + hover brass wash; `.item-card`
    top-lit; `.steps > li::before` → radial `closest-side` knockout so the numeral
    masks the timeline line over any gradient value.
- **`::selection`** (`base.css`) → oxblood bg / paper text.
- **`theme-color`** meta `#2B2119` → `#0A0908` in all 4 HTML files.
- ui-ux-pro-max skill consulted: no palette match in its DB (returns navy/gold
  templates); used its "Modern Dark" style cues (layered surfaces, avoid pure
  black, subtle linear gradients) + the 3-shade surface principle.

Verified (Playwright, `localhost:8000`): home + dry + wet, 390 & 1280 —
axe-core WCAG2.1-AA **0 violations** ×3, no horizontal scroll, console clean,
dropdown still hover-throughs, footer WA link resolves. `specs/00` rewritten.

**Cursor-follow glow** (user request, spec 09) — `js/modules/glow.js`, wired in
`main.js` after `initCategoryPage`. Armed only on `(hover:hover) and
(pointer:fine)` + `prefers-reduced-motion: no-preference`.
- **Per-button** — `.btn--wa::after` rose radial (`--glow`) at `--gx/--gy`;
  `isolation:isolate` + `z-index:-1` keeps it above the button fill, below the
  label. JS lerps position (`EASE 0.14`) → lag; opacity fades via CSS.
- **Page-wide ambient** — a fixed `.cursor-glow` div created in JS (no HTML edit),
  22rem brass radial `--cursor-glow` (alpha .11), `mix-blend-mode: screen` so it
  lifts the near-black field and is invisible on paper. `AMBIENT_EASE 0.09`.
  `is-on` toggled on first move / `blur` / `visibilitychange` (not on
  mouse-leaves-window — spurious events caused flicker).
- Tokens: `--glow`, `--cursor-glow` in `tokens.css`. CSS in `components.css`
  after the button block. Reduced-motion: `display:none` guards + JS early-return.
- Verified (Playwright): both layers track with visible lag, `is-on` toggles,
  axe-core WCAG2.1-AA 0 violations, console clean. Text over the ambient glow on
  dark sections stays > ~15:1 (screen blend on paper-coloured text lightens it).

**Header nav nudge** — `.primary` got `margin-right: var(--sp-5)` so the nav links
sit a little left, off the CTA, while keeping the large gap to the wordmark.
Checked 1000 & 1280 px.

### Still awaiting client
Photography (spec 14) · logo · **motion** overall level (glow is done; hero
treatment + button press style still open) · trust metrics · PDF · email ·
Hostinger confirm · hero h1 sign-off.
