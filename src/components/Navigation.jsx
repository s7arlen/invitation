import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#section-hero" },
  { label: "Our Story", href: "#section-story" },
  { label: "Details", href: "#section-celebration" },
  { label: "Venue", href: "#section-venue" },
  { label: "Gallery", href: "#section-gallery" },
  { label: "RSVP", href: "#section-rsvp" },
];

export default function Navigation({ visible = true }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Menu button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled || open ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "fixed",
          top: "clamp(1rem,3vw,1.5rem)",
          right: "clamp(1rem,3vw,1.5rem)",
          zIndex: "var(--z-nav)",
          pointerEvents: scrolled || open ? "auto" : "none",
        }}
      >
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "rgba(255,249,243,0.92)",
            border: "1px solid rgba(214,183,122,0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(61,41,40,0.1)",
            backdropFilter: "blur(8px)",
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={open ? {
                rotate: i === 1 ? 0 : i === 0 ? 45 : -45,
                y: i === 0 ? 8 : i === 2 ? -8 : 0,
                opacity: i === 1 ? 0 : 1,
              } : { rotate: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
              style={{
                display: "block",
                width: "16px",
                height: "1px",
                background: "var(--deep-brown)",
                borderRadius: "1px",
                transformOrigin: "center",
              }}
            />
          ))}
        </motion.button>
      </motion.div>

      {/* Menu drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(61,41,40,0.15)",
                zIndex: "calc(var(--z-nav) - 1)",
                backdropFilter: "blur(2px)",
              }}
            />

            {/* Drawer */}
            <motion.nav
              key="drawer"
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: "clamp(1rem,3vw,1.5rem)",
                right: "clamp(1rem,3vw,1.5rem)",
                zIndex: "var(--z-nav)",
                background: "rgba(255,249,243,0.96)",
                border: "1px solid rgba(214,183,122,0.3)",
                borderRadius: "6px",
                padding: "3.5rem 2rem 2rem",
                minWidth: "200px",
                boxShadow: "0 8px 40px rgba(61,41,40,0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Ornamental top */}
              <div style={{
                position: "absolute",
                top: "1rem",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-serif)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "var(--champagne)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}>
                ✦ Menu ✦
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <button
                      onClick={() => handleNav(item.href)}
                      style={{
                        background: "none",
                        border: "none",
                        width: "100%",
                        textAlign: "left",
                        padding: "0.6rem 0",
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-md)",
                        color: "var(--deep-brown)",
                        cursor: "pointer",
                        borderBottom: "1px solid rgba(214,183,122,0.15)",
                        letterSpacing: "0.05em",
                        transition: "color 0.2s, padding-left 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--dusty-rose)";
                        e.currentTarget.style.paddingLeft = "0.5rem";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--deep-brown)";
                        e.currentTarget.style.paddingLeft = "0";
                      }}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
