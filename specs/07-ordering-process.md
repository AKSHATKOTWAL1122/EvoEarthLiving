# Spec 07: Ordering Process (home)

**Status:** spec'd
**Appears on:** home
**Section(s) / selector:** `#process`
**Depends on:** 00, 13
**Files touched:** `index.html`, `css/layers/components.css`

## Purpose
Set expectations for how a first order happens. This IS a genuine sequence, so numbered
markers are appropriate here (and only here).

## Content (ref spec 13)
- `h2`: "How ordering works"
- Steps (`<ol>`):
  1. **Tell us what you need** — WhatsApp us your property type, the ranges you want, and rough monthly volume.
  2. **Sample and quote** — We send samples and a priced list, stocked items and any custom work separately.
  3. **Confirm** — Approve the quote, artwork and pack sizes. We schedule production or pick from stock.
  4. **Dispatch** — Goods ship from Srinagar or Jammu with tracking.
- Closing line + CTA: "Most enquiries get a same-day reply." → `Enquire on WhatsApp`

## Structure / markup
```
<section id="process" class="process">
  <h2>How ordering works</h2>
  <ol class="steps">
    <li><h3>Tell us what you need</h3><p>…</p></li> …
  </ol>
  <p class="process__foot">Most enquiries get a same-day reply. <a data-wa>Enquire on WhatsApp</a></p>
</section>
```

## Visual design
- On `--ink`.
- `<ol>` with a real counter (`counter-reset` / `counter-increment`), number set in Fraunces
  `--step-3` in `--kraft`, sitting in a left margin; step title Hanken 600 `--step-1`; body muted paper.
- Vertical kraft hairline connecting the steps (CSS, `::before` on the list). Steps stack
  vertically on all breakpoints — it's a timeline, not a card row.
- Foot line: centered-left, WhatsApp link as a text link (kraft underline), plus the header CTA style optional.

## Responsive
< 40rem: number moves inline above the title; hairline hugs the left edge.

## Motion
Global reveal; optionally stagger the four steps within the single reveal (one orchestrated
moment, gated by reduced-motion). No scroll-scrubbing.

## Accessibility
- `<ol>` conveys order semantically; numbers are CSS counters (not typed digits that a
  screen reader double-reads — verify: use `::marker` or `::before` with `aria-hidden` not needed for counters).
- Step titles are `<h3>`.

## Acceptance criteria
- [ ] Exactly 4 steps, in an `<ol>`.
- [ ] Numbers render via CSS counter, not literal text.
- [ ] WhatsApp link resolves.
- [ ] Screenshots 390 / 768 / 1440.
