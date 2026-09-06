# Spec 00: Design System & Tokens

**Status:** spec'd
**Appears on:** all pages
**Section(s) / selector:** `:root`, `@layer tokens`, `@layer base`
**Depends on:** —
**Files touched:** `css/main.css`, `css/layers/{reset,tokens,base}.css`, `assets/fonts/*`

## Purpose
The single vocabulary every other component draws from: colour, type scale, spacing,
radius, borders, motion. No component may use a raw hex value or magic number.

## Design direction (from frontend-design skill)
- **Dark-dominant, not cream-dominant.** The printed catalogue's product pages are
  dark fields with warm-ink reversed out; the site carries that. This deliberately
  inverts the generic "cream background + serif + terracotta" AI look.
- **Palette locked 2026-09-06** (client supplied via ui-ux pass): near-black field,
  warm-ink paper, **oxblood** as the single bold accent (primary CTA + selection only),
  **brass** as the quiet structural colour (frames, rules, hairlines, kicker, step
  numbers), slate for muted text.
- Carry the catalogue's **left image-strip / right text** split layout onto the web.
- One characterful editorial serif doing real work at large sizes; a clean grotesque everywhere else.
- Structural devices come from the packaging world: kraft hairline frames around imagery,
  quiet italic/small labels — never tracked ALL-CAPS eyebrows, never 01/02/03 markers
  (except the ordering process, which is a genuine sequence).

## Colour tokens (locked 2026-09-06)
```
--ink:          #0A0908   /* near-black — dominant field */
--ink-2:        #17120F   /* raised surface on ink (footer, submenu, step no.) */
--paper:        #F5F2EC   /* warm ink / off-white */
--paper-2:      #EDE7DB   /* dim paper, alt sections */
--kraft:        #C9A36B   /* brass — frames, rules, hairlines, kicker, step numbers */
--line-paper:   #DDD5C6   /* hairline on paper */
--line-ink:     rgba(201,163,107,.24)  /* hairline on ink */
--accent:       #6E1F23   /* oxblood — primary CTA fill + ::selection ONLY */
--accent-hover: #86262C   /* oxblood, lifted, for :hover */
--accent-ink:   #C25055   /* oxblood for text/lines on the dark field (reserve) */
```
Text roles: on paper → `--ink`; on ink → `--paper`. Muted (slate) on paper `#54585C`,
on ink `rgba(245,242,236,.70)`.
- The `--kraft` var name is retained (many references); it is **brass**, not kraft-brown.
- Oxblood is the one bold colour — do not spread it to frames, markers, or links.
  Brass stays structural.

Verified contrast (WCAG 2.1, axe-core 4.10 — 0 AA violations, home + category):
paper on oxblood ≈ 10:1 · brass on near-black ≈ 8.4:1 · slate on paper ≈ 6.4:1 ·
slate on paper-2 ≈ 5.8:1 · muted-ink on near-black ≈ 8.7:1. (AAA 7:1 not met by the
slate muted text — AA is the project bar.)

## Gradient tokens (added 2026-09-06)
Flat single-tone fields read as cheap; every surface now carries a low-delta,
same-hue gradient for depth (guidance: ui-ux-pro-max "Modern Dark" style —
layered surfaces, avoid pure black, subtle linear gradients; no direct palette
match in its DB). Elevation ramp on the dark side: `--ink` field → `--ink-2`
raised (footer, submenu) → `--ink-3` card ground.
```
--ink-2  #191310   --ink-3  #241b16   --ink-hi #241713   (warm haze, gradient top)
--accent-hi #8a2930   --accent-lo #571a1e   (oxblood CTA gradient stops)

--grad-field    radial, warm haze at top-centre → near-black   (body-feel: hero, cat-hero)
--grad-ink      linear 180°, lit top → dark foot               (.section--ink)
--grad-ink-2    linear 180°, subtle                            (footer, submenu)
--grad-paper    linear 180°, whisper of warm light from top    (.section--paper)
--grad-paper-2  linear 180°, same, dimmer band                 (.section--paper-2)
--grad-cta      linear 165°, oxblood sheen                     (.btn--wa)
--grad-cta-hover                                               (.btn--wa:hover)
--grad-header   linear 180°, subtle                            (.site-header)
--grad-card-ink / --grad-card-paper   top-lit lift, fades to transparent  (.range-card / .item-card)
--grad-rule     brass, fades at both ends  (reserved — no full-width rule uses it yet)
```
Rules: gradients are **depth cues, not decoration** — keep the lightness delta
small (~6–12%), never shift hue, never more than one gradient reading at once in a
viewport. `.steps > li::before` uses a `radial-gradient(closest-side, --ink →
transparent)` knockout so the step numeral masks the timeline line over any
background value.

## Type
- **Display:** Fraunces (variable; use opsz 72–144, wght 300–460, `SOFT` 40, `WONK` 1).
  Roles: page `<h1>`, section headings, category titles, pull quotes.
- **Body / UI:** Hanken Grotesk (wght 400 / 500 / 600). Roles: paragraphs, nav, buttons,
  labels, captions, item card text.
- Self-hosted `.woff2` in `assets/fonts/`, `font-display: swap`, `<link rel="preload">` for
  the two most-used cuts (Fraunces opsz-display 360, Hanken 400).
- No third typeface. No mono.

### Scale (fluid, `clamp`)
```
--step--1: clamp(.83rem, .80rem + .12vw, .90rem)   /* captions */
--step-0:  clamp(1rem, .96rem + .18vw, 1.12rem)    /* body */
--step-1:  clamp(1.2rem, 1.1rem + .5vw, 1.5rem)
--step-2:  clamp(1.5rem, 1.3rem + 1vw, 2.1rem)
--step-3:  clamp(2rem, 1.6rem + 2vw, 3.2rem)
--step-4:  clamp(2.6rem, 1.9rem + 3.6vw, 5rem)     /* h1 / category title */
```
Body line-height 1.6, measure `max-width: 62ch`. Display line-height 1.02–1.08, set tight,
allow slightly wonky italic in labels instead of an eyebrow.

## Spacing / layout
- Space scale: `--sp-1:.5rem --sp-2:.75rem --sp-3:1rem --sp-4:1.5rem --sp-5:2.5rem --sp-6:4rem --sp-7:6rem --sp-8:9rem`.
- `--container: 74rem`; gutter `clamp(1.25rem, 5vw, 4rem)`.
- Section vertical rhythm `--sp-7` desktop, `--sp-6` mobile.
- Split layout helper `.split` → CSS grid `minmax(0,1fr) minmax(0,1.1fr)`, collapses to 1 col < 60rem.

## Radius / border
- `--radius: 2px` (almost square — packaging, not SaaS cards). One value only.
- Image frame: `1px solid var(--kraft)` with `4px` offset via `outline` or padding wrapper.

## Motion tokens (STUB — see spec 09)
```
--dur: .5s;  --ease: cubic-bezier(.2,.6,.2,1);
```
Until spec 09 is filled: only `:hover`/`:focus` colour transitions and one hero reveal
allowed; everything wrapped in `@media (prefers-reduced-motion: no-preference)`.

## Button treatment (locked 2026-09-06)
- `.btn--wa` (primary): oxblood fill (`--accent`), warm-ink text (`--paper`).
  Hover → `--accent-hover`. This is the site's one loud element.
- `.btn--ghost` (secondary): transparent, brass hairline, `currentColor` text.
  Hover → faint brass wash `rgba(201,163,107,.14)`.

## Acceptance criteria
- [ ] No raw hex outside `tokens.css` (exceptions: `.btn--ghost:hover` /
      `.submenu a:focus-visible` brass wash rgba, `theme-color` meta = `#0A0908`).
- [ ] Fonts self-hosted, preloaded, `swap`; no external font CDN request.
- [ ] Ink/paper contrast ≥ 12:1; brass-on-ink text ≥ 4.5:1 (or adjusted).
- [ ] Type scale renders identically on home + a category page.
- [ ] `prefers-reduced-motion` disables all non-essential motion.
