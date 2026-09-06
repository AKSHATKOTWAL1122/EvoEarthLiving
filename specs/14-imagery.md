# Spec 14: Imagery — art direction + generation prompts

**Status:** spec'd (awaiting client assets)
**Appears on:** all 4 pages
**Depends on:** 00 (palette), 02, 04, 05
**Files touched:** `index.html`, `products/*.html`, `js/data/products.js`,
`assets/img/photos/**`

## Purpose
Every image on the site is currently a placeholder SVG (`assets/img/placeholders/`).
Photography is the single biggest lever on the "$10K, not a template" grade
(checklist #5) — see `specs/GRADE.md`. This spec is the brief the client shoots or
generates against, and the map of where each file drops in.

Reference site (client-supplied, `References/Websites.txt`): **kimirica.shop**.
Take from it: still-life product photography in a curated setting (never floating on
pure white), one atmospheric hero per section, consistent light and surface across
every shot. Do **not** take: model photography, price/badge overlays, bright retail
lighting.

## Art direction

One consistent set. If any shot looks like it came from a different shoot, redo it.

- **Palette on set:** warm near-black brown (`#2b2119`) and off-white (`#efece6`)
  surfaces; kraft / amber / frosted-glass packaging; brass or bamboo hardware.
  No cool greys, no blue-white, no saturated colour props.
- **Light:** single soft daylight source, low and raking, from one side. Soft
  shadows with direction — not flat, not dramatic. Morning/overcast quality.
- **Surface:** matte stone, limewash plaster, unlacquered wood, or brushed brass
  tray. Nothing glossy or reflective enough to throw highlights.
- **Styling:** sparse. Two or three objects per frame, generous negative space,
  one out-of-focus botanical or linen element at most. No clutter, no flat-lay
  grids of ten items.
- **Packaging:** unbranded / blank-label (labels get added in artwork later). No
  visible third-party marks — matches the "generic only" content rule.
- **Finish:** subtle film grain, true-to-life colour, gentle contrast. No HDR, no
  heavy vignette, no colour-graded "moody" filter.
- **Absolutely no text, logos, watermarks, or people in frame.**

## Image slots

| Slot | File | Pixels | Aspect | Wired in | How it's swapped |
|------|------|--------|--------|----------|------------------|
| Home hero | `assets/img/photos/home/hero.jpg` | 1280×1600 | 4:5 | `index.html` `#hero .hero__media img` | edit `src` (currently `placeholders/scene.svg`) |
| Range card ×3 | `assets/img/photos/{dry,wet,aroma}/card.jpg` | 800×1000 | 4:5 | `js/data/products.js` → `heroImage` per group | set `heroImage` to the real path |
| Category hero ×3 | `assets/img/photos/{dry,wet,aroma}/hero.jpg` | 1600×900 | 16:9 | `products/{slug}.html` `.cat-hero .split__media img` | edit `src` in each of the 3 files |
| Item card ×43 | `assets/img/photos/{group}/items/<name>.jpg` | 800×800 | 1:1 | `js/data/products.js` → `image` per item | set each item's `image` |
| OG image | `assets/og/evoearth-og-1200x630.png` | 1200×630 | — | `<head>` all pages | already a placeholder; refresh when hero shot lands |

Item count: **dry 25 · wet 11 · aroma 7** = 43. See "Phasing" below — 43 individual
shots is not a blocker for launch.

## Delivery format
- `.jpg`, sRGB, quality ~80, long edge ≤ 1600px, each file **< 250 KB**
  (hero ≤ 400 KB). Client can also send `.webp`; keep a `.jpg` fallback name.
- Exact pixel dimensions above so `width`/`height` attrs stay correct and there's
  no layout shift (spec 11 acceptance criterion).
- Name item files after the product `name` in `js/data/products.js`, lowercased,
  spaces → `-`, `&` dropped (e.g. `Neem & aloe vera` → `neem-aloe-vera.jpg`).

## Phasing
1. **Launch set (7 shots):** home hero, 3 category heroes, 3 range cards. Site
   goes live on these; item grids keep the placeholder SVG.
2. **Subcategory set (12 shots):** one representative still-life per subcategory,
   used for every item in that group's grid as an interim (small code change to
   fall back per-subcategory). Optional.
3. **Full item set (43 shots):** per-item photography, final state.

---

## Generation prompts

Base style string (prepend or append to every prompt):

> Editorial still-life product photograph. Single soft raking daylight from the
> left, matte surfaces, warm near-black brown and off-white palette, kraft and
> frosted-glass packaging with blank unbranded labels, brass and bamboo details.
> Generous negative space, two or three objects only. Subtle film grain,
> true-to-life colour, gentle contrast. No text, no logos, no people. Shot on a
> 50mm lens, f/4.

### 1. Home hero — `home/hero.jpg` (1280×1600, portrait)
> A hospitality amenity tray on a limewash plaster ledge: a brushed-brass tray
> holding a blank frosted-glass bottle, a wrapped bar of soap in kraft paper, a
> bamboo toothbrush and comb, and a small unlabelled amber diffuser. One
> out-of-focus dried botanical stem to the right. Vertical composition, tray
> lower-third, plaster wall filling the space above. Warm brown wall, off-white
> objects. [base style]

### 2a. Dry Amenities — category hero — `dry/hero.jpg` (1600×900)
> Overhead-angled arrangement on warm brown stone: a bamboo toothbrush, a
> wheatstraw comb, a kraft-wrapped shaving kit, a folded cotton slipper, and a
> paper-sleeved vanity kit, spaced apart on a pale linen runner. Horizontal,
> objects left-of-centre, empty stone to the right. [base style]

### 2b. Dry Amenities — range card — `dry/card.jpg` (800×1000, portrait)
> Close crop: a single bamboo toothbrush and a kraft-paper comb sleeve resting on
> an off-white stone slab against a warm brown background. Tight vertical
> composition, lots of headroom. [base style]

### 3a. Wet Amenities — category hero — `wet/hero.jpg` (1600×900)
> Three blank frosted-glass pump bottles of different heights and one wrapped bar
> of soap on a wet dark-brown stone shelf, water beading on the surface. Soft
> daylight from the left, horizontal, bottles grouped left, reflection and empty
> stone right. [base style]

### 3b. Wet Amenities — range card — `wet/card.jpg` (800×1000, portrait)
> A single blank frosted-glass amenity bottle with a brass pump, one bar of
> kraft-wrapped soap leaning against its base, on off-white stone against a warm
> brown background. Vertical, generous headroom. [base style]

### 4a. Aroma Essentials — category hero — `aroma/hero.jpg` (1600×900)
> A reed diffuser in a blank amber glass vessel, an unlit beeswax candle in a
> frosted holder, and a matte ceramic room-spray bottle on a pale plaster ledge,
> a thin ribbon of incense smoke rising from frame edge. Warm low light,
> horizontal, objects centre-left. [base style]

### 4b. Aroma Essentials — range card — `aroma/card.jpg` (800×1000, portrait)
> A single amber-glass reed diffuser with natural rattan reeds on an off-white
> stone plinth against a warm brown background. Vertical, soft shadow, headroom
> above. [base style]

### 5. Subcategory still-lifes (Phase 2, optional) — `{group}/items/_subcat-<name>.jpg` (800×800, square)
Use the base style, square crop, one or two objects representative of the
subcategory on off-white stone against warm brown. Subcategories, from
`js/data/products.js`:

- **dry:** Dental Kit · Shaving Kit · Comb & Hair Oil · Accessories · Intimate &
  Repair · Housekeeping · Spa Slippers
- **wet:** Soaps · Hair Care · Face & Body
- **aroma:** Aroma Care · Scented Candles

### 6. Full item set (Phase 3) — `{group}/items/<name>.jpg` (800×800, square)
One object, centred, on off-white stone against a warm brown background, soft
raking daylight, square crop, blank label. Item list is the `name` field of every
entry in `PRODUCT_GROUPS` (`js/data/products.js`) — 43 total.

---

## Integration checklist (when assets land)
- [ ] Files placed under `assets/img/photos/**` at the exact paths/sizes above.
- [ ] `index.html` hero `src` + `products/*.html` cat-hero `src` updated.
- [ ] `js/data/products.js`: `SCENE`/`ITEM` constants replaced with real paths
      (per-group `heroImage`, per-item `image`).
- [ ] `alt` text reviewed — describe the products, not the styling.
- [ ] All files < 250 KB (hero < 400 KB); re-run spec 11 weight check.
- [ ] Refresh `assets/og/` from the home hero.
- [ ] Screenshots 390 / 768 / 1440; check no CLS on load.
- [ ] Re-grade checklist #5 in `specs/GRADE.md`.

## Acceptance criteria
- [ ] Launch set (7 images) present, correct dimensions, under weight budget.
- [ ] One consistent look across all shots (light direction, surface, palette).
- [ ] No text / logo / third-party mark / person in any frame.
- [ ] No layout shift when photos replace placeholders.
