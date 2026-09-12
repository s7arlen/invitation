import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { BlossomCluster } from "../assets/flowers/BotanicalSVGs";
import { initPhotoStackAnimation } from "../animations/photoStackAnimation";

// Stack card component
const StackCard = ({ index, rotation, offset }) => {
  const gradients = [
    "linear-gradient(150deg, #F5DDE2 0%, #E8C0C8 60%, #D6B77A 100%)",
    "linear-gradient(160deg, #8A9A82 0%, #6B7A64 50%, #F2D0D7 100%)",
    "linear-gradient(130deg, #B9828C 0%, #F5DDE2 60%, #8A9A82 100%)",
    "linear-gradient(145deg, #D6B77A 0%, #F2D0D7 50%, #B9828C 100%)",
  ];
  const captions = ["Our Story", "With Love", "Together", "Forever"];

  return (
    <div
      className="stack-card"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        background: "#FFF9F3",
        padding: "10px 10px 32px 10px",
        boxShadow: "2px 6px 28px rgba(61,41,40,0.16), 0 10px 40px rgba(61,41,40,0.09)",
        borderRadius: "2px",
        transform: `rotate(${rotation}deg) translate(${offset.x}px, ${offset.y}px)`,
        willChange: "transform",
      }}
    >
      {/* Photo area */}
      <div style={{
        width: "100%",
        paddingBottom: "75%",
        position: "relative",
        background: gradients[index % gradients.length],
        borderRadius: "1px",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "0.5rem",
        }}>
          <span style={{ fontSize: "3rem", opacity: 0.35 }}>♡</span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.75rem", opacity: 0.5, letterSpacing: "0.1em" }}>
            Photo {index + 1}
          </span>
        </div>
      </div>
      {/* Caption */}
      <div style={{
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{ fontFamily: "var(--font-script)", fontSize: "1rem", color: "var(--deep-brown)", opacity: 0.55 }}>
          {captions[index % captions.length]}
        </span>
      </div>
    </div>
  );
};

const cards = [
  { rotation: 0, offset: { x: 0, y: 0 } },
  { rotation: -3, offset: { x: -4, y: 6 } },
  { rotation: 4, offset: { x: 4, y: 10 } },
  { rotation: -2, offset: { x: 2, y: 14 } },
];

export default function PhotoStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      initPhotoStackAnimation(containerRef);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section-photostack"
      style={{
        width: "100%",
        padding: "clamp(4rem,12vw,6rem) var(--content-padding)",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #FFF9F3 0%, #F5DDE2 50%, #FFF9F3 100%)",
      }}
    >
      <div className="invitation-container">
        {/* Header */}
        <div className="scroll-fade-up" style={{ textAlign: "center", marginBottom: "clamp(2rem,6vw,3rem)" }}>
          <BlossomCluster style={{ width: "50px", margin: "0 auto 1rem", opacity: 0.6 }} />
          <p className="label" style={{ marginBottom: "0.5rem" }}>A Glimpse Of Us</p>
        </div>

        {/* Stack container */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "320px",
            margin: "0 auto",
            paddingBottom: "80%",
          }}
        >
          {/* Cards rendered in sequence (GSAP handles zIndex stack order) */}
          {cards.map((card, i) => (
            <StackCard
              key={i}
              index={i}
              rotation={card.rotation}
              offset={card.offset}
            />
          ))}
        </div>

        {/* Swipe hint */}
        <div className="scroll-fade-up" style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p className="label" style={{ fontSize: "0.6rem", opacity: 0.5 }}>
            ← Scroll to stack cards →
          </p>
        </div>
      </div>
    </section>
  );
}
