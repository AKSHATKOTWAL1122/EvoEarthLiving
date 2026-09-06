// Home page: upgrade the plain range list into the three range cards.
// The <ul data-range-list> ships with a no-JS fallback (heading + link per group);
// this replaces each <li> body with the full card. See spec 04.

import { PRODUCT_GROUPS, groupSummary } from "../data/products.js";

const card = (g) => {
  const href = `/products/${g.slug}.html`;
  return `
    <div class="range-card">
      <div class="range-card__media">
        <img src="${g.heroImage}" alt="${g.name} range" width="800" height="1000"
             loading="lazy" decoding="async">
      </div>
      <div class="range-card__body">
        <h3>${g.name}</h3>
        <p>${g.intro}</p>
        <p class="range-card__meta">${groupSummary(g)}</p>
        <a class="range-card__link" href="${href}">See the range</a>
      </div>
    </div>`;
};

export function initRangeOverview() {
  const list = document.querySelector("[data-range-list]");
  if (!list) return; // not the home page

  list.innerHTML = PRODUCT_GROUPS.map(
    (g) => `<li data-group="${g.id}">${card(g)}</li>`
  ).join("");
}
