// ============================================================
// HERO / LETTER REVEAL ANIMATION
// ============================================================

import gsap from "gsap";

/**
 * Reveals letter content line by line after envelope open
 * @param {Object} refs - container refs
 */
export function playHeroReveal(refs) {
  const { containerRef, linesRef, namesRef, dateRef, scrollIndicatorRef } = refs;

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  // Container settle
  tl.fromTo(
    containerRef.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 }
  );

  // Lines reveal one by one
  if (linesRef?.current) {
    const lines = linesRef.current.querySelectorAll(".hero-line");
    tl.fromTo(
      lines,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.3"
    );
  }

  // STEP 15: Couple names appear last with scale
  if (namesRef?.current) {
    tl.fromTo(
      namesRef.current,
      { opacity: 0, scale: 0.92, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out" },
      "-=0.2"
    );
  }

  // STEP 16: Date
  if (dateRef?.current) {
    tl.fromTo(
      dateRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.3"
    );
  }

  // STEP 17: Scroll indicator
  if (scrollIndicatorRef?.current) {
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // Continuous bounce after reveal
    tl.to(scrollIndicatorRef.current, {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  return tl;
}
