"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";

const TABS = ["Meal Plans", "Supplements", "Macros Calculator"];

export default function NutritionSection() {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [activeTab]);

  return (
    <section id="nutrition" style={{ background: "var(--background)", padding: "8rem 5vw" }}>
      <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
        
        {/* Left: Image Placeholder */}
        <div style={{ flex: 1, minWidth: "300px", position: "relative", minHeight: "500px", border: "1px solid var(--glass-border)" }}>
           <Image src={activeTab === 1 ? "/images/nutrition/supplement-hero.webp" : "/images/nutrition/meal-1.webp"} alt="Nutrition" fill style={{ objectFit: "cover" }} />
           <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
        </div>

        {/* Right: Content */}
        <div style={{ flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <SectionLabel label="Fuel Your Machine" />
          <h2 className="text-display" style={{ color: "var(--white)", marginBottom: "2rem" }}>
            OPTIMIZED <span style={{ color: "var(--electric)" }}>NUTRITION</span>
          </h2>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "1rem" }}>
            {TABS.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{
                background: "none", border: "none", padding: "0.5rem 1rem", cursor: "pointer",
                fontFamily: "var(--font-sub)", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.1em",
                color: activeTab === i ? "var(--electric)" : "var(--silver)",
                transition: "color 0.3s"
              }}>
                {tab}
              </button>
            ))}
          </div>

          <div ref={contentRef} style={{ minHeight: "200px" }}>
            {activeTab === 0 && (
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--white)", marginBottom: "1rem" }}>PERFORMANCE MEAL PLANS</h3>
                <p style={{ color: "var(--silver)", lineHeight: 1.6, marginBottom: "2rem" }}>Tailored nutrition protocols designed to match your specific training demands. Periodized for fat loss, muscle gain, or maintenance.</p>
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--white)", marginBottom: "1rem" }}>CLINICAL-DOSE SUPPLEMENTS</h3>
                <p style={{ color: "var(--silver)", lineHeight: 1.6, marginBottom: "2rem" }}>No proprietary blends. Only scientifically backed ingredients dosed for maximum efficacy. Pre-workout, recovery, and daily health.</p>
              </div>
            )}
            {activeTab === 2 && (
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--white)", marginBottom: "1rem" }}>CALCULATE YOUR MACROS</h3>
                <p style={{ color: "var(--silver)", lineHeight: 1.6, marginBottom: "2rem" }}>Dial in your daily intake of protein, carbs, and fats based on your lean body mass and energy expenditure.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
