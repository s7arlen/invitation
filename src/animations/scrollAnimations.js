// ============================================================
// SCROLL ANIMATIONS — GSAP ScrollTrigger
// All scroll-driven choreography for the invitation
// ============================================================

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let triggers = [];

/**
 * Initialize all scroll animations.
 * Call after Phase 2 mounts. Pass Lenis instance for RAF sync.
 */
export function initScrollAnimations(lenis) {
  // Sync Lenis with GSAP ticker
  if (lenis) {
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // Background color transitions between sections
  const sections = [
    { trigger: "#section-story", bg: "linear-gradient(180deg, #FFF9F3 0%, #F5DDE2 100%)" },
    { trigger: "#section-celebration", bg: "linear-gradient(180deg, #F5DDE2 0%, #FFF9F3 100%)" },
    { trigger: "#section-venue", bg: "linear-gradient(180deg, #FFF9F3 0%, #F0CDD5 100%)" },
    { trigger: "#section-gallery", bg: "linear-gradient(180deg, #F0CDD5 0%, #FFF9F3 100%)" },
    { trigger: "#section-countdown", bg: "linear-gradient(180deg, #FFF9F3 0%, #F5DDE2 100%)" },
    { trigger: "#section-rsvp", bg: "linear-gradient(180deg, #F5DDE2 0%, #FFF9F3 100%)" },
    { trigger: "#section-final", bg: "linear-gradient(180deg, #FFF9F3 0%, #F5DDE2 100%)" },
  ];

  sections.forEach(({ trigger, bg }) => {
    const el = document.querySelector(trigger);
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => gsap.to("body", { background: bg, duration: 1.2, ease: "power1.inOut" }),
      onLeaveBack: () => gsap.to("body", { background: "var(--ivory)", duration: 1, ease: "power1.inOut" }),
    });
    triggers.push(st);
  });

  // Generic fade-up for section headings
  document.querySelectorAll(".scroll-fade-up").forEach((el) => {
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
      },
    });
    triggers.push(st);
  });

  // Parallax for botanical decorations
  document.querySelectorAll(".parallax-slow").forEach((el) => {
    const st = gsap.to(el, {
      yPercent: -18,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("section") || el.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
    triggers.push(st.scrollTrigger);
  });

  document.querySelectorAll(".parallax-fast").forEach((el) => {
    const st = gsap.to(el, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("section") || el.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
    triggers.push(st.scrollTrigger);
  });
}

/**
 * Clean up all registered ScrollTriggers
 */
export function destroyScrollAnimations() {
  triggers.forEach((t) => t?.kill?.());
  triggers = [];
}
