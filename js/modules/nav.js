// Header behaviour: Products dropdown (desktop disclosure + keyboard), mobile panel,
// sticky scrolled state, active-section marking on the home page.
// Progressive enhancement — the markup works without any of this.

const MOBILE_QUERY = "(max-width: 60rem)";
const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

function initDropdown(wrap) {
  const btn = wrap.querySelector(":scope > button, :scope > a");
  const menu = wrap.querySelector(".submenu");
  if (!btn || !menu) {
    console.warn("[nav] dropdown markup incomplete");
    return;
  }

  const items = () => [...menu.querySelectorAll("a")];
  // Desktop: visibility + the staggered reveal are CSS, keyed off aria-expanded.
  // The `hidden` attribute (display:none) would kill the transition, so on
  // desktop the menu is left in the DOM flow and only aria-expanded toggles.
  const open = () => {
    if (isMobile()) return; // mobile: menu is always visible inside the panel
    btn.setAttribute("aria-expanded", "true");
  };
  const close = ({ focusBtn = false } = {}) => {
    if (isMobile()) return;
    btn.setAttribute("aria-expanded", "false");
    if (focusBtn) btn.focus();
  };
  const isOpen = () => btn.getAttribute("aria-expanded") === "true";

  btn.addEventListener("click", () => (isOpen() ? close() : open()));

  let hoverTimer;
  let closeTimer;
  wrap.addEventListener("mouseenter", () => {
    if (isMobile()) return;
    clearTimeout(closeTimer);
    hoverTimer = setTimeout(open, 80);
  });
  wrap.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
    // Grace period so a brief slip off the menu edge doesn't close it
    closeTimer = setTimeout(close, 180);
  });

  btn.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      open();
      items()[0]?.focus();
    }
  });

  menu.addEventListener("keydown", (e) => {
    const list = items();
    const i = list.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      list[Math.min(i + 1, list.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (i <= 0) close({ focusBtn: true });
      else list[i - 1].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      list[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      list.at(-1)?.focus();
    } else if (e.key === "Escape") {
      close({ focusBtn: true });
    } else if (e.key === "Tab" && !e.shiftKey && document.activeElement === list.at(-1)) {
      close();
    }
  });

  document.addEventListener("pointerdown", (e) => {
    if (isOpen() && !wrap.contains(e.target)) close();
  });

  // Reset when crossing the breakpoint
  window.matchMedia(MOBILE_QUERY).addEventListener("change", () => {
    menu.hidden = false;
    btn.setAttribute("aria-expanded", "false");
  });
  menu.hidden = false;
}

function initMobilePanel(header) {
  const toggle = header.querySelector(".nav-toggle");
  const panel = header.querySelector(".primary");
  if (!toggle || !panel) return;

  // Everything outside the panel that would otherwise stay focusable behind it.
  const outside = [
    document.getElementById("main"),
    document.querySelector(".site-footer"),
    header.querySelector(".wordmark"),
    header.querySelector(".header-cta"),
  ].filter(Boolean);

  const setOpen = (state) => {
    panel.classList.toggle("is-open", state);
    toggle.setAttribute("aria-expanded", String(state));
    document.body.classList.toggle("no-scroll", state);
    outside.forEach((el) => (el.inert = state));
    if (state) {
      // Panel animates in from visibility:hidden; defer focus a frame so it lands.
      requestAnimationFrame(() => panel.querySelector("a, button")?.focus());
    } else {
      toggle.focus();
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  panel.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false);
  });

  window.matchMedia(MOBILE_QUERY).addEventListener("change", (e) => {
    if (!e.matches) setOpen(false);
  });
}

function initScrolledState(header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 4);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Hide the header on the way down, bring it back on the way up (and always at the
// top). Direction is read from scrollY between rAF frames so it stays smooth.
function initAutoHide(header) {
  const REVEAL_AT = 90; // px from the top where the header is always shown
  const DELTA = 6; // ignore sub-pixel scroll jitter
  let last = window.scrollY;
  let ticking = false;

  const paused = () =>
    document.body.classList.contains("no-scroll") || // mobile panel open
    header.querySelector('.has-menu > [aria-expanded="true"]'); // dropdown open

  const update = () => {
    ticking = false;
    const y = Math.max(0, window.scrollY);
    if (y <= REVEAL_AT || paused()) {
      header.classList.remove("is-hidden");
    } else if (Math.abs(y - last) > DELTA) {
      header.classList.toggle("is-hidden", y > last);
    }
    last = y;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
}

function initActiveSection(header) {
  const links = [...header.querySelectorAll('.primary a[href^="/#"], .primary a[href^="#"]')];
  const map = new Map();
  links.forEach((a) => {
    const id = a.getAttribute("href").split("#")[1];
    const section = id && document.getElementById(id);
    if (section) map.set(section, a);
  });
  if (!map.size) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const a = map.get(entry.target);
        if (!a) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute("aria-current"));
          a.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  map.forEach((_, section) => obs.observe(section));
}

export function initNav() {
  const header = document.querySelector(".site-header");
  if (!header) {
    console.warn("[nav] .site-header not found");
    return;
  }
  header.querySelectorAll(".has-menu").forEach(initDropdown);
  initMobilePanel(header);
  initScrolledState(header);
  initAutoHide(header);
  initActiveSection(header);
}
