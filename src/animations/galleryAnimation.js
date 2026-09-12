// ============================================================
// GALLERY ANIMATION — GSAP ScrollTrigger
// Editorial overlapping photos with staggered reveals
// ============================================================

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let triggers = [];

export function initGalleryAnimation(containerRef) {
  if (!containerRef?.current) return;

  const photos = containerRef.current.querySelectorAll(".gallery-photo");

  photos.forEach((photo, i) => {
    const rotations = [-3, 2, -1.5, 3.5];
    const initialRotation = rotations[i] || 0;

    // Set initial state
    gsap.set(photo, {
      opacity: 0,
      y: 60,
      rotation: initialRotation - 8,
      scale: 0.9,
    });

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: `top+=${i * 80} 80%`,
      onEnter: () => {
        gsap.to(photo, {
          opacity: 1,
          y: 0,
          rotation: initialRotation,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.15,
        });
      },
    });
    triggers.push(st);
  });
}

export function destroyGalleryAnimation() {
  triggers.forEach((t) => t?.kill?.());
  triggers = [];
}
