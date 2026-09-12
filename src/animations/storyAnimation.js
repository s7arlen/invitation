// ============================================================
// STORY ANIMATION — GSAP ScrollTrigger
// Timeline draw + photo reveal + text stagger
// ============================================================

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let triggers = [];

export function initStoryAnimation(containerRef) {
  if (!containerRef?.current) return;

  const items = containerRef.current.querySelectorAll(".story-item");
  const lines = containerRef.current.querySelectorAll(".story-line");

  // Draw timeline lines
  lines.forEach((line) => {
    const length = line.getTotalLength?.() ?? 120;
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

    const st = ScrollTrigger.create({
      trigger: line,
      start: "top 80%",
      onEnter: () => {
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
        });
      },
    });
    triggers.push(st);
  });

  // Each story item: photo reveal + text
  items.forEach((item, i) => {
    const photo = item.querySelector(".story-photo");
    const text = item.querySelectorAll(".story-text-line");
    const year = item.querySelector(".story-year");

    const st = ScrollTrigger.create({
      trigger: item,
      start: "top 78%",
      onEnter: () => {
        const tl = gsap.timeline();

        // Year slides in from left
        if (year) {
          tl.fromTo(year, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
        }

        // Photo circle reveals
        if (photo) {
          tl.fromTo(
            photo,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.4)" },
            "-=0.3"
          );
        }

        // Text lines stagger up
        if (text.length) {
          tl.fromTo(
            text,
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
            "-=0.4"
          );
        }

        // Previous items gently dim
        items.forEach((prev, j) => {
          if (j < i) {
            gsap.to(prev, { opacity: 0.55, duration: 0.5 });
          }
        });
      },
      onLeaveBack: () => {
        // Restore opacity when scrolling back up
        items.forEach((prev, j) => {
          if (j < i) {
            gsap.to(prev, { opacity: 1, duration: 0.4 });
          }
        });
      },
    });
    triggers.push(st);
  });
}

export function destroyStoryAnimation() {
  triggers.forEach((t) => t?.kill?.());
  triggers = [];
}
