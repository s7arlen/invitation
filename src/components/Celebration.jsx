import React from "react";
import { BlossomCluster, LeafVine, CornerWreath } from "../assets/flowers/BotanicalSVGs";
import weddingData from "../data/weddingData";

// Elegant ceremony icon
const CeremonyIcon = () => (
  <svg viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "28px", height: "auto" }}>
    <path d="M20 4 C12 4 6 10 6 18 C6 28 20 44 20 44 C20 44 34 28 34 18 C34 10 28 4 20 4Z"
      stroke="var(--champagne)" strokeWidth="1.2" fill="none" />
    <path d="M20 4 L20 0 M16 6 L14 3 M24 6 L26 3"
      stroke="var(--champagne)" strokeWidth="1" strokeLinecap="round" fill="none" />
    <circle cx="20" cy="18" r="4" stroke="var(--champagne)" strokeWidth="1" fill="none" />
  </svg>
);

// Reception icon
const ReceptionIcon = () => (
  <svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "32px", height: "auto" }}>
    {/* Wine glass */}
    <path d="M24 4 L32 16 Q34 22 24 28 Q14 22 16 16 Z"
      stroke="var(--champagne)" strokeWidth="1.2" fill="none" />
    <line x1="24" y1="28" x2="24" y2="38" stroke="var(--champagne)" strokeWidth="1" />
    <line x1="18" y1="38" x2="30" y2="38" stroke="var(--champagne)" strokeWidth="1" />
  </svg>
);

export default function Celebration() {
  const { date, ceremony, reception } = weddingData;

  return (
    <section
      id="section-celebration"
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
          style={{ position: "absolute", top: 0, right: 0, width: "130px", opacity: 0.4, transform: "scaleX(-1)" }} />
        <CornerWreath
          style={{ position: "absolute", bottom: 0, left: 0, width: "110px", opacity: 0.35, transform: "scaleY(-1)" }} />
      </div>

      <div className="invitation-container">
        {/* Header */}
        <div className="scroll-fade-up" style={{ textAlign: "center", marginBottom: "clamp(2.5rem,7vw,4rem)" }}>
          <BlossomCluster style={{ width: "50px", margin: "0 auto 1rem", opacity: 0.6 }} />
          <h2 className="heading-lg">The Celebration</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", margin: "1rem 0" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(214,183,122,0.5))" }} />
            <span style={{ color: "var(--champagne)", fontSize: "0.7rem" }}>✦</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(214,183,122,0.5))" }} />
          </div>
          <p className="date-display" style={{ letterSpacing: "0.22em" }}>
            {date.month} {date.day} · {date.year}
          </p>
        </div>

        {/* Events */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

          {/* Ceremony */}
          <div className="scroll-fade-up" style={{
            textAlign: "center",
            padding: "clamp(1.8rem,5vw,2.5rem) 0",
            borderTop: "1px solid rgba(214,183,122,0.25)",
          }}>
            <div style={{ marginBottom: "1rem" }}>
              <CeremonyIcon />
            </div>
            <p className="label" style={{ marginBottom: "0.6rem" }}>Ceremony</p>
            <p className="heading-md" style={{ fontSize: "var(--text-2xl)", fontStyle: "italic", marginBottom: "0.4rem" }}>
              {ceremony.time}
            </p>
            <p className="body-sm" style={{ opacity: 0.8, marginBottom: "0.2rem" }}>{ceremony.venue}</p>
            <p className="body-sm" style={{ opacity: 0.55, fontSize: "0.75rem" }}>{ceremony.address}</p>
          </div>

          {/* Ornamental divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "0.5rem 2rem",
          }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(214,183,122,0.3))" }} />
            <LeafVine style={{ width: "70px", opacity: 0.4 }} />
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(214,183,122,0.3))" }} />
          </div>

          {/* Reception */}
          <div className="scroll-fade-up" style={{
            textAlign: "center",
            padding: "clamp(1.8rem,5vw,2.5rem) 0",
            borderBottom: "1px solid rgba(214,183,122,0.25)",
          }}>
            <div style={{ marginBottom: "1rem" }}>
              <ReceptionIcon />
            </div>
            <p className="label" style={{ marginBottom: "0.6rem" }}>Reception</p>
            <p className="heading-md" style={{ fontSize: "var(--text-2xl)", fontStyle: "italic", marginBottom: "0.4rem" }}>
              {reception.time}
            </p>
            <p className="body-sm" style={{ opacity: 0.8, marginBottom: "0.2rem" }}>{reception.venue}</p>
            <p className="body-sm" style={{ opacity: 0.55, fontSize: "0.75rem" }}>{reception.address}</p>
          </div>
        </div>

        {/* Closing flourish */}
        <div className="scroll-fade-up" style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p className="script-sm" style={{ fontSize: "1.2rem", color: "var(--champagne)", opacity: 0.7 }}>
            with love &amp; gratitude
          </p>
        </div>
      </div>
    </section>
  );
}
