// Mobile search: client-side substring match over PRODUCT_GROUPS. No backend,
// no build step — matches this project's static-site stack rule. See spec 18.

import { PRODUCT_GROUPS } from "../data/products.js";
import { subcatSlug } from "./category.js";

const MAX_RESULTS = 6;
const DEBOUNCE_MS = 150;

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

let index = null;
function buildIndex() {
  if (index) return index;
  index = PRODUCT_GROUPS.flatMap((group) =>
    group.subcategories.flatMap((sub) =>
      sub.items.map((item) => ({
        name: item.name,
        group: group.name,
        subcategory: sub.name,
        url: `/products/${group.slug}.html#${subcatSlug(item.name)}`,
      }))
    )
  );
  return index;
}

function findMatches(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return buildIndex()
    .filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.subcategory.toLowerCase().includes(q) ||
        e.group.toLowerCase().includes(q)
    )
    .slice(0, MAX_RESULTS);
}

export function initSearch() {
  const panel = document.getElementById("mobile-search");
  if (!panel) return;

  const input = panel.querySelector("input[type=search]");
  const list = panel.querySelector(".search__results");
  if (!input || !list) return;

  const clear = () => {
    list.hidden = true;
    list.innerHTML = "";
  };

  const render = (results) => {
    if (!results.length) {
      list.innerHTML = `<li class="search__empty">No matches — try Dry / Wet / Aroma / Gifting.</li>`;
      list.hidden = false;
      return;
    }
    list.innerHTML = results
      .map(
        (r) => `
      <li>
        <a href="${r.url}">
          <span class="search__name">${esc(r.name)}</span>
          <span class="search__tag">${esc(r.group)} · ${esc(r.subcategory)}</span>
        </a>
      </li>`
      )
      .join("");
    list.hidden = false;
  };

  let debounceTimer;
  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const q = input.value;
    debounceTimer = setTimeout(() => {
      if (!q.trim()) clear();
      else render(findMatches(q));
    }, DEBOUNCE_MS);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      const first = list.querySelector("a");
      if (first) {
        e.preventDefault();
        first.focus();
      }
    } else if (e.key === "Escape") {
      clear();
    }
  });

  list.addEventListener("keydown", (e) => {
    const items = [...list.querySelectorAll("a")];
    const i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[Math.min(i + 1, items.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (i <= 0) input.focus();
      else items[i - 1].focus();
    } else if (e.key === "Escape") {
      clear();
      input.focus();
    }
  });

  // The panel's own open/close is owned by nav.js; just reset our state
  // whenever it's hidden so a reopen starts from a clean field.
  new MutationObserver(() => {
    if (panel.hidden) {
      input.value = "";
      clear();
    }
  }).observe(panel, { attributes: true, attributeFilter: ["hidden"] });
}
