// Single source of truth for contact + site-wide values.
// Changing a number/email here updates every page. See spec 08 / 13.

export const SITE = {
  domain: "https://evoearth.living",

  whatsapp: "919211379536",              // wa.me target (no +, no spaces)
  phoneSecondary: "+919797097342",       // tel: value
  phoneSecondaryDisplay: "+91 97970 97342",
  email: "evoearthliving@gmail.com",

  cataloguePath: "/catalogue/evoearth-catalogue.pdf",
  locations: "Srinagar · Jammu, Jammu & Kashmir",

  // Google Sheet lead sync (spec 21) — Apps Script Web App URL, one per client.
  // Empty = sync skipped, catalogue-gate.js still submits to Netlify Forms as
  // normal. Client pastes their own deployed Web App URL here (setup steps in
  // specs/21-google-sheet-sync.md) to have every catalogue-gate submission
  // land as a row in a Google Sheet they own and control.
  leadSheetWebhook: "https://script.google.com/macros/s/AKfycbzF6okRrOBANEY8Ke5LDp78rjRbJq4ubHcx8hcNCHZ_qbU7I27riPd6dk43pOfmJmme/exec",

  // Prefilled messages
  waMessage:
    "Hi EvoEarth Living, I'd like to enquire about amenities for our property.",
  mailSubject: "Amenities enquiry",
  mailBody:
    "Organisation:\n" +
    "Type (hotel / resort / hospital / distributor / other):\n" +
    "Location:\n" +
    "Products of interest:\n" +
    "Approx. monthly volume:\n",
};

export const waHref = (message = SITE.waMessage) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const mailHref = () =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(SITE.mailSubject)}` +
  `&body=${encodeURIComponent(SITE.mailBody)}`;

export const telHref = () => `tel:${SITE.phoneSecondary}`;
