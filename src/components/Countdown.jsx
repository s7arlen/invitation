import React, { useRef, useEffect, useState } from "react";
import { CountdownWreath, BlossomCluster } from "../assets/flowers/BotanicalSVGs";
import weddingData from "../data/weddingData";

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

const TimeUnit = ({ value, label }) => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.2rem",
    minWidth: "clamp(48px,13vw,64px)",
  }}>
    <div style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.6rem,6vw,2.5rem)",
      fontWeight: 400,
      color: "var(--deep-brown)",
      lineHeight: 1,
    }}>
      {String(value).padStart(2, "0")}
    </div>
    <div className="label" style={{ fontSize: "0.55rem" }}>{label}</div>
  </div>
);

const Separator = () => (
  <div style={{
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(1.2rem,4vw,1.8rem)",
    color: "var(--champagne)",
    marginBottom: "0.8rem",
    opacity: 0.7,
  }}>:</div>
);

export default function Countdown() {
  const { date } = weddingData;
  const timeLeft = useCountdown(date.target);

  return (
    <section
      id="section-countdown"
      style={{
        width: "100%",
        padding: "clamp(4rem,12vw,6rem) var(--content-padding)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div className="invitation-container">
        {/* Header */}
        <div className="scroll-fade-up" style={{ marginBottom: "clamp(2rem,6vw,3rem)" }}>
          <BlossomCluster style={{ width: "50px", margin: "0 auto 1.2rem", opacity: 0.6 }} />
          <p className="label" style={{ marginBottom: "0.4rem" }}>Counting Down</p>
          <h2 className="heading-lg">To Our Day</h2>
        </div>

        {/* Wreath with days count */}
        <div className="scroll-fade-up" style={{ position: "relative", width: "clamp(200px,70vw,260px)", margin: "0 auto 2.5rem" }}>
          <CountdownWreath style={{ width: "100%", opacity: 0.85 }} />
          {/* Center content */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem,14vw,5.5rem)",
              fontWeight: 400,
              color: "var(--dusty-rose)",
              lineHeight: 1,
            }}>
              {timeLeft.days}
            </div>
            <div className="label" style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}>Days</div>
          </div>
        </div>

        {/* HRS MIN SEC */}
        <div className="scroll-fade-up" style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0 1rem",
        }}>
          <TimeUnit value={timeLeft.hours} label="HRS" />
          <Separator />
          <TimeUnit value={timeLeft.minutes} label="MIN" />
          <Separator />
          <TimeUnit value={timeLeft.seconds} label="SEC" />
        </div>

        {/* Date reminder */}
        <div className="scroll-fade-up" style={{ marginTop: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", margin: "0 auto 1rem" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(214,183,122,0.5))" }} />
            <span style={{ color: "var(--champagne)", fontSize: "0.7rem" }}>✦</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(214,183,122,0.5))" }} />
          </div>
          <p className="date-display" style={{ fontSize: "var(--text-sm)", letterSpacing: "0.2em" }}>
            {date.display}
          </p>
        </div>
      </div>
    </section>
  );
}
