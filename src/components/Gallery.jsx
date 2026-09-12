import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { BlossomCluster, CornerWreath } from "../assets/flowers/BotanicalSVGs";
import { initGalleryAnimation } from "../animations/galleryAnimation";
import weddingData from "../data/weddingData";

// Polaroid-style photo card
const PhotoCard = ({ index, rotation, zIndex, offset, size }) => {
  const gradients = [
    "linear-gradient(135deg, #F5DDE2 0%, #E8C5CA 50%, #D6B77A 100%)",
    "linear-gradient(155deg, #8A9A82 0%, #6B7A64 50%, #F2D0D7 100%)",
    "linear-gradient(120deg, #F2D0D7 0%, #7B1D2E 50%, #8A9A82 100%)",
    "linear-gradient(145deg, #D6B77A 0%, #7B1D2E 40%, #F5DDE2 100%)",
  ];

  return (
    <div
      className="gallery-photo"
      style={{
        position: "absolute",
        ...offset,
        width: size.w,
        height: size.h,
        zIndex,
        transform: `rotate(${rotation}deg)`,
        background: "#FFF9F3",
        padding: "8px 8px 24px 8px",
        boxShadow: "2px 4px 24px rgba(61,41,40,0.18), 0 8px 32px rgba(61,41,40,0.1)",
        borderRadius: "2px",
      }}
    >
      {/* Photo content */}
      <div style={{
        width: "100%",
        height: "calc(100% - 20px)",
        background: gradients[index % gradients.length],
        borderRadius: "1px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{ fontSize: "2rem", opacity: 0.35 }}>♡</span>
      </div>
      {/* Caption line */}
      <div style={{
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{ fontFamily: "var(--font-script)", fontSize: "0.7rem", color: "var(--deep-brown)", opacity: 0.5 }}>
          {["Our beginning", "Together", "With love", "Forever"][index % 4]}
        </span>
      </div>
    </div>
  );
};

export default function Gallery() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      initGalleryAnimation(containerRef);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Photo layout configs
  const photos = [
    { rotation: -3, zIndex: 4, offset: { top: "5%", left: "2%" }, size: { w: "52%", h: "48%" } },
    { rotation: 2, zIndex: 3, offset: { top: "10%", right: "2%" }, size: { w: "45%", h: "42%" } },
    { rotation: -1.5, zIndex: 2, offset: { bottom: "5%", left: "8%" }, size: { w: "45%", h: "40%" } },
    { rotation: 3.5, zIndex: 1, offset: { bottom: "8%", right: "5%" }, size: { w: "48%", h: "44%" } },
  ];

  return (
    <section
      id="section-gallery"
      style={{
        width: "100%",
        padding: "clamp(4rem,12vw,6rem) var(--content-padding)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Botanicals */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <CornerWreath className="parallax-slow"
          style={{ position: "absolute", top: 0, left: 0, width: "130px", opacity: 0.4 }} />
        <CornerWreath
          style={{ position: "absolute", bottom: 0, right: 0, width: "110px", opacity: 0.35, transform: "scale(-1,-1)" }} />
      </div>

      <div className="invitation-container">
        {/* Header */}
        <div className="scroll-fade-up" style={{ textAlign: "center", marginBottom: "clamp(2rem,6vw,3rem)" }}>
          <BlossomCluster style={{ width: "50px", margin: "0 auto 1rem", opacity: 0.6 }} />
          <h2 className="heading-lg">Our Gallery</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", margin: "0.8rem 0" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(214,183,122,0.5))" }} />
            <span style={{ color: "var(--champagne)", fontSize: "0.7rem" }}>✦</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(214,183,122,0.5))" }} />
          </div>
          <p className="script-sm" style={{ fontSize: "1.3rem", color: "var(--dusty-rose)" }}>
            Moments we cherish.
          </p>
        </div>

        {/* Editorial photo layout */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "110%",
            maxWidth: "440px",
            margin: "0 auto",
          }}
        >
          {photos.map((photo, i) => (
            <PhotoCard key={i} index={i} {...photo} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="scroll-fade-up" style={{ textAlign: "center", marginTop: "2rem" }}>
          <p className="label" style={{ fontSize: "0.6rem", opacity: 0.5 }}>
            scroll to explore ↓
          </p>
        </div>
      </div>
    </section>
  );
}
