import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { CornerWreath, BlossomCluster, SinglePetal } from "../assets/flowers/BotanicalSVGs";
import { playEnvelopeOpen } from "../animations/envelopeAnimation";
import weddingData from "../data/weddingData";

// Wax seal SVG component
const WaxSeal = () => (
  <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="45" cy="45" r="40" fill="#B9828C" />
    <circle cx="45" cy="45" r="35" fill="#C99AA4" />
    <circle cx="45" cy="45" r="30" fill="#B9828C" />
    {/* Monogram A & R */}
    <text x="45" y="52" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fill="#FFF9F3" opacity="0.95" letterSpacing="1">
      A♡R
    </text>
    {/* Ornamental ring */}
    <circle cx="45" cy="45" r="38" stroke="#D6B77A" strokeWidth="1" fill="none" opacity="0.6" strokeDasharray="4 3" />
  </svg>
);

// Crack SVG that appears on seal break
const SealCrack = () => (
  <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", inset: 0 }} aria-hidden="true">
    <path d="M35 30 L45 45 L38 55 M45 45 L55 38 L60 50" stroke="#3D2928" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export default function OpeningEnvelope({ onOpen }) {
  const envelopeRef = useRef(null);
  const sealRef = useRef(null);
  const sealCrackRef = useRef(null);
  const flapRef = useRef(null);
  const insidePaperRef = useRef(null);
  const letterPaperRef = useRef(null);
  const botanicalsRef = useRef(null);
  const petalsRef = useRef(null);
  const backgroundRef = useRef(null);
  const buttonRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const handleOpen = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    playEnvelopeOpen(
      {
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
      },
      () => {
        setTimeout(onOpen, 50);
      }
    );
  };

  // Gentle idle float animation
  useEffect(() => {
    if (!envelopeRef.current) return;
    const tl = gsap.to(envelopeRef.current, {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => tl.kill();
  }, []);

  const { bride, groom } = weddingData.couple;

  return (
    <div
      ref={backgroundRef}
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #FFF9F3 0%, #F5DDE2 60%, #FFF9F3 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "2rem 1.5rem",
      }}
    >
      {/* Botanical corners */}
      <div ref={botanicalsRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <CornerWreath className="parallax-slow"
          style={{ position: "absolute", top: 0, left: 0, width: "clamp(100px,30vw,180px)", opacity: 0.65 }} />
        <CornerWreath
          style={{ position: "absolute", top: 0, right: 0, width: "clamp(100px,30vw,180px)", opacity: 0.65, transform: "scaleX(-1)" }} />
        <CornerWreath
          style={{ position: "absolute", bottom: 0, left: 0, width: "clamp(80px,25vw,140px)", opacity: 0.5, transform: "scaleY(-1)" }} />
        <CornerWreath
          style={{ position: "absolute", bottom: 0, right: 0, width: "clamp(80px,25vw,140px)", opacity: 0.5, transform: "scale(-1,-1)" }} />
      </div>

      {/* Floating petals */}
      <div ref={petalsRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <SinglePetal
            key={i}
            style={{
              position: "absolute",
              width: `${14 + (i % 4) * 4}px`,
              left: `${8 + (i * 8) % 84}%`,
              top: `${10 + (i * 13) % 70}%`,
              opacity: 0,
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

      {/* Small heading */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <p className="eyebrow" style={{ marginBottom: "0.4rem" }}>you're invited</p>
        <p className="body-sm" style={{ letterSpacing: "0.15em", opacity: 0.7 }}>
          TO CELEBRATE OUR WEDDING
        </p>
      </motion.div>

      {/* Envelope Outer Frame */}
      <motion.div
        ref={envelopeRef}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          width: "clamp(280px, 85vw, 380px)",
          maxWidth: "420px",
          perspective: "1000px",
        }}
      >
        {/* Envelope body (overflow: visible so letter and flap slide out naturally) */}
        <div style={{
          position: "relative",
          background: "linear-gradient(145deg, #F5DDE2 0%, #EDD5D5 50%, #F5DDE2 100%)",
          borderRadius: "6px",
          padding: "0",
          boxShadow: "0 20px 80px rgba(61,41,40,0.15), 0 4px 20px rgba(61,41,40,0.1)",
          overflow: "visible",
        }}>
          {/* Inside paper liner (zIndex 2) */}
          <div
            ref={insidePaperRef}
            style={{
              position: "absolute",
              inset: "12px",
              background: "linear-gradient(180deg, #FFF9F3 0%, #FDF5EC 100%)",
              borderRadius: "3px",
              opacity: 0,
              zIndex: 2,
            }}
          />

          {/* Letter paper sliding out (zIndex 4 - sits inside pocket behind front V folds) */}
          <div
            ref={letterPaperRef}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "12px",
              right: "12px",
              height: "85%",
              background: "linear-gradient(180deg, #FFF9F3 0%, #FDF5EC 100%)",
              borderRadius: "3px",
              boxShadow: "0 4px 20px rgba(61,41,40,0.15)",
              zIndex: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformStyle: "preserve-3d",
            }}
          >
            <div style={{ textAlign: "center", padding: "1.2rem" }}>
              <p className="eyebrow" style={{ fontSize: "0.55rem", marginBottom: "0.4rem" }}>
                with joy in our hearts
              </p>
              <p className="body-sm" style={{ fontSize: "0.6rem", marginBottom: "0.3rem" }}>
                we invite you to
              </p>
              <p className="script-sm" style={{ fontSize: "1.8rem", lineHeight: 1.1 }}>
                {bride} &amp; {groom}
              </p>
            </div>
          </div>

          {/* Front pocket: bottom and side triangles (zIndex 8) */}
          <div style={{ position: "relative", zIndex: 8, pointerEvents: "none" }}>
            <svg viewBox="0 0 380 220" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", display: "block", borderRadius: "6px" }}>
              {/* Bottom V */}
              <path d="M0 220 L190 100 L380 220 Z" fill="#E8C5CA" />
              {/* Left triangle */}
              <path d="M0 0 L0 220 L190 100 Z" fill="#F0CFCF" />
              {/* Right triangle */}
              <path d="M380 0 L380 220 L190 100 Z" fill="#ECC5C8" />
              {/* Center overlap shadow accent */}
              <path d="M0 220 L190 100 L380 220" stroke="#D6A8B2" strokeWidth="0.8" opacity="0.4" />
            </svg>
          </div>

          {/* Envelope flap top triangle (zIndex 10) */}
          <div
            ref={flapRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              transformOrigin: "center top",
              transformStyle: "preserve-3d",
              backfaceVisibility: "visible",
            }}
          >
            <svg viewBox="0 0 380 180" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", display: "block" }}>
              <path d="M0 0 L190 160 L380 0 Z" fill="#ECC8CC" />
              <path d="M0 0 L190 160 L380 0" stroke="#D6A8B2" strokeWidth="1" fill="none" opacity="0.5" />
            </svg>
          </div>

          {/* Wax seal (zIndex 15 - sits over closed flap center) */}
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "72px",
              height: "72px",
              zIndex: 15,
            }}
          >
            <div ref={sealRef} style={{ width: "100%", height: "100%", position: "relative" }}>
              <WaxSeal />
            </div>
            <div ref={sealCrackRef} style={{ position: "absolute", inset: 0, opacity: 0 }}>
              <SealCrack />
            </div>
          </div>

          {/* Decorative inner gold border (zIndex 9) */}
          <div style={{
            position: "absolute",
            inset: "8px",
            border: "1px solid rgba(214,183,122,0.3)",
            borderRadius: "4px",
            pointerEvents: "none",
            zIndex: 9,
          }} />
        </div>
      </motion.div>

      {/* Open button */}
      <motion.div
        ref={buttonRef}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginTop: "2.5rem" }}
      >
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.03, boxShadow: "0 6px 28px rgba(185,130,140,0.25)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            background: "transparent",
            border: "1px solid var(--champagne)",
            borderRadius: "2px",
            padding: "0.9rem 2.2rem",
            cursor: "pointer",
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--deep-brown)",
            transition: "all 0.3s ease",
          }}
        >
          Open Invitation
          <span style={{ fontSize: "0.8em" }}>→</span>
        </motion.button>
      </motion.div>

      {/* Bottom accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ marginTop: "1.5rem" }}
      >
        <BlossomCluster style={{ width: "60px", opacity: 0.5 }} />
      </motion.div>
    </div>
  );
}
