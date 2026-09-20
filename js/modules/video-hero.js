// Video hero (spec 17). Markup ships as 3 independently autoplaying, looping,
// muted <a><video> slides stacked full-width — no controls needed since silent
// autoplay doesn't require a user gesture, so no-JS visitors still get working
// video with no player chrome. This module turns that into a single-slide
// stage: one clip plays at a time, auto-advances when it ends, and the only
// visible control is a single "next" arrow — no scrubber, no play/pause, no
// fullscreen, no sound toggle.

export function initVideoHero() {
  const stage = document.querySelector("[data-video-stage]");
  if (!stage) return;

  const slides = Array.from(stage.querySelectorAll(".video-hero__slide"));
  if (!slides.length) return;

  const videos = slides.map((slide) => slide.querySelector(".video-hero__video"));
  const labelOut = stage.querySelector("[data-video-label-out]");
  const nextBtn = stage.querySelector("[data-video-next]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  stage.classList.add("js-carousel");
  // `loop` restarts before `ended` ever fires — drop it so auto-advance works.
  videos.forEach((video) => video.removeAttribute("loop"));

  let current = 0;
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

    const incoming = videos[current];
    if (incoming && !reduce && inView) {
      incoming.currentTime = 0;
      incoming.play().catch(() => {});
    }
  }

  videos.forEach((video) => video.addEventListener("ended", () => show(current + 1)));

  if (nextBtn) {
    nextBtn.addEventListener("click", (event) => {
      event.preventDefault();
      show(current + 1);
    });
  }

  // Pause every slide up front — only the active one should ever be playing.
  videos.forEach((video) => video.pause());
  show(0);

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
