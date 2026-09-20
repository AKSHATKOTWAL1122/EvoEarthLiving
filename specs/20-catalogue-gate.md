# Spec 20: Catalogue Download Gate (Lead Capture)

**Status:** spec'd
**Appears on:** all 5 pages that carry `[data-catalogue]` CTAs — `index.html`,
`products/dry-amenities.html`, `products/wet-amenities.html`,
`products/aroma-essentials.html`, `products/gifting.html`
**Section(s) / selector:** existing `[data-catalogue]` trigger elements (14
occurrences, selector/markup unchanged); new `#catalogue-gate` modal + form
**Depends on:** 00 (tokens), 01 (nav — reuses its inert/scroll-lock/focus
pattern), 08 (contact-footer — this spec is a scoped exception to its "no
contact form" rule), `js/data/site.js`
**Files touched:** new `js/modules/catalogue-gate.js`; modified `index.html`,
`products/{dry-amenities,wet-amenities,aroma-essentials,gifting}.html`,
`js/modules/contact.js`, `css/layers/components.css`,
`css/layers/utilities.css`, JS bootstrap file (`js/main.js` — confirm exact
import list at build time), `CLAUDE.md`

## Stack-rule exception — decided
CLAUDE.md's CTA section currently reads "No contact form, no 'book a call', no
scheduling link." This spec is a deliberate, client-directed exception to that
line, **scoped narrowly to gating the catalogue download** — it does not
reopen the door to a general enquiry form, booking widget, or anything else.
`CLAUDE.md` gets updated alongside this spec to record the exception as a
dated decision rather than silently contradicting itself.

## Purpose
Turn a catalogue download into a captured lead. Clicking any
`[data-catalogue]` CTA opens a short form (name, business/organisation,
email, phone) instead of opening the PDF immediately. On successful
submission the PDF opens exactly as it does today.

**Stated plainly, not hidden:** this is UX gating, not access control. The
PDF stays a public, unauthenticated static file at a stable path
(`SITE.cataloguePath`, currently `/catalogue/evoearth-catalogue.pdf`).
Nothing on this stack (static hosting, no backend, no functions in scope)
can enforce a server-side check on that file — anyone with the direct URL
can still fetch it without going through the form. The feature makes the
normal path to the PDF go through lead capture; it does not lock the file
itself.

## Submission method — decided
No backend exists on this stack (locked rule in `CLAUDE.md`). The site
already deploys on **Netlify**, so **Netlify Forms** is the only option that
adds zero new infrastructure:
- A static `<form data-netlify="true">` in the page's built HTML is all
  Netlify needs to register the form at deploy time (its form-detection
  parser reads raw HTML, not JS output, and doesn't care about visibility).
  Because this project already ships duplicated static markup per page, the
  real form block doubles as its own Netlify-detection copy — no separate
  hidden decoy form needed.
- Submission happens client-side via `fetch("/", { method: "POST", ... })`
  with `application/x-www-form-urlencoded` body (the standard Netlify Forms
  AJAX pattern) so the page never hard-navigates.
- Spam protection: a `netlify-honeypot="bot-field"` attribute on the form +
  a `.visually-hidden` decoy input named `bot-field`. Netlify silently drops
  honeypot-tripped submissions server-side — no client-side check needed.
- Fields kept **minimal**, per the enquiry this replaces: **name, business /
  organisation, email, phone.** No dropdown, no products-of-interest, no
  volume field (`SITE.mailBody`'s longer enquiry template is a separate flow
  and is not being folded into this form).

## Field validation — decided
"Correct details" means two different guarantees, and this spec only claims
the first:
- **Well-formed** (checkable client-side, no backend exists): a real-shaped
  email, a real-shaped phone number, non-empty name/organisation. Enforced
  by pattern + type validation below.
- **Real / reachable** (a live inbox, a working number): **not** verifiable
  on a static, no-backend stack — that needs an OTP/magic-link/verification-
  API round trip, which is out of scope here (would be its own spec if the
  client wants it later). Not claiming this keeps the spec honest about what
  it actually delivers.

Client-side rules, enforced with `novalidate` on the `<form>` so the UI
fully controls messaging instead of relying on inconsistent browser-native
error bubbles (Safari/Firefox/Chrome all render native validation
differently — a custom inline message keeps the visual language on-brand
too):
- **Name / organisation:** `required`, trimmed, must contain at least one
  non-whitespace character after trimming, `minlength="2"` (catches
  accidental single-keystroke submits).
- **Email:** `type="email"`, `required`, plus a stricter regex than the
  browser's permissive built-in one — must match
  `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$` (local part, `@`, domain, a real TLD of
  at least 2 chars). Value is trimmed and lower-cased before validation and
  before it's put in the submission payload (avoids `Foo@Gmail.COM` vs.
  `foo@gmail.com` duplicate-looking leads).
- **Phone:** `type="tel"`, `inputmode="tel"`, `required`, regex
  `^\+?[0-9][0-9\s\-()]{6,17}$` — allows an optional leading `+`,
  7–18 characters covering digits/spaces/hyphens/parentheses, since
  institutional buyers may be outside India and phone formatting varies
  (this is a loose international-shape check, not a per-country format
  validator — building real per-country rules would be disproportionate to
  a 4-field lead form, same "don't invent infrastructure" call as spec 18's
  search method). Value has spaces/hyphens/parentheses stripped before
  being sent, keeping only digits and a leading `+` if present.
- **Validation timing:** on blur (so a mistake is flagged before the user
  reaches submit, not just afterward) and again on submit (covers fields a
  user tabs through without ever blurring, e.g. paste-then-Tab-past). No
  validation fires purely on `input` — that would flag "j" as invalid while
  someone is still typing "john@work.com", which reads as broken, not helpful.

## Structure / markup
One modal + form block per page, placed once near the end of `<body>` (not
duplicated per CTA) — same "shared markup duplicated across pages" pattern
already used for the header/footer:

```html
<div class="catalogue-gate" id="catalogue-gate" hidden>
  <div class="catalogue-gate__scrim" data-gate-close></div>
  <div class="catalogue-gate__panel" role="dialog" aria-modal="true"
       aria-labelledby="gate-title" aria-describedby="gate-desc">
    <button type="button" class="catalogue-gate__close" data-gate-close aria-label="Close">×</button>

    <h2 id="gate-title">Get the catalogue</h2>
    <p id="gate-desc">Tell us a little about your business and we'll send the PDF straight through.</p>

    <form id="catalogue-gate-form" name="catalogue-download" method="POST"
          data-netlify="true" netlify-honeypot="bot-field" novalidate>
      <input type="hidden" name="form-name" value="catalogue-download">
      <p class="visually-hidden">
        <label>Don't fill this out if you're human: <input name="bot-field"></label>
      </p>

      <div class="field">
        <label for="gate-name">Name</label>
        <input id="gate-name" name="name" type="text" required minlength="2"
               autocomplete="name" aria-describedby="gate-name-err">
        <span class="field__error" id="gate-name-err" hidden></span>
      </div>
      <div class="field">
        <label for="gate-org">Business / organisation</label>
        <input id="gate-org" name="organisation" type="text" required minlength="2"
               autocomplete="organization" aria-describedby="gate-org-err">
        <span class="field__error" id="gate-org-err" hidden></span>
      </div>
      <div class="field">
        <label for="gate-email">Email</label>
        <input id="gate-email" name="email" type="email" required
               autocomplete="email" aria-describedby="gate-email-err">
        <span class="field__error" id="gate-email-err" hidden></span>
      </div>
      <div class="field">
        <label for="gate-phone">Phone</label>
        <input id="gate-phone" name="phone" type="tel" inputmode="tel" required
               autocomplete="tel" aria-describedby="gate-phone-err">
        <span class="field__error" id="gate-phone-err" hidden></span>
      </div>

      <p class="catalogue-gate__error" data-gate-error role="alert" hidden></p>

      <button type="submit" class="btn btn--wa" data-gate-submit>Get catalogue</button>
    </form>

    <p class="catalogue-gate__success" data-gate-success role="status" hidden>
      Thanks — your download is starting. <a data-catalogue-final target="_blank" rel="noopener">Open it again</a> if it didn't.
    </p>
  </div>
</div>
```

`[data-catalogue]` elements themselves are untouched — same bare markup as
today, no new attributes required. Each `.field__error` starts empty/`hidden`
and is filled in by `catalogue-gate.js` only when that specific field fails
validation — it's not pre-written copy in the HTML.

## Behaviour (`catalogue-gate.js`)

**Click interception replaces, not layers on top of, `contact.js`'s current
wiring.** Today `contact.js` sets `href`/`target="_blank"`/`rel="noopener"`
straight to `SITE.cataloguePath` on every `[data-catalogue]` element with no
click handling. That stops: `contact.js` keeps only its `aria-label`
auto-fill; it no longer writes the real PDF path onto these elements at all.
Reasoning: a live `href` sitting on the anchor while JS tries to
`preventDefault()` it is fragile — middle-click, ctrl/cmd-click, and
"open in new tab" from the context menu all bypass a click-only intercept.
Since there's already no true no-JS fallback for these links (they ship with
no `href` until JS runs), removing the href-set step costs nothing.

```js
document.querySelectorAll("[data-catalogue]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (localStorage.getItem("evoearth:catalogue-lead")) {
      window.open(SITE.cataloguePath, "_blank", "noopener");
      return;
    }
    openGate(el);
  });
});
```

- **Modal open/close reuses `nav.js`'s existing pattern** (`initMobilePanel`)
  rather than inventing a new one: `hidden` attribute toggle, `document.body
  .classList.toggle("no-scroll", state)`, `.inert = state` on every element
  outside the modal (header, main, footer), focus moved to the first field
  on open (`requestAnimationFrame`) and back to the triggering
  `[data-catalogue]` element on close, `Escape` and outside-`pointerdown`
  both close it.
- **Field validation** (see "Field validation — decided" above for the
  rules themselves): a small per-field `validate(input)` function runs the
  matching regex/length check, trims (and for email, lower-cases) the value
  in place, toggles `aria-invalid` and the sibling `.field__error` text +
  `hidden` state, and adds/removes a `.field--invalid` class for the visual
  treatment. Wired to each input's `blur` event, and to `submit` (looping
  every field before deciding whether to proceed) — not to `input`, so
  errors don't flash mid-keystroke. Since `novalidate` is set on the form,
  this replaces the browser's native bubble entirely; there is no
  `form.reportValidity()` call — `catalogue-gate.js` owns 100% of the
  validation UI.
- **Submit handler**: `e.preventDefault()`, run every field's `validate()`;
  if any fails, focus the first invalid field and stop (no `fetch` is sent —
  no server validation exists on this stack, so this client-side pass is the
  only gate). If all pass, `fetch("/")` POST as above with the
  trimmed/normalised values. On success: hide the form, show
  `[data-gate-success]`, set the "open it again" link's `href`, and call
  `window.open(SITE.cataloguePath, "_blank", "noopener")` immediately (a
  manual fallback link covers the case where a pop-up blocker swallows the
  async-triggered `window.open`). On failure (network/non-2xx): show
  `[data-gate-error]` with a message pointing at the WhatsApp/email CTAs
  already on the page as a fallback contact path — this is a submission
  failure, not a validation failure, so it doesn't touch the per-field
  error spans.
- **Remember prior submissions**: on success, `localStorage.setItem
  ("evoearth:catalogue-lead", "1")`. Repeat clicks on the same device skip
  the modal and open the PDF directly (see the click handler above) — the
  lead is already captured, re-asking is friction with no upside. This is
  per-device, not per-person (a second device or cleared storage shows the
  form again); acceptable given the no-backend constraint, not a bug to fix.

## Visual design
Reuses existing tokens only, no new colour:
- Scrim: `var(--ink)` at ~75% opacity, `position: fixed`, full viewport.
- Panel: `var(--grad-paper)` surface (paper card against the dark scrim, so
  the interruption reads as distinct), `var(--frame)` brass hairline border,
  `var(--radius)` corners — no rounded-SaaS-modal look.
- Submit button: `.btn--wa` (oxblood gradient), reused as-is — this is the
  one primary action in the modal.
- Close button: brass-on-transparent, same hover/focus-visible treatment as
  `.nav-toggle`/`.search-toggle`.
- Fields: new minimal `.field` rules in `components.css` — label above
  input, Hanken Grotesk body, `var(--paper-2)` input background, slate
  border at rest, `var(--kraft)` border on `:focus-visible` (matches
  `.mobile-search input:focus-visible`). `.field--invalid input` gets a
  `var(--accent-ink)` border — the only place this modal uses oxblood
  outside the submit button, and only as a state cue, not decoration.
- Error text: `.field__error` (per-field) and `.catalogue-gate__error`
  (submission-level) both use `var(--accent-ink)` (already the token for
  oxblood-as-text), small size, sits directly under its input.
  Success text: default ink/paper text, no new "success green."
- `z-index`: `200` (header is `100`, dropdowns are `50`).

## Responsive
- Panel `max-width: ~26rem`, centred; full-bleed with fixed padding below
  the project's existing narrow-viewport cutoff (matches how the mobile nav
  panel and `.contact__actions` buttons already go edge-to-edge).
- Fields stack full-width at all sizes — four short fields don't need a
  multi-column layout.
- Submit button full-width on mobile, matching the existing `.btn-row .btn`
  mobile pattern in `components.css`.

## Accessibility
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby`/`aria-describedby`.
- Everything outside the modal is `inert` while open — no manual focus-trap
  loop needed, same mechanism `nav.js` already relies on.
- Focus moves to the first field on open, returns to the triggering
  `[data-catalogue]` element on close; `Escape` and scrim-click both close.
- Honeypot field wrapped in `.visually-hidden` (clipped, not
  `display:none`/`aria-hidden`) — present and fillable for bots, invisible
  for people and screen readers.
- `[data-gate-error]` is `role="alert"`, `[data-gate-success]` is
  `role="status"` — both announce without the user needing to navigate to them.
- Every input has a real `<label>`, not a placeholder — matches the existing
  `.mobile-search` pattern.
- Per-field errors are tied to their input via `aria-describedby` (present
  in the markup at all times, pointing at an initially-empty/`hidden` span)
  and `aria-invalid="true"`/`"false"` is toggled on the input itself as
  validation runs — a screen reader user gets both "invalid" and the reason
  read out together when the field receives focus, not just a generic beep.
- `.visually-hidden` utility class is added to `css/layers/utilities.css`
  (currently missing entirely, despite spec 18's search markup already
  referencing it) — this spec adds it once, benefiting both.

## Open / pending
- [ ] Confirm exact JS bootstrap file/import list for `initCatalogueGate()`
      (expected `js/main.js`, verify at implementation time).
- [ ] Netlify's "form notifications" (email alert on new submission) is a
      dashboard setting, not code — client/owner to configure post-deploy.
- [ ] Confirm no existing `localStorage` key collides with
      `evoearth:catalogue-lead` (this would be the site's first use of
      `localStorage`).
- [ ] No expiry on the "remembered submission" flag for v1 — revisit later
      if fresher repeat-visitor leads are wanted.
- [ ] `products/gifting.html` has 2 of the usual 3 `[data-catalogue]`
      occurrences (missing the inline-sentence link the other 3 category
      pages have) — pre-existing gap from spec 16, unaffected by this spec;
      the gate applies uniformly to whichever `[data-catalogue]` elements
      exist on a page.

## Acceptance criteria
- [ ] Fresh browser profile: clicking any of the 14 `[data-catalogue]`
      elements opens the modal; the PDF does not open and no navigation occurs.
- [ ] Submitting with an empty field is blocked; the matching `.field__error`
      shows "required"-style copy and no `fetch` is sent.
- [ ] Malformed email (e.g. `foo`, `foo@`, `foo@bar`) is rejected with an
      inline message on blur and again on submit; `foo@bar.com` passes.
- [ ] Malformed phone (e.g. `abc`, `123`, empty) is rejected; a plausible
      international number (e.g. `+91 98765 43210`, `9876543210`) passes.
- [ ] Email is trimmed and lower-cased, phone has spaces/hyphens/parens
      stripped, before either is sent in the submission payload.
- [ ] Fixing an invalid field and blurring again clears that field's error
      without touching the other fields' state.
- [ ] Submitting valid data POSTs to `/`; on success the form hides, the
      success message shows, and the PDF opens in a new tab.
- [ ] A repeat visit on the same device (localStorage flag set) skips the
      modal and opens the PDF directly on click.
- [ ] Netlify's dashboard registers the `catalogue-download` form after
      deploy (build-time static-form detection, not just the JS path).
- [ ] Honeypot field is present, visually hidden, not in the visible tab
      order, but reachable by a naive bot filling every input.
- [ ] Keyboard-only: open via Enter/Space on a trigger, Tab cycles only
      within the modal (outside content confirmed `inert`), Escape closes
      and returns focus to the trigger.
- [ ] axe: 0 violations on the open modal, in both empty and error states.
- [ ] Identical behaviour on all 5 pages (beyond the pre-existing gifting
      inline-link gap noted above).
- [ ] `SITE.cataloguePath` remains the single source of truth — no second
      hardcoded PDF path introduced anywhere.
