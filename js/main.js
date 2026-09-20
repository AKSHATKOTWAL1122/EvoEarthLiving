// Entry point. Loaded as <script type="module" src="/js/main.js"> on every page.

import { initContact } from "./modules/contact.js?v=12";
import { initNav } from "./modules/nav.js?v=12";
import { initReveal } from "./modules/reveal.js?v=12";
import { initCategoryPage } from "./modules/category.js?v=12";
import { initGlow } from "./modules/glow.js?v=12";
import { initSearch } from "./modules/search.js?v=12";
import { initVideoHero } from "./modules/video-hero.js?v=12";
import { initCatalogueGate } from "./modules/catalogue-gate.js?v=12";

const run = () => {
  document.documentElement.classList.remove("no-js");
  try { initContact(); } catch (e) { console.error("[contact]", e); }
  try { initNav(); } catch (e) { console.error("[nav]", e); }
  try { initCategoryPage(); } catch (e) { console.error("[category]", e); }
  try { initSearch(); } catch (e) { console.error("[search]", e); }
  try { initVideoHero(); } catch (e) { console.error("[video-hero]", e); }
  try { initCatalogueGate(); } catch (e) { console.error("[catalogue-gate]", e); }
  try { initGlow(); } catch (e) { console.error("[glow]", e); }
  // reveal last, after data-driven sections are in the DOM
  try { initReveal(); } catch (e) { console.error("[reveal]", e); }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run, { once: true });
} else {
  run();
}
