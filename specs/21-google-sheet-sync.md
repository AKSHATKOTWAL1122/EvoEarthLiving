# Spec 21: Google Sheet Lead Sync

**Status:** built (site side) — pending client setup
**Depends on:** 20 (catalogue-gate — this spec sends a duplicate copy of the
same submission, it doesn't replace Netlify Forms)
**Files touched:** `js/data/site.js` (`SITE.leadSheetWebhook`),
`js/modules/catalogue-gate.js` (`syncToSheet()`)

## Why this exists
Netlify Forms (spec 20) is the submission of record — it's what actually
gates the PDF and what already works. But its dashboard isn't a spreadsheet:
no easy export, filtering, or sharing with a sales team. The client wants
**one Google Sheet they own** that every catalogue-download lead lands in as
a row, under column headers matching the form fields.

Given the stack rule (static HTML/CSS/JS, no backend, no framework — see
`CLAUDE.md`), the only way to write into a Google Sheet from client-side JS
with zero new infrastructure is a **Google Apps Script Web App** bound to
that sheet: it's Google's own free serverless endpoint, the client
provisions and owns it from their own Google account, and it needs no
hosting, server, or credential of ours. This keeps the "client should be
able to connect their own Google Sheet" requirement literal — it's their
sheet, their script, their Google account, not shared infrastructure.

## What this does NOT change
- Netlify Forms stays exactly as spec 20 built it — same fields, same
  success/error UX, same PDF-open behaviour. If the sheet sync fails
  silently, the lead is still captured in Netlify.
- No new field is added to the visible form. `page` (which page the lead
  came from) and `submittedAt` (ISO timestamp) are added automatically in
  JS, not shown to the user.
- If `SITE.leadSheetWebhook` is left empty (the shipped default), the sheet
  sync is skipped entirely — nothing breaks, nothing is sent anywhere. Sites
  without a client-provided sheet keep working exactly as spec 20 built them.

## How it works
`catalogue-gate.js`'s `syncToSheet()` runs right after a successful Netlify
submission. It POSTs a JSON body (`name`, `organisation`, `email`, `phone`,
`page`, `submittedAt`) to `SITE.leadSheetWebhook` with `mode: "no-cors"`.
Apps Script Web Apps don't send CORS headers back on a cross-origin request,
so the browser can't read the response either way — this is the standard,
documented pattern for posting into Apps Script from a static site, and it's
why the fetch is fire-and-forget with a swallowed `.catch()`. This is a
best-effort duplicate, not the primary record.

## Client setup (one-time, in their own Google account)

1. **Create the Sheet.** New Google Sheet, name it whatever they like (e.g.
   "EvoEarth Catalogue Leads"). In row 1, add these exact headers, in this
   order:
   ```
   submittedAt | name | organisation | email | phone | page
   ```
2. **Open the script editor.** In the Sheet: **Extensions → Apps Script.**
   Delete the placeholder `Code.gs` content and paste the script below.
3. **Deploy as a Web App.** Top right **Deploy → New deployment → gear icon
   → Web app.**
   - Execute as: **Me**
   - Who has access: **Anyone**
     (Required — the request comes from a visitor's browser with no Google
     login. It only grants permission to run *this specific script*, not
     access to the underlying sheet or their Google account.)
   - Click **Deploy**, authorize the permissions prompt (it's their own
     script touching their own sheet), then copy the **Web app URL** it
     gives you (ends in `/exec`).
4. **Paste the URL into the site.** Put that URL as `SITE.leadSheetWebhook`
   in `js/data/site.js`, redeploy. That's the only code change needed per
   client/sheet.
5. **Re-deploy after any script edit.** Apps Script Web App URLs are
   versioned — editing `Code.gs` later requires **Deploy → Manage
   deployments → edit (pencil) → New version → Deploy** for the change to
   take effect. Editing the code alone, without a new version, does nothing.

## Apps Script code (paste into `Code.gs`)

```js
// Appends one row per catalogue-gate submission. Bound to whichever Sheet
// this script lives inside (Extensions > Apps Script creates that binding
// automatically) — no sheet ID/URL needs to be hardcoded here.
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.organisation || "",
    data.email || "",
    data.phone || "",
    data.page || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Column order in `appendRow` must match the header row created in step 1 —
if the client wants different columns/order, edit both together.

## Multiple clients / sheets
Because the webhook URL is a single config value in `site.js`, swapping to a
different client's sheet is a one-line change and a redeploy — no code
restructuring. Each client runs their own copy of the script in their own
Google account; nothing here is shared between clients or hosted by us.

## Limitations (stated plainly)
- **No delivery confirmation.** `no-cors` means the site can never know
  whether the sheet write actually succeeded — a broken/undeployed Apps
  Script URL fails silently. Netlify Forms remains the reliable fallback;
  if the client reports sheet rows going missing, the fix is checking the
  Apps Script deployment (redeploy after edits — see step 5), not the site
  code.
- **"Anyone" access is required**, not a security hole in the usual sense:
  it only lets an anonymous request execute this one script's `doPost`
  function (append a row in a fixed format) — it does not grant read access
  to the sheet, the account, or any other script.
- This does not replace Netlify's spam/honeypot protection (spec 20) — a
  submission that passes the honeypot check is trusted the same way for
  both destinations.

## Acceptance criteria
- [ ] With `SITE.leadSheetWebhook` empty, catalogue-gate behaves identically
      to spec 20 (no extra network call, no console error).
- [ ] With a real deployed Web App URL set, a successful form submission
      appends exactly one row to the client's Sheet with correct values in
      each column, within a few seconds.
- [ ] A submission still succeeds (PDF opens, success message shows) even if
      the Apps Script URL is wrong/unreachable — sheet failures never block
      the primary Netlify Forms flow.
