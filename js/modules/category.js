// Category page: render the subcategory sections + item grids from the data.
// <main data-category="dry|wet|aroma">; the page's <h1>, intro, breadcrumb and CTAs
// are static HTML so the page is meaningful (and indexable) without JS. See spec 05.

import { groupById, CUSTOMISATION_NOTE } from "../data/products.js";

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Stable anchor slug for a subcategory name — must match the nav dropdown links.
export const subcatSlug = (name) =>
  String(name).toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const itemCard = (it) => `
  <li class="item-card framed">
    <img src="${it.image}" alt="${esc(it.name)}" width="800" height="800"
         loading="lazy" decoding="async">
    <h3>${esc(it.name)}</h3>
    <p>${esc(it.blurb)}</p>
  </li>`;

const subcatSection = (sub) => `
  <section class="subcat" id="${subcatSlug(sub.name)}">
    <div class="container editorial" data-reveal>
      <div class="subcat__head">
        <h2>${esc(sub.name)}</h2>
        ${sub.intro ? `<p>${esc(sub.intro)}</p>` : ""}
      </div>
      <ul class="item-grid">
        ${sub.items.map(itemCard).join("")}
      </ul>
    </div>
  </section>`;

const crossLinks = (current) => {
  const others = ["dry", "wet", "aroma"]
    .filter((id) => id !== current)
    .map((id) => groupById(id))
    .filter(Boolean);
  return `
    <section class="section section--ink cat-cross">
      <div class="container" data-reveal>
        <h2>Other ranges</h2>
        <ul>
          ${others
            .map((g) => `<li><a href="/products/${g.slug}.html">${esc(g.name)}</a></li>`)
            .join("")}
        </ul>
      </div>
    </section>`;
};

export function initCategoryPage() {
  const main = document.querySelector("main[data-category]");
  if (!main) return; // not a category page

  const id = main.dataset.category;
  const group = groupById(id);
  if (!group) {
    console.warn(`[category] no product group for data-category="${id}"`);
    return;
  }

  const mount = main.querySelector("[data-subcats]");
  if (!mount) {
    console.warn("[category] [data-subcats] container missing");
    return;
  }

  // Fill the customisation note if the page left it empty
  const note = main.querySelector("[data-customisation-note]");
  if (note && !note.textContent.trim()) note.textContent = CUSTOMISATION_NOTE;

  mount.setAttribute("aria-busy", "true");
  mount.innerHTML =
    group.subcategories.map(subcatSection).join("") + crossLinks(id);
  mount.removeAttribute("aria-busy");
}
