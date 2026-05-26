"use client";

import { useState } from "react";
import MagneticButton from "./ui/MagneticButton";
import SectionLabel from "./ui/SectionLabel";

const TIERS = [
  { name: "STARTER", price: "99", desc: "For those beginning their journey.", features: ["Access to Open Gym", "1 Group Class/Week", "Basic Nutrition Guide"] },
  { name: "ELITE", price: "199", desc: "Maximum results. Full access.", features: ["Unlimited Open Gym", "Unlimited Group Classes", "Custom Meal Plan", "Monthly InBody Scan"], popular: true },
  { name: "PRO", price: "299", desc: "For competitive athletes.", features: ["Everything in Elite", "2x 1-on-1 Coaching/Month", "Recovery Room Access", "Supplement Stack Included"] },
];

export default function MembershipSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="membership" style={{ background: "var(--surface)", padding: "10rem 5vw" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <SectionLabel label="Commit" />
        <h2 className="text-display" style={{ color: "var(--white)", marginBottom: "2rem" }}>
          JOIN THE <span style={{ color: "var(--ember)" }}>ELITE</span>
        </h2>

        <div style={{ display: "inline-flex", background: "var(--background)", padding: "0.5rem", borderRadius: "9999px", border: "1px solid var(--glass-border)" }}>
          <button onClick={() => setAnnual(false)} style={{ padding: "0.5rem 2rem", borderRadius: "9999px", background: !annual ? "var(--ash)" : "transparent", color: !annual ? "var(--white)" : "var(--silver)", border: "none", cursor: "pointer", fontFamily: "var(--font-sub)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.3s" }}>MONTHLY</button>
          <button onClick={() => setAnnual(true)} style={{ padding: "0.5rem 2rem", borderRadius: "9999px", background: annual ? "var(--ash)" : "transparent", color: annual ? "var(--white)" : "var(--silver)", border: "none", cursor: "pointer", fontFamily: "var(--font-sub)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.3s" }}>ANNUAL (SAVE 20%)</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        {TIERS.map((tier, i) => (
          <div key={i} style={{ padding: "3rem", background: "var(--background)", border: tier.popular ? "2px solid var(--electric)" : "1px solid var(--glass-border)", position: "relative", display: "flex", flexDirection: "column" }}>
            {tier.popular && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -50%)", background: "var(--electric)", color: "#000", padding: "0.5rem 1.5rem", fontFamily: "var(--font-sub)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "bold" }}>MOST POPULAR</div>}
            
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: "var(--white)", marginBottom: "0.5rem" }}>{tier.name}</h3>
            <p style={{ color: "var(--silver)", marginBottom: "2rem", minHeight: "3rem" }}>{tier.desc}</p>
            
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--glass-border)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "4rem", color: "var(--white)", lineHeight: 0.9 }}>${annual ? Math.floor(Number(tier.price) * 0.8) : tier.price}</span>
              <span style={{ color: "var(--silver)" }}>/mo</span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, marginBottom: "3rem", flex: 1 }}>
              {tier.features.map((feat, j) => (
                <li key={j} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", color: "var(--light)" }}>
                  <span style={{ color: "var(--ember)" }}>✓</span> {feat}
                </li>
              ))}
            </ul>

            <MagneticButton variant={tier.popular ? "electric" : "outline"} className="w-full text-center block">
              SELECT {tier.name}
            </MagneticButton>
          </div>
        ))}
      </div>
    </section>
  );
}
