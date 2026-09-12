// ============================================================
// ENVELOPE OPENING ANIMATION
// GSAP timeline for the cinematic opening sequence (Optimized timing)
// ============================================================

import gsap from "gsap";

/**
 * Plays the full cinematic envelope opening animation with fast, elegant timing.
 * @param {Object} refs - DOM element refs
 * @param {Function} onComplete - called when animation finishes
 */
export function playEnvelopeOpen(refs, onComplete) {
  const {
    buttonRef,
    envelopeRef,
    sealRef,
    sealCrackRef,
    flapRef,
    insidePaperRef,
    letterPaperRef,
    botanicalsRef,
    petalsRef,
    backgroundRef,
  } = refs;

  const tl = gsap.timeline({
    onComplete,
    defaults: { ease: "power2.inOut" },
  });

  // STEP 1: Button quickly fades away
  tl.to(buttonRef.current, {
    opacity: 0,
    y: 6,
    duration: 0.25,
    ease: "power1.out",
  });

  // STEP 2 & 3: Envelope subtle zoom & seal scale + rotate simultaneously
  tl.to(
    envelopeRef.current,
    {
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out",
    },
    "-=0.1"
  );

  tl.to(
    sealRef.current,
    {
      scale: 1.1,
      rotation: 3,
      duration: 0.3,
      ease: "power1.inOut",
    },
    "-=0.4"
  );

  // STEP 4 & 5: Seal crack & separation
  tl.to(
    sealCrackRef.current,
    {
      opacity: 1,
      duration: 0.15,
    },
    "crack"
  ).to(
    sealRef.current,
    {
      opacity: 0,
      scale: 0.8,
      duration: 0.25,
      ease: "power2.in",
    },
    "crack+=0.1"
  );

  // STEP 6: Flap opens in 3D
  tl.to(
    flapRef.current,
    {
      rotateX: -165,
      duration: 0.55,
      ease: "power2.inOut",
      transformOrigin: "center top",
    },
    "crack+=0.15"
  );

  // STEP 7: Inside liner becomes visible
  tl.to(
    insidePaperRef.current,
    {
      opacity: 1,
      duration: 0.25,
    },
    "-=0.4"
  );

  // STEP 8 & 9: Letter paper slides up out of envelope pocket
  tl.to(
    letterPaperRef.current,
    {
      y: "-52vh",
      rotateX: 1,
      duration: 0.65,
      ease: "power3.out",
    },
    "-=0.3"
  );

  // STEP 10: Botanicals expand
  if (botanicalsRef?.current) {
    const bots = botanicalsRef.current.children;
    tl.to(
      bots,
      {
        scale: 1.1,
        opacity: 0.85,
        stagger: 0.04,
        duration: 0.5,
        ease: "power1.out",
      },
      "-=0.5"
    );
  }

  // STEP 11: Floating petals reveal
  if (petalsRef?.current) {
    const petals = petalsRef.current.children;
    gsap.set(petals, { opacity: 0 });
    tl.to(
      petals,
      {
        opacity: 1,
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-30, 30)",
        stagger: { each: 0.04, from: "random" },
        duration: 0.4,
        ease: "power1.out",
      },
      "-=0.5"
    );
  }

  // STEP 12: Background transition
  tl.to(
    backgroundRef.current,
    {
      background: "linear-gradient(180deg, #FFF9F3 0%, #F5DDE2 60%, #FFF9F3 100%)",
      duration: 0.6,
      ease: "power1.inOut",
    },
    "-=0.6"
  );

  return tl;
}

/**
 * Creates floating petal animation that loops continuously
 */
export function startPetalFloat(container) {
  const petals = container.children;
  Array.from(petals).forEach((petal, i) => {
    gsap.to(petal, {
      y: "+=15",
      x: "+=8",
      rotation: "+=10",
      duration: 2.5 + i * 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.2,
    });
  });
}
