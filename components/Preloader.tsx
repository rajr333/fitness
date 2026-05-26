"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Simulate loading progress
    tl.to({ val: 0 }, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: function () {
        setProgress(Math.round(this.targets()[0].val));
        if (barRef.current) {
          barRef.current.style.width = `${this.targets()[0].val}%`;
        }
      },
    });

    // Split and exit
    tl.to(topRef.current, { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, "+=0.2")
      .to(bottomRef.current, { yPercent: 100, duration: 0.8, ease: "power3.inOut" }, "<")
      .to(ref.current, { pointerEvents: "none", duration: 0 });

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", flexDirection: "column" }}>
      <div ref={topRef} style={{
        flex: 1, background: "var(--background)", display: "flex",
        alignItems: "flex-end", justifyContent: "center", paddingBottom: "2rem"
      }}>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(5rem, 15vw, 12rem)",
          color: "var(--white)", letterSpacing: "0.1em", lineHeight: 1
        }}>FORZE</span>
      </div>
      <div ref={bottomRef} style={{
        height: "4px", background: "var(--surface-2)", position: "relative", zIndex: 2
      }}>
        <div ref={barRef} style={{
          height: "100%", width: "0%", background: "var(--electric)",
          transition: "width 0.05s linear",
          boxShadow: "0 0 20px var(--electric)"
        }} />
      </div>
      <div ref={bottomRef} style={{
        flex: 1, background: "var(--background)", display: "flex",
        alignItems: "flex-start", justifyContent: "flex-end", padding: "2rem 3rem"
      }}>
        <span style={{
          fontFamily: "var(--font-sub)", fontSize: "0.65rem",
          letterSpacing: "0.3em", color: "var(--silver)",
          fontVariantNumeric: "tabular-nums"
        }}>{progress}%</span>
      </div>
    </div>
  );
}
