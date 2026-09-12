import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

import OpeningEnvelope from "./components/OpeningEnvelope";
import LetterReveal from "./components/LetterReveal";
import Story from "./components/Story";
import Celebration from "./components/Celebration";
import Venue from "./components/Venue";
import Gallery from "./components/Gallery";
import PhotoStack from "./components/PhotoStack";
import Countdown from "./components/Countdown";
import RSVP from "./components/RSVP";
import FinalSection from "./components/FinalSection";
import Navigation from "./components/Navigation";
import MusicControl from "./components/MusicControl";

import { initScrollAnimations, destroyScrollAnimations } from "./animations/scrollAnimations";

import "./styles/global.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [phase, setPhase] = useState("envelope"); // "envelope" | "invitation"
  const lenisRef = useRef(null);

  const handleEnvelopeOpen = () => {
    setPhase("invitation");
  };

  // Initialize Lenis smooth scroll when invitation phase starts
  useEffect(() => {
    if (phase !== "invitation") return;

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      // ScrollTrigger + Lenis sync
      lenis.on("scroll", ScrollTrigger.update);

      // Initialize all scroll animations passing lenis for ticker integration
      initScrollAnimations(lenis);

      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      destroyScrollAnimations();
    };
  }, [phase]);

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "var(--ivory)",
      overflowX: "hidden",
    }}>
      {phase === "envelope" ? (
        <OpeningEnvelope onOpen={handleEnvelopeOpen} />
      ) : (
        <>
          {/* Navigation */}
          <Navigation visible={true} />

          {/* Music control */}
          <MusicControl visible={true} />

          {/* All invitation sections */}
          <main style={{ overflowX: "hidden", width: "100%" }}>
            <LetterReveal />
            <Story />
            <Celebration />
            <Venue />
            <Gallery />
            <PhotoStack />
            <Countdown />
            <RSVP />
            <FinalSection />
          </main>
        </>
      )}
    </div>
  );
}
