# Spec 09: Motion — STUB

**Status:** in progress (stub) — overall level still awaiting a client reference.
Two cursor interactions approved and built (2026-09-06).
**Appears on:** all pages
**Depends on:** 00
**Files touched:** `css/layers/{base,components}.css`, `js/modules/{reveal,glow}.js`

## Cursor-follow glow (built 2026-09-06 — user request)
Two eased highlights that trail the pointer. `js/modules/glow.js`; armed only on
`(hover: hover) and (pointer: fine)` and `prefers-reduced-motion: no-preference`.

1. **On the oxblood CTAs** — `.btn--wa::after`, a soft rose radial (`--glow`) at
   `--gx/--gy`, `--glow-o` toggled on enter/leave. JS lerps the position each
   frame (`EASE 0.10`) so it lags the cursor; opacity fades via CSS (0.28s).
2. **Page-wide ambient** — one fixed `.cursor-glow` div (created in JS, not in the
   HTML), a 22rem brass radial (`--cursor-glow`, alpha .11) with
   `mix-blend-mode: screen`: it lifts the near-black field it passes over and does
   effectively nothing on the paper sections. Laggier (`AMBIENT_EASE 0.06`). Fades
   out on `blur` / tab-hidden, not on cursor-leaves-window (avoids flicker).

Both: `pointer-events: none`, one shared rAF loop per element that stops when
settled, `pointerType === "touch"` ignored. No element exists at all under
reduced-motion or no-JS.

## Holding rules until this spec is filled
The client will send inspiration sites and animation/button references. Until then, keep
motion to the minimum the frontend-design skill allows:

1. **One orchestrated load moment** — the hero (spec 02) only: text + image fade and rise
   ~12px, short stagger, plays once. Nothing else animates on load.
2. **Response motion is fine** — dropdown open/close, mobile panel, `:hover` / `:focus`
   colour and frame transitions (≤ `--dur`).
3. **Section reveals:** a single, subtle fade+rise as each section first enters view,
   via `reveal.js` (IntersectionObserver, `threshold: .15`, unobserve after firing).
   Elements start at `opacity: 1` in the CSS and are only dimmed by a `.reveal` class that
   JS adds on load and removes on intersect — so **no-JS and reduced-motion both show the
   final state immediately**.
4. **`prefers-reduced-motion: reduce`** → `reveal.js` no-ops, all transitions become
   `none`, hero reveal skipped.
5. No parallax, no scroll-scrubbing, no auto-carousels, no per-card entrance animation,
   no number count-ups.
6. Cursor-follow glow (see above) is live — approved as a standalone interaction.

## To be decided with the client
- Overall level: minimal / restrained+signature / none.
- Whether the hero image gets a signature treatment (e.g. slow scale, mask wipe).
- Button interaction style (press, fill-sweep, underline-draw) — tied to the button
  reference they send.
- Any one bespoke interaction for a section that reviews as "flat".

## Acceptance criteria (current stub)
- [ ] Reduced-motion: zero transforms, zero transitions, final state on load.
- [ ] JS disabled: everything visible, no elements stuck hidden.
- [ ] Only the hero animates on load; sections do a single subtle reveal, once.
