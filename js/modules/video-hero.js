// Video hero (spec 17). The stage is always a single full-width video —
// CSS keys the "one slide visible" layout off .is-active regardless of JS,
// so nothing ever stacks. This module wires up the one interactive piece:
// a next arrow (hidden in markup until this runs) that advances to the next
// clip, plus auto-advance when the active clip's `ended` event fires. No
// scrubber, no play/pause, no fullscreen, no sound toggle.

export function initVideoHero() {
  const stage = document.querySelector("[data-video-stage]");
  if (!stage) return;

  const slides = Array.from(stage.querySelectorAll(".video-hero__slide"));
  if (!slides.length) return;

  const videos = slides.map((slide) => slide.querySelector(".video-hero__video"));
  const labelOut = stage.querySelector("[data-video-label-out]");
  const copyOut = stage.querySelector("[data-video-copy-out]");
  const nextBtn = stage.querySelector("[data-video-next]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // `loop` restarts before `ended` ever fires — drop it so auto-advance works.
  videos.forEach((video) => video.removeAttribute("loop"));

  let current = slides.findIndex((slide) => slide.classList.contains("is-active"));
  if (current < 0) current = 0;
  let inView = false;

  function show(index) {
    const outgoing = videos[current];
    if (outgoing) {
      outgoing.pause();
      outgoing.currentTime = 0;
    }

    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
    if (labelOut) labelOut.textContent = slides[current].dataset.videoLabel || "";
    if (copyOut) copyOut.textContent = slides[current].dataset.videoCopy || "";

    const incoming = videos[current];
    if (incoming && !reduce && inView) {
      incoming.preload = "auto";
      incoming.currentTime = 0;
      incoming.play().catch(() => {});
    }
  }

  videos.forEach((video) => video.addEventListener("ended", () => show(current + 1)));

  if (nextBtn) {
    nextBtn.hidden = false;
    nextBtn.addEventListener("click", (event) => {
      event.preventDefault();
      show(current + 1);
    });
  }

  if (!("IntersectionObserver" in window)) {
    inView = true;
    if (!reduce) videos[current].play().catch(() => {});
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting;
        const video = videos[current];
        if (!video) return;
        if (inView && !reduce) {
          video.preload = "auto";
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.5 }
  );
  obs.observe(stage);
}
