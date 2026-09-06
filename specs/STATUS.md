# Build Status — EvoEarth Living Website

Legend: `·` not started · `~` partial · `x` done
"Built" = code exists. "Reviewed" = checked in a browser / a11y tree. "Polished" = final visual pass.

| #  | Component               | Appears on        | Spec'd | Built | Reviewed | Polished | Notes |
|----|-------------------------|-------------------|:------:|:-----:|:--------:|:--------:|-------|
| 00 | design-system-tokens    | all               |   x    |   x   |    x     |    ~     | `reset/fonts/tokens/base/main.css`; Fraunces + Hanken self-hosted. **Palette locked S3**: near-black / warm-ink / oxblood accent / brass structure / slate muted + `--grad-*` depth gradients. axe AA 0. Motion tokens still stub |
| 01 | layout-shell-nav        | all               |   x    |   x   |    ·     |    ·     | header/footer shell on all 4 pages; current category marked `aria-current="page"` |
| 02 | hero                    | home              |   x    |   x   |    ·     |    ·     | built in `index.html` (uses `scene.svg` placeholder — no `hero-1280x1600.svg` yet) |
| 03 | about                   | home              |   x    |   x   |    ·     |    ·     | verbatim catalogue p2 text in `index.html` |
| 04 | product-range-overview  | home              |   x    |   x   |    ·     |    ·     | no-JS fallback list + `data-range-list` in `index.html`; `products.js` upgrades |
| 05 | category-page-template  | dry / wet / aroma |   x    |   x   |    x     |    ·     | 3 HTML pages built; `category.js` renders all subcats + items + cross-links; verified in Playwright (dry 7/25, wet 3/11, aroma 2/7; console clean) |
| 06 | who-we-serve            | home              |   x    |   x   |    ·     |    ·     | built in `index.html`; no trust-metric rows (placeholder comment left) |
| 07 | ordering-process        | home              |   x    |   x   |    ·     |    ·     | 4-step `<ol>` counter timeline in `index.html` |
| 08 | contact-footer          | all               |   x    |   x   |    ·     |    ·     | `#contact` on home; identical footer on all 4 pages; all values from `site.js` |
| 09 | motion                  | all               |   ~    |   x   |    x     |    ·     | STUB spec (overall level TBD). `reveal.js` + reveal rules. **S3: cursor-follow glow built** (`js/modules/glow.js`) — oxblood-CTA highlight + page-wide ambient (screen blend, lifts the near-black), both eased/lagged, hover+motion-OK only. axe AA 0, console clean |
| 10 | responsive-mobile       | all               |   x    |   x   |    x     |    ·     | Playwright pass 320/390/768/1440 on all 4 pages: no h-scroll, h1 never overflows, single h1. Fixed: card-image blow-up, list bullets, hero h1 squeeze, mobile-panel focus. Screenshots not archived |
| 11 | performance-meta-seo    | all               |   x    |   x   |    ·     |    ·     | per-page title/desc/canonical/robots/theme-color/OG; Organization JSON-LD (home) + BreadcrumbList (3 cat pages), all parse OK; `robots.txt` + `sitemap.xml` (lastmod 2026-09-06). `favicon.ico` still pending (using icon.svg + png). No Lighthouse run yet |
| 12 | accessibility           | all               |   x    |   x   |    x     |    ·     | axe-core 4.10 WCAG2.1-AA: **0 violations** on all 4 pages. Keyboard walk done — dropdown (Arrow/Home/End/Esc/Tab-past-last) + mobile panel (focus-in on open, Esc/link/toggle exit, focus back to `.nav-toggle`). Mobile panel now sets `inert` on `#main`/`.site-footer`/`.wordmark`/`.header-cta`. a11y tree: banner/main/contentinfo + 3 labelled navs, single h1, no heading skips. Contrast pass (below). Fixed: preload-scanner 404s on `@import` (main.css paths → root-relative). Still: Lighthouse run |
| 13 | content-copy            | all               |   x    |   x   |    x     |    ·     | all home + 3 category HTML copy placed and matches spec 13; `products.js` fully populated (7/3/2 subcats, every blurb one factual sentence); customisation note wired on all 3 cat pages. Scanned: no third-party brand names; no stacked adjectives outside the verbatim About text. **Open:** hero h1 "The bathroom shelf, considered." awaits client sign-off (was `‹confirm›`) |
| 14 | imagery                 | all               |   x    |   ·   |    ·     |    ·     | art-direction brief + generation prompts + file map in `specs/14-imagery.md`. All images still placeholder SVG. Launch needs 7 shots (home hero, 3 category heroes, 3 range cards); 43 item shots phased. Awaiting client photography |
| 15 | capabilities-strip      | home              |   x    |   x   |    x     |    ·     | `#capabilities` `<dl>` between about & range; 4 qualitative claims (no metrics); dim-paper divider strip, kraft-square motif. axe 0 violations, no h-scroll, 4/2/1 cols. From Kimirica review item 2 |

## Files that exist now
```
CLAUDE.md
README.md           run / edit / deploy notes
index.html          home — shell + hero/about/range/who-we-serve/process/contact/footer
products/            dry-amenities.html, wet-amenities.html, aroma-essentials.html
specs/            00–15 + STATUS.md + BUILD-LOG.md + GRADE.md + REVIEW-kimirica.md
References/        Websites.txt (client visual reference: kimirica.shop)
css/main.css
css/layers/       reset, fonts, tokens, base, layout, components, utilities .css
js/main.js
js/data/          site.js, products.js
js/modules/       contact.js, nav.js, reveal.js, products.js, category.js
assets/fonts/     fraunces-var[-italic|-ext].woff2, hanken-var[-ext].woff2
assets/img/placeholders/  item.svg, scene.svg
assets/favicon/   icon.svg, favicon-32.png, apple-touch-icon.png
assets/og/        evoearth-og-1200x630.png (+ .svg source)
catalogue/        evoearth-catalogue.pdf  (651-byte placeholder)
```

## Not yet created
```
favicon.ico   (icon.svg + favicon-32.png + apple-touch-icon.png in place)
```

## Next steps (build order)
1. ~~`index.html` — shell + hero/about/range/who-we-serve/process/contact~~ — **done 2026-09-06** (not yet browser-verified).
2. ~~`products/*.html` ×3 — shell + static breadcrumb/h1/intro/CTAs; `category.js` fills the rest~~ — **done 2026-09-06** (Playwright-verified; needs full 390/768/1440 screenshot pass + a11y audit).
3. ~~`<head>` meta/OG/JSON-LD on all 4 pages, `robots.txt`, `sitemap.xml`~~ — **done 2026-09-06**. Still: `README.md`, `favicon.ico`.
4. ~~Local server + Playwright pass at 320/390/768/1440; a11y tree; contrast~~ — **done 2026-09-06**. ~~Spec 12: axe run + keyboard walk~~ — **done 2026-09-06** (axe 0 violations ×4 pages, dropdown + mobile-panel keyboard walk, panel `inert`). Lighthouse still not run.
5. ~~`README.md`, then grade against parent $10K checklist~~ — **done 2026-09-06** (`README.md`, `specs/GRADE.md`). Also fixed `Assets/` → `assets/` casing (deploy-blocking on Linux).
6. Remaining before launch: client assets (photography per `specs/14-imagery.md`, logo, accent/motion refs, compressed PDF) → then polish pass + Lighthouse + `favicon.ico`.

## Session 3 (2026-09-06) — palette lock + gradients
- **Palette changed & locked** (client supplied via ui-ux pass): near-black
  `#0A0908` field · warm-ink `#F5F2EC` paper · **oxblood `#6E1F23`** single accent
  (primary CTA + `::selection` only) · **brass `#C9A36B`** structural · slate
  `#54585C` muted text. `--kraft` var kept (now = brass). `--accent`/`--accent-*`
  no longer stubs. `theme-color` meta → `#0A0908` (all 4 pages). `::selection` →
  oxblood/paper. Buttons: `.btn--wa` oxblood, `.btn--ghost` brass outline.
- **Gradients added** — flat tone → same-hue depth gradients on every surface
  (`--grad-*` in `tokens.css`; applied in `base/layout/components.css`). Dark
  elevation ramp `--ink`/`-2`/`-3`. `.steps` numeral uses a radial knockout.
  ui-ux-pro-max consulted (no palette match; used its Modern Dark style cues).
- Verified (Playwright, localhost:8000): home + dry/wet category, 390 + 1280.
  axe-core WCAG2.1-AA **0 violations** ×3 pages, no h-scroll, console clean.
- Spec 00 rewritten (colour + gradient + button sections). Local dev server left
  running on **:8000**.

## Session 2 (2026-09-06) — nav fix + Kimirica review
- **Products dropdown bug fixed** (`css/layers/components.css`, `js/modules/nav.js`):
  0.65rem gap between button and submenu fired `mouseleave` and closed the menu
  before the pointer reached the links. Added an invisible `.submenu::before`
  bridge + a 180ms close-grace timer. Submenu link font reduced (desktop
  `0.85rem`, mobile `--step-0`), panel narrowed to `12.5rem`. Playwright-verified:
  hover-through works, click navigates.
- **Client reference reviewed:** `References/Websites.txt` → kimirica.shop. Wrote
  `specs/14-imagery.md` (art direction + generation prompts) and
  `specs/REVIEW-kimirica.md` (full review, per-suggestion status: now / blocked /
  done / skip). Short summary in `EvoEarth/CLAUDE.md`.
  Note: "build out category pages" was already done Session 1 (spec 05 /
  `category.js`) — the PDF-pointer paragraph is only the no-JS fallback.
- **Doable-now backlog from the review — done:**
  - spec 15 **capabilities strip** built (`#capabilities`, home) — 4 qualitative
    claims, dim-paper divider, kraft-square motif. axe 0, Playwright-checked
    390/1280.
  - **footer "keep in touch" line** — `index.html` footer brand column now has
    "Distributors and trading houses — ask about wholesale terms." (`data-wa` with
    a distributor-specific prefilled message). `.site-footer__descr a` underlined.
  - **home range-cards** — already wired Session 1 (`js/modules/products.js` runs
    from `main.js`, renders `.range-card` ×3 from `PRODUCT_GROUPS`). Verified live.
    No work needed; full visual payoff still waits on `card.jpg` shots (spec 14).
  - **heading-hierarchy audit** — reviewed home + category headings: display
    (Fraunces) for section h2 + product names, body-bold (Hanken) for process /
    item-detail h3. Consistent, no all-caps, no skips. No change made.

## Contrast spot-check (2026-09-06, computed WCAG 2.1)
- Primary text on paper / on ink: 13.35 (AAA)
- Muted `#6b6154` on `--paper`: 5.14 · on `--paper-2`: 4.56 (both AA)
- Muted paper `rgba(...,0.72)` on `--ink`: 7.56 · on `--ink-2`: 6.91
- `--kraft` on `--ink`: 7.03 · WhatsApp button (ink on kraft): 7.03
All ≥ 4.5:1. `--accent` token is unused (components use `--kraft`).

## Open questions / awaiting client
- Trust metrics (MOQ / lead time / certs): omitted for now — confirmed.
- Third-party brand names: generic only — confirmed.
- Accent colour + button styling: **locked S3** (oxblood CTA, brass structure, gradients). Motion level: still awaiting a reference.
- Catalogue PDF: 651-byte placeholder shipped; client to send compressed <5 MB `evoearth-catalogue.pdf`.
- Logo (SVG + small monochrome mark), OG image, favicons — placeholders in place.
- Real photography — brief + prompts ready in `specs/14-imagery.md`; launch set is
  7 shots. Client to shoot/generate and drop into `assets/img/photos/**`.
- Branded `hello@evoearth.living` mailbox — TBD; using Gmail.
- Confirm Hostinger serves HTTPS on `evoearth.living` and upload path is `public_html`.
- Hero h1 "The bathroom shelf, considered." — placed in `index.html`, still needs client sign-off (only remaining `‹confirm›` line).
