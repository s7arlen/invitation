import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import weddingData from "../data/weddingData";

export default function MusicControl({ visible = true }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const pulseRef = useRef(null);
  const { music } = weddingData;

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  // Pulse animation when playing
  useEffect(() => {
    if (!pulseRef.current) return;
    if (playing) {
      gsap.to(pulseRef.current, {
        scale: 1.15,
        opacity: 0,
        duration: 1.2,
        repeat: -1,
        ease: "sine.out",
      });
    } else {
      gsap.killTweensOf(pulseRef.current);
      gsap.set(pulseRef.current, { scale: 1, opacity: 0 });
    }
  }, [playing]);

  if (!visible) return null;

  return (
    <>
      {/* Hidden audio element */}
      {music.src && (
        <audio ref={audioRef} src={music.src} loop preload="none" />
      )}

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              bottom: "clamp(1.2rem,4vw,2rem)",
              right: "clamp(1.2rem,4vw,2rem)",
              zIndex: "var(--z-nav)",
            }}
          >
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              title={playing ? "Pause music" : "Play music"}
              style={{
                position: "relative",
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                background: "rgba(255,249,243,0.92)",
                border: "1px solid rgba(214,183,122,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(61,41,40,0.12)",
                backdropFilter: "blur(8px)",
                fontFamily: "var(--font-serif)",
                fontSize: "1.1rem",
                color: playing ? "var(--dusty-rose)" : "rgba(61,41,40,0.5)",
                transition: "color 0.3s ease",
              }}
            >
              {/* Pulse ring */}
              <div
                ref={pulseRef}
                style={{
                  position: "absolute",
                  inset: "-4px",
                  borderRadius: "50%",
                  border: "1px solid rgba(185,130,140,0.5)",
                  opacity: 0,
                }}
              />
              {playing ? "♫" : "♩"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
