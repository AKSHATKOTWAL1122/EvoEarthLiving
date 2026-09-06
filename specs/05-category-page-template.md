# Spec 05: Category Page Template

**Status:** spec'd
**Appears on:** `/products/dry-amenities.html`, `wet-amenities.html`, `aroma-essentials.html`
**Section(s) / selector:** `main[data-category]`, `.cat-hero`, `.subcat`, `.item-grid`, `.item-card`
**Depends on:** 00, 01, 13, `js/data/products.js`
**Files touched:** the 3 category HTML files, `js/modules/category.js`, `css/layers/components.css`

> **Imagery:** category hero `assets/img/photos/{slug}/hero.jpg` (1600×900) — swapped
> directly in each HTML file (the `.cat-hero` `<img src>` is hardcoded, not from data).
> Item images `assets/img/photos/{group}/items/<name>.jpg` (800×800) — set via `image`
> in `js/data/products.js`. Art direction + generation prompts: **spec 14**.

## Purpose
The flow target. One page per range, showing every subcategory and item with imagery and
a one-line detail, plus the two CTAs and links to the other ranges.

## Routing / data
- Each page: `<main data-category="dry">` (or `wet` / `aroma`).
- `category.js` reads the attribute, finds the group in `PRODUCT_GROUPS`, renders the
  subcategory sections into `[data-subcats]`. Page `<h1>`, intro, and breadcrumb are static
  HTML (so the page is meaningful without JS and has correct SEO).

## Structure / markup
```
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol><li><a href="/">Home</a></li>
      <li><a href="/#range">Products</a></li>
      <li aria-current="page">Dry Amenities</li></ol>
</nav>
<section class="cat-hero split">
  <div><h1>Dry Amenities</h1><p class="lede">…group.intro…</p>
       <div class="btn-row"><a data-wa>Enquire on WhatsApp</a><a data-catalogue>Download catalogue</a></div></div>
  <figure class="framed"><img …group.heroImage… width="1600" height="900"></figure>
</section>
<div data-subcats>
  <!-- per subcategory: -->
  <section class="subcat">
    <header><h2>Dental Kit</h2><p>…subcat.intro…</p></header>
    <ul class="item-grid">
      <li class="item-card framed">
        <img …item.image… width="800" height="800" loading="lazy">
        <h3>Bamboo toothbrush</h3><p>…item.blurb…</p>
      </li> …
    </ul>
  </section>
</div>
<section class="cat-cross">
  <h2>Other ranges</h2>
  <ul><li><a href="…wet…">Wet Amenities</a></li><li><a href="…aroma…">Aroma Essentials</a></li></ul>
</section>
```
Customisation note: one short line under the cat-hero — "Every item can carry your brand:
labels, fragrance, format and pack size." (from data or spec 13).

## Visual design
- Breadcrumb: Hanken `--step--1`, muted, `/` separators via CSS `::before`, on `--paper`.
- `.cat-hero`: `--ink` field, same split as the home hero (brand continuity).
- `.subcat`: alternating `--paper` / `--paper-2` bands, `--sp-7` rhythm. `h2` Fraunces `--step-2`
  in a left column, grid to its right on desktop (`grid: 1fr / 2.4fr`), stacked mobile.
- `.item-grid`: `repeat(auto-fill, minmax(190px, 1fr))`, `--sp-4` gap.
- `.item-card`: kraft hairline frame, square-ish. Image `1/1`. `h3` Hanken 600 `--step-0`.
  Blurb muted `--step--1`, `max-width: 30ch`. No price, no button per card.
- `.cat-cross`: `--ink` band, two large Fraunces links, kraft hairline between.

## Responsive
< 60rem: split → 1 col; subcat heading above grid; item-grid `minmax(150px,1fr)` → 2 up;
< 30rem: 1 up. Breadcrumb wraps, never truncates. Sticky CTA is NOT added (keep it simple).

## Motion
Global reveal per `.subcat`. No per-card hover motion beyond frame colour + image 1.02 (gated).

## Accessibility
- One `<h1>` per page (the category name). `h2` per subcategory, `h3` per item — ordered.
- Breadcrumb = `<nav><ol>` with `aria-current="page"` on the last crumb.
- Every item image has alt `"<item name>"` until real photography with better alt arrives.
- `data-subcats` container gets `aria-busy` toggled while rendering.

## Acceptance criteria
- [ ] All 3 pages render fully from `PRODUCT_GROUPS`; no item text hard-coded in HTML.
- [ ] Every catalogue item for that range is present; none invented.
- [ ] Breadcrumb + cross-links navigate correctly (flow test).
- [ ] Works with JS off: h1 + intro + breadcrumb + CTAs + "view full catalogue" fallback line.
- [ ] Screenshots of each page at 390 / 768 / 1440.
