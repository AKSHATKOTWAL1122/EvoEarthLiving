// Each [data-reveal] element eases up from nothing as it scrolls into view, and
// eases back out as it leaves — both directions, every time, no once-only. The
// CSS only dims elements while <html> has .is-armed, which this module adds on
// load and which is never added when the user prefers reduced motion — so no-JS
// and reduced-motion visitors see the final state immediately. See spec 09.

export function initReveal() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll("[data-reveal]");
  if (reduce || !targets.length || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("is-armed");

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => obs.observe(el));
}
