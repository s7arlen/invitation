// ============================================================
// ENVELOPE OPENING ANIMATION
// GSAP timeline for the cinematic 17-step opening sequence
// ============================================================

import gsap from "gsap";

/**
 * Plays the full cinematic envelope opening animation.
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

  // STEP 1: Button fades away
  tl.to(buttonRef.current, {
    opacity: 0,
    y: 8,
    duration: 0.5,
    ease: "power1.out",
  });

  // STEP 2: Envelope slightly zooms toward camera
  tl.to(
    envelopeRef.current,
    {
      scale: 1.04,
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.1"
  );

  // STEP 3: Wax seal scales up
  tl.to(
    sealRef.current,
    {
      scale: 1.12,
      duration: 0.4,
      ease: "power1.inOut",
    },
    "-=0.4"
  );

  // STEP 4: Wax seal rotates
  tl.to(sealRef.current, {
    rotation: 3,
    duration: 0.5,
    ease: "power1.inOut",
  });

  // STEP 5: Seal visually breaks (crack appears + seal splits)
  tl.to(
    sealCrackRef.current,
    {
      opacity: 1,
      duration: 0.2,
    },
    "crack"
  ).to(
    sealRef.current,
    {
      opacity: 0,
      scale: 0.85,
      duration: 0.4,
      ease: "power2.in",
    },
    "crack+=0.15"
  );

  // STEP 6: Envelope flap opens (rotateX in 3D perspective)
  tl.to(
    flapRef.current,
    {
      rotateX: -165,
      duration: 0.9,
      ease: "power2.inOut",
      transformOrigin: "center top",
    },
    "crack+=0.2"
  );

  // STEP 7: Inside paper becomes visible
  tl.to(
    insidePaperRef.current,
    {
      opacity: 1,
      duration: 0.4,
    },
    "-=0.5"
  );

  // STEP 8 & 9: Letter slides up with slight perspective tilt
  tl.to(
    letterPaperRef.current,
    {
      y: "-58vh",
      rotateX: 2,
      duration: 1.2,
      ease: "power3.out",
    },
    "-=0.3"
  );

  // STEP 10: Botanical elements move outward (staggered)
  if (botanicalsRef?.current) {
    const bots = botanicalsRef.current.children;
    tl.to(
      bots,
      {
        scale: 1.15,
        opacity: 0.85,
        stagger: 0.08,
        duration: 0.8,
        ease: "power1.out",
      },
      "-=0.8"
    );
  }

  // STEP 11: Petals float across screen (staggered)
  if (petalsRef?.current) {
    const petals = petalsRef.current.children;
    gsap.set(petals, { opacity: 0 });
    tl.to(
      petals,
      {
        opacity: 1,
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-45, 45)",
        stagger: { each: 0.06, from: "random" },
        duration: 0.6,
        ease: "power1.out",
      },
      "-=0.8"
    );
  }

  // STEP 12: Background transitions
  tl.to(
    backgroundRef.current,
    {
      background: "linear-gradient(180deg, #FFF9F3 0%, #F5DDE2 60%, #FFF9F3 100%)",
      duration: 1.2,
      ease: "power1.inOut",
    },
    "-=1.0"
  );

  // STEP 13-17 handled by LetterReveal component's heroAnimation

  return tl;
}

/**
 * Creates floating petal animation that loops continuously
 * @param {HTMLElement} container - petal container element
 */
export function startPetalFloat(container) {
  const petals = container.children;
  Array.from(petals).forEach((petal, i) => {
    gsap.to(petal, {
      y: "+=20",
      x: "+=10",
      rotation: "+=15",
      duration: 3 + i * 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.3,
    });
  });
}
