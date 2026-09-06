# $10K checklist — self-grade

First full grade: **2026-09-06**, after specs 00–13 built. Scale: strong / mixed / missing.

| # | Item | Grade | Notes |
|---|------|-------|-------|
| 1 | Point of view | **strong** | One direction held throughout: warm espresso field, kraft-paper hairline framing, serif display against grotesk body, generous whitespace. No competing ideas. |
| 2 | Typography | **strong** | Two families — Fraunces (display) / Hanken Grotesk (body). No Inter. Self-hosted variable `woff2`, preloaded. Deliberate 6-step fluid scale; display line-height 1.05 vs body 1.6; 62ch measure. |
| 3 | Colour | **strong**, 1 decision open | 4 roles + 2 tints + kraft, all catalogue-derived. Restrained. `--accent` (brass) is still a stub and unused — final accent choice deferred to the polish pass pending client references. |
| 4 | Hierarchy | **strong** | Kicker → h1 → lede pattern; 6-step size scale with matched weight steps; the eye lands in the right order on every section. |
| 5 | Imagery | **missing** | Every image is `scene.svg` / `item.svg` placeholder. No photography, no generated brand assets. Logo, favicon and OG image are all placeholders. Biggest single gap. |
| 6 | Motion | **mixed** | Reveal-on-scroll only (opacity + small translate), correctly disabled under `prefers-reduced-motion`. No micro-interactions, cursor effects, scroll-driven moments or button motion. Spec 09 is a deliberate stub pending client references. |
| 7 | Mobile | **strong** | Real mobile pass, not just fluid: breakpoint token changes (`--section-y`, `--frame-inset`), full-screen nav panel with scroll-lock + focus-in + `inert` + focus-return, Playwright-verified at 320 / 390 / 768 / 1440, specific fixes logged. |
| 8 | Invisible stuff | **mixed** | Good: self-hosted preloaded fonts, root-relative URLs, per-page title/desc/canonical/OG, Organization + BreadcrumbList JSON-LD, `robots.txt` + `sitemap.xml`, 0 axe violations, no-JS fallback, `@layer` CSS, per-module try/catch. Gaps: no Lighthouse run, no `favicon.ico`, catalogue PDF is a 651-byte stub, responsive screenshots not archived. Fixed this session: `Assets/` → `assets/` casing (would have 404'd every asset on the case-sensitive host). |

## Summary

Skeleton and craft are **strong** — typography, layout system, hierarchy, mobile and the
invisible engineering are where a paid build should be. The two soft grades (imagery, motion)
and the open colour decision are all **gated on client input**: photography, logo, accent /
button / motion references, and the compressed catalogue PDF. Nothing is marked "polished"
until those land and a finish pass runs on top.
