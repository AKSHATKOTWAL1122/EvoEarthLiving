# Spec 03: About (home)

**Status:** spec'd
**Appears on:** home
**Section(s) / selector:** `#about`
**Depends on:** 00, 13
**Files touched:** `index.html`, `css/layers/layout.css`

## Purpose
Establish credibility in the company's own words.

## Content — VERBATIM from catalogue p2 (do not edit)
Heading: "About us"

> We are a premium supplier of hospitality, personal care, and home care solutions,
> dedicated to delivering exceptional quality, refined design, and reliable performance.
> Our products are thoughtfully developed to enhance everyday experiences while meeting
> the highest standards of safety, innovation, and sustainability.

> Driven by a commitment to excellence, we combine elegant aesthetics with effective
> formulations to serve the evolving needs of hotels, businesses, and modern consumers.
> Every product reflects our passion for quality, customer satisfaction, and responsible
> innovation, making us a trusted partner in creating cleaner, healthier, and more
> welcoming spaces.

*(This copy is exempt from the "cut adjectives" pass — the client asked for it verbatim.)*

## Structure / markup
```
<section id="about" class="about">
  <h2>About us</h2>
  <div class="prose">
    <p>…para 1…</p>
    <p>…para 2…</p>
  </div>
</section>
```

## Visual design
- On `--paper` (or `--paper-2` to alternate from the ink hero).
- `h2` Fraunces `--step-3`, left aligned, sits in a narrow left column; paragraphs in a
  measure of `52ch` beside/below it (2-col on desktop: heading 1fr / prose 2fr; stacked mobile).
- First paragraph can take a Fraunces drop-styled first line (small-caps first 3–4 words),
  no drop cap. Optional — cut if it fights the type.
- Generous leading (1.65). No cards, no icons, no stat tiles.

## Responsive
< 60rem: heading above prose, both full width, `--sp-4` gap.

## Motion
None beyond the global section reveal (spec 09).

## Accessibility
- `<h2>` follows the hero `<h1>` in order.
- Body text ≥ `--step-0`, contrast ≥ 12:1.

## Acceptance criteria
- [ ] Text matches catalogue p2 character-for-character (spot-check both paragraphs).
- [ ] Measure ≤ ~62ch.
- [ ] Screenshots 390 / 768 / 1440.
