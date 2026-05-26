"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionLabel from "./ui/SectionLabel";

const TESTIMONIALS = [
  "FORZE completely redefined my understanding of strength.",
  "The community here is relentless and supportive.",
  "I've hit PRs I never thought possible.",
  "The coaches push you beyond what you think you can do.",
  "More than a gym. It's a mindset shift.",
  "Elite equipment, elite programming, elite results.",
];

export default function TestimonialsSection() {
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic GSAP marquee setup handled by Tailwind animate-marquee
  }, []);

  return (
    <section style={{ background: "var(--surface)", padding: "8rem 0", overflow: "hidden" }}>
      <div style={{ padding: "0 5vw", marginBottom: "4rem" }}>
        <SectionLabel label="The Community" />
        <h2 className="text-display" style={{ color: "var(--white)" }}>
          BUILT BY <span style={{ color: "var(--ember)" }}>FORZE</span>
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "5rem" }}>
        {/* Marquee 1 */}
        <div style={{ display: "flex", width: "200%", animation: "marquee 30s linear infinite" }}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((text, i) => (
            <div key={i} style={{ padding: "2rem", background: "var(--background)", border: "1px solid var(--glass-border)", marginRight: "1.5rem", whiteSpace: "nowrap", fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--silver)" }}>
              {text}
            </div>
          ))}
        </div>
        {/* Marquee 2 */}
        <div style={{ display: "flex", width: "200%", animation: "marquee-reverse 35s linear infinite" }}>
          {[...TESTIMONIALS, ...TESTIMONIALS].reverse().map((text, i) => (
            <div key={i} style={{ padding: "2rem", background: "var(--background)", border: "1px solid var(--glass-border)", marginRight: "1.5rem", whiteSpace: "nowrap", fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--white)" }}>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Testimonial */}
      <div style={{ margin: "0 5vw", padding: "4rem", background: "var(--background)", border: "1px solid var(--electric)", display: "flex", alignItems: "center", gap: "4rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "300px" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: "var(--white)", lineHeight: 1.1, marginBottom: "2rem" }}>
            "I LOST 15KG AND GAINED A NEW LEVEL OF MENTAL TOUGHNESS. THE COACHING HERE IS UNPARALLELED."
          </p>
          <div className="text-label" style={{ color: "var(--electric)" }}>SARAH JENKINS — ELITE MEMBER</div>
        </div>
        <div style={{ width: "300px", height: "300px", position: "relative", borderRadius: "50%", overflow: "hidden", border: "4px solid var(--surface-2)" }}>
           <div style={{ position: "absolute", inset: 0, background: "var(--ash)" }} /> {/* Placeholder for image */}
        </div>
      </div>
    </section>
  );
}
