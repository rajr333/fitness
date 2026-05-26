"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import AtmosphereLayer from "./AtmosphereLayer";

const HERO_WORDS = ["TRAIN", "BEYOND", "LIMITS"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Hero word reveal sequence on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = document.querySelectorAll(".hero-word");

      words.forEach((word, i) => {
        gsap.fromTo(word,
          { opacity: 0, y: 60, filter: "blur(12px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8,
            scrollTrigger: {
              trigger: "#hero-root",
              start: `${i * 20}% top`,
              end: `${i * 20 + 15}% top`,
              scrub: 1,
            },
          }
        );
      });

      // Neon underline sweep
      gsap.fromTo(".hero-underline",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, duration: 0.6,
          scrollTrigger: {
            trigger: "#hero-root",
            start: "55% top",
            end: "65% top",
            scrub: 1,
          },
        }
      );

      // Hero background scale effect instead of 360 frames
      gsap.to(".hero-bg-image", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-root",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: "var(--background)", display: "flex",
        alignItems: "center", justifyContent: "flex-start",
      }}
    >
      {/* Adapted Hero Background */}
      <div className="hero-bg-image" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        backgroundImage: "url('/images/hero-fallback.webp')",
        backgroundSize: "cover", backgroundPosition: "center",
        zIndex: 1
      }} />

      {/* Atmosphere / chalk particles */}
      <AtmosphereLayer particleCount={80} color="255,255,255" />

      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)"
      }} />

      {/* Hero text */}
      <div style={{ position: "relative", zIndex: 3, padding: "0 5vw", maxWidth: "900px" }}>
        <p className="text-label" style={{ marginBottom: "1.5rem", color: "var(--electric)" }}>
          ◆ PREMIUM PERFORMANCE FITNESS
        </p>

        {HERO_WORDS.map((word, i) => (
          <div key={word} className="hero-word" style={{ overflow: "hidden" }}>
            <span className="text-hero" style={{
              display: "block", color: i === 1 ? "var(--electric)" : "var(--white)",
              fontFamily: "var(--font-display)",
            }}>{word}</span>
          </div>
        ))}

        {/* Neon underline */}
        <div className="hero-underline" style={{
          height: 3, width: "60%", background: "var(--electric)",
          boxShadow: "0 0 20px var(--electric), 0 0 60px rgba(232,255,0,0.3)",
          marginTop: "0.5rem", marginBottom: "2.5rem",
        }} />

        <p style={{
          fontFamily: "var(--font-sub)", fontSize: "1rem", letterSpacing: "0.12em",
          color: "var(--silver)", maxWidth: 440, lineHeight: 1.7, marginBottom: "2.5rem"
        }}>
          Elite training programs, world-class coaches, and a methodology built for those who refuse to settle.
        </p>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <a href="#programs" style={{
            fontFamily: "var(--font-sub)", fontSize: "0.75rem", letterSpacing: "0.25em",
            textTransform: "uppercase", padding: "0.9rem 2.5rem",
            background: "var(--electric)", color: "#000", fontWeight: 700,
            textDecoration: "none", transition: "background 0.3s",
            minHeight: "44px", display: "inline-flex", alignItems: "center", justifyContent: "center"
          }}>
            EXPLORE PROGRAMS
          </a>
          <a href="#membership" style={{
            fontFamily: "var(--font-sub)", fontSize: "0.75rem", letterSpacing: "0.25em",
            textTransform: "uppercase", padding: "0.9rem 2.5rem",
            border: "1px solid rgba(255,255,255,0.2)", color: "var(--white)",
            textDecoration: "none", transition: "border-color 0.3s",
            minHeight: "44px", display: "inline-flex", alignItems: "center", justifyContent: "center"
          }}>
            JOIN TODAY →
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex flex-col md:flex-row" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
        borderTop: "1px solid var(--glass-border)",
        background: "rgba(10,10,10,0.7)", backdropFilter: "blur(10px)"
      }}>
        {[
          { num: "2,400+", label: "Active Members" },
          { num: "18", label: "Programs" },
          { num: "97%", label: "Retention Rate" },
          { num: "6", label: "Locations" },
        ].map((stat, i) => (
          <div key={i} className="flex-1 p-4 md:p-5 text-center border-b md:border-b-0 md:border-r border-white/10 last:border-0" style={{
            borderColor: "var(--glass-border)"
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--electric)", lineHeight: 1 }}>
              {stat.num}
            </div>
            <div className="text-label" style={{ marginTop: "0.3rem" }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
