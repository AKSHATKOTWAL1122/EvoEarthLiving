# Spec 19: Home Category Showcase

**Status:** spec'd — partial brief, placement/rest-of-section pending
**Appears on:** home, below the video hero (spec 17) — above or replacing the start
of the existing hero/about flow; exact position TBD, see Open/pending
**Depends on:** 00, 04 (product-range-overview — this is a *different*, additional
section, not a replacement)
**Files touched:** `index.html`, `css/layers/components.css`, possibly
`js/modules/products.js` (new export) or a small dedicated renderer

## What this is
A second, more specific product-highlight grid, distinct from the existing
`#range` section (spec 04, which shows the 3 top-level groups: Dry / Wet / Aroma).
This new section surfaces **6 specific subcategories** as their own tiles, each with
its own photo (different imagery from the nav's photo-submenu thumbnails — spec 01):

- Luxury Gift Boxes
- Scented Candles
- Reed Diffusers
- Soaps
- Face and Body Care
- Room Fresheners

Each tile links to the matching subcategory anchor (Gifting for the first, Aroma
Essentials for candles/diffusers/fresheners, Wet Amenities for soaps/face-and-body).

## Structure / markup
```
<section class="showcase" aria-label="Shop by category">
  <ul class="showcase__grid">
    <li><a href="/products/gifting.html#luxury"><img …>Luxury Gift Boxes</a></li>
    <li><a href="/products/aroma-essentials.html#scented-candles"><img …>Scented Candles</a></li>
    <li><a href="/products/aroma-essentials.html#reed-diffusers"><img …>Reed Diffusers</a></li>
    <li><a href="/products/wet-amenities.html#soaps"><img …>Soaps</a></li>
    <li><a href="/products/wet-amenities.html#face-and-body-care"><img …>Face and Body Care</a></li>
    <li><a href="/products/aroma-essentials.html#room-freshener-spray"><img …>Room Fresheners</a></li>
  </ul>
</section>
```
- 6-tile grid: 3×2 desktop, 2×3 tablet, single column or 2-wide mobile (decide during
  build against real tile proportions).
- "Luxury Gift Boxes" implies this section can't ship fully until spec 16 (Gifting)
  has real bundle content — the tile itself and its link target can still ship, just
  pointing at the (placeholder-marked) Gifting section until real boxes exist.

## Visual design
Same photography-led, restrained-label treatment as the rest of the site (Fraunces
or Hanken kicker over image, no all-caps, no new colours). Should read as *editorial
index*, not a second product-range-overview — vary the tile shape/aspect ratio from
spec 04's cards so the two sections don't feel duplicated.

## Content rules
Six sentence-case labels only, no descriptions needed per the brief (it's a visual
index, not a copy section). If you want a one-line descriptor per tile later, that's
a small addition, not a redesign.

## Open / pending — brief was cut off here
Your pasted brief ends mid-sentence after this section ("Below that some…"). I've
spec'd what's unambiguous (the 6-tile showcase); I have **not** guessed what comes
after it. When you have the rest, send it and I'll add it as spec 20+ rather than
inventing content to fill the gap.
- [ ] **Blocked on you:** the rest of the homepage brief below this section.
- [ ] **Blocked on you:** exact position of this section relative to existing
      hero/about (spec 02/03) — does it replace part of the current homepage order,
      or insert before/after it?
- [ ] Confirm "Luxury Gift Boxes" tile can ship pointing at placeholder Gifting
      content, or should be held back until spec 16 has real boxes.

## Acceptance criteria
- [ ] All 6 tiles resolve to a real, correct anchor (no dead links).
- [ ] Distinct visual treatment from spec 04's range cards (not a duplicate section).
- [ ] axe: 0 violations.
- [ ] No layout shift before tile images load.
