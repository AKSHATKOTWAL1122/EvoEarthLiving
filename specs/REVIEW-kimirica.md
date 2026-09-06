# Review: kimirica.shop — what to borrow, what to skip

**Date:** 2026-09-06
**Reference:** `References/Websites.txt` → https://www.kimirica.shop/ (client-supplied)
**Context:** Kimirica is a luxury vegan self-care *retailer* (Shopify). It reads as
expensive mainly because of consistent still-life photography and restraint, not
its code. We take the visual language; we skip the commerce.

Related: `specs/14-imagery.md` (photo brief), `EvoEarth/CLAUDE.md` (short backlog).

---

## What Kimirica does well (observed)

1. **Image-led everything** — every section anchored by still-life photography in a
   curated setting; product never floats on pure white.
2. **Collection storytelling** — each range: name → one-line character descriptor →
   hero image → products. Discovery, then detail.
3. **"Thoughtful Commitments" strip** — six icon + short-claim pairs mid-homepage
   ("Clean Formulations — SLS & Paraben Free", "IFRA Certified", "Dermatologically
   Tested"). Credentials in plain language.
4. **Horizontal product carousels** — 3–4 items visible, arrows, "View all" at the
   end. Keeps category pages from being endless grids.
5. **Three-tier type hierarchy** — meta-label / product name / descriptor tag,
   consistent everywhere.
6. **Generous whitespace + few colours** — photography carries it.

---

## Status of each suggestion

Legend: **DONE** · **NOW** (doable with no client assets) · **BLOCKED** (needs a
client asset) · **SKIP** (deliberately not doing)

| # | Suggestion | Status | Notes |
|---|------------|--------|-------|
| 1 | Real photography across the site | **BLOCKED** | Brief + prompts done (`specs/14-imagery.md`). Launch set = 7 shots. #1 quality lever — see `specs/GRADE.md` #5. |
| 2 | Credentials strip (our "Thoughtful Commitments") | **DONE** (2026-09-06) | Built as **spec 15** — `#capabilities` `<dl>`, placed between `#about` and `#range`. 4 qualitative claims (private-label / material choices / stock-or-custom / one point of contact), no metrics. Real certs/MOQ swapped in later. |
| 3 | Build out category pages (subcats + items) | **DONE** | Already built Session 1 — `js/modules/category.js` renders every subcategory + item grid from `js/data/products.js` (dry 7/25, wet 3/11, aroma 2/7). The PDF-pointer paragraph in the HTML is only the no-JS fallback. My earlier "thin pages" read was wrong. |
| 4 | Home range overview → image cards | **DONE / BLOCKED payoff** | Re-checked: `js/modules/products.js` *is* wired (`main.js` calls `initRangeOverview`) and renders `.range-card` ×3 from `PRODUCT_GROUPS` on load. The plain `.range-list` in the HTML is just the no-JS fallback. Structure is done; full visual payoff is **BLOCKED** on `assets/img/photos/{group}/card.jpg`. |
| 5 | Surface editorial descriptors per range/subcategory | **DONE** | Subcategory `intro` lines ("For the moments guests didn't plan for", "The small extras a room is judged on") already render via `category.js`. Range `intro` lines render on the home overview. |
| 6 | Fuller-bleed / atmospheric hero image | **BLOCKED** | Layout tweak is cheap but pointless without `assets/img/photos/home/hero.jpg`. Revisit when the hero shot lands; also refresh `assets/og/`. |
| 7 | Footer "keep in touch" line (no form) | **DONE** (2026-09-06) | `index.html` footer brand column: "Distributors and trading houses — ask about wholesale terms." Link is `data-wa` with a distributor-specific `data-wa-msg`. `.site-footer__descr a` gets a kraft underline. |
| 8 | Horizontal carousel for long item grids | **DEFER** | Only Dry (25 items) is long enough to matter. Adds JS + a motion decision (spec 09 is still a stub). Not worth it pre-launch; reconsider after the motion pass. If built: manual controls only, no autoplay. |
| 9 | Mega-menu with imagery in the "Products" dropdown | **SKIP (for now)** | Our dropdown is 3 links — imagery would be decoration, not information. Revisit only if the product taxonomy grows. |
| 10 | Section-heading typographic hierarchy audit | **DONE — no change** (2026-09-06) | Reviewed home + category headings. Section `h2` and product names use Fraunces display; process steps and item-card details use Hanken 600. Deliberate two-tier split, consistent, no all-caps, no heading skips. Nothing to fix. |

---

## Deliberately NOT taking from Kimirica

- Pricing, cart, wishlist, "Add to cart", checkout — wrong audience (institutional
  enquiry, not retail).
- Star ratings / review counts — no review system, no plans for one.
- Discount + urgency banners ("FLAT 25% OFF", limited-time) — off-brand for a
  supply relationship.
- All-caps meta-labels ("BESTSELLERS", "NEW ARRIVALS") — banned by
  `frontend-design` skill and parent `CLAUDE.md`; we use sentence-case kickers.
- Auto-advancing carousels — if any carousel is added it is manual-only.
- Their light / cream palette — our dark espresso field is the deliberate point of
  view (checklist #1). Do not dilute it toward Kimirica's look.

---

## Recommended order

1. ~~NOW block: #2 credentials strip, #4 range-cards, #7 footer line, #10 heading
   audit~~ — **done 2026-09-06** (#2 → spec 15, #7 built, #4 already wired, #10 no
   change needed).
2. Client-asset chase (photography per spec 14, logo, PDF, accent/motion refs).
3. When assets land: swap images (#1, #4 payoff, #6), refresh OG, accent + button +
   motion polish pass, Lighthouse, re-grade `specs/GRADE.md`.
4. Post-launch, if warranted: #8 carousel, #9 mega-menu.
