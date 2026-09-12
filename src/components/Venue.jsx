import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CornerWreath, BlossomCluster } from "../assets/flowers/BotanicalSVGs";
import weddingData from "../data/weddingData";

gsap.registerPlugin(ScrollTrigger);

// Location pin icon
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "14px" }}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

export default function Venue() {
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const { venue } = weddingData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Initial state: zoomed + blurred
      gsap.set(imageRef.current, { scale: 1.2, filter: "blur(4px)" });
      gsap.set(contentRef.current, { opacity: 0, y: 30 });

      // Scroll reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "center 40%",
          scrub: 1.5,
        },
      });

      tl.to(imageRef.current, {
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "none",
      });

      tl.to(overlayRef.current, {
        opacity: 0.3,
        duration: 1,
        ease: "none",
      }, 0);

      // Non-scrub content reveal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 55%",
        onEnter: () => {
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section-venue"
      ref={sectionRef}
      style={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {/* Venue image (placeholder atmospheric gradient) */}
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #8A9A82 0%, #6B7A64 30%, #3D5040 60%, #2A3A2D 100%)",
          zIndex: 1,
        }}
      >
        {/* Church silhouette SVG placeholder */}
        <svg viewBox="0 0 390 600" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
          preserveAspectRatio="xMidYMid slice">
          {/* Sky gradient */}
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B8C8D8" />
              <stop offset="60%" stopColor="#D4C4B0" />
              <stop offset="100%" stopColor="#8A9A82" />
            </linearGradient>
            <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6B7A64" />
              <stop offset="100%" stopColor="#4A5A44" />
            </linearGradient>
          </defs>
          <rect width="390" height="600" fill="url(#sky)" />
          {/* Ground */}
          <rect y="420" width="390" height="180" fill="url(#ground)" opacity="0.8" />
          {/* Church body */}
          <rect x="120" y="220" width="150" height="220" fill="#E8DDD0" opacity="0.9" />
          {/* Church facade arch */}
          <path d="M120 220 L195 170 L270 220Z" fill="#DDD0C0" opacity="0.9" />
          {/* Bell tower */}
          <rect x="165" y="120" width="60" height="100" fill="#E0D5C5" opacity="0.95" />
          {/* Steeple */}
          <path d="M165 120 L195 50 L225 120Z" fill="#D5C8B5" opacity="0.95" />
          {/* Cross */}
          <line x1="195" y1="50" x2="195" y2="30" stroke="#C0B0A0" strokeWidth="3" />
          <line x1="185" y1="38" x2="205" y2="38" stroke="#C0B0A0" strokeWidth="3" />
          {/* Windows */}
          <ellipse cx="195" cy="240" rx="20" ry="30" fill="#B8C8D8" opacity="0.5" />
          <rect x="175" y="300" width="20" height="35" fill="#B8C8D8" opacity="0.4" />
          <rect x="215" y="300" width="20" height="35" fill="#B8C8D8" opacity="0.4" />
          {/* Door */}
          <path d="M175 440 L175 380 Q195 360 215 380 L215 440Z" fill="#A09080" opacity="0.7" />
          {/* Trees */}
          <ellipse cx="80" cy="380" rx="35" ry="55" fill="#5A6A54" opacity="0.8" />
          <rect x="76" y="420" width="8" height="30" fill="#4A3A2A" opacity="0.6" />
          <ellipse cx="310" cy="370" rx="30" ry="50" fill="#5A6A54" opacity="0.75" />
          <rect x="306" y="408" width="8" height="25" fill="#4A3A2A" opacity="0.6" />
        </svg>
      </div>

      {/* Gradient overlay (lightens toward bottom for text) */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(61,41,40,0.1) 0%, rgba(61,41,40,0.5) 60%, rgba(61,41,40,0.75) 100%)",
          zIndex: 2,
          opacity: 0.6,
        }}
      />

      {/* Botanical overlay (top corners) */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3 }}>
        <CornerWreath className="parallax-slow"
          style={{ position: "absolute", top: 0, left: 0, width: "120px", opacity: 0.5 }} />
        <CornerWreath
          style={{ position: "absolute", top: 0, right: 0, width: "120px", opacity: 0.5, transform: "scaleX(-1)" }} />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 4,
          textAlign: "center",
          padding: "clamp(2rem,6vw,3rem) var(--content-padding)",
          width: "100%",
          maxWidth: "440px",
        }}
      >
        <p className="label" style={{ color: "rgba(255,249,243,0.75)", marginBottom: "0.8rem" }}>
          The Venue
        </p>
        <h2 style={{
          fontFamily: "var(--font-script)",
          fontSize: "clamp(2.2rem,8vw,3.5rem)",
          color: "#FFF9F3",
          lineHeight: 1.1,
          marginBottom: "0.5rem",
          textShadow: "0 2px 20px rgba(0,0,0,0.3)",
        }}>
          {venue.name}
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginBottom: "1.8rem" }}>
          <PinIcon style={{ color: "rgba(214,183,122,0.9)" }} />
          <p style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(214,183,122,0.9)",
          }}>
            {venue.city}, {venue.state}
          </p>
        </div>

        <motion.a
          href={venue.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(255,249,243,0.12)",
            border: "1px solid rgba(214,183,122,0.6)",
            borderRadius: "2px",
            padding: "0.8rem 1.8rem",
            textDecoration: "none",
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,249,243,0.95)",
            backdropFilter: "blur(4px)",
          }}
        >
          <PinIcon />
          Get Directions
        </motion.a>
      </div>
    </section>
  );
}
