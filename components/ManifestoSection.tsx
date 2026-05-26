"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const MANIFESTO = "Your body is not a temple. It is a machine. Build it like one.";

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Background FORZE lettermark parallax
      gsap.to(".manifesto-bg-text", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Word-by-word scroll reveal
      const words = sectionRef.current?.querySelectorAll(".manifesto-word") || [];
      gsap.fromTo(words,
        { opacity: 0.15, color: "var(--smoke)" },
        {
          opacity: 1, color: "var(--white)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = MANIFESTO.split(" ");

  return (
    <section ref={sectionRef} style={{
      padding: "12rem 5vw", background: "var(--surface)", position: "relative", overflow: "hidden"
    }}>
      {/* Background lettermark */}
      <div className="manifesto-bg-text" style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-display)", fontSize: "clamp(10rem, 35vw, 30rem)",
        color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.03)",
        letterSpacing: "0.05em", pointerEvents: "none", userSelect: "none",
        whiteSpace: "nowrap",
      }}>
        FORZE
      </div>

      <p className="text-label" style={{ marginBottom: "3rem", position: "relative" }}>
        ◆ OUR PHILOSOPHY
      </p>

      <div style={{ position: "relative", maxWidth: "900px" }}>
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 6rem)",
          lineHeight: 1, letterSpacing: "-0.01em", textTransform: "uppercase"
        }}>
          {words.map((word, i) => {
            const isAccent = ["machine.", "Build"].includes(word);
            return (
              <span key={i} className="manifesto-word" style={{
                display: "inline-block", marginRight: "0.3em",
                color: isAccent ? "var(--electric)" : undefined,
                transition: "color 0.3s"
              }}>
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
