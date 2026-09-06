# Spec 04: Product Range Overview (home)

**Status:** spec'd
**Appears on:** home
**Section(s) / selector:** `#range`, `.range-list` (rendered by `js/modules/products.js`)
**Depends on:** 00, 05, 13, `js/data/products.js`
**Files touched:** `index.html`, `js/modules/products.js`, `css/layers/components.css`

## Purpose
Show the three ranges and route the visitor into the category flow. Mirrors the nav
"Products" dropdown.

## Content
- `h2`: "Three ranges"
- Intro (1 sentence): "Everything a room needs, grouped the way housekeeping thinks about it."
- Three entries from `PRODUCT_GROUPS` — name, `intro`, `heroImage` placeholder, link to
  `/products/<slug>.html`, and a short count line ("7 kit types", "3 groups", "2 groups")
  generated from the data.
- Real card images: `assets/img/photos/{dry,wet,aroma}/card.jpg` (800×1000) — set via
  `heroImage` in `js/data/products.js`. Art direction + prompts in **spec 14**.

## Structure / markup
Static fallback in HTML (3 `<li>` with heading + link, no images) so the section works
without JS. `products.js` upgrades each `<li>` to the full card with image + intro + count.
```
<section id="range" class="range">
  <div class="range__head"><h2>Three ranges</h2><p>…</p></div>
  <ul class="range-list" data-range-list>
    <li><a href="/products/dry-amenities.html"><h3>Dry Amenities</h3></a></li>
    <li>…wet…</li><li>…aroma…</li>
  </ul>
</section>
```

## Visual design
- On `--ink` (bookends the page: ink hero → paper about → ink range → paper who-we-serve).
- Three tall cards in a row (`grid-template-columns: repeat(3,1fr)`), kraft hairline frame,
  `--radius`. Image top (`aspect-ratio: 4/5`), then name (Fraunces `--step-2`), intro
  (muted paper, `--step--1`), count line (Hanken 500, `--kraft`).
- Whole card is the link target (`<a>` wraps, or `::after` overlay). Hover: frame brightens
  to `--kraft`, image scales 1.02 within `overflow:hidden`. Link text: "See the range"
  (visible, plain — no arrow glyph).
- NOT identical to SaaS cards: no shadow, square-ish corners, frame not fill.

## Responsive
< 60rem: 1 column, image becomes `16/9`, cards full width, `--sp-4` gap.

## Motion
Global section reveal only. Hover scale gated by `prefers-reduced-motion`.

## Accessibility
- Each card has one link; `h3` inside. Image alt = range name context.
- Focus style on the card (frame + ring), not just the text.

## Acceptance criteria
- [ ] Renders from `PRODUCT_GROUPS`; adding a group needs no HTML edit.
- [ ] Works with JS off (headings + links present).
- [ ] Counts match the data.
- [ ] Screenshots 390 / 768 / 1440.
