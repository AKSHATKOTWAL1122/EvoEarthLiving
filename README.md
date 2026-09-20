# EvoEarth Living — website

Marketing site for **EvoEarth Living**, a supplier of hospitality and institutional
amenities: Dry Amenities, Wet Amenities, Aroma Essentials, Gifting.

Static HTML/CSS/JS. No build step, no framework, no `package.json`.

## Run locally

The site uses root-relative URLs and ES modules, so it needs a static server —
opening `index.html` from the filesystem will not work.

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure

```
index.html                     home (hero, video showcase, about, range, category showcase,
                                who-we-serve, ordering, contact)
products/
  dry-amenities.html            \
  wet-amenities.html             }  category pages — static shell; JS fills the grids
  aroma-essentials.html         /
  gifting.html                  occasion-based gifting page (bundle contents pending client)
css/
  main.css                     @import entry; declares @layer order
  layers/                      reset · fonts · tokens · base · layout · components · utilities
js/
  main.js                      entry — inits each module in its own try/catch
  data/
    site.js                    contact details + wa/mail/tel href builders + lead-sheet webhook
                                (single source)
    products.js                full product taxonomy + blurbs (single source)
  modules/
    nav.js                     category photo-menus, mobile panel, sticky header, active section
    contact.js                 fills [data-wa] / [data-catalogue] / [data-call] / [data-email] / [data-year]
    products.js                renders the home range cards from products.js
    category.js                renders subcategory + item grids on category pages
    search.js                  mobile header search — client-side substring match over products.js
    video-hero.js              full-width autoplaying video slides on home
    catalogue-gate.js          lead-capture modal gating the catalogue PDF download (Netlify Forms)
    glow.js                    cursor-follow highlight on CTAs + ambient page glow
    reveal.js                  IntersectionObserver reveal-on-scroll (no-op under reduced motion)
assets/
  fonts/                       Fraunces + Hanken Grotesk, variable woff2, self-hosted
  img/placeholders/            item.svg, scene.svg — swapped for real photography later
  favicon/                     icon.svg, favicon-32.png, apple-touch-icon.png
  og/                          Open Graph image (1200x630)
catalogue/
  evoearth-catalogue.pdf       download target — client overwrites this file to update it
robots.txt, sitemap.xml
specs/                         one spec per component (00-21) + STATUS.md + BUILD-LOG.md
```

## How content is edited

- **Contact details** (WhatsApp, phone, email, locations, prefilled messages) — `js/data/site.js`.
  Changing a value there updates every page.
- **Products** (groups, subcategories, items, blurbs) — `js/data/products.js`.
- **About Us** text — hard-coded verbatim in `index.html` from the printed catalogue (p2).
  Do not rewrite it.
- **Catalogue PDF** — replace `catalogue/evoearth-catalogue.pdf` in place. The path is stable;
  no code change needed.
- Header and footer markup is duplicated across the 5 HTML files. Edit all five together.

## Catalogue lead capture & data (specs 20/21)

Downloading the catalogue is gated behind a short form (name / organisation / email /
phone) — the one deliberate exception to "no contact form" on this site, scoped only
to catalogue-download gating.

- **Netlify Forms is the submission of record.** The form (`#catalogue-gate-form` in
  each page) is plain static HTML with `data-netlify="true"`, so Netlify detects and
  stores it with no server code on our side. Submissions are visible in the Netlify
  dashboard → Forms.
- **Spam protection** is a hidden honeypot field (`bot-field`, hidden via
  `.visually-hidden` clip-CSS rather than `display:none`, which is what lets it catch
  simple bots without also hiding it from bots that check computed visibility) plus
  client-side format validation (well-formed email/phone shape, not verified
  deliverability).
- **Google Sheet sync is a best-effort duplicate**, not a replacement. After a
  successful Netlify submission, `catalogue-gate.js` fires a `no-cors`,
  fire-and-forget `POST` of the same fields to `SITE.leadSheetWebhook` in
  `js/data/site.js` — a Google Apps Script Web App the **client deploys and owns**
  from their own Google account (setup steps in `specs/21-google-sheet-sync.md`).
  Leaving that value empty skips the sync entirely; nothing else changes.
  - This URL is not a secret — it's shipped to every visitor's browser as
    client-side JS regardless of whether it's also in this repo. Apps Script's
    "Anyone can execute" access only lets a request run that one script's `doPost`
    (append a row in a fixed shape); it does not grant read access to the sheet,
    the script, or the client's Google account. See spec 21's "Limitations" section
    for what this does and doesn't protect against (e.g. it does not stop someone
    posting junk rows directly to the endpoint, bypassing the on-site form/honeypot
    — Netlify Forms stays the trustworthy record either way).
- A visitor who has already submitted gets the PDF immediately on future clicks
  (`localStorage` flag), no modal shown again.

## Conventions

- CSS is organised with `@layer` (reset → fonts → tokens → base → layout → components → utilities).
  Later layers win ties.
- All URLs are **root-relative** (`/css/…`, `/assets/…`, `/products/…`). Asset paths are
  lowercase — the host filesystem is case-sensitive.
- Pages are meaningful without JavaScript; JS only enhances (renders card grids, drives the
  dropdown, reveal-on-scroll).
- Two CTAs everywhere: WhatsApp enquiry (primary) and Download catalogue. No general
  contact form — the catalogue download's lead-capture step (see above) is a narrow,
  deliberate exception, not a reopening of that rule.

## Deploy (Netlify)

Netlify is the production host for `evoearth.living`. Config is in `netlify.toml`
(`publish = "."`, no build command) — it serves the repo root as-is and sets the
cache headers for `/assets`, `/css`, `/js`.

- **Deploy:** push to `main` (or connect the repo in the Netlify dashboard); every
  push publishes. No build step to run locally.
- **Custom domain + HTTPS:** configured in the Netlify dashboard, not in the repo.
- Bump the `?v=N` query on the CSS/JS URLs (all 5 HTML files + `css/main.css` +
  `js/main.js`) whenever CSS or JS changes, so browsers refetch instead of serving
  a stale `@import` from cache.
- `specs/`, `References/` and the source PDF are published too (harmless); exclude
  them with a Netlify ignore rule if that matters later.

## Status

Build progress is tracked in `specs/STATUS.md`; a running changelog is in `specs/BUILD-LOG.md`.
Outstanding design decisions (accent colour, motion level, real photography, logo, compressed
catalogue) are listed under "awaiting client" there.
