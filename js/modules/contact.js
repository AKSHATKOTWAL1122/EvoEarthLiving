// Wires every contact CTA on the page from js/data/site.js.
// Markup opts in with data attributes. The HTML carries the phone / email /
// locations / year text as a static no-JS fallback; this module re-syncs it from
// site.js so that file stays the single source of truth.
//   [data-wa]         -> WhatsApp deep link
//   [data-wa-msg]     -> optional custom prefilled message (overrides default)
//   [data-catalogue]  -> catalogue PDF, opens in a new tab
//   [data-call]       -> tel: link
//   [data-email]      -> mailto: with prefilled subject/body
//   [data-year]       -> current year text
//   [data-locations]  -> SITE.locations text

import { SITE, waHref, mailHref, telHref } from "../data/site.js";

const setHref = (el, href) => {
  if (el.tagName === "A") el.href = href;
  else el.dataset.href = href;
};

export function initContact(root = document) {
  root.querySelectorAll("[data-wa]").forEach((el) => {
    setHref(el, waHref(el.dataset.waMsg || undefined));
    el.rel = el.rel || "noopener";
    el.target = el.target || "_blank";
  });

  root.querySelectorAll("[data-catalogue]").forEach((el) => {
    setHref(el, SITE.cataloguePath);
    el.target = "_blank";
    el.rel = "noopener";
    if (!el.hasAttribute("aria-label")) {
      el.setAttribute("aria-label", `${(el.textContent || "Download catalogue").trim()} (PDF)`);
    }
  });

  // Text is always synced from site.js so it stays the single source of truth.
  // The HTML carries the same value as a static fallback for no-JS visitors.
  root.querySelectorAll("[data-call]").forEach((el) => {
    setHref(el, telHref());
    el.textContent = SITE.phoneSecondaryDisplay;
  });

  root.querySelectorAll("[data-email]").forEach((el) => {
    setHref(el, mailHref());
    el.textContent = SITE.email;
  });

  root.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  root.querySelectorAll("[data-locations]").forEach((el) => {
    el.textContent = SITE.locations;
  });
}
