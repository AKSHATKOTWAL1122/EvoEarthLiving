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
