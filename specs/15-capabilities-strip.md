# Spec 15: Capabilities strip (home)

**Status:** built
**Appears on:** home
**Section(s) / selector:** `#capabilities`, `.caps`, `.caps__grid`
**Depends on:** 00, 13
**Files touched:** `index.html`, `css/layers/components.css`

## Purpose
Our restrained answer to Kimirica's "Thoughtful Commitments" strip
(`specs/REVIEW-kimirica.md`, item 2). Four quick capability signals a buyer scans
for, placed between "About us" and "Three ranges". Qualitative only — no MOQ, lead
time, certifications or other numbers until the client supplies real values
(`CLAUDE.md` content rule). No "on enquiry" placeholder rows.

## Content (final — no `‹confirm›`)
| Term | Detail |
|------|--------|
| Private-label ready | Your labels, fragrance, format and pack size. |
| Material choices | Bamboo, wheatstraw or standard across the dry range. |
| Stock or custom | Ship from inventory, or quote a run to your spec. |
| One point of contact | WhatsApp for samples, quotes and reorders. |

Rewrite the terms/details only with client sign-off. When real certifications or
metrics arrive, either extend this to 5–6 items or add a separate trust row in
`#who-we-serve` (the placeholder comment there still stands).

## Structure / markup
A `<dl>` — term + description is exactly what a definition list is for, and it
keeps four sibling labels out of the heading outline (spec 12). The section has
`aria-label="What we offer"`; no visible `<h2>`.
```
<section id="capabilities" class="section section--paper-2 caps" data-reveal aria-label="What we offer">
  <div class="container">
    <dl class="caps__grid">
      <div><dt>Private-label ready</dt><dd>…</dd></div>
      … ×4
    </dl>
  </div>
</section>
```

## Visual design
- Dim-paper band (`--paper-2`) between two other paper-ish sections — sits as a
  divider strip, not a full section: `padding-block: var(--sp-5)` (overrides
  `.section`), hairline `border-block` top and bottom.
- 4-up grid. `dt` in Fraunces `--step-1`, weight 400, preceded by a `0.5rem` kraft
  square (same motif as `.serve__loc::before` — one accent, reused). `dd` muted,
  `--step--1`, `max-width: 26ch`, indented to clear the square.
- No icons (SVG icon set is a pending client asset — the kraft square stands in).

## Responsive
- < 60rem: 2 columns.
- < 40rem: 1 column.

## Motion
Global section reveal only (`data-reveal`).

## Accessibility
- `<dl>` structure; section is a named region via `aria-label`.
- axe-core WCAG 2.1 AA: 0 violations (re-run 2026-09-06 with the strip in place).
- Kraft square is decorative (CSS `::before`, no text alternative needed).

## Acceptance criteria
- [x] Renders between `#about` and `#range` on home only.
- [x] No numbers / metrics / "on enquiry" rows.
- [x] 4 / 2 / 1 columns at ≥60rem / 40–60rem / <40rem.
- [x] axe 0 violations; no horizontal scroll 320–1440.
- [ ] Screenshots 390 / 768 / 1440 archived (checked live, not saved).
