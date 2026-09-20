# Project: EvoEarth Living — Amenities Website

> Inherits the $10K design checklist and workflow from the parent `../CLAUDE.md`.
> This file records project-specific decisions only.

## What this site is
Marketing website for **EvoEarth Living**, a supplier of premium hospitality /
personal-care / home-care amenities: **Dry Amenities**, **Wet Amenities**,
**Aroma Essentials**. Content source: `EvoEarth Living Amenities Catalogue.pdf`
(in this folder).

**Audience:** institutional buyers of many kinds — hotels, resorts, spas, serviced
apartments, hospitals, corporate offices, and distributors. Not framed as "B2B only"
or "trade only".

**Tone:** warm, editorial, restrained. Sounds like someone in hospitality supply
wrote it. No adjective stacking ("premium / luxurious / exquisite / transcendent").

## Structure
Multi-page static site, no build step:
- `index.html` — home (hero, video showcase, category showcase, about, product-range
  overview, who we serve, ordering process, contact)
- `products/dry-amenities.html`, `products/wet-amenities.html`,
  `products/aroma-essentials.html`, `products/gifting.html` (new — see spec 16)
- **Nav (rewritten 2026-09-20, see spec 01):** 5 top-level items — Dry Amenities /
  Wet Amenities / Aroma Essentials / Gifting (each a photo-box submenu of
  subcategories) / Contact Us (anchor, not a page). Supersedes the old single
  "Products ▾" dropdown.
- Home product-range cards + the new home category-showcase section (spec 19) both
  link into the same category pages/anchors.

## Nav & homepage brief (2026-09-20) — in progress, specs written, code pending
Client sent a full nav/homepage rework brief. Converted into specs
`01` (rewritten), `16`–`19` (new); full breakdown + build order in
`specs/STATUS.md` Session 5. Summary of what's locked vs. still open:
- **Locked:** nav replaces old dropdown directly (not a v2 proposal); header gets a
  persistent phone/email strip (click phone → WhatsApp) alongside the existing CTA
  buttons, not instead of them; mobile header is hamburger-left /
  wordmark-center / search-right (Kimirica pattern); mobile nav item order is
  EvoEarth Living → Dry → Wet → Aroma → Gifting → **About Us** (intentionally not
  "Contact Us" — matches desktop's last item being different by design, not a typo).
- **Blocked on client:** Gifting bundle contents (which `products.js` items go in
  which box — spec 16), the 3 actual video files for the video hero (spec 17), and
  whatever comes after the category-showcase section — the brief was cut off
  mid-sentence ("Below that some…"); nothing was guessed to fill that gap.
- **Decided by us (flagged for client sign-off, not blocking):** search is
  client-side substring match over `products.js` (spec 18 — no backend exists on
  this stack, so no other method fits); video hero autoplay defaults to
  muted-with-unmute since audio-on-autoplay is not something browsers allow (spec
  17).

## Stack rules
- Static HTML/CSS/JS. No framework, no bundler, no `package.json`.
- CSS organised with `@layer` (reset / tokens / base / layout / components / utilities).
- Vanilla ES modules. Local dev needs a static server (`python3 -m http.server`).
- **Root-relative URLs** (`/css/…`, `/products/…`, `/catalogue/…`).
- Shared header/footer markup is duplicated across the 4 pages; all contact details come
  from `js/data/site.js`, all product data from `js/data/products.js` (single-sourced).
- Pages must be meaningful without JS; JS renders the card grids and drives the dropdown.

## Content rules
- **About Us** section: catalogue p2 text used **verbatim**. Do not rewrite.
- Product names: **generic only** — no Colgate / Bajaj / Old Tree or other third-party marks.
- Per-item blurbs: trimmed from the catalogue, one sentence, no adjective stacking.
- Trust metrics (MOQ, lead time, certifications): **omitted** until real values are supplied.
  No "on enquiry" placeholder rows.

## Design
- **Palette (locked 2026-09-06):** near-black `#0A0908` field · warm-ink `#F5F2EC`
  paper · **oxblood `#6E1F23`** — the one bold accent, primary CTA + `::selection`
  only · **brass `#C9A36B`** — structural (frames, rules, hairlines, kicker, step
  numbers) · slate `#54585C` muted text. Full token list + contrast: `specs/00`.
  The CSS var is still named `--kraft` but it is brass.
- **Button treatment (locked):** primary `.btn--wa` = oxblood **gradient** fill /
  warm-ink text; secondary `.btn--ghost` = brass hairline outline. Don't spread
  oxblood elsewhere.
- **Gradients (added 2026-09-06):** every surface carries a subtle same-hue
  gradient for depth (`--grad-*` tokens, `specs/00`). Dark elevation ramp
  `--ink`/`--ink-2`/`--ink-3`. Rule: depth cue not decoration — small lightness
  delta, no hue shift, one gradient per viewport.
- Fonts: Fraunces (display) + Hanken Grotesk (body), self-hosted. Chosen via
  `frontend-design` skill.
- Motion: `specs/09-motion.md` stays a stub for the overall level. Live:
  hover/focus transitions, the `data-reveal` fade, and a **cursor-follow glow**
  (`js/modules/glow.js`) — lagged highlight on the oxblood CTAs + a page-wide
  ambient pool that lightens the near-black field (screen blend). Hover +
  motion-OK devices only.

## Loading / first paint
- Every page `<head>` carries **inline critical CSS** (`html`/`body`/`.hero`/
  `.cat-hero`/`.section--ink` → `#0a0908`) plus `<meta name="color-scheme"
  content="dark">`. Reason: `main.css` pulls the `@layer` files via chained
  `@import`, so the pre-cascade paint would otherwise flash white before the dark
  field lands. Keep this block on any new page.
- The seven layer files are also `<link rel="preload" as="style">`-ed so they
  fetch in parallel instead of being discovered serially through `main.css`.
- Static asset URLs carry a `?v=N` cache-buster; bump N on every deploy that
  changes CSS/JS.

## CTAs / contact
- Two CTAs everywhere: **WhatsApp enquiry** (primary) and **Download catalogue**.
- No contact form, no "book a call", no scheduling link. Nav's new "Contact Us" item
  (spec 01) is an anchor to the existing `#contact` section — not a new form/page.
- Header now also carries a persistent **phone + email strip** (desktop only; spec
  01) — additive to the two CTAs above, not a replacement. Clicking the header phone
  number opens WhatsApp (same mechanism as the CTA button), not a tel: dialer.
- WhatsApp: +91 9211379536 (`wa.me/919211379536`). Call: +91 9797097342. Email:
  evoearthliving@gmail.com (mailto only).
- Catalogue download → stable path `/catalogue/evoearth-catalogue.pdf` (user overwrites the
  file to update; no code change). A compressed (<5 MB) PDF replaces the stub later.
- Warehouses: Srinagar & Jammu, Jammu and Kashmir.

## Visual reference
- Client reference site: **kimirica.shop** (`References/Websites.txt`). Take the
  still-life photography approach and per-section atmospheric imagery; ignore its
  retail commerce (pricing, cart, badges, discount banners) and all-caps labels.
- Imagery art direction + generation prompts + file map: `specs/14-imagery.md`.

## Improvement backlog (Kimirica review, 2026-09-06)
Full review + per-item status in **`specs/REVIEW-kimirica.md`**. State:
- **Done:** capabilities strip (spec 15, `#capabilities`), footer wholesale line,
  home range-cards (already wired Session 1), heading audit (no change needed),
  category build-out + editorial descriptors (already done Session 1).
- **Blocked on client assets:** all photography (spec 14), range-card visual
  payoff, fuller-bleed hero, accent/button/motion polish.
- **Deferred post-launch:** horizontal carousel for the Dry grid.
- **Superseded 2026-09-20:** dropdown mega-menu imagery — no longer deferred, the
  client asked for it directly (specs 01, 16).
- **Not taking:** pricing/cart/ratings, discount+urgency banners, all-caps
  labels, auto-carousels, Kimirica's light/cream palette (our dark field is the
  deliberate POV).

## Spec-driven workflow
- One spec per component in `specs/` (`00`–`19`), tracked in `specs/STATUS.md`
  (spec'd / built / reviewed / polished).
- Build in the order given by `specs/STATUS.md` / the approved plan.
- After the first full build, self-grade against the parent $10K checklist.

## Deployment
- Netlify, domain `evoearth.living`. Config in `netlify.toml` (`publish = "."`, no
  build command). Every push to `main` publishes; no build step to run. Custom
  domain + HTTPS are set in the Netlify dashboard.
- Single host — the earlier GitHub Pages (`deploy.yml`, `.nojekyll`, `CNAME`) and
  Hostinger paths were dropped 2026-09-06.

## Assets pending from client (placeholders ship first)
Compressed catalogue PDF · vector logo (SVG) + small monochrome lockup/favicon ·
real photography (brief + prompts in `specs/14-imagery.md`; drop into
`assets/img/photos/{home,dry,wet,aroma}/`) · motion references (level + feel) ·
trust-metric values · branded email decision · **Gifting bundle contents** (spec
16) · **3 video files for the video hero** (spec 17) · **rest of the homepage
brief** (spec 19 — brief was cut off after the category-showcase section).
