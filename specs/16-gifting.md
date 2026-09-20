# Spec 16: Gifting

**Status:** spec'd — structure locked, item content pending
**Appears on:** new top-level nav item; `/gifting/` category pages
**Depends on:** 00, 01, 05 (reuses the category-page template pattern)
**Files touched:** `products/gifting.html` (landing) + 4 sub-pages or anchored
sections (`corporate`, `hotel`, `wedding`, `festival`), `js/data/gifting.js` (new),
possibly `js/modules/category.js` extended or a sibling `gifting.js` module.

## What this is
Gifting is **not** in the source catalogue PDF (that covers Dry/Wet/Aroma only). Per
brief, it's a new top-level category with four occasions:
- Corporate Gifting
- Hotel Gifting
- Wedding Gifting
- Festival Gifting

Each gift is a **bundle of existing SKUs** — a box built from items already defined
in `js/data/products.js` (dental kit + soap + candle, etc.), not new product
inventions. Per your instruction, exact bundle composition (which products from
`products.js` go into which gifting category) is **pending** — you'll specify this
directly. Until then, ship the page structure with placeholder bundle contents
clearly marked, same pattern as trust metrics elsewhere in this project.

## Structure / markup
Follows the spec 05 category-page template shape (breadcrumb → h1 → intro →
subcategory sections → items), adapted for bundles:
```
/products/gifting.html
  h1: Gifting
  intro: one sentence, warm/editorial tone, no adjective stacking
  4 subcategory sections (Corporate / Hotel / Wedding / Festival), each:
    - section intro (one sentence — what occasion this serves)
    - grid of "gift box" cards, each card:
        - box name (e.g. "The Welcome Box")
        - box image (placeholder until shot)
        - 1-line description
        - contents list — cross-links back to the individual item's own
          subcategory page/anchor (e.g. "Dental Kit", "Scented Candle — Aroma
          Essentials") so a buyer can see what's inside without leaving the flow
```
- Nav dropdown for Gifting (spec 01) links straight to the matching section anchor
  (`/products/gifting.html#corporate`, etc.) rather than 4 separate HTML files —
  keeps this consistent with how Dry/Wet/Aroma subcategories are anchors, not pages.
- `js/data/gifting.js` shape (draft, for when contents are supplied):
  ```js
  export const GIFT_CATEGORIES = [
    {
      id: "corporate",
      name: "Corporate Gifting",
      intro: "…",
      boxes: [
        { name: "…", blurb: "…", image: PLACEHOLDER, items: ["dry.dental-kit.bamboo-toothbrush", "aroma.candles.…"] },
      ],
    },
    // hotel, wedding, festival
  ]
  ```
  `items` references existing `products.js` entries by a stable id (id scheme TBD
  once real bundle data lands — the id format itself is a small implementation
  decision, not a content one, so it does not block on you).

## Content rules
- Same copy rules as the rest of the site: short, concrete, no adjective stacking, no
  third-party brand names.
- Box names and contents: **awaiting your input** — do not invent contents. Ship with
  an explicit `<!-- gifting contents pending client input -->` placeholder marker (or
  a visibly-labelled "coming soon" card) rather than fabricated bundles.

## Visual design
Same visual language as category pages (spec 05): Fraunces headings, brass hairlines,
oxblood CTA only on the enquiry button per box. Box cards slightly more "gift" coded
than plain item cards (e.g. a corner ribbon accent) — small deliberate touch, not
decoration-heavy; stays within the 4–6 colour restraint (no new hues).

## CTAs
Same two CTAs as everywhere: WhatsApp enquiry (prefilled with the box name) +
Download catalogue. No pricing, no "add to cart" — matches the institutional-buyer
tone of the rest of the site.

## Open / pending
- [ ] **Blocked on you:** which `products.js` items go into each gifting box.
- [ ] Decide: single `gifting.html` with 4 anchored sections (recommended, matches
      how subcategories work elsewhere) vs. 4 separate pages.
- [ ] Imagery: add gifting to spec 14's shot list once box compositions are known.

## Acceptance criteria
- [ ] Nav → Gifting → correct anchor/page for each of the 4 occasions.
- [ ] No fabricated product contents ship to production.
- [ ] Cross-links from a box's contents back to the item's home subcategory resolve.
- [ ] Same a11y/axe bar as the other category pages (0 violations).
