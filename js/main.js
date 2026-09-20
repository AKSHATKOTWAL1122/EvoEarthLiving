// Entry point. Loaded as <script type="module" src="/js/main.js"> on every page.

import { initContact } from "./modules/contact.js?v=11";
import { initNav } from "./modules/nav.js?v=11";
import { initReveal } from "./modules/reveal.js?v=11";
import { initRangeOverview } from "./modules/products.js?v=11";
import { initCategoryPage } from "./modules/category.js?v=11";
import { initGlow } from "./modules/glow.js?v=11";
import { initSearch } from "./modules/search.js?v=11";
import { initVideoHero } from "./modules/video-hero.js?v=11";

const run = () => {
  document.documentElement.classList.remove("no-js");
  try { initContact(); } catch (e) { console.error("[contact]", e); }
  try { initNav(); } catch (e) { console.error("[nav]", e); }
  try { initRangeOverview(); } catch (e) { console.error("[range]", e); }
  try { initCategoryPage(); } catch (e) { console.error("[category]", e); }
  try { initSearch(); } catch (e) { console.error("[search]", e); }
  try { initVideoHero(); } catch (e) { console.error("[video-hero]", e); }
  try { initGlow(); } catch (e) { console.error("[glow]", e); }
  // reveal last, after data-driven sections are in the DOM
  try { initReveal(); } catch (e) { console.error("[reveal]", e); }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run, { once: true });
} else {
  run();
}
