# Spec 13: Content & Copy — Single Source of Truth

**Status:** built + reviewed (2026-09-06) — hero h1 awaits client sign-off
**Appears on:** all pages
**Depends on:** —
**Files touched:** `js/data/products.js`, `js/data/site.js`, all `*.html`

## Rules
- Tone: warm, plain, someone in hospitality supply. Sentence case. No adjective stacking.
- Exception: the **About us** text is used verbatim from the catalogue (spec 03) — do not trim it.
- No third-party brand names anywhere (generic: "toothpaste", "hair oil sachet").
- Placeholder lines the client must confirm are marked `‹confirm›`.

## Home copy
- Hero kicker: "Guest amenities, made to your brand"
- Hero h1: "The bathroom shelf, considered." ‹confirm›
- Hero lede: "Dry, wet and aroma amenities for hotels, resorts, spas, hospitals and the businesses that supply them — stocked ranges or private-label."
- Buttons everywhere: "Enquire on WhatsApp" / "Download catalogue"
- About h2: "About us" + two catalogue paragraphs verbatim (spec 03)
- Range h2: "Three ranges" — intro: "Everything a room needs, grouped the way housekeeping thinks about it."
- Range card link text: "See the range"
- Who-we-serve h2: "Who we serve" — positioning + audience list + location (spec 06)
- Process h2: "How ordering works" — 4 steps (spec 07) + "Most enquiries get a same-day reply."
- Contact h2: "Talk to us" — "Send your requirement on WhatsApp, or email it over. We reply the same day."

## Category copy
- Group intros (`PRODUCT_GROUPS[].intro`):
  - Dry: "Dental, shaving, grooming and housekeeping essentials. Bamboo, wheatstraw or standard. Private-label ready."
  - Wet: "Soap, hair and body care in bottles, tubes and sachets. Custom fragrance and labels available."
  - Aroma: "Diffusers, room sprays and beeswax-soy candles for lobbies, rooms and spa areas."
- Customisation note (all category pages): "Every item can carry your brand — labels, fragrance, format and pack size."
- Subcategory intros: one short line each, drawn from the catalogue section blurbs, trimmed.
- Item blurbs: one sentence, factual, from the catalogue. Examples:
  - Bamboo toothbrush — "Sustainable bamboo handle with a comfortable grip."
  - Wheatstraw toothbrush — "Wheatstraw-blend handle, durable and lighter on materials."
  - Plastic toothbrush — "Standard brush for dependable everyday use."
  - Toothpaste — "Guest-size fluoride toothpaste."
  - Shaving gel sachet — "Single-use gel sachet, roughly 30 ml."
  - Reed diffuser — "Botanical-oil reed diffuser for a steady, low-key scent."
  - Beeswax-soy candle — "Clean-burning beeswax and soy blend; scents include vanilla, lavender, sandalwood and eucalyptus mint."
  - (…complete the rest from the catalogue when filling `products.js`.)

## Full taxonomy → `products.js`
**Dry Amenities** — Dental Kit (bamboo / wheatstraw / plastic toothbrush; toothpaste) ·
Shaving Kit (bamboo razor; standard razor; shaving gel sachet) ·
Comb & Hair Oil (bamboo / wheatstraw / plastic comb; hair oil sachet) ·
Accessories (loofah; shoe shiner; vanity kit; shower cap) ·
Intimate & Repair (sanitary napkin; wet face wipe; sewing kit) ·
Housekeeping (toilet paper; WC sanitised band; garbage bag; laundry bag) ·
Spa Slippers (cotton; terry; reusable jute)

**Wet Amenities** — Soaps (glycerine; charcoal; milk; neem & aloe vera) ·
Hair Care (shampoo; conditioner; hair oil sachet) ·
Face & Body (body wash; body lotion; moisturiser; face wash)

**Aroma Essentials** — Aroma Care (reed diffuser; electric diffuser; room freshener spray) ·
Scented Candles (vanilla; lavender; sandalwood; eucalyptus mint)

## `site.js`
```
whatsapp: "919211379536"
phoneSecondary: "+919797097342"   // display "+91 97970 97342"
email: "evoearthliving@gmail.com"
cataloguePath: "/catalogue/evoearth-catalogue.pdf"
domain: "https://evoearth.living"
locations: "Srinagar · Jammu, Jammu & Kashmir"
waMessage: "Hi EvoEarth Living, I'd like to enquire about amenities for our property."
mailSubject: "Amenities enquiry"
mailBody: "Organisation:\nType (hotel / resort / hospital / distributor / other):\nLocation:\nProducts of interest:\nApprox. monthly volume:\n"
```

## Acceptance criteria
- [x] No brand names; no stacked adjectives — scanned index + 3 category pages + `js/data/*`
      (2026-09-06). "premium / exceptional / exquisite" appear only inside the verbatim
      About text, which spec 03 forbids editing.
- [x] About text verbatim (spec 03).
- [ ] Hero h1 "The bathroom shelf, considered." raised with the client — pending sign-off.
- [x] `products.js` populated: Dry 7 subcats, Wet 3, Aroma 2; every item one factual sentence.
      (Full trace to the printed catalogue re-checks once the real PDF replaces the stub.)
