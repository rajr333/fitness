"use client";

import { useRef, useEffect } from "react";
import { gsap, Draggable } from "@/lib/gsap";
import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";

export default function TransformSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!handleRef.current || !sliderRef.current || !beforeRef.current) return;

    Draggable.create(handleRef.current, {
      type: "x",
      bounds: sliderRef.current,
      onDrag: function () {
        const percentage = (this.x / sliderRef.current!.clientWidth) * 100;
        gsap.set(beforeRef.current, { clipPath: `inset(0 ${100 - percentage}% 0 0)` });
      },
    });
  }, []);

  return (
    <section id="transform" className="py-24 px-5 md:py-32 md:px-[5vw] overflow-hidden" style={{ background: "var(--surface)" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <SectionLabel label="Results" />
        <h2 className="text-display" style={{ color: "var(--white)" }}>
          PROVEN <span style={{ color: "var(--electric)" }}>TRANSFORMATIONS</span>
        </h2>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Slider Container */}
        <div ref={sliderRef} className="relative w-full overflow-hidden h-[450px] md:h-[600px]" style={{
          border: "1px solid var(--glass-border)", touchAction: "none"
        }}>
          
          {/* After Image (Background) */}
          <div style={{ position: "absolute", inset: 0 }}>
            <Image src="/images/transform/after-1.webp" alt="After Transformation" fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", top: "2rem", right: "2rem", background: "var(--ember)", padding: "0.5rem 1.5rem", fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#fff" }}>AFTER</div>
          </div>

          {/* Before Image (Clipped) */}
          <div ref={beforeRef} style={{ position: "absolute", inset: 0, clipPath: "inset(0 50% 0 0)" }}>
            <Image src="/images/transform/before-1.webp" alt="Before Transformation" fill style={{ objectFit: "cover", filter: "grayscale(100%)" }} />
            <div style={{ position: "absolute", top: "2rem", left: "2rem", background: "var(--ash)", padding: "0.5rem 1.5rem", fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#fff" }}>BEFORE</div>
          </div>

          {/* Draggable Handle */}
          <div ref={handleRef} className="cursor-hover" style={{
            position: "absolute", top: 0, bottom: 0, left: "50%", width: "2px", background: "var(--white)",
            transform: "translateX(-50%)", cursor: "ew-resize", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10
          }}>
            <div style={{ width: "40px", height: "40px", background: "var(--electric)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(232,255,0,0.5)" }}>
              <span style={{ color: "#000", fontFamily: "var(--font-sub)", fontSize: "0.7rem", letterSpacing: "0.1em" }}>DRAG</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col md:flex-row justify-between mt-8 p-8 bg-[var(--surface-2)] gap-8 md:gap-0" style={{ border: "1px solid var(--glass-border)" }}>
          <div className="text-center md:text-left">
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--white)", lineHeight: 1 }}>12 WEEKS</div>
            <div className="text-label">Duration</div>
          </div>
          <div className="text-center md:text-left">
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--electric)", lineHeight: 1 }}>-8.5 KG</div>
            <div className="text-label">Weight Lost</div>
          </div>
          <div className="text-center md:text-left">
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--ember)", lineHeight: 1 }}>-6%</div>
            <div className="text-label">Body Fat</div>
          </div>
        </div>
      </div>
    </section>
  );
}
