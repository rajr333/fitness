"use client";

import AtmosphereLayer from "./AtmosphereLayer";
import MagneticButton from "./ui/MagneticButton";

export default function FinalCTA() {
  return (
    <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background)", overflow: "hidden" }}>
      <AtmosphereLayer particleCount={150} color="232,255,0" />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 0%, rgba(10,10,10,0.9) 80%)" }} />
      
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 5vw" }}>
        <h2 className="neon-glow" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 15vw, 16rem)", color: "var(--electric)", lineHeight: 0.8, marginBottom: "2rem" }}>
          START<br />TODAY
        </h2>
        <p style={{ fontFamily: "var(--font-sub)", fontSize: "1.2rem", letterSpacing: "0.2em", color: "var(--white)", textTransform: "uppercase", marginBottom: "4rem" }}>
          The only bad workout is the one that didn't happen.
        </p>
        <MagneticButton variant="electric" size="lg">
          BEGIN YOUR TRANSFORMATION
        </MagneticButton>
      </div>

      <div className="absolute bottom-8 w-full flex flex-wrap justify-center gap-6 md:gap-12 z-10 px-4">
        {["INSTAGRAM", "YOUTUBE", "TWITTER"].map((social, i) => (
          <a key={i} href="#" style={{ fontFamily: "var(--font-sub)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--silver)", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--white)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--silver)"}>
            {social}
          </a>
        ))}
      </div>
    </section>
  );
}
