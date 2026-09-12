import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CornerWreath, BlossomCluster, SinglePetal } from "../assets/flowers/BotanicalSVGs";
import weddingData from "../data/weddingData";

gsap.registerPlugin(ScrollTrigger);

export default function FinalSection() {
  const sectionRef = useRef(null);
  const petalsRef = useRef(null);
  const contentRef = useRef(null);
  const { couple, date } = weddingData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Content fade in
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
          );

          // Start petal rain
          if (petalsRef.current) {
            const petals = petalsRef.current.children;
            Array.from(petals).forEach((petal, i) => {
              gsap.fromTo(petal,
                { y: -30, opacity: 0, x: Math.random() * 20 - 10, rotation: Math.random() * 60 - 30 },
                {
                  y: "110vh",
                  opacity: [0, 0.7, 0.7, 0],
                  rotation: `+=${Math.random() * 180 - 90}`,
                  duration: 4 + Math.random() * 3,
                  delay: i * 0.25,
                  ease: "none",
                  repeat: -1,
                  repeatDelay: Math.random() * 2,
                }
              );
            });
          }
        },
      });

      // Botanical corners grow in
      const corners = sectionRef.current.querySelectorAll(".final-botanical");
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          gsap.fromTo(corners,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 0.6, stagger: 0.15, duration: 1, ease: "back.out(1.2)" }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section-final"
      ref={sectionRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #FFF9F3 0%, #F5DDE2 50%, #FFF9F3 100%)",
        padding: "clamp(4rem,12vw,6rem) var(--content-padding)",
      }}
    >
      {/* Falling petals */}
      <div ref={petalsRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <SinglePetal
            key={i}
            style={{
              position: "absolute",
              width: `${10 + (i % 5) * 4}px`,
              left: `${5 + (i * 6) % 90}%`,
              top: "-40px",
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Botanical corners */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <CornerWreath className="final-botanical"
          style={{ position: "absolute", top: 0, left: 0, width: "clamp(100px,32vw,180px)", opacity: 0, transformOrigin: "top left" }} />
        <CornerWreath className="final-botanical"
          style={{ position: "absolute", top: 0, right: 0, width: "clamp(100px,32vw,180px)", opacity: 0, transform: "scaleX(-1)", transformOrigin: "top right" }} />
        <CornerWreath className="final-botanical"
          style={{ position: "absolute", bottom: 0, left: 0, width: "clamp(80px,25vw,140px)", opacity: 0, transform: "scaleY(-1)", transformOrigin: "bottom left" }} />
        <CornerWreath className="final-botanical"
          style={{ position: "absolute", bottom: 0, right: 0, width: "clamp(80px,25vw,140px)", opacity: 0, transform: "scale(-1,-1)", transformOrigin: "bottom right" }} />
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "380px",
          width: "100%",
          opacity: 0,
        }}
      >
        <BlossomCluster style={{ width: "55px", margin: "0 auto 2rem", opacity: 0.65 }} />

        <p className="label" style={{ marginBottom: "0.6rem", opacity: 0.7 }}>and so...</p>

        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem,8vw,3rem)",
          fontWeight: 400,
          letterSpacing: "0.06em",
          color: "var(--deep-brown)",
          lineHeight: 1.15,
          marginBottom: "1.2rem",
        }}>
          The Adventure<br />Begins
        </h2>

        {/* Heart */}
        <div style={{
          fontSize: "2rem",
          color: "var(--dusty-rose)",
          margin: "1.5rem 0",
          lineHeight: 1,
        }}>♡</div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", margin: "0 auto 1.8rem" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(214,183,122,0.5))" }} />
          <span style={{ color: "var(--champagne)", fontSize: "0.7rem" }}>✦</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(214,183,122,0.5))" }} />
        </div>

        <p className="body-md italic" style={{ marginBottom: "1rem", opacity: 0.75, lineHeight: 1.7 }}>
          Thank you for being<br />part of our story.
        </p>

        <h3 className="script-xl" style={{ fontSize: "clamp(2.8rem,10vw,4.5rem)", marginBottom: "0.8rem" }}>
          {couple.bride} &amp; {couple.groom}
        </h3>

        <p className="label" style={{ letterSpacing: "0.3em", opacity: 0.5, fontSize: "0.65rem" }}>
          {date.year}
        </p>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            marginTop: "3rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            margin: "3rem auto 0",
            opacity: 0.5,
            transition: "opacity 0.3s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0.5}
        >
          <div style={{ width: "1px", height: "24px", background: "var(--champagne)" }} />
          <p className="label" style={{ fontSize: "0.55rem" }}>back to top</p>
        </button>
      </div>
    </section>
  );
}
