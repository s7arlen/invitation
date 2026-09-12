import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CornerWreath, BlossomCluster, LeafVine } from "../assets/flowers/BotanicalSVGs";
import { initStoryAnimation } from "../animations/storyAnimation";
import weddingData from "../data/weddingData";

gsap.registerPlugin(ScrollTrigger);

// Photo placeholder component
const PhotoCircle = ({ index }) => (
  <div style={{
    width: "clamp(64px,18vw,80px)",
    height: "clamp(64px,18vw,80px)",
    borderRadius: "50%",
    background: `linear-gradient(${135 + index * 30}deg, var(--blush) 0%, var(--soft-pink) 50%, var(--champagne-light) 100%)`,
    border: "3px solid rgba(214,183,122,0.4)",
    boxShadow: "0 4px 16px rgba(61,41,40,0.12)",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }}>
    <span style={{ fontSize: "1.2rem", opacity: 0.5 }}>♡</span>
  </div>
);

export default function Story() {
  const containerRef = useRef(null);
  const { story } = weddingData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      initStoryAnimation(containerRef);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section-story"
      style={{
        width: "100%",
        padding: "clamp(4rem,12vw,6rem) var(--content-padding)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background botanical */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <CornerWreath
          className="parallax-slow"
          style={{ position: "absolute", top: "10%", right: 0, width: "120px", opacity: 0.35, transform: "scaleX(-1)" }} />
        <CornerWreath
          style={{ position: "absolute", bottom: "10%", left: 0, width: "100px", opacity: 0.3, transform: "scaleY(-1)" }} />
      </div>

      <div className="invitation-container" ref={containerRef}>
        {/* Section header */}
        <div className="scroll-fade-up" style={{ textAlign: "center", marginBottom: "clamp(3rem,8vw,4rem)" }}>
          <BlossomCluster style={{ width: "55px", margin: "0 auto 1.2rem", opacity: 0.6 }} />
          <h2 className="heading-lg scroll-fade-up">Our Story</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", margin: "0.8rem 0" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(214,183,122,0.5))" }} />
            <span style={{ color: "var(--champagne)", fontSize: "0.7rem" }}>✦</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(214,183,122,0.5))" }} />
          </div>
          <p className="script-sm" style={{ color: "var(--dusty-rose)", fontSize: "1.5rem" }}>
            Two hearts, one journey.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "clamp(1.5rem,6vw,2.5rem)" }}>
          {/* Vertical line (SVG for stroke animation) */}
          <svg
            style={{
              position: "absolute",
              left: "clamp(0.5rem,2vw,1rem)",
              top: 0,
              bottom: 0,
              width: "2px",
              height: "100%",
              overflow: "visible",
            }}
            preserveAspectRatio="none"
          >
            <line
              className="story-line"
              x1="1" y1="0" x2="1" y2="100%"
              stroke="rgba(214,183,122,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Story items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2.5rem,7vw,3.5rem)" }}>
            {story.map((item, i) => (
              <div
                key={item.year}
                className="story-item"
                style={{ display: "flex", gap: "clamp(1rem,4vw,1.8rem)", alignItems: "flex-start", position: "relative" }}
              >
                {/* Dot on timeline */}
                <div style={{
                  position: "absolute",
                  left: `clamp(-1.8rem,-5vw,-1.2rem)`,
                  top: "clamp(20px,6vw,28px)",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--champagne)",
                  border: "2px solid var(--ivory)",
                  boxShadow: "0 0 0 2px rgba(214,183,122,0.4)",
                  flexShrink: 0,
                }} />

                {/* Photo */}
                <div className="story-photo" style={{ flexShrink: 0 }}>
                  <PhotoCircle index={i} />
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <div className="text-reveal-wrap" style={{ marginBottom: "0.2rem" }}>
                    <p className="story-year story-text-line label" style={{ fontSize: "0.65rem" }}>
                      {item.year}
                    </p>
                  </div>
                  <div className="text-reveal-wrap">
                    <h3 className="story-text-line heading-md" style={{ fontSize: "var(--text-xl)", marginBottom: "0.4rem" }}>
                      {item.title}
                    </h3>
                  </div>
                  <div className="text-reveal-wrap">
                    <p className="story-text-line body-sm" style={{ lineHeight: 1.65 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom flourish */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <LeafVine style={{ width: "160px", margin: "0 auto", opacity: 0.4 }} />
        </div>
      </div>
    </section>
  );
}
