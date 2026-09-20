// Spec 20 — gates the catalogue PDF behind a short lead-capture form.
// UX gating only: the PDF itself stays a public static file at SITE.cataloguePath;
// nothing on this stack can enforce a server-side check on it. This just makes the
// normal path to it go through Netlify Forms first.
//
// Validation here checks the details are *well-formed* (real-shaped email/phone),
// not that they're *real* (a live inbox, a working number) — that would need an
// OTP/verification round trip, out of scope for a static, no-backend site.

import { SITE } from "../data/site.js";

const LEAD_KEY = "evoearth:catalogue-lead";
const MOBILE_QUERY = "(max-width: 60rem)";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9][0-9\s\-()]{6,17}$/;

const FIELD_RULES = {
  name: {
    test: (v) => v.trim().length >= 2,
    message: "Enter your name.",
    normalise: (v) => v.trim(),
  },
  organisation: {
    test: (v) => v.trim().length >= 2,
    message: "Enter your business or organisation.",
    normalise: (v) => v.trim(),
  },
  email: {
    test: (v) => EMAIL_RE.test(v.trim()),
    message: "Enter a valid email address.",
    normalise: (v) => v.trim().toLowerCase(),
  },
  phone: {
    test: (v) => PHONE_RE.test(v.trim()),
    message: "Enter a valid phone number.",
    normalise: (v) => v.trim().replace(/[\s\-()]/g, ""),
  },
};

export function initCatalogueGate(root = document) {
  const modal = root.querySelector("#catalogue-gate");
  const triggers = [...root.querySelectorAll("[data-catalogue]")];
  if (!modal || !triggers.length) return;

  const form = modal.querySelector("#catalogue-gate-form");
  const submitBtn = modal.querySelector("[data-gate-submit]");
  const submitError = modal.querySelector("[data-gate-error]");
  const successEl = modal.querySelector("[data-gate-success]");
  const finalLink = modal.querySelector("[data-catalogue-final]");
  const closers = [...modal.querySelectorAll("[data-gate-close]")];
  const fields = [...form.querySelectorAll("input[name]")].filter((el) => FIELD_RULES[el.name]);

  const outside = [...document.body.children].filter((el) => el !== modal);
  let lastFocused = null;

  const setOpen = (state, trigger) => {
    modal.hidden = !state;
    document.body.classList.toggle("no-scroll", state);
    outside.forEach((el) => (el.inert = state));
    if (state) {
      lastFocused = trigger || document.activeElement;
      requestAnimationFrame(() => fields[0]?.focus());
    } else {
      lastFocused?.focus();
    }
  };

  const openGate = (trigger) => {
    resetForm();
    setOpen(true, trigger);
  };

  const closeGate = () => setOpen(false);

  const resetForm = () => {
    form.hidden = false;
    successEl.hidden = true;
    submitError.hidden = true;
    fields.forEach((el) => setFieldValid(el));
  };

  const errorEl = (el) => modal.querySelector(`#${el.getAttribute("aria-describedby")}`);

  const setFieldValid = (el) => {
    el.closest(".field")?.classList.remove("field--invalid");
    el.setAttribute("aria-invalid", "false");
    const err = errorEl(el);
    if (err) { err.hidden = true; err.textContent = ""; }
  };

  const setFieldInvalid = (el, message) => {
    el.closest(".field")?.classList.add("field--invalid");
    el.setAttribute("aria-invalid", "true");
    const err = errorEl(el);
    if (err) { err.hidden = false; err.textContent = message; }
  };

  const validateField = (el) => {
    const rule = FIELD_RULES[el.name];
    if (!rule) return true;
    const ok = rule.test(el.value);
    if (ok) {
      el.value = rule.normalise(el.value);
      setFieldValid(el);
    } else {
      setFieldInvalid(el, rule.message);
    }
    return ok;
  };

  fields.forEach((el) => {
    el.addEventListener("blur", () => validateField(el));
  });

  triggers.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (localStorage.getItem(LEAD_KEY)) {
        window.open(SITE.cataloguePath, "_blank", "noopener");
        return;
      }
      openGate(el);
    });
  });

  closers.forEach((el) => el.addEventListener("click", closeGate));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeGate();
  });

  window.matchMedia(MOBILE_QUERY).addEventListener("change", () => {
    if (!modal.hidden) closeGate();
  });

  const setSubmitting = (state) => {
    submitBtn.disabled = state;
    submitBtn.textContent = state ? "Sending…" : "Get catalogue";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitError.hidden = true;

    const allValid = fields.map((el) => validateField(el)).every(Boolean);
    if (!allValid) {
      fields.find((el) => el.getAttribute("aria-invalid") === "true")?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error(`Netlify Forms responded ${res.status}`);
      syncToSheet(fields);
      onSuccess();
    } catch (err) {
      console.error("[catalogue-gate]", err);
      submitError.hidden = false;
      submitError.textContent =
        "Something went wrong sending that — please try again, or reach us on WhatsApp/email directly.";
    } finally {
      setSubmitting(false);
    }
  });

  // Best-effort duplicate write to the client's own Google Sheet (spec 21).
  // Netlify Forms above is the submission of record — this never blocks or
  // affects it. Apps Script Web Apps don't return a CORS-readable response
  // for cross-origin requests, so this fires "no-cors" and never inspects
  // the result; a failed sheet write is silent by design, not swallowed error
  // handling for something we could otherwise act on.
  function syncToSheet(fieldEls) {
    if (!SITE.leadSheetWebhook) return;
    const row = Object.fromEntries(fieldEls.map((el) => [el.name, el.value]));
    row.page = location.pathname;
    row.submittedAt = new Date().toISOString();
    fetch(SITE.leadSheetWebhook, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(row),
    }).catch(() => { /* best-effort — Netlify Forms already has the lead */ });
  }

  function onSuccess() {
    form.hidden = true;
    successEl.hidden = false;
    if (finalLink) finalLink.href = SITE.cataloguePath;
    window.open(SITE.cataloguePath, "_blank", "noopener");
    try { localStorage.setItem(LEAD_KEY, "1"); } catch { /* storage unavailable — not fatal */ }
    lastFocused?.focus();
  }
}
