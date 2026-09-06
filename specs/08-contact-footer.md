# Spec 08: Contact & Footer

**Status:** spec'd
**Appears on:** all pages (shared markup)
**Section(s) / selector:** `#contact`, `footer.site-footer`
**Depends on:** 00, 13, `js/data/site.js`, `js/modules/contact.js`
**Files touched:** all 4 `*.html`, `js/modules/contact.js`, `css/layers/components.css`

## Purpose
The conversion block and the site footer, identical everywhere. All values from `site.js`.

## Content
`#contact` (home) / condensed contact in footer (all pages):
- `h2`: "Talk to us"
- Line: "Send your requirement on WhatsApp, or email it over. We reply the same day."
- **WhatsApp** button (primary) — `https://wa.me/919211379536?text=<SITE.waMessage encoded>`
- **Call** link — `tel:+919797097342`, shown as "+91 97970 97342"
- **Email** link — `mailto:evoearthliving@gmail.com?subject=<SITE.mailSubject>&body=<SITE.mailBody>`
- **Download catalogue** — `/catalogue/evoearth-catalogue.pdf` (opens in new tab, `rel="noopener"`)
- Location: "Srinagar · Jammu, Jammu & Kashmir"

Footer (all pages):
- Wordmark (repeat), one-line descriptor
- Column of links: the four nav items + the three category pages
- Contact mini-block: WhatsApp, phone, email
- Legal row: "© <current year> EvoEarth Living. All rights reserved." + short privacy note:
  "We only use the details you send to reply to your enquiry."
- Back-to-top link (`#top`)

## `contact.js`
On load, for every `[data-wa]`, `[data-catalogue]`, `[data-call]`, `[data-email]`:
build the correct `href` (and `target`/`rel` for catalogue), set text if empty.
Encode `waMessage` / `mailBody` with `encodeURIComponent`. Idempotent.
Year injected into `[data-year]`.

## Visual design
- `#contact`: `--ink` field, split — text left, action stack right (buttons full-width in a
  narrow column). WhatsApp = solid kraft; others = kraft hairline text links.
- Footer: `--ink-2` (a shade off the sections above it), kraft hairline top. Fraunces only
  for the wordmark; everything else Hanken `--step--1`. Muted paper text, links underline on hover.
- No social icons (none provided). No newsletter form.

## Responsive
< 60rem: `#contact` stacks, buttons full width. Footer collapses to one column, order:
wordmark → links → contact → legal → back-to-top.

## Accessibility
- `tel:` / `mailto:` / `wa.me` links have descriptive text, not raw URLs.
- Catalogue link states "(PDF)" in text or `aria-label`.
- `footer` = `contentinfo`; nav inside footer has `aria-label="Footer"`.
- Back-to-top moves focus to `#main` or `#top`.

## Acceptance criteria
- [ ] Every contact value traces to `site.js` — grep finds no second copy.
- [ ] wa.me + mailto params correctly URL-encoded.
- [ ] Catalogue link → 200, opens new tab.
- [ ] Year is dynamic.
- [ ] Footer identical on all 4 pages.
