// ============================================================
// PHOTO STACK ANIMATION — GSAP ScrollTrigger
// Physical card stack with scroll-driven transitions
// ============================================================

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let st = null;

export function initPhotoStackAnimation(containerRef) {
  if (!containerRef?.current) return;

  const cards = containerRef.current.querySelectorAll(".stack-card");
  if (!cards.length) return;

  // Initial setup: stack the cards
  cards.forEach((card, i) => {
    const rotations = [0, -3, 4, -2];
    const offsets = [0, 6, -4, 8];
    gsap.set(card, {
      rotation: rotations[i] || 0,
      y: offsets[i] || 0,
      zIndex: cards.length - i,
      transformOrigin: "center bottom",
    });
  });

  // Scroll-driven card transitions (pinned)
  st = ScrollTrigger.create({
    trigger: containerRef.current,
    start: "top top",
    end: `+=${cards.length * 300}`,
    pin: true,
    scrub: 1.2,
    onUpdate: (self) => {
      const progress = self.progress;
      const cardCount = cards.length;

      cards.forEach((card, i) => {
        const cardProgress = Math.max(
          0,
          Math.min(1, (progress * cardCount - i) )
        );

        if (cardProgress > 0 && cardProgress <= 1) {
          // This card is transitioning out
          gsap.set(card, {
            x: cardProgress * 140,
            rotation: cardProgress * 30,
            opacity: 1 - cardProgress * 0.4,
            zIndex: cardCount - i,
          });
        } else if (cardProgress <= 0) {
          // Card hasn't moved yet
          gsap.set(card, {
            x: 0,
            opacity: 1,
          });
        }
      });
    },
  });
}

export function destroyPhotoStackAnimation() {
  st?.kill?.();
  st = null;
}
