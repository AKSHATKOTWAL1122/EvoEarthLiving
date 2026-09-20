// Header behaviour: photo-menu dropdowns (desktop hover/click flyout, mobile
// tap-to-expand accordion), mobile nav panel, mobile search reveal, sticky/
// auto-hide header, active-section marking on the home page.
// Progressive enhancement — the markup works without any of this (submenus sit
// in normal flow under .no-js; see components.css).

const MOBILE_QUERY = "(max-width: 60rem)";
const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

function initDropdowns(header) {
  const wraps = [...header.querySelectorAll(".has-menu")];
  const entries = wraps
    .map((wrap) => ({
      wrap,
      btn: wrap.querySelector(":scope > button, :scope > a"),
      menu: wrap.querySelector(".submenu"),
    }))
    .filter((e) => {
      if (!e.btn || !e.menu) console.warn("[nav] dropdown markup incomplete", e.wrap);
      return e.btn && e.menu;
    });

  const isOpen = (e) => e.btn.getAttribute("aria-expanded") === "true";
  const close = (e, { focusBtn = false } = {}) => {
    e.btn.setAttribute("aria-expanded", "false");
    if (focusBtn) e.btn.focus();
  };
  const open = (e) => {
    entries.forEach((other) => { if (other !== e) close(other); });
    e.btn.setAttribute("aria-expanded", "true");
  };

  entries.forEach((e) => {
    const { wrap, btn, menu } = e;
    const items = () => [...menu.querySelectorAll("a")];

    // Desktop: hover already reveals the photo menu, so a click on the
    // category label just navigates to that category's page. Mobile has no
    // hover — first tap opens the accordion, a second tap on the (now open)
    // label follows the link.
    btn.addEventListener("click", (ev) => {
      if (!isMobile()) {
        close(e);
        return;
      }
      if (!isOpen(e)) {
        ev.preventDefault();
        open(e);
      } else {
        close(e);
      }
    });

    let hoverTimer;
    let closeTimer;
    wrap.addEventListener("mouseenter", () => {
      if (isMobile()) return;
      clearTimeout(closeTimer);
      hoverTimer = setTimeout(() => open(e), 80);
    });
    wrap.addEventListener("mouseleave", () => {
      if (isMobile()) return;
      clearTimeout(hoverTimer);
      // Grace period so a brief slip off the menu edge doesn't close it
      closeTimer = setTimeout(() => close(e), 180);
    });

    btn.addEventListener("keydown", (ev) => {
      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        open(e);
        items()[0]?.focus();
      }
    });

    menu.addEventListener("keydown", (ev) => {
      const list = items();
      const i = list.indexOf(document.activeElement);
      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        list[Math.min(i + 1, list.length - 1)]?.focus();
      } else if (ev.key === "ArrowUp") {
        ev.preventDefault();
        if (i <= 0) close(e, { focusBtn: true });
        else list[i - 1].focus();
      } else if (ev.key === "Home") {
        ev.preventDefault();
        list[0]?.focus();
      } else if (ev.key === "End") {
        ev.preventDefault();
        list.at(-1)?.focus();
      } else if (ev.key === "Escape") {
        close(e, { focusBtn: true });
      } else if (ev.key === "Tab" && !ev.shiftKey && document.activeElement === list.at(-1)) {
        close(e);
      }
    });

    document.addEventListener("pointerdown", (ev) => {
      if (isOpen(e) && !wrap.contains(ev.target)) close(e);
    });
  });

  // Reset every dropdown when crossing the breakpoint so state doesn't leak
  // between the desktop flyout and the mobile accordion.
  window.matchMedia(MOBILE_QUERY).addEventListener("change", () => {
    entries.forEach((e) => close(e));
  });
}

function initMobilePanel(header) {
  const toggle = header.querySelector(".nav-toggle");
  const panel = header.querySelector(".primary");
  const searchToggle = header.querySelector(".search-toggle");
  const searchPanel = header.querySelector(".mobile-search");
  if (!toggle || !panel) return;

  // Everything outside the panel that would otherwise stay focusable behind it.
  const outside = [
    document.getElementById("main"),
    document.querySelector(".site-footer"),
    header.querySelector(".wordmark"),
    header.querySelector(".header-cta"),
    searchToggle,
  ].filter(Boolean);

  const setOpen = (state) => {
    panel.classList.toggle("is-open", state);
    toggle.setAttribute("aria-expanded", String(state));
    document.body.classList.toggle("no-scroll", state);
    outside.forEach((el) => (el.inert = state));
    if (state) {
      if (searchPanel && !searchPanel.hidden) {
        searchPanel.hidden = true;
        searchToggle?.setAttribute("aria-expanded", "false");
      }
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

// Toggle-only: reveals the mobile search field. The matching/results logic is
// spec 18 — for now this just stops the form from doing a dead-end GET.
function initSearchToggle(header) {
  const toggle = header.querySelector(".search-toggle");
  const panel = header.querySelector(".mobile-search");
  if (!toggle || !panel) return;

  const navToggle = header.querySelector(".nav-toggle");
  const navPanel = header.querySelector(".primary");

  const setOpen = (state) => {
    panel.hidden = !state;
    toggle.setAttribute("aria-expanded", String(state));
    if (state) {
      if (navPanel?.classList.contains("is-open")) {
        navPanel.classList.remove("is-open");
        navToggle?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
        [
          document.getElementById("main"),
          document.querySelector(".site-footer"),
          header.querySelector(".wordmark"),
          header.querySelector(".header-cta"),
        ].forEach((el) => { if (el) el.inert = false; });
      }
      requestAnimationFrame(() => panel.querySelector("input")?.focus());
    } else {
      toggle.focus();
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false);
  });

  document.addEventListener("pointerdown", (e) => {
    if (toggle.getAttribute("aria-expanded") === "true" && !panel.contains(e.target) && e.target !== toggle) {
      setOpen(false);
    }
  });

  panel.querySelector("[data-search-form]")?.addEventListener("submit", (e) => e.preventDefault());

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
  initDropdowns(header);
  initMobilePanel(header);
  initSearchToggle(header);
  initScrolledState(header);
  initAutoHide(header);
  initActiveSection(header);
}
