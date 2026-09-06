# Spec 11: Performance, Meta & SEO

**Status:** spec'd
**Appears on:** all pages
**Depends on:** 00–08
**Files touched:** all 4 `*.html` (`<head>`), `robots.txt`, `sitemap.xml`, `assets/og/`, `assets/favicon/`

## Per-page `<head>`
| Page | `<title>` | meta description |
|------|-----------|------------------|
| home | EvoEarth Living — Guest amenities for hotels & institutions | Dry, wet and aroma guest amenities for hotels, resorts, spas and hospitals. Stocked ranges or private-label. Warehousing in Srinagar & Jammu. |
| dry | Dry Amenities — EvoEarth Living | Dental, shaving, grooming and housekeeping amenities: bamboo, wheatstraw or standard. Private-label ready. |
| wet | Wet Amenities — EvoEarth Living | Soaps, hair care and face & body care in bottles, tubes and sachets. Custom fragrance and labels. |
| aroma | Aroma Essentials — EvoEarth Living | Reed and electric diffusers, room sprays and beeswax-soy candles for lobbies, rooms and spa areas. |

- `<link rel="canonical" href="https://evoearth.living/…">` per page (trailing form consistent).
- `<meta name="robots" content="index,follow">`.
- Open Graph + Twitter: `og:title`, `og:description`, `og:type=website`, `og:url`,
  `og:image` → `/assets/og/evoearth-og-1200x630.png` (placeholder now), `twitter:card=summary_large_image`.
- `<meta name="theme-color" content="#2B2119">`.
- Favicons: `/assets/favicon/` — `favicon.ico`, `icon.svg`, `apple-touch-icon.png` (placeholders,
  swapped when the logo lands).
- Language: `<html lang="en">`.

## Structured data
- Home only: JSON-LD `Organization` — name, url, logo (placeholder path), `areaServed: IN`,
  `contactPoint` (WhatsApp/phone, `contactType: sales`), `address` for Srinagar & Jammu
  (`addressRegion: Jammu and Kashmir`, `addressCountry: IN`). No fake `foundingDate`/`numberOfEmployees`.
- Category pages: `BreadcrumbList` JSON-LD matching the visible breadcrumb.

## Performance
- Fonts: 2 preloaded `.woff2` cuts, `font-display: swap`, no CDN.
- CSS: one `main.css` with `@import`ed layers (acceptable for this size) OR concatenated —
  keep `@import` for authoring clarity; total CSS target < 25KB gzipped.
- JS: ES modules, `type="module"` (defer by default), no libraries. Target < 10KB.
- Images: every `<img>` has explicit `width`/`height`, `loading="lazy"` except hero
  (`fetchpriority="high"`), `decoding="async"`. Placeholders are lightweight SVG.
- No render-blocking third-party anything. No analytics unless the client asks.
- `robots.txt`: allow all, point to `sitemap.xml`.
- `sitemap.xml`: the 4 URLs with `lastmod`.

## Targets (Lighthouse or manual proxy)
Performance ≥ 95 · Accessibility 100 · Best Practices ≥ 95 · SEO 100.
Each page transfer < 1MB excluding the catalogue PDF.

## Acceptance criteria
- [ ] Unique title + description + canonical on all 4 pages.
- [ ] OG tags present; OG image path resolves (placeholder ok).
- [ ] JSON-LD validates (Organization + BreadcrumbList).
- [ ] No external network requests except none (fully self-hosted).
- [ ] `sitemap.xml` + `robots.txt` present and correct.
