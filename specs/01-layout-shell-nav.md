# Spec 01: Layout Shell & Nav

**Status:** spec'd — REWRITTEN 2026-09-20, supersedes the "Products ▾" single-dropdown
version. Old version's behaviour patterns (dropdown timing, focus handling, sticky
header) carry over; the menu structure itself changed.

**Appears on:** all pages (shared markup, duplicated per file)
**Section(s) / selector:** `.skip-link`, `header.site-header`, `nav.primary`,
`.header-contact`, `.mobile-nav`, `.search`, `footer.site-footer`, `.container`
**Depends on:** 00
**Depends on / feeds:** 16 (Gifting), 17 (video hero), 18 (search)
**Files touched:** all page `*.html`, `css/layers/{layout,components}.css`,
`js/modules/nav.js`, `js/main.js`, `js/data/products.js` (submenu images), possibly a
new `js/data/gifting.js`

## Purpose
The frame that makes every page feel like one site. Replaces the single "Products"
dropdown with five top-level items, each category item opening a **photo-menu**
(sub-menu shown as image boxes, not plain text links) — see spec 14 for the image
brief this now also covers for submenu thumbnails.

## Desktop structure / markup (≥ 60rem)
```
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <a class="wordmark" href="/">EvoEarth <span>Living</span></a>

  <nav class="primary" aria-label="Primary">
    <ul>
      <li class="has-menu">
        <button aria-expanded="false" aria-controls="menu-dry">Dry Amenities</button>
        <ul id="menu-dry" class="submenu submenu--photo" hidden>
          <li><a href="/products/dry-amenities.html#dental-kit"><img …>Dental Kit</a></li>
          <li><a href="…#shaving-kit"><img …>Shaving Kit</a></li>
          <li><a href="…#combs">Combs</a></li>
          <li><a href="…#accessories">Accessories</a></li>
          <li><a href="…#spa-slippers">Spa Slippers</a></li>
          <li><a href="…#essentials">Essentials</a></li>
          <li><a href="…#housekeeping">Housekeeping</a></li>
        </ul>
      </li>
      <li class="has-menu">
        <button aria-expanded="false" aria-controls="menu-wet">Wet Amenities</button>
        <ul id="menu-wet" class="submenu submenu--photo" hidden>
          <li>Soaps</li><li>Hair Care</li><li>Face and Body Care</li>
        </ul>
      </li>
      <li class="has-menu">
        <button aria-expanded="false" aria-controls="menu-aroma">Aroma Essentials</button>
        <ul id="menu-aroma" class="submenu submenu--photo" hidden>
          <li>Reed Diffusers</li><li>Electric Diffusers</li>
          <li>Room Freshener Spray</li><li>Scented Candles</li>
        </ul>
      </li>
      <li class="has-menu">
        <button aria-expanded="false" aria-controls="menu-gifting">Gifting</button>
        <ul id="menu-gifting" class="submenu submenu--photo" hidden>
          <li>Corporate Gifting</li><li>Hotel Gifting</li>
          <li>Wedding Gifting</li><li>Festival Gifting</li>
        </ul>
      </li>
      <li><a href="/#contact">Contact Us</a></li>
    </ul>
  </nav>

  <div class="header-contact">
    <a data-wa href="#">+91 92113 79536</a>
    <a href="mailto:evoearthliving@gmail.com">evoearthliving@gmail.com</a>
  </div>

  <button class="nav-toggle" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
</header>
<main id="main"> … page content … </main>
<footer class="site-footer"> … see spec 08 … </footer>
```

**Important scope note — "Contact Us" is not a new page or a form.** It routes to the
existing `#contact` section (footer contact block, spec 08). This project's CTA rule
(`CLAUDE.md`: no contact form, no booking link) still stands — `Contact Us` in the nav
is a same-page/cross-page anchor link, same mechanism as the old "Contact" item.

**Header-right contact strip is additive, not a replacement.** The existing hero/page
CTAs (`WhatsApp enquiry` primary button + `Download catalogue`) stay exactly as
locked. The phone number + email in the header top-right are a *persistent* contact
surface per the client brief, on top of those CTA buttons. Clicking the phone number
opens WhatsApp (`data-wa`, same mechanism as `.btn--wa`, prefilled generic enquiry
message) — it does **not** trigger a native tel: dialer.

## Photo submenus ("boxes")
- Each submenu item is a box: small image (from spec 14 subcategory shots, or interim
  placeholder) + label, not a plain text link. Roughly card-grid inside the panel
  (2–4 columns depending on subcategory count).
- This **supersedes** `specs/REVIEW-kimirica.md` item 9 ("mega-menu with imagery —
  SKIP for now"). The taxonomy question that justified skipping it is now moot — the
  client has asked for it directly. Update that file's status (done separately below).
- Image source: reuse subcategory-level imagery once shot per spec 14; until then, the
  existing item placeholder SVG stands in, per the placeholder-now/real-assets-later
  pattern used everywhere else on this project.

## Behaviour (`nav.js`)
Unchanged from the prior spec except there are now 4 photo-menu triggers (Dry, Wet,
Aroma, Gifting) instead of 1:
- **Dropdown (desktop):** click toggles `hidden` + `aria-expanded`. Opens on
  `mouseenter` after 80ms, closes on `mouseleave` (180ms close-grace + invisible
  bridge, per the Session 2 hover-gap fix — still applies here). `Escape` closes and
  returns focus to the button. `ArrowDown`/`ArrowUp`/`Home`/`End` move between boxes;
  `Tab` out closes. Outside `pointerdown` closes.
- Only one submenu open at a time — opening a second closes the first.
- **Sticky header:** unchanged (`position: sticky`, `.is-scrolled` after 4px).
- Smooth-scroll for same-page `#` links unless `prefers-reduced-motion`.

## Mobile structure (< 60rem)
Three-zone header, matching the brief's "hamburger / wordmark / search" layout
(Kimirica-style):
```
<header class="site-header site-header--mobile">
  <button class="nav-toggle" aria-expanded="false" aria-controls="mobile-nav">
    <!-- 3-line "dash" icon -->
  </button>
  <a class="wordmark" href="/">EvoEarth Living</a>
  <button class="search-toggle" aria-expanded="false" aria-controls="mobile-search">
    <!-- search icon -->
  </button>
</header>
```
- Tapping the search icon reveals the search bar (spec 18) either inline (pushes
  header down) or as a top sheet — decide during build against real content length.
- Below the header: the 3-video block (spec 17), full width.
- Below the videos: the mobile nav panel content, **in this exact order** (per
  brief):
  1. EvoEarth Living → home
  2. Dry Amenities
  3. Wet Amenities
  4. Aroma Essentials
  5. Gifting
  6. About Us

  **Note the deliberate mismatch with desktop:** desktop's last item is `Contact Us`;
  mobile's is `About Us`. This is what the brief specifies — not an error. Contact
  info is already persistent (header phone/email is dropped on mobile per Kimirica
  reference, so contact stays reachable via the footer + the always-present WhatsApp
  CTA). Flag to the client if this asymmetry is unintentional; ship as specified
  otherwise.
- Each of Dry/Wet/Aroma/Gifting expands in place (details-style, not a flyout) to the
  same photo-box subcategories as desktop, which link to the respective page/anchor.
- Body scroll locked while the panel is open. `Escape` / link click / outside tap
  closes, `inert` on `#main`/footer while open (carried over from the current
  implementation).

## Visual design
- Header on `--ink`, text `--paper`, hairline `--line-ink`. Height ~64px, ~56px
  scrolled (desktop). Mobile header shorter, fixed (not shrinking on scroll, to keep
  the 3-zone layout stable).
- Wordmark: Fraunces, `Living` in italic at 0.7em, baseline-aligned. Not all caps.
- Submenu panel: `--ink-2` panel, `--radius`, kraft hairline, 8px offset below the
  button. Photo boxes: consistent aspect ratio, `--radius-sm`, label below image in
  Hanken 500.
- `header-contact` text: Hanken, slate/paper, phone number underlines on hover
  (signals it's a link, not a static text). No loud button styling here — it's
  ambient, the `.btn--wa` CTA stays the one loud element.
- `.nav-toggle`, `.search-toggle`: simple line icons, `--paper`, ≥ 44px tap target.

## Responsive
Desktop (≥ 60rem): wordmark left · nav (5 items) center · phone/email right ·
hamburger hidden.
Mobile (< 60rem): hamburger left · wordmark center · search icon right · full nav
lives in the panel below the videos, not the header itself.

## Accessibility
- Skip link first in DOM, visible on focus.
- `header` = `banner`, `main`, `footer` = `contentinfo`. One `<h1>` lives in page
  content, not the header.
- Each photo-dropdown is a button + `aria-expanded` + `aria-controls`; submenu is a
  `<ul>` of `<a>` (image is decorative `alt=""`, label carries the text).
- Focus ring: 2px `--kraft` offset 2px, visible on `--ink` and `--paper`.
- Header phone/email links have real `href`s (`tel:`-free `data-wa` link + `mailto:`)
  so they work with JS off / without a WhatsApp-capable device (mailto always works;
  the WhatsApp link degrades to a normal `https://wa.me/…` navigation).

## Acceptance criteria
- [ ] Keyboard: open each of the 4 photo dropdowns, arrow through boxes, Esc restores
      focus, no trap.
- [ ] Works with JS disabled — all submenu links reachable (not `hidden` under
      `.no-js`).
- [ ] Mobile panel locks scroll, closes 3 ways, restores focus, order matches spec
      exactly (EvoEarth Living / Dry / Wet / Aroma / Gifting / About Us).
- [ ] Header contact strip: phone → WhatsApp, email → mailto, both correct on all
      pages.
- [ ] Screenshots at 390 / 768 / 1440 recorded in STATUS.
- [ ] Header identical across all pages; current category marked `aria-current`.
- [ ] Logo/wordmark always links home, both breakpoints.
