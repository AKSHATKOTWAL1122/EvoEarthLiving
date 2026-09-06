# Spec 02: Hero (home)

**Status:** spec'd
**Appears on:** home
**Section(s) / selector:** `#hero` (first child of `<main>`)
**Depends on:** 00, 01, 13
**Files touched:** `index.html`, `css/layers/{layout,components}.css`

## Purpose
First screen. Says who EvoEarth Living supplies and to whom, in the catalogue's own
visual language, and offers the two actions.

## Content (ref spec 13)
- Kicker (small Fraunces italic, not an eyebrow): "Guest amenities, made to your brand"
- `<h1>`: "The bathroom shelf, considered." *(placeholder — confirm with client)*
- Sub (1 sentence): "Dry, wet and aroma amenities for hotels, resorts, spas, hospitals and
  the businesses that supply them — stocked ranges or private-label."
- Buttons: `Enquire on WhatsApp` (primary, `data-wa`), `Download catalogue` (`data-catalogue`)
- Placeholder image: framed product-tray shot, `assets/img/placeholders/scene.svg`,
  alt "EvoEarth Living amenity kit on a tray". Real shot: `assets/img/photos/home/hero.jpg`
  (1280×1600) — art direction + generation prompt in **spec 14**.

## Structure / markup
```
<section id="hero" class="hero split">
  <div class="hero__text">
    <p class="kicker">…</p>
    <h1>…</h1>
    <p class="lede">…</p>
    <div class="btn-row"> … two <a> … </div>
  </div>
  <figure class="hero__media framed">
    <img … width="1280" height="1600" fetchpriority="high">
  </figure>
</section>
```

## Visual design
- Full `--ink` field, edge to edge, min-height `min(88vh, 760px)`.
- `.split`: text left (vertically centered), tall framed image right. Kraft `1px` frame + inset.
- `<h1>` Fraunces `--step-4`, wght ~360, line-height 1.03. No word-level colour accent.
- Lede `--step-1`, muted paper, `max-width: 34ch`.
- Buttons on the dark field: primary = `--kraft` fill / `--ink` text; secondary = kraft
  hairline outline / paper text. No `→` glyph in labels.

## Responsive
< 60rem: single column, image first at `aspect-ratio: 4/5` capped `420px` tall, then text.
< 40rem: `min-height` drops to `auto`, tighten button row to full-width stacked.

## Motion
One reveal on load only (see spec 09 stub): text lines + image fade/rise 12px, staggered,
`--dur`, once. Skipped entirely under reduced-motion (final state rendered).

## Accessibility
- Single `<h1>` on the page. Buttons are `<a>` with real `href` built by `contact.js`.
- Image has meaningful alt; decorative frame is CSS.
- Contrast: paper & kraft on ink both pass.

## Acceptance criteria
- [ ] `h1` is the only h1 on home.
- [ ] Both CTAs resolve (wa.me + `/catalogue/evoearth-catalogue.pdf`).
- [ ] No layout shift on font swap (image has width/height, text reserves space).
- [ ] Screenshots 390 / 768 / 1440.
