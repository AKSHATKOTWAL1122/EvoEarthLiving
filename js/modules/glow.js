// Cursor-follow glow. Two layers, both eased so the highlight lags the pointer:
//   1. per-button highlight on the oxblood CTAs (.btn--wa::after)
//   2. one page-wide ambient pool that lightens the near-black field it passes over
//      (.cursor-glow, screen-blended so it barely registers on the paper sections)
// Hover-capable, motion-OK devices only — everything works the same without it.
// See spec 09.

const EASE = 0.10;         // button glow — per-frame approach factor; lower = more lag
const AMBIENT_EASE = 0.06; // page glow — laggier, more atmospheric

function motionOK() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function initGlow() {
  if (!motionOK()) return;
  document.querySelectorAll(".btn--wa").forEach(attachGlow);
  attachAmbientGlow();
}

function attachAmbientGlow() {
  const layer = document.createElement("div");
  layer.className = "cursor-glow";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  let cx = tx, cy = ty;
  let raf = 0;
  let seen = false;

  const tick = () => {
    cx += (tx - cx) * AMBIENT_EASE;
    cy += (ty - cy) * AMBIENT_EASE;
    layer.style.setProperty("--cx", `${cx}px`);
    layer.style.setProperty("--cy", `${cy}px`);
    raf =
      Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4
        ? requestAnimationFrame(tick)
        : 0;
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType === "touch") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        cx = tx;
        cy = ty;
        layer.classList.add("is-on");
      }
      if (!raf) raf = requestAnimationFrame(tick);
    },
    { passive: true }
  );

  // Fade out only when the window loses focus / is hidden — leaving it frozen in
  // place while the cursor is briefly off-window is unnoticeable and avoids the
  // flicker from spurious mouseleave events (scrollbars, iframes).
  const hide = () => layer.classList.remove("is-on");
  const show = () => { if (seen) layer.classList.add("is-on"); };
  window.addEventListener("blur", hide);
  window.addEventListener("focus", show);
  document.addEventListener("visibilitychange", () => {
    document.hidden ? hide() : show();
  });
}

function attachGlow(el) {
  let raf = 0;
  let tx = 0, ty = 0; // target — where the pointer is
  let cx = 0, cy = 0; // current — eased position of the glow
  let inside = false;

  const write = () => {
    el.style.setProperty("--gx", `${cx}px`);
    el.style.setProperty("--gy", `${cy}px`);
  };

  const tick = () => {
    cx += (tx - cx) * EASE;
    cy += (ty - cy) * EASE;
    write();
    const settled = Math.abs(tx - cx) < 0.4 && Math.abs(ty - cy) < 0.4;
    raf = inside || !settled ? requestAnimationFrame(tick) : 0;
  };

  const local = (e) => {
    const r = el.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };

  el.addEventListener("pointerenter", (e) => {
    [tx, ty] = local(e);
    [cx, cy] = [tx, ty]; // appear under the cursor, then lag as it moves
    write();
    el.style.setProperty("--glow-o", "1");
    inside = true;
    if (!raf) raf = requestAnimationFrame(tick);
  });

  el.addEventListener("pointermove", (e) => {
    [tx, ty] = local(e);
    if (!raf) raf = requestAnimationFrame(tick);
  });

  el.addEventListener("pointerleave", () => {
    inside = false; // CSS fades --glow-o out; tick keeps easing until settled
    el.style.setProperty("--glow-o", "0");
  });
}
