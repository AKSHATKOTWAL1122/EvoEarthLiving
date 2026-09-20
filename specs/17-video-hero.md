# Spec 17: Video Hero (3 clips, one-at-a-time, arrow-only)

**Status:** built 2026-09-20, **revised three times same day**:
1. Original brief called for a 3-up row → changed to a full-width single-video
   stage, one clip at a time, auto-advance on end, prev/next arrows + dots.
2. User flagged it "looks like a video player" — removed everything but a
   single next arrow: no native controls, no sound toggle, no dots, no prev.
   Posters redrawn without a play-button icon (that was the biggest offender).
3. User saw it as 3 stacked clips (turned out to be `evoearth.living` still
   resolving to the old Hostinger placeholder, or a non-server preview where
   `type="module"` scripts don't run) — made "one full-width clip, nothing
   stacked" the plain-CSS default instead of something JS turns on, so it
   can never regress to stacked even if JS fails to load or run.
This is the current, final shape.
**Appears on:** home, directly below the header/nav.
**Depends on:** 00, 01
**Files touched:** `index.html`, `css/layers/components.css`,
`js/modules/video-hero.js`, `assets/video/` (posters only — clips pending)

## What this is
One full-width video plays at a time (Dry → Wet → Aroma, looping back to Dry),
each showcasing product use. The active clip auto-advances to the next when it
ends; the *only* visible/interactive control is a single "next" arrow — no
scrubber, no play/pause, no fullscreen, no sound toggle, no dots. It should
read as ambient brand footage, not an embedded video player. Clicking the clip
body navigates to its mapped category page.
**No video files exist yet** — this spec defines the container, behaviour, and
mapping now; real assets drop in later, same pattern as spec 14 photography.

## Structure / markup
```
<section class="video-hero" aria-label="Product showcase">
  <div class="video-hero__stage" data-video-stage>
    <a class="video-hero__slide is-active" href="/products/dry-amenities.html"
       data-video-label="Dry Amenities" aria-label="Dry Amenities — watch and shop">
      <video class="video-hero__video" autoplay muted loop playsinline preload="metadata"
             poster="/assets/video/dry-poster.svg">
        <source src="/assets/video/dry.mp4" type="video/mp4">
      </video>
    </a>
    <!-- × 3 slides total, mapped to Dry / Wet / Aroma -->

    <span class="video-hero__scrim" aria-hidden="true"></span>
    <span class="video-hero__label" data-video-label-out>Dry Amenities</span>
    <button class="video-hero__nav video-hero__nav--next" data-video-next aria-label="Next video">…</button>
  </div>
</section>
```
- **Mapping (unchanged):** slide 1 → Dry Amenities, slide 2 → Wet Amenities,
  slide 3 → Aroma Essentials. Gifting has no slot yet.
- The slide itself is a real `<a>` (whole body is the click target) so
  navigation works with or without JS.
- **Single-slide layout is plain CSS, not something JS turns on.** Each
  `.video-hero__slide` is absolutely positioned filling the stage; only the
  one carrying `.is-active` (slide 1, in the markup, before any JS runs) is
  `opacity: 1` / interactive. This means the "one full-width clip, nothing
  stacked" look is the actual default — it can't regress to a stacked or
  broken layout just because a script failed to load or `type="module"`
  isn't supported in that context (e.g. a `file://` preview).
- Only the active slide's `<video>` has `autoplay` in the markup (the other
  two start with `preload="none"`, no autoplay) — no point spending bandwidth
  autoplaying clips that are invisible without JS.
- The next arrow ships `hidden` in the markup and is a JS-only feature —
  `video-hero.js` un-hides it once it's actually wired up, so a no-JS visitor
  is never shown a control that does nothing.

## Audio & autoplay
Videos autoplay **muted** (browsers block autoplay-with-sound; muted-autoplay
needs no user gesture, which is also what makes the no-JS single-clip default
work). No sound control — matching "no user control except the next arrow,"
visitors who want sound go to the category page.

## Behaviour (`video-hero.js`)
- On init: strips the `loop` attribute from every `<video>` (loop restarts
  before `ended` fires, so it has to go for auto-advance to work), un-hides
  the next arrow.
- `ended` on the active `<video>` → advance to the next slide (wraps after the
  last). No fixed timer — the clip's own runtime paces the sequence.
- The next-arrow calls the same `show(index)` the `ended` handler uses —
  pauses and rewinds the outgoing video, plays the incoming one (if in view
  and motion is OK), sets its `preload` to `auto`.
- IntersectionObserver on the stage: play the active video when ≥50% in view,
  pause when scrolled out (bandwidth/battery courtesy).
- `prefers-reduced-motion: reduce` → never calls `.play()`; the next arrow
  still switches which poster/slide is showing, it just never starts
  playback.
- No-JS fallback: the CSS default above — one clip (Dry Amenities), autoplay
  + loop, no arrow, real link.

## Visual design
- Full-bleed width (edge to edge of the viewport, outside `.container`).
  **Kept the border**: a 1px kraft (`--kraft`) hairline on the stage's top and
  bottom edge, matching the site's existing framed-media convention even
  though the stage itself runs full width.
- Aspect ratio: `21/9` capped at `max-height: 65vh` on desktop, `4/5` on
  mobile (≤60rem) — revisit once real footage is in hand.
- Label: bottom-left over a gradient scrim (contrast safety, same rule as the
  rest of the site's `--grad-*` depth cues — functional, not decorative).
- The only chrome: one small brass-bordered circle, bottom-right, holding the
  next-arrow glyph. No other buttons, dots, or overlays.
- Posters (`assets/video/{dry,wet,aroma}-poster.svg`) are a plain dark
  radial-gradient panel with an italic category kicker and brass corner
  ticks — deliberately **not** a "video placeholder" graphic (the first pass
  drew a play-button icon on the poster itself, which read as a stock video
  player and is exactly what got flagged).
- No new colours — scrim uses `--ink` at low opacity, everything else reuses
  `--kraft`/`--paper` tokens already in the palette.

## Performance
- Only the active/first slide has `poster` + `autoplay`; the other two sit at
  `preload="none"` until `show()` makes them active, so idle slides cost
  nothing until they're actually needed.
- Keep clips short (6–10s) and compressed — static site, no CDN video
  pipeline; oversized files will hurt the performance budget (spec 11).

## Open / pending
- [ ] **Blocked on you:** the 3 actual video files. Posters are placeholder
      SVGs (`assets/video/{dry,wet,aroma}-poster.svg`) — swap for real
      first-frame stills once spec 14 photography/video lands.
- [x] Autoplay-muted shipped as the default, no sound control by design.
- [x] Mapping shipped as Dry / Wet / Aroma, in that order.
- [x] One-at-a-time stage with auto-advance-on-end + a single next arrow,
      no other player chrome, single-slide layout as the plain-CSS default
      (not JS-gated) — final shape shipped 2026-09-20 after three revisions
      (3-up row → prev/next/dots/sound carousel → arrow-only → CSS-default
      single slide so it can't regress to stacked without JS).

## Acceptance criteria
- [x] Works with JS off (one clip — Dry Amenities — autoplay+loop, no
      controls, no arrow, real `<a>` navigation; confirmed the other two
      slides stay at `opacity: 0` / non-interactive) — Playwright-verified
      with JS requests blocked.
- [x] `prefers-reduced-motion` respected (no autoplay; next arrow still
      switches slides without ever calling `.play()`) — Playwright-verified.
- [x] Auto-advances to the next slide when the active video's `ended` event
      fires — Playwright-verified by dispatching `ended` synthetically (no
      real clips to let play out yet).
- [x] The next arrow is the only visible control — no native controls, sound
      toggle, dots, or prev button.
- [x] Each slide navigates to the correct category on click (real `<a href>`,
      no JS required).
- [x] No layout shift before video/poster loads (`aspect-ratio` reserved on
      the stage/slides).
- [ ] Lighthouse: video weight budget — not measurable yet, no real clips exist.
- [x] axe: 0 violations on `.video-hero` (1440 + 390 viewports).
