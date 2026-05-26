"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";

const COACHES = [
  {
    name: "MARCUS VANE",
    role: "HEAD STRENGTH COACH",
    image: "/images/coaches/coach-1.webp",
    quote: "Excuses don't build muscle.",
  },
  {
    name: "ELENA ROSTOVA",
    role: "MOBILITY & HIIT SPECIALIST",
    image: "/images/coaches/coach-2.webp",
    quote: "Speed without control is nothing.",
  },
  {
    name: "DAVID HALE",
    role: "ENDURANCE DIRECTOR",
    image: "/images/coaches/coach-3.webp",
    quote: "Pain is just information.",
  },
];

export default function CoachesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".coach-card",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="coaches" ref={sectionRef} style={{ background: "var(--background)", padding: "10rem 5vw" }}>
      <div style={{ textAlign: "center", marginBottom: "5rem" }}>
        <SectionLabel label="Our Experts" />
        <h2 className="text-display" style={{ color: "var(--white)" }}>
          WORLD-CLASS <span style={{ color: "var(--electric)" }}>COACHES</span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        {COACHES.map((coach, i) => (
          <div key={i} className="coach-card cursor-hover group" style={{ position: "relative", height: "600px", overflow: "hidden" }}>
            <Image src={coach.image} alt={coach.name} fill style={{ objectFit: "cover", filter: "grayscale(100%)", transition: "filter 0.5s, transform 0.8s", transform: "scale(1)" }} onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.transform = "scale(1.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(100%)"; e.currentTarget.style.transform = "scale(1)"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem" }}>
              <div className="text-label" style={{ color: "var(--electric)", marginBottom: "0.5rem" }}>{coach.role}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: "var(--white)", lineHeight: 0.9, marginBottom: "0.5rem" }}>{coach.name}</h3>
              <p style={{ fontFamily: "var(--font-sub)", fontStyle: "italic", color: "var(--silver)", fontSize: "1.1rem" }}>"{coach.quote}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
