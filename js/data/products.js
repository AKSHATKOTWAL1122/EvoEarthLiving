// Product taxonomy — single source of truth for the range overview (home) and the
// three category pages. Every item traces to the printed catalogue; no invented SKUs.
// Blurbs are one factual sentence, trimmed per spec 13.
//
// Placeholder images are swapped for real photography later by dropping files into
// assets/img/photos/<group>/ and updating the `image` / `heroImage` paths.

const ITEM = "/assets/img/placeholders/item.svg";
const CARD = {
  dry: "/assets/img/photos/dry/card.png",
  wet: "/assets/img/photos/wet/card.png",
  aroma: "/assets/img/photos/aroma/card.png",
};

export const CUSTOMISATION_NOTE =
  "Every item can carry your brand — labels, fragrance, format and pack size.";

export const PRODUCT_GROUPS = [
  {
    id: "dry",
    slug: "dry-amenities",
    name: "Dry Amenities",
    intro:
      "Dental, shaving, grooming and housekeeping essentials. Bamboo, wheatstraw or standard. Private-label ready.",
    heroImage: CARD.dry,
    subcategories: [
      {
        name: "Dental Kit",
        intro: "Guest dental essentials for everyday freshness.",
        items: [
          { name: "Bamboo toothbrush", blurb: "Sustainable bamboo handle with a comfortable grip.", image: ITEM },
          { name: "Wheatstraw toothbrush", blurb: "Wheatstraw-blend handle, durable and lighter on materials.", image: ITEM },
          { name: "Plastic toothbrush", blurb: "Standard brush for dependable everyday use.", image: ITEM },
          { name: "Toothpaste", blurb: "Guest-size fluoride toothpaste.", image: ITEM },
        ],
      },
      {
        name: "Shaving Kit",
        intro: "A razor and gel for a clean shave.",
        items: [
          { name: "Bamboo razor", blurb: "Twin-blade razor on a bamboo handle.", image: ITEM },
          { name: "Standard razor", blurb: "Twin-blade disposable razor.", image: ITEM },
          { name: "Shaving gel sachet", blurb: "Single-use gel sachet, roughly 30 ml.", image: ITEM },
        ],
      },
      {
        name: "Comb & Hair Oil",
        intro: "Grooming basics for the vanity tray.",
        items: [
          { name: "Bamboo comb", blurb: "Fine-tooth comb in bamboo.", image: ITEM },
          { name: "Wheatstraw comb", blurb: "Fine-tooth comb in wheatstraw blend.", image: ITEM },
          { name: "Plastic comb", blurb: "Standard fine-tooth comb.", image: ITEM },
          { name: "Hair oil sachet", blurb: "Single-use nourishing hair oil sachet.", image: ITEM },
        ],
      },
      {
        name: "Accessories",
        intro: "The small extras a room is judged on.",
        items: [
          { name: "Loofah", blurb: "Natural loofah bath sponge.", image: ITEM },
          { name: "Shoe shiner", blurb: "Instant-shine shoe sponge.", image: ITEM },
          { name: "Vanity kit", blurb: "Cotton buds and pads in a paper sleeve.", image: ITEM },
          { name: "Shower cap", blurb: "Elasticated waterproof shower cap.", image: ITEM },
        ],
      },
      {
        name: "Intimate & Repair",
        intro: "For the moments guests didn't plan for.",
        items: [
          { name: "Sanitary napkin", blurb: "Individually wrapped ultra-thin pad.", image: ITEM },
          { name: "Wet face wipe", blurb: "Individually wrapped cleansing face wipe.", image: ITEM },
          { name: "Sewing kit", blurb: "Thread, needles and buttons for quick repairs.", image: ITEM },
        ],
      },
      {
        name: "Housekeeping",
        intro: "Room-care supplies for the trolley.",
        items: [
          { name: "Toilet paper", blurb: "Soft, strong two-ply roll.", image: ITEM },
          { name: "WC sanitised band", blurb: "Tamper-evident band that shows the seat has been cleaned.", image: ITEM },
          { name: "Garbage bag", blurb: "Tear-resistant bin liner.", image: ITEM },
          { name: "Laundry bag", blurb: "Drawstring bag for guest laundry.", image: ITEM },
        ],
      },
      {
        name: "Spa Slippers",
        intro: "Closed-toe slippers in three materials.",
        items: [
          { name: "Cotton", blurb: "Soft cotton-terry upper.", image: ITEM },
          { name: "Terry", blurb: "Plush terry upper with a firmer sole.", image: ITEM },
          { name: "Reusable jute", blurb: "Natural jute upper for repeat use.", image: ITEM },
        ],
      },
    ],
  },

  {
    id: "wet",
    slug: "wet-amenities",
    name: "Wet Amenities",
    intro:
      "Soap, hair and body care in bottles, tubes and sachets. Custom fragrance and labels available.",
    heroImage: CARD.wet,
    subcategories: [
      {
        name: "Soaps",
        intro: "Bar soaps in four formulations.",
        items: [
          { name: "Glycerine", blurb: "Clear glycerine bar, mild on skin.", image: ITEM },
          { name: "Charcoal", blurb: "Activated-charcoal bar for a deep clean.", image: ITEM },
          { name: "Milk", blurb: "Creamy milk bar for a soft finish.", image: ITEM },
          { name: "Neem & aloe vera", blurb: "Neem and aloe vera bar.", image: ITEM },
        ],
      },
      {
        name: "Hair Care",
        intro: "Wash and condition, bottle or sachet.",
        items: [
          { name: "Shampoo", blurb: "Aloe and neem shampoo in guest sizes.", image: ITEM },
          { name: "Conditioner", blurb: "Matching aloe and neem conditioner.", image: ITEM },
          { name: "Hair oil sachet", blurb: "Single-use hair oil sachet.", image: ITEM },
        ],
      },
      {
        name: "Face & Body",
        intro: "Cleanse and moisturise, head to toe.",
        items: [
          { name: "Body wash", blurb: "Botanical body wash in guest sizes.", image: ITEM },
          { name: "Body lotion", blurb: "Light body lotion, tube or bottle.", image: ITEM },
          { name: "Moisturiser", blurb: "Face and hand moisturiser.", image: ITEM },
          { name: "Face wash", blurb: "Gentle daily face wash.", image: ITEM },
        ],
      },
    ],
  },

  {
    id: "aroma",
    slug: "aroma-essentials",
    name: "Aroma Essentials",
    intro:
      "Diffusers, room sprays and beeswax-soy candles for lobbies, rooms and spa areas.",
    heroImage: CARD.aroma,
    subcategories: [
      {
        name: "Aroma Care",
        intro: "Scent for shared and private spaces.",
        items: [
          { name: "Reed diffuser", blurb: "Botanical-oil reed diffuser for a steady, low-key scent.", image: ITEM },
          { name: "Electric diffuser", blurb: "Wall-mounted metered dispenser.", image: ITEM },
          { name: "Room freshener spray", blurb: "Trigger-spray room freshener.", image: ITEM },
        ],
      },
      {
        name: "Scented Candles",
        intro: "Clean-burning beeswax and soy blend.",
        items: [
          { name: "Vanilla", blurb: "Warm, sweet vanilla.", image: ITEM },
          { name: "Lavender", blurb: "Calm, herbal lavender.", image: ITEM },
          { name: "Sandalwood", blurb: "Woody, grounding sandalwood.", image: ITEM },
          { name: "Eucalyptus mint", blurb: "Cool, clearing eucalyptus and mint.", image: ITEM },
        ],
      },
    ],
  },
];

export const groupById = (id) => PRODUCT_GROUPS.find((g) => g.id === id);

// Short count line for the range cards, e.g. "7 kit types · 27 items"
export const groupSummary = (g) => {
  const subs = g.subcategories.length;
  const items = g.subcategories.reduce((n, s) => n + s.items.length, 0);
  return `${subs} ${subs === 1 ? "group" : "groups"} · ${items} items`;
};
