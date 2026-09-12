import React, { useRef, useEffect } from "react";
import { CornerWreath, BlossomCluster, LeafVine, SinglePetal } from "../assets/flowers/BotanicalSVGs";
import { playHeroReveal } from "../animations/heroAnimation";
import weddingData from "../data/weddingData";

export default function LetterReveal() {
  const containerRef = useRef(null);
  const linesRef = useRef(null);
  const namesRef = useRef(null);
  const dateRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const { bride, groom } = weddingData.couple;
  const { display, year } = weddingData.date;

  useEffect(() => {
    const timer = setTimeout(() => {
      playHeroReveal({ containerRef, linesRef, namesRef, dateRef, scrollIndicatorRef });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="section-hero"
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #FFF9F3 0%, #F5DDE2 50%, #FFF9F3 100%)",
        padding: "3rem 1.5rem",
      }}
    >
      {/* Background petals */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <SinglePetal
            key={i}
            className="parallax-slow"
            style={{
              position: "absolute",
              width: `${12 + (i % 3) * 5}px`,
              left: `${5 + (i * 12) % 88}%`,
              top: `${8 + (i * 16) % 74}%`,
              opacity: 0.35,
              transform: `rotate(${i * 45}deg)`,
            }}
          />
        ))}
      </div>

      {/* Botanical corners */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <CornerWreath className="parallax-slow"
          style={{ position: "absolute", top: 0, left: 0, width: "clamp(90px,28vw,160px)", opacity: 0.6 }} />
        <CornerWreath
          style={{ position: "absolute", top: 0, right: 0, width: "clamp(90px,28vw,160px)", opacity: 0.6, transform: "scaleX(-1)" }} />
        <CornerWreath
          style={{ position: "absolute", bottom: 0, left: 0, width: "clamp(70px,22vw,120px)", opacity: 0.45, transform: "scaleY(-1)" }} />
        <CornerWreath
          style={{ position: "absolute", bottom: 0, right: 0, width: "clamp(70px,22vw,120px)", opacity: 0.45, transform: "scale(-1,-1)" }} />
      </div>

      {/* The invitation letter card */}
      <div
        ref={containerRef}
        style={{
          opacity: 0,
          background: "linear-gradient(180deg, #FFF9F3 0%, #FDF5EC 100%)",
          borderRadius: "4px",
          padding: "clamp(2rem,8vw,3.5rem) clamp(1.5rem,6vw,3rem)",
          boxShadow: "0 4px 40px rgba(61,41,40,0.09), 0 12px 60px rgba(61,41,40,0.06)",
          textAlign: "center",
          width: "100%",
          maxWidth: "440px",
          position: "relative",
          border: "1px solid rgba(214,183,122,0.2)",
        }}
      >
        {/* Inner ornamental border */}
        <div style={{
          position: "absolute",
          inset: "10px",
          border: "1px solid rgba(214,183,122,0.2)",
          borderRadius: "2px",
          pointerEvents: "none",
        }} />

        {/* Small floral accent top */}
        <div style={{ marginBottom: "1.2rem" }}>
          <BlossomCluster style={{ width: "50px", margin: "0 auto", opacity: 0.6 }} />
        </div>

        {/* Text content */}
        <div ref={linesRef}>
          <div className="text-reveal-wrap">
            <p className="hero-line eyebrow" style={{ marginBottom: "0.5rem" }}>
              with joy in our hearts
            </p>
          </div>
          <div className="text-reveal-wrap">
            <p className="hero-line body-md italic" style={{ marginBottom: "0.3rem", opacity: 0.75 }}>
              we invite you to
            </p>
          </div>
          <div className="text-reveal-wrap">
            <p className="hero-line label" style={{ marginBottom: "1.4rem", letterSpacing: "0.22em" }}>
              The Wedding of
            </p>
          </div>
        </div>

        {/* Couple names — the focal point */}
        <div ref={namesRef} style={{ marginBottom: "1.6rem", opacity: 0 }}>
          <h1
            className="script-xl"
            style={{
              lineHeight: 1.05,
              color: "var(--dusty-rose)",
            }}
          >
            {bride} &amp; {groom}
          </h1>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", margin: "0.8rem 0" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(214,183,122,0.5))" }} />
          <span style={{ color: "var(--champagne)", fontSize: "0.7rem" }}>✦</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(214,183,122,0.5))" }} />
        </div>

        {/* Date */}
        <div ref={dateRef} style={{ opacity: 0, marginBottom: "0.8rem" }}>
          <p className="date-display" style={{ fontSize: "var(--text-sm)", letterSpacing: "0.2em" }}>
            {display}
          </p>
          <p className="script-sm" style={{ fontSize: "1.3rem", color: "var(--champagne)", opacity: 0.8, marginTop: "0.2rem" }}>
            Together Forever
          </p>
        </div>

        {/* Leaf vine separator */}
        <div style={{ margin: "1rem 0" }}>
          <LeafVine style={{ width: "100%", maxWidth: "200px", margin: "0 auto", opacity: 0.5 }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: 0,
        }}
      >
        <p className="label" style={{ fontSize: "0.6rem", letterSpacing: "0.25em", marginBottom: "0.5rem" }}>
          scroll to discover
        </p>
        <div style={{
          width: "1px",
          height: "30px",
          background: "linear-gradient(to bottom, var(--champagne), transparent)",
          margin: "0 auto",
        }} />
      </div>
    </section>
  );
}
