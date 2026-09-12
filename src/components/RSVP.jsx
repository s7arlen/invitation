import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlossomCluster, LeafVine, CornerWreath } from "../assets/flowers/BotanicalSVGs";
import weddingData from "../data/weddingData";

// Elegant form input
const InvitationInput = ({ label, name, value, onChange, error, type = "text", placeholder = "" }) => (
  <div style={{ marginBottom: "1.5rem" }}>
    <label style={{
      display: "block",
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-xs)",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--deep-brown)",
      opacity: 0.7,
      marginBottom: "0.4rem",
    }}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${error ? "var(--dusty-rose)" : "rgba(61,41,40,0.2)"}`,
        padding: "0.5rem 0",
        fontFamily: "var(--font-serif)",
        fontSize: "var(--text-base)",
        color: "var(--deep-brown)",
        outline: "none",
        transition: "border-color 0.3s ease",
      }}
      onFocus={(e) => { e.target.style.borderBottomColor = "var(--champagne)"; }}
      onBlur={(e) => { e.target.style.borderBottomColor = error ? "var(--dusty-rose)" : "rgba(61,41,40,0.2)"; }}
    />
    {error && (
      <p style={{ color: "var(--dusty-rose)", fontSize: "0.7rem", marginTop: "0.3rem", fontFamily: "var(--font-serif)" }}>
        {error}
      </p>
    )}
  </div>
);

// Elegant select
const InvitationSelect = ({ label, name, value, onChange, error }) => (
  <div style={{ marginBottom: "1.5rem" }}>
    <label style={{
      display: "block",
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-xs)",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--deep-brown)",
      opacity: 0.7,
      marginBottom: "0.4rem",
    }}>
      {label}
    </label>
    <div style={{ position: "relative" }}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${error ? "var(--dusty-rose)" : "rgba(61,41,40,0.2)"}`,
          padding: "0.5rem 0",
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-base)",
          color: value ? "var(--deep-brown)" : "rgba(61,41,40,0.4)",
          outline: "none",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        <option value="" disabled>Select</option>
        <option value="yes">Yes, joyfully attending</option>
        <option value="no">Regretfully unable to attend</option>
      </select>
      <span style={{
        position: "absolute",
        right: "4px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--champagne)",
        pointerEvents: "none",
        fontSize: "0.7rem",
      }}>∨</span>
    </div>
    {error && (
      <p style={{ color: "var(--dusty-rose)", fontSize: "0.7rem", marginTop: "0.3rem", fontFamily: "var(--font-serif)" }}>
        {error}
      </p>
    )}
  </div>
);

// Textarea
const InvitationTextarea = ({ label, name, value, onChange }) => (
  <div style={{ marginBottom: "1.5rem" }}>
    <label style={{
      display: "block",
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-xs)",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--deep-brown)",
      opacity: 0.7,
      marginBottom: "0.4rem",
    }}>
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      style={{
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: "1px solid rgba(61,41,40,0.2)",
        padding: "0.5rem 0",
        fontFamily: "var(--font-serif)",
        fontSize: "var(--text-base)",
        color: "var(--deep-brown)",
        outline: "none",
        resize: "none",
        lineHeight: 1.6,
      }}
      onFocus={(e) => { e.target.style.borderBottomColor = "var(--champagne)"; }}
      onBlur={(e) => { e.target.style.borderBottomColor = "rgba(61,41,40,0.2)"; }}
    />
  </div>
);

export default function RSVP() {
  const [form, setForm] = useState({ name: "", attending: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const { rsvp } = weddingData;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please share your name";
    if (!form.attending) newErrors.attending = "Please let us know if you can join";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setStatus("loading");

    // Simulate API call (replace with real endpoint)
    await new Promise((r) => setTimeout(r, 1800));

    if (rsvp.endpoint) {
      try {
        const res = await fetch(rsvp.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Network error");
        setStatus("success");
      } catch {
        setStatus("error");
      }
    } else {
      // Demo mode
      setStatus("success");
    }
  };

  return (
    <section
      id="section-rsvp"
      style={{
        width: "100%",
        padding: "clamp(4rem,12vw,6rem) var(--content-padding)",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #FFF9F3 0%, #F5DDE2 100%)",
      }}
    >
      {/* Botanical corners */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <CornerWreath style={{ position: "absolute", top: 0, right: 0, width: "120px", opacity: 0.4, transform: "scaleX(-1)" }} />
        <CornerWreath style={{ position: "absolute", bottom: 0, left: 0, width: "100px", opacity: 0.35, transform: "scaleY(-1)" }} />
      </div>

      <div className="invitation-container">
        {/* Header */}
        <div className="scroll-fade-up" style={{ textAlign: "center", marginBottom: "clamp(2.5rem,7vw,3.5rem)" }}>
          <BlossomCluster style={{ width: "50px", margin: "0 auto 1.2rem", opacity: 0.6 }} />
          <h2 className="heading-lg">RSVP</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", margin: "0.8rem 0" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(214,183,122,0.5))" }} />
            <span style={{ color: "var(--champagne)", fontSize: "0.7rem" }}>✦</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(214,183,122,0.5))" }} />
          </div>
          <p className="body-md italic" style={{ opacity: 0.8 }}>
            We would love to celebrate with you.
          </p>
          {rsvp.deadline && (
            <p className="body-sm" style={{ opacity: 0.55, marginTop: "0.4rem" }}>
              Please respond by {rsvp.deadline}
            </p>
          )}
        </div>

        {/* Form card */}
        <div style={{
          background: "rgba(255,249,243,0.7)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(214,183,122,0.2)",
          borderRadius: "4px",
          padding: "clamp(1.8rem,6vw,2.8rem) clamp(1.5rem,5vw,2.5rem)",
          position: "relative",
        }}>
          {/* Inner border */}
          <div style={{ position: "absolute", inset: "8px", border: "1px solid rgba(214,183,122,0.15)", borderRadius: "2px", pointerEvents: "none" }} />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: "center", padding: "2rem 0" }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--dusty-rose)" }}>♡</div>
                <h3 className="heading-md" style={{ marginBottom: "0.6rem" }}>
                  Thank You, {form.name}!
                </h3>
                <p className="body-sm" style={{ opacity: 0.75 }}>
                  {form.attending === "yes"
                    ? "We are so thrilled you'll be joining us."
                    : "We'll miss you, but carry you in our hearts."}
                </p>
                <LeafVine style={{ width: "120px", margin: "1.5rem auto 0", opacity: 0.4 }} />
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <InvitationInput
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Your full name"
                />
                <InvitationSelect
                  label="Will you be attending?"
                  name="attending"
                  value={form.attending}
                  onChange={handleChange}
                  error={errors.attending}
                />
                <InvitationTextarea
                  label="Message (Optional)"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                />

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ color: "var(--dusty-rose)", fontFamily: "var(--font-serif)", fontSize: "0.8rem", marginBottom: "1rem" }}
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={status !== "loading" ? { scale: 1.02, boxShadow: "0 6px 24px rgba(185,130,140,0.25)" } : {}}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    background: status === "loading" ? "rgba(185,130,140,0.6)" : "var(--dusty-rose)",
                    color: "#FFF9F3",
                    border: "none",
                    borderRadius: "2px",
                    padding: "0.9rem 2rem",
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-sm)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    marginTop: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    transition: "background 0.3s ease",
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <span style={{
                        width: "14px", height: "14px", borderRadius: "50%",
                        border: "2px solid rgba(255,249,243,0.4)",
                        borderTopColor: "#FFF9F3",
                        display: "inline-block",
                        animation: "spin 0.8s linear infinite",
                      }} />
                      Sending...
                    </>
                  ) : (
                    <>Confirm RSVP ♡</>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
