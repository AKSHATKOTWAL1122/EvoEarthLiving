# Spec 17: Video Hero (3 clips)

**Status:** spec'd — placeholder assets, real videos pending
**Appears on:** home, directly below the nav (desktop); mobile, directly below the
3-zone header (before the nav panel content)
**Depends on:** 00, 01
**Files touched:** `index.html`, `css/layers/components.css`, new
`js/modules/video-hero.js`, `assets/video/` (new directory)

## What this is
Three HD video clips with audio, shown as a row (desktop) / stack or swipe (mobile),
each showcasing product use. Clicking a video navigates to its mapped category.
**No video files exist yet** — this spec defines the container, behaviour, and
mapping now; real assets drop in later, same pattern as spec 14 photography.

## Structure / markup
```
<section class="video-hero" aria-label="Product showcase">
  <button class="video-hero__item" data-video-target="/products/dry-amenities.html">
    <video muted loop playsinline poster="/assets/video/dry-poster.jpg">
      <source src="/assets/video/dry.mp4" type="video/mp4">
    </video>
    <span class="video-hero__label">Dry Amenities</span>
    <span class="video-hero__sound-toggle" aria-label="Unmute">…</span>
  </button>
  <!-- × 3, mapped to Dry / Wet / Aroma -->
</section>
```
- **Mapping (default, revisit if you want Gifting instead of one of the three):**
  video 1 → Dry Amenities, video 2 → Wet Amenities, video 3 → Aroma Essentials.
  Gifting is newer and has no dedicated video slot yet — add a 4th slot later if
  wanted, don't force a 4-video row now.
- Whole card is the click target (`data-video-target`), not just a small "play"
  icon — matches "when clicked, appropriate category should open."

## Audio & autoplay — the real constraint
Browsers block autoplay-with-sound. "3 HD videos with audio" that also need to
autoplay on page load is not achievable without a click — the brief needs one
resolved:
- **Default behaviour:** videos autoplay **muted + looped** (like the rest of the
  web handles hero video), each with a small unmute control. Clicking the video
  body still navigates to the category; the unmute control is a separate small
  hit-target that toggles sound without navigating.
- This is the standard pattern (matches how Kimirica-tier sites actually behave
  despite marketing copy saying "with audio") — flag if you specifically want
  tap-to-play-with-sound-first instead, which is a bigger UX change (videos would
  need to *not* autoplay, showing a poster + play button first).

## Behaviour (`video-hero.js`)
- IntersectionObserver: play when ≥50% in viewport, pause when scrolled out
  (bandwidth/battery courtesy, standard practice).
- `prefers-reduced-motion`: videos do not autoplay; poster image shown with a
  manual play control.
- Click on the card body → navigate to `data-video-target`. Click on the
  sound-toggle → `event.stopPropagation()`, toggles `video.muted`.
- No-JS fallback: `<video controls poster>` still plays inline (native controls),
  and the card is still a real `<a>`-wrapped link so navigation works either way —
  build as an anchor wrapping the video, not a `<button>`, to keep this true.

## Visual design
- Full-width row, 3 equal columns desktop; stacked or horizontally swipeable on
  mobile (decide against real footage — vertical vs. landscape source video changes
  this).
- Label: small Hanken kicker bottom-left over a subtle gradient scrim (contrast
  safety, matches the `--grad-*` depth-cue rule already used elsewhere — not
  decorative, functional for text legibility).
- No new colours — scrim uses existing `--ink` at low opacity.

## Performance
- `poster` image required per video (first-frame-quality still, part of spec 14's
  eventual shot list) so there's no blank flash before video data loads.
- Lazy-load: `preload="metadata"` until in viewport, then swap to real playback.
- Keep clips short (6–10s loop) and compressed — this is a static site with no CDN
  video pipeline; oversized files will hurt the performance budget (spec 11).

## Open / pending
- [ ] **Blocked on you:** the 3 actual video files (+ posters).
- [ ] Confirm autoplay-muted-with-unmute vs. tap-to-play-with-sound (see above).
- [ ] Confirm mapping (Dry/Wet/Aroma) or swap one slot for Gifting.
- [ ] Mobile layout: stacked cards vs. swipeable row — decide once real aspect
      ratios are known.

## Acceptance criteria
- [ ] Works with JS off (native `<video controls>`, real `<a>` navigation).
- [ ] `prefers-reduced-motion` respected (no autoplay).
- [ ] Each card navigates to the correct category on click.
- [ ] No layout shift before video/poster loads (explicit aspect-ratio reserved).
- [ ] Lighthouse: video weight doesn't blow the performance budget (spec 11).
