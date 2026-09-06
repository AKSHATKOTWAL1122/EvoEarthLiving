# EvoEarth Living — website

Marketing site for **EvoEarth Living**, a supplier of hospitality and institutional
amenities: Dry Amenities, Wet Amenities, Aroma Essentials.

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
index.html                     home (hero, about, range, who-we-serve, ordering, contact)
products/
  dry-amenities.html            \
  wet-amenities.html             }  category pages — static shell; JS fills the grids
  aroma-essentials.html         /
css/
  main.css                     @import entry; declares @layer order
  layers/                      reset · fonts · tokens · base · layout · components · utilities
js/
  main.js                      entry — inits each module in its own try/catch
  data/
    site.js                    contact details + wa/mail/tel href builders (single source)
    products.js                full product taxonomy + blurbs (single source)
  modules/
    nav.js                     Products dropdown, mobile panel, sticky header, active section
    contact.js                 fills [data-wa] / [data-catalogue] / [data-call] / [data-email] / [data-year]
    products.js                renders the home range cards from products.js
    category.js                renders subcategory + item grids on category pages
    reveal.js                  IntersectionObserver reveal-on-scroll (no-op under reduced motion)
assets/
  fonts/                       Fraunces + Hanken Grotesk, variable woff2, self-hosted
  img/placeholders/            item.svg, scene.svg — swapped for real photography later
  favicon/                     icon.svg, favicon-32.png, apple-touch-icon.png
  og/                          Open Graph image (1200x630)
catalogue/
  evoearth-catalogue.pdf       download target — client overwrites this file to update it
robots.txt, sitemap.xml
specs/                         one spec per component (00-13) + STATUS.md + BUILD-LOG.md
```

## How content is edited

- **Contact details** (WhatsApp, phone, email, locations, prefilled messages) — `js/data/site.js`.
  Changing a value there updates every page.
- **Products** (groups, subcategories, items, blurbs) — `js/data/products.js`.
- **About Us** text — hard-coded verbatim in `index.html` from the printed catalogue (p2).
  Do not rewrite it.
- **Catalogue PDF** — replace `catalogue/evoearth-catalogue.pdf` in place. The path is stable;
  no code change needed.
- Header and footer markup is duplicated across the 4 HTML files. Edit all four together.

## Conventions

- CSS is organised with `@layer` (reset → fonts → tokens → base → layout → components → utilities).
  Later layers win ties.
- All URLs are **root-relative** (`/css/…`, `/assets/…`, `/products/…`). Asset paths are
  lowercase — the host filesystem is case-sensitive.
- Pages are meaningful without JavaScript; JS only enhances (renders card grids, drives the
  dropdown, reveal-on-scroll).
- Two CTAs everywhere: WhatsApp enquiry (primary) and Download catalogue. No contact form.

## Deploy (Hostinger)

Upload the **contents** of this folder to `public_html` so `index.html` sits at the web root.
No build step. `specs/` and the source PDF can be left out of the upload.

## Status

Build progress is tracked in `specs/STATUS.md`; a running changelog is in `specs/BUILD-LOG.md`.
Outstanding design decisions (accent colour, motion level, real photography, logo, compressed
catalogue) are listed under "awaiting client" there.
