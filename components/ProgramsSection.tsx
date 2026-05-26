"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";

const PROGRAMS = [
  {
    id: "strength",
    name: "STRENGTH",
    tagline: "Iron Will",
    image: "/images/programs/strength.webp",
    desc: "Progressive overload methodology. Compound lifts. Raw power development.",
    duration: "60–90 min",
    level: "All Levels",
    accent: "var(--electric)",
  },
  {
    id: "hiit",
    name: "HIIT",
    tagline: "Maximum Output",
    image: "/images/programs/hiit.webp",
    desc: "High-intensity intervals designed to torch calories and elevate VO2 max.",
    duration: "45 min",
    level: "Intermediate+",
    accent: "var(--ember)",
  },
  {
    id: "mobility",
    name: "MOBILITY",
    tagline: "Move Free",
    image: "/images/programs/mobility.webp",
    desc: "Functional movement, flexibility, and joint integrity for lifelong performance.",
    duration: "50 min",
    level: "All Levels",
    accent: "var(--electric)",
  },
  {
    id: "endurance",
    name: "ENDURANCE",
    tagline: "Go Further",
    image: "/images/programs/endurance.webp",
    desc: "Aerobic base building, lactate threshold training, and race-ready conditioning.",
    duration: "60–120 min",
    level: "Advanced",
    accent: "var(--ember)",
  },
];

export default function ProgramsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  // GSAP horizontal scroll (Desktop only)
  useEffect(() => {
    const ctx = gsap.matchMedia();
    
    ctx.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      if (!track) return;
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: "#programs",
          start: "top top",
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="programs" style={{ background: "var(--background)", overflow: "hidden" }}>
      <div style={{ padding: "5rem 5vw 3rem" }}>
        <SectionLabel label="Training Programs" />
        <h2 className="text-display" style={{ color: "var(--white)", marginTop: "1rem" }}>
          CHOOSE YOUR<br /><span style={{ color: "var(--electric)" }}>DISCIPLINE</span>
        </h2>
      </div>

      {/* Track Container: Native snap scroll on mobile, GSAP animated on desktop */}
      <div ref={trackRef} className="flex gap-2 pl-[5vw] pr-[5vw] pb-[5rem] overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar">
        {PROGRAMS.map((program) => (
          <div key={program.id} className="cursor-hover group snap-center" style={{
            flexShrink: 0, width: "clamp(320px, 35vw, 480px)",
            background: "var(--surface)", position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
              <Image
                src={program.image} alt={program.name}
                fill style={{ objectFit: "cover", transition: "transform 0.8s var(--ease-forze)" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }} 
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                pointerEvents: "none"
              }} />
            </div>

            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem", pointerEvents: "none" }}>
              <p className="text-label" style={{ color: program.accent, marginBottom: "0.5rem" }}>
                {program.tagline}
              </p>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: "3.5rem",
                color: "var(--white)", lineHeight: 0.9, marginBottom: "0.75rem"
              }}>
                {program.name}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--silver)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {program.desc}
              </p>
              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.7rem", color: "var(--smoke)", letterSpacing: "0.1em" }}>⏱ {program.duration}</span>
                <span style={{ fontSize: "0.7rem", color: "var(--smoke)", letterSpacing: "0.1em" }}>⚡ {program.level}</span>
              </div>
              <a href="#membership" style={{
                display: "inline-block", fontFamily: "var(--font-sub)", fontSize: "0.7rem",
                letterSpacing: "0.3em", textTransform: "uppercase", padding: "0.75rem 2rem",
                border: `1px solid ${program.accent}`, color: program.accent,
                textDecoration: "none", transition: "all 0.3s", pointerEvents: "auto"
              }}>
                EXPLORE →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
