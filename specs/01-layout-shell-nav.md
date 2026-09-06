# Spec 01: Layout Shell & Nav

**Status:** spec'd
**Appears on:** all pages (shared markup, duplicated per file)
**Section(s) / selector:** `.skip-link`, `header.site-header`, `nav.primary`, `footer.site-footer`, `.container`
**Depends on:** 00
**Files touched:** all 4 `*.html`, `css/layers/{layout,components}.css`, `js/modules/nav.js`, `js/main.js`

## Purpose
The frame that makes four separate HTML files feel like one site: a slim sticky header
with the Products dropdown flow, a shared footer, and the page container / section rhythm.

## Structure / markup
```
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <a class="wordmark" href="/">EvoEarth <span>Living</span></a>
  <nav class="primary" aria-label="Primary">
    <ul>
      <li class="has-menu">
        <button aria-expanded="false" aria-controls="menu-products">Products</button>
        <ul id="menu-products" class="submenu" hidden>
          <li><a href="/products/dry-amenities.html">Dry Amenities</a></li>
          <li><a href="/products/wet-amenities.html">Wet Amenities</a></li>
          <li><a href="/products/aroma-essentials.html">Aroma Essentials</a></li>
        </ul>
      </li>
      <li><a href="/#who-we-serve">Who we serve</a></li>
      <li><a href="/#process">How ordering works</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
  </nav>
  <a class="btn btn--wa header-cta" data-wa>Enquire on WhatsApp</a>
  <button class="nav-toggle" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
</header>
<main id="main"> … page content … </main>
<footer class="site-footer"> … see spec 08 … </footer>
```
- On category pages the wordmark still points to `/`; the dropdown item for the current
  category gets `aria-current="page"`.
- `main` gets `data-category="dry|wet|aroma"` on category pages (read by `category.js`).

## Behaviour (`nav.js`)
- **Dropdown (desktop):** click toggles `hidden` + `aria-expanded`. Opens on `mouseenter`
  after 80ms, closes on `mouseleave`. `Escape` closes and returns focus to the button.
  `ArrowDown`/`ArrowUp` move between items; `Tab` out closes. Outside `pointerdown` closes.
- **Mobile (`< 60rem`):** `.nav-toggle` shows a full-height panel; Products is a plain
  expandable group (details-style), not a floating menu. Body scroll locked while open.
  `Escape` / link click / outside tap closes.
- **Sticky header:** `position: sticky; top: 0`. After 4px scroll add `.is-scrolled`
  (adds hairline bottom border + slight height reduction). No hide-on-scroll.
- **Active section (home only):** IntersectionObserver sets `aria-current="true"` on the
  matching nav link. Progressive enhancement — fine if JS absent.
- Smooth-scroll for same-page `#` links unless `prefers-reduced-motion`.

## Visual design
- Header on `--ink`, text `--paper`, hairline `--line-ink`. Height ~64px, ~56px scrolled.
- Wordmark: Fraunces, `Living` in italic at 0.7em, baseline-aligned. Not all caps.
- Submenu: `--ink-2` panel, `--radius`, kraft hairline, 8px offset below the button.
- Nav links: Hanken 500, underline appears on hover/focus (2px, `--kraft`), current page underlined.
- `.btn--wa`: solid `--kraft` fill, `--ink` text; the one loud element in the header.

## Responsive
Desktop: wordmark left · nav center-left · WhatsApp CTA right.
< 60rem: wordmark left · CTA + hamburger right · full nav in the panel; CTA also repeated
at the bottom of the panel. Tap targets ≥ 44px.

## Accessibility
- Skip link first in DOM, visible on focus.
- `header` = `banner`, `main`, `footer` = `contentinfo`. One `<h1>` lives in page content, not the header.
- Dropdown is a button + `aria-expanded` + `aria-controls`; submenu is a `<ul>`.
- Focus ring: 2px `--kraft` offset 2px, visible on `--ink` and `--paper`.

## Acceptance criteria
- [ ] Keyboard: open dropdown, arrow through, Esc restores focus, no trap.
- [ ] Works with JS disabled — dropdown links reachable (submenu not `hidden` when `.no-js`).
- [ ] Mobile panel locks scroll, closes 3 ways, restores focus.
- [ ] Screenshots at 390 / 768 / 1440 recorded in STATUS.
- [ ] Header identical across all 4 pages; current category marked.
