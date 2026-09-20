# Build Status — EvoEarth Living Website

Legend: `·` not started · `~` partial · `x` done
"Built" = code exists. "Reviewed" = checked in a browser / a11y tree. "Polished" = final visual pass.

| #  | Component               | Appears on        | Spec'd | Built | Reviewed | Polished | Notes |
|----|-------------------------|-------------------|:------:|:-----:|:--------:|:--------:|-------|
| 00 | design-system-tokens    | all               |   x    |   x   |    x     |    ~     | `reset/fonts/tokens/base/main.css`; Fraunces + Hanken self-hosted. **Palette locked S3**: near-black / warm-ink / oxblood accent / brass structure / slate muted + `--grad-*` depth gradients. axe AA 0. Motion tokens still stub |
| 01 | layout-shell-nav        | all               |   x    |   x   |    ~     |    ·     | **REBUILT 2026-09-20** on all 5 pages (home, dry, wet, aroma, gifting). 5 top-level items, Dry/Wet/Aroma/Gifting as pure toggle buttons opening photo-box submenus (image+label boxes, single-open, hover+click desktop / tap accordion mobile), header phone/email strip (`data-wa`→WhatsApp, `mailto`), 3-zone mobile header (hamburger / centered wordmark / search icon), mobile order EvoEarth Living→Dry→Wet→Aroma→Gifting→About Us via one shared `<ul>` + breakpoint-hidden `.nav-home`/`.nav-contact`/`.nav-about` (no duplicated markup). Aroma submenu splits "Aroma Care" into 3 boxes (Reed/Electric/Room-freshener) via new per-item `id` in `category.js`. Search-toggle wires up to spec 18's matching (`js/modules/search.js`, built alongside this in the same session) — Playwright-verified: typing "soap" returns the 4 wet-range soap items. Playwright-verified 390/1440: no console errors, dropdown + accordion + Escape/scroll-lock confirmed. **Open:** screenshots not archived to a file, no axe re-run yet. Cache-buster at `?v=18` |
| 02 | hero                    | home              |   x    |   x   |    ·     |    ·     | built in `index.html`; uses `/assets/img/photos/home/hero.png` (interim art, awaiting final client photography per spec 14) |
| 03 | about                   | home              |   x    |   x   |    ·     |    ·     | verbatim catalogue p2 text in `index.html` |
| 04 | product-range-overview  | home              |   x    |   x   |    ·     |    ·     | no-JS fallback list + `data-range-list` in `index.html`; `products.js` upgrades |
| 05 | category-page-template  | dry / wet / aroma |   x    |   x   |    x     |    ·     | 3 HTML pages built; `category.js` renders all subcats + items + cross-links; verified in Playwright (dry 7/25, wet 3/11, aroma 2/7; console clean) |
| 06 | who-we-serve            | home              |   x    |   x   |    ·     |    ·     | built in `index.html`; no trust-metric rows (placeholder comment left) |
| 07 | ordering-process        | home              |   x    |   x   |    ·     |    ·     | 4-step `<ol>` counter timeline in `index.html` |
| 08 | contact-footer          | all               |   x    |   x   |    ·     |    ·     | `#contact` on home; near-identical footer on all 4 pages (home adds the wholesale line); values from `site.js`, with static phone/email/locations/year fallbacks in the HTML for no-JS |
| 09 | motion                  | all               |   ~    |   x   |    x     |    ·     | STUB spec (overall level TBD). `reveal.js` + reveal rules. **S3: cursor-follow glow built** (`js/modules/glow.js`) — oxblood-CTA highlight + page-wide ambient (screen blend, lifts the near-black), both eased/lagged, hover+motion-OK only. axe AA 0, console clean |
| 10 | responsive-mobile       | all               |   x    |   x   |    x     |    ·     | Playwright pass 320/390/768/1440 on all 4 pages: no h-scroll, h1 never overflows, single h1. Fixed: card-image blow-up, list bullets, hero h1 squeeze, mobile-panel focus. Screenshots not archived |
| 11 | performance-meta-seo    | all               |   x    |   x   |    ·     |    ·     | per-page title/desc/canonical/robots/theme-color/OG; Organization JSON-LD (home) + BreadcrumbList (3 cat pages), all parse OK; `robots.txt` + `sitemap.xml` (lastmod 2026-09-06). `favicon.ico` still pending (using icon.svg + png). No Lighthouse run yet |
| 12 | accessibility           | all               |   x    |   x   |    x     |    ·     | axe-core 4.10 WCAG2.1-AA: **0 violations** on all 4 pages. Keyboard walk done — dropdown (Arrow/Home/End/Esc/Tab-past-last) + mobile panel (focus-in on open, Esc/link/toggle exit, focus back to `.nav-toggle`). Mobile panel now sets `inert` on `#main`/`.site-footer`/`.wordmark`/`.header-cta`. a11y tree: banner/main/contentinfo + 3 labelled navs, single h1, no heading skips. Contrast pass (below). Fixed: preload-scanner 404s on `@import` (main.css paths → root-relative). Still: Lighthouse run |
| 13 | content-copy            | all               |   x    |   x   |    x     |    ·     | all home + 3 category HTML copy placed and matches spec 13; `products.js` fully populated (7/3/2 subcats, every blurb one factual sentence); customisation note wired on all 3 cat pages. Scanned: no third-party brand names; no stacked adjectives outside the verbatim About text. **Open:** hero h1 "The bathroom shelf, considered." awaits client sign-off (was `‹confirm›`) |
| 14 | imagery                 | all               |   x    |   ·   |    ·     |    ·     | art-direction brief + generation prompts + file map in `specs/14-imagery.md`. All images still placeholder SVG. Launch needs 7 shots (home hero, 3 category heroes, 3 range cards); 43 item shots phased. Awaiting client photography |
| 15 | capabilities-strip      | home              |   x    |   x   |    x     |    ·     | `#capabilities` `<dl>` between about & range; 4 qualitative claims (no metrics); dim-paper divider strip, kraft-square motif. axe 0 violations, no h-scroll, 4/2/1 cols. From Kimirica review item 2 |
| 16 | gifting                 | new nav item, `/products/gifting.html` | x | · | · | · | New category, not in source PDF. Structure spec'd; bundle contents (which `products.js` items go in which box) **blocked on client** |
| 17 | video-hero              | home (+ mobile, above nav panel) | x | · | · | · | 3 clips, click → category. Autoplay-muted-with-unmute decided as the technical default (audio-on-load isn't browser-possible). **Blocked on client:** actual video files |
| 18 | search                  | mobile header only | x | x | x | · | Built (`js/modules/search.js`) — client-side substring match over `products.js` items, debounced input, arrow-key results nav, Escape clears. Playwright-verified @390: "diffuser" → 2 correct hits w/ working links, no-match fallback line, Esc close, console clean. Not yet: dedicated axe pass |
| 19 | category-showcase       | home, below video hero | x | · | · | · | 6-tile "shop by category" grid (Luxury Gift Boxes / Scented Candles / Reed Diffusers / Soaps / Face & Body Care / Room Fresheners). **Brief was cut off after this section — placement + whatever follows is pending client input** |

## Files that exist now
```
CLAUDE.md
README.md           run / edit / deploy notes
index.html          home — shell + hero/about/range/who-we-serve/process/contact/footer
products/            dry-amenities.html, wet-amenities.html, aroma-essentials.html, gifting.html (stub — spec 16 bundle contents still blocked on client)
specs/            00–15 + STATUS.md + BUILD-LOG.md + GRADE.md + REVIEW-kimirica.md
References/        Websites.txt (client visual reference: kimirica.shop)
css/main.css
css/layers/       reset, fonts, tokens, base, layout, components, utilities .css
js/main.js
js/data/          site.js, products.js
js/modules/       contact.js, nav.js, reveal.js, products.js, category.js, glow.js
assets/fonts/     fraunces-var[-italic|-ext].woff2, hanken-var[-ext].woff2
assets/img/placeholders/  item.svg
assets/img/photos/  {home,dry,wet,aroma}/ — interim hero.png / card.png (spec 14 pending)
assets/favicon/   icon.svg, favicon-32.png, apple-touch-icon.png
assets/og/        evoearth-og-1200x630.png (+ .svg source)
catalogue/        evoearth-catalogue.pdf  (651-byte placeholder)
```

## Not yet created
```
favicon.ico   (icon.svg + favicon-32.png + apple-touch-icon.png in place)
```

## Session 5 (2026-09-20) — nav pivot brief received, specs updated, no code yet
Client sent a detailed nav/homepage brief (desktop nav restructure, photo-menu
submenus, header phone/email strip, Gifting category, 3-video hero, mobile
hamburger+search, home category-showcase section). Per instruction, **specs and
CLAUDE.md updated only — no implementation yet.** Decisions made while converting
the brief into specs:
- **Nav replaces the old "Products ▾" dropdown directly** (client confirmed:
  treat brief as final, not a proposal to review first).
- **Gifting** (spec 16): new category, not in the source PDF. Structure spec'd;
  bundle contents (which `products.js` items go into which box) are explicitly
  **blocked on the client** — do not invent bundle contents.
- **Video hero** (spec 17): placeholder container/behaviour now, real video files
  later — same pattern as photography. Flagged the audio/autoplay conflict
  (browsers block autoplay-with-sound) and defaulted to autoplay-muted +
  click-to-unmute unless client says otherwise.
- **Search** (spec 18): client-side substring match against `products.js` — no
  backend/build step exists on this stack, so that's the only method that fits.
  No open blocker, buildable now.
- **Category showcase** (spec 19): 6-tile "shop by category" grid spec'd from the
  unambiguous part of the brief. **The brief was cut off mid-sentence** ("Below
  that some…") — did not guess at what follows; flagged as pending, not filled in.
- Mobile nav order intentionally ends in "About Us" where desktop ends in
  "Contact Us" (per brief, not a copy error) — noted explicitly in spec 01 so it
  isn't "fixed" by mistake later.
- `specs/REVIEW-kimirica.md` item 9 (mega-menu imagery, previously "SKIP for
  now") is now superseded — client asked for it directly.

### Build order once code work resumes
1. ~~Spec 01 rebuild (nav shell — blocks everything else visually).~~ — **done
   2026-09-20**, see row 01 above. `products/gifting.html` created as a
   structural stub (header/footer + 4 anchor sections, no bundle content) so
   the new Gifting submenu links resolve; spec 16 bundle contents are still
   blocked on the client.
2. ~~Spec 18 (search)~~ — **done 2026-09-20**, see row 18 above.
3. Spec 17 (video hero) — build the container/behaviour now with placeholder
   posters; swap real clips in later.
4. Spec 16 (Gifting) — page/anchor structure now exists (`products/gifting.html`);
   **hold bundle content** until client supplies which products go in which box.
5. Spec 19 (category showcase) — build the 6 tiles now; revisit once the rest of
   the homepage brief (cut off) is supplied.
6. ~~Update `products/dry-amenities.html` / `wet-…` / `aroma-…` anchors so the
   new submenu/search links (`#dental-kit`, `#soaps`, etc.) actually resolve~~
   — **done 2026-09-20**: subcategory anchors already matched; added per-item
   `id`s in `category.js` so Aroma's 3 split boxes (Reed/Electric/Room-freshener)
   deep-link into the existing "Aroma Care" subcategory.

## Next steps (build order)
1. ~~`index.html` — shell + hero/about/range/who-we-serve/process/contact~~ — **done 2026-09-06** (not yet browser-verified).
2. ~~`products/*.html` ×3 — shell + static breadcrumb/h1/intro/CTAs; `category.js` fills the rest~~ — **done 2026-09-06** (Playwright-verified; needs full 390/768/1440 screenshot pass + a11y audit).
3. ~~`<head>` meta/OG/JSON-LD on all 4 pages, `robots.txt`, `sitemap.xml`~~ — **done 2026-09-06**. Still: `README.md`, `favicon.ico`.
4. ~~Local server + Playwright pass at 320/390/768/1440; a11y tree; contrast~~ — **done 2026-09-06**. ~~Spec 12: axe run + keyboard walk~~ — **done 2026-09-06** (axe 0 violations ×4 pages, dropdown + mobile-panel keyboard walk, panel `inert`). Lighthouse still not run.
5. ~~`README.md`, then grade against parent $10K checklist~~ — **done 2026-09-06** (`README.md`, `specs/GRADE.md`). Also fixed `Assets/` → `assets/` casing (deploy-blocking on Linux).
6. Remaining before launch: client assets (photography per `specs/14-imagery.md`, logo, accent/motion refs, compressed PDF) → then polish pass + Lighthouse + `favicon.ico`.

## Session 4 (2026-09-06) — codebase cleanup + deploy decision
- **CSS cache-buster bug fixed** — `css/main.css` `@import`s were pinned at `?v=5`
  while the HTML `<link>`s were `?v=7`, so every layer file downloaded twice and
  the preloads were wasted. All asset URLs now bumped in lockstep to **`?v=8`**
  (4 HTML files + `main.css` + `main.js`).
- **Dead code removed** — `SCENE` const + `assets/img/placeholders/scene.svg`
  (unreferenced), `groupBySlug()` export (unused), `.visually-hidden` +
  `.container-narrow` CSS (unused).
- **Orphan files removed** — 7 `.DS_Store`, `.playwright-mcp/`.
- **Deploy target decided: Netlify** (`netlify.toml`). Dropped the GitHub Pages
  path — deleted `.github/workflows/deploy.yml`, `.nojekyll`, `CNAME` (which
  pointed at `preview.evoearth.living`, contradicting every canonical URL).
  README + CLAUDE.md deploy sections rewritten.
- **No-JS contact fallback** — `[data-call]`/`[data-email]`/`[data-locations]`/
  `[data-year]` now ship with static text in the HTML; `contact.js` always
  re-syncs from `site.js` (still the single source of truth).
- **Shared header/footer guard** — HTML comment above each marking it duplicated
  across the 4 pages ("edit all 4 together").

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
