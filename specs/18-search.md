# Spec 18: Mobile Search

**Status:** spec'd
**Appears on:** mobile header only (top-right, per spec 01); desktop has no search
bar per the brief (nav is small enough to browse directly)
**Depends on:** 00, 01, `js/data/products.js` (and `js/data/gifting.js` once it
exists)
**Files touched:** `index.html` + category pages (`<header>` markup already covered
by spec 01), new `js/modules/search.js`

## Search method — decided
This is a static site with **no backend and no build step** (locked stack rule in
`CLAUDE.md`), so there is no server-side search index, no Algolia/Elasticsearch, no
API call. The only method that fits the project's constraints:

**Client-side substring match against the data already in `js/data/products.js`.**
- On page load (or first focus of the search input, to defer the cost), build a flat
  in-memory list from `PRODUCT_GROUPS`: one entry per item, carrying `{ name, group,
  subcategory, url }` (`url` = the category page + item anchor).
- On input (debounced ~150ms), filter that list by case-insensitive substring match
  against `name` (and optionally `subcategory`/`group` name) — e.g. typing "diffuser"
  matches both "Reed Diffusers" and "Electric Diffusers" items.
- Show up to ~6 results in a dropdown below the search field: item name + which
  category/subcategory it's under. Selecting one navigates straight to that item's
  anchor on its category page.
- No fuzzy/typo-tolerant matching, no ranking algorithm — substring match is enough
  for a catalogue this size (~45 items total) and keeps this a zero-dependency,
  zero-build addition. Revisit only if the catalogue grows an order of magnitude.

This is the same "small, honest, no invented infrastructure" call the rest of the
stack already makes (no framework, no bundler) — a real search service would be
disproportionate to a ~45-SKU catalogue.

## Structure / markup
```
<div class="search" id="mobile-search" hidden>
  <label class="visually-hidden" for="search-input">Search products</label>
  <input id="search-input" type="search" placeholder="Search dental kits, diffusers, soaps…" autocomplete="off">
  <ul class="search__results" hidden></ul>
</div>
```
- Revealed by the header's search-toggle button (spec 01). Focus moves into the
  input on open; `Escape` or outside tap closes and returns focus to the toggle.
- Empty input → results list hidden. No results → a single "No matches — try
  Dry / Wet / Aroma / Gifting" line pointing back at the nav, not a dead end.

## Behaviour (`search.js`)
- Import `PRODUCT_GROUPS` from `products.js`, flatten once, cache in memory.
- Debounced `input` listener, substring filter, render results.
- Keyboard: `ArrowDown`/`ArrowUp` move through results, `Enter` navigates the
  highlighted one, `Escape` closes.
- No network requests, no analytics beacon — purely local.

## Visual design
- Matches the header's ink/paper palette, brass hairline under the input on focus
  (consistent with the rest of the site's focus/hover language — no new colour).
- Result rows: item name (Hanken 500) + small muted subcategory tag.

## Open / pending
- [ ] Confirm whether search should also match Gifting once `gifting.js` exists
      (straightforward addition once that data lands — not blocking this spec).
- [ ] Decide inline-push-down vs. overlay-sheet presentation once real mobile
      content length is tested (noted in spec 01 too).

## Acceptance criteria
- [ ] Typing a partial product name surfaces matching items within ~150ms.
- [ ] Selecting a result navigates to the correct item anchor.
- [ ] Works with JS off: search UI simply doesn't render (no broken empty control
      left behind) — progressive enhancement, not a required path.
- [ ] Keyboard-only: open, type, arrow to a result, Enter navigates, Esc closes.
- [ ] axe: 0 violations on the open search state.
