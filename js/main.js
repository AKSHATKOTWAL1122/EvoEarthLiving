// Entry point. Loaded as <script type="module" src="/js/main.js"> on every page.

import { initContact } from "./modules/contact.js?v=9";
import { initNav } from "./modules/nav.js?v=9";
import { initReveal } from "./modules/reveal.js?v=9";
import { initRangeOverview } from "./modules/products.js?v=9";
import { initCategoryPage } from "./modules/category.js?v=9";
import { initGlow } from "./modules/glow.js?v=9";

const run = () => {
  document.documentElement.classList.remove("no-js");
  try { initContact(); } catch (e) { console.error("[contact]", e); }
  try { initNav(); } catch (e) { console.error("[nav]", e); }
  try { initRangeOverview(); } catch (e) { console.error("[range]", e); }
  try { initCategoryPage(); } catch (e) { console.error("[category]", e); }
  try { initGlow(); } catch (e) { console.error("[glow]", e); }
  // reveal last, after data-driven sections are in the DOM
  try { initReveal(); } catch (e) { console.error("[reveal]", e); }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run, { once: true });
} else {
  run();
}
