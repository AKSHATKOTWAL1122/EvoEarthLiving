# Spec 10: Responsive & Mobile

**Status:** spec'd
**Appears on:** all pages
**Depends on:** 00–08
**Files touched:** `css/layers/{layout,components,utilities}.css`

## Purpose
A real mobile pass — what hides, tightens, resizes — not just fluid scaling.

## Breakpoints
- Base styles are mobile-first.
- `40rem` (640px): small-phone → large-phone / small-tablet adjustments.
- `60rem` (960px): the main desktop switch — nav becomes horizontal, `.split` becomes 2-col.
- `90rem` (1440px): max container reached; no new layout, just breathing room.

## Per-area mobile behaviour
| Area | Mobile (<60rem) |
|------|-----------------|
| Header | Wordmark + WhatsApp CTA + hamburger. Full nav in a scroll-locked panel. Products = expandable group. |
| Hero | 1 col, image first (`4/5`, max 420px), then text; buttons full-width stacked. `min-height:auto` < 40rem. |
| About | Heading above prose, full width. |
| Range overview | 1 col cards, image `16/9`. |
| Category hero | 1 col, image first. Breadcrumb wraps. |
| Subcategories | Heading above grid. Item grid 2-up < 60rem, 1-up < 30rem. |
| Who we serve | Audience list 1 per line with bottom hairlines. |
| Process | Step number inline above title; hairline at left edge. |
| Contact | Stacked, buttons full width. |
| Footer | Single column. |

## Tightening
- Section rhythm `--sp-7` → `--sp-6` < 60rem, `--sp-5` < 40rem.
- Gutter `clamp(1.25rem, 5vw, 4rem)` handles horizontal padding.
- Display type already `clamp`ed in spec 00; verify `<h1>` never overflows at 320px.
- Framed-image inset reduces from 4px to 2px < 40rem.

## What hides on mobile
- Active-section underline in nav (panel shows current page only).
- Decorative kraft hairline dividers in the audience list become bottom borders.
- Nothing content-bearing is hidden.

## Tap targets
- All links/buttons in nav, CTAs, cards, footer ≥ 44×44px.
- Item cards: entire card is the tap target where it links (category cross-links); item
  cards themselves don't link (no per-item page).

## Acceptance criteria
- [ ] No horizontal scroll at 320 / 360 / 390 / 414 px on any page.
- [ ] `<h1>` fits at 320px on home and each category page.
- [ ] Nav panel: scroll lock, 3 close paths, focus restore.
- [ ] Screenshots at 390 for every page, plus 768.
