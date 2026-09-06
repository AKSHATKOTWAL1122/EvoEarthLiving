# Spec 06: Who We Serve (home)

**Status:** spec'd
**Appears on:** home
**Section(s) / selector:** `#who-we-serve`
**Depends on:** 00, 13
**Files touched:** `index.html`, `css/layers/{layout,components}.css`

## Purpose
Name the buyers and place the company (warehouses). No fabricated trust metrics.

## Content (ref spec 13)
- `h2`: "Who we serve"
- Positioning (1–2 sentences): "We supply properties that judge themselves on detail —
  and the distributors who keep them stocked. Stocked ranges ship from inventory; custom
  and private-label runs are quoted to your spec."
- Audience list (plain, no icons): Hotels · Resorts · Spas & wellness · Serviced apartments ·
  Hospitals & clinics · Corporate offices · Distributors & trading houses
- Location block: "Warehousing in Srinagar and Jammu, Jammu & Kashmir."
- **No** MOQ / lead-time / certification rows yet (client to supply).

## Structure / markup
```
<section id="who-we-serve" class="serve">
  <h2>Who we serve</h2>
  <p class="lede">…positioning…</p>
  <ul class="serve__list"> <li>Hotels</li> … </ul>
  <p class="serve__loc">Warehousing in Srinagar and Jammu, Jammu &amp; Kashmir.</p>
</section>
```

## Visual design
- On `--paper`.
- Audience list as a wrapped inline row separated by kraft hairline dividers (CSS
  `border-left`), Fraunces `--step-1`, generous line-height — reads as a considered list,
  not tags/pills.
- Location line: Hanken 500, muted, with a small kraft square marker (CSS) — the only
  place a location cue appears.
- Leave a commented placeholder block `<!-- trust-metrics: add when client supplies MOQ / lead time / certs -->`.

## Responsive
< 40rem: audience list stacks to one per line, dividers become bottom hairlines.

## Motion
Global reveal only.

## Accessibility
- List is a real `<ul>`. Dividers are decorative CSS, not characters.
- Contrast on muted text ≥ 4.5:1.

## Acceptance criteria
- [ ] No numeric trust claims present.
- [ ] Location text exactly "Srinagar and Jammu, Jammu & Kashmir".
- [ ] Screenshots 390 / 768 / 1440.
