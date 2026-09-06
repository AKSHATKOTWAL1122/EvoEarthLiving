# Spec 12: Accessibility

**Status:** built + reviewed (2026-09-06) — Lighthouse run still pending
**Appears on:** all pages
**Depends on:** 00–11
**Files touched:** all `*.html`, `css/layers/base.css`, `js/modules/nav.js`

## Targets
WCAG 2.1 AA. Lighthouse a11y 100. Keyboard-complete, screen-reader-sane.

## Structure
- One `<h1>` per page (home: hero; category: category name). Heading levels never skip.
- Landmarks: `banner` (header), `main#main`, `contentinfo` (footer). Each `<nav>` labelled
  (`Primary`, `Breadcrumb`, `Footer`).
- Skip link `→ #main`, first focusable, visible on focus.

## Keyboard
- Visible focus everywhere: `:focus-visible` → 2px `--kraft` outline, 2px offset; works on
  both `--ink` and `--paper` (verify on buttons that already use kraft fill — use `--paper` ring there).
- Products dropdown: `button` toggles `aria-expanded`; `Enter`/`Space` open; `ArrowUp/Down`
  move; `Home`/`End` jump; `Esc` closes → focus to button; `Tab` past last item closes.
- Mobile nav panel: focus moves into panel on open, `Esc` / close button / link exits,
  focus returns to `.nav-toggle`. Background `inert` or focus-trapped.
- No positive `tabindex`. No keyboard traps.

## Screen reader
- Item images: `alt="<item name>"` for now; when real photos arrive, alt describes the
  photo, and purely decorative shots get `alt=""`.
- Framed-image decoration is CSS only.
- Breadcrumb: `<nav aria-label="Breadcrumb"><ol>`, current page `aria-current="page"`, not a link.
- Current nav item / category: `aria-current="page"`.
- `data-subcats` gets `aria-busy="true"` during render, removed after.
- Icron-free: no icon fonts; any SVG glyph is `aria-hidden` with a text label alongside.

## Colour & motion
- Body text contrast ≥ 4.5:1; large text ≥ 3:1; verify muted-on-paper and muted-on-ink,
  and brass `--accent` used for text (darken if it fails).
- Never colour-only signalling: nav current state also has an underline; card focus also
  has a frame change.
- `prefers-reduced-motion: reduce` respected everywhere (spec 09).

## Forms
None on the site — nothing to validate.

## Acceptance criteria
- [x] axe-core 4.10 (WCAG 2.1 AA): 0 violations on all 4 pages (2026-09-06).
- [x] Keyboard walk: dropdown (ArrowDown from button, ArrowUp/Down, Home/End, Esc → button,
      ArrowUp at first item closes, Tab past last closes) and mobile panel (focus moves in on
      open, Esc / link / toggle close, focus returns to `.nav-toggle`) verified in Playwright.
- [x] a11y tree: banner / main / contentinfo + 3 labelled navs (Primary, Breadcrumb, Footer),
      single h1 per page, no heading-level skips.
- [x] Contrast spot-checks recorded in STATUS.
- [ ] Lighthouse a11y score (not yet run — needs a full browser profile).

## Implementation notes
- Mobile panel open state sets `el.inert = true` on `#main`, `.site-footer`, `.wordmark`
  and `.header-cta` (`js/modules/nav.js` → `initMobilePanel`); cleared on close and on
  crossing the desktop breakpoint.
- `css/main.css` `@import` paths are root-relative (`/css/layers/…`). Chrome's preload
  scanner resolves `@import` URLs against the document, not the sheet, so bare relative
  paths caused one 404 per layer before the real load corrected itself.
