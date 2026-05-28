"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";

const TABS = ["Meal Plans", "Supplements", "Macros Calculator"];

export default function NutritionSection() {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [activeTab]);

  useEffect(() => {
    let frames: HTMLImageElement[] = [];
    let progress = { frame: 0 };
    let ctx: gsap.Context;

    const drawFrame = (canvas: HTMLCanvasElement | null, img: HTMLImageElement | undefined) => {
      if (!canvas || !img) return;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let renderWidth = canvas.width;
      let renderHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        renderWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - renderWidth) / 2;
      } else {
        renderHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - renderHeight) / 2;
      }

      context.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    const loadBatch = async () => {
      const loadedFrames: HTMLImageElement[] = [];
      let index = 1; // start from 1
      let keepGoing = true;
      while (keepGoing) {
        const batch = [];
        for(let i=0; i<10; i++) {
          const paddedIndex = String(index + i).padStart(3, '0');
          const url = `/videos/nutrition/frames/ezgif-frame-${paddedIndex}.jpg`;
          batch.push(new Promise<{img?: HTMLImageElement, success: boolean}>(resolve => {
            const img = new Image();
            img.onload = () => resolve({ img, success: true });
            img.onerror = () => resolve({ success: false });
            img.src = url;
          }));
        }
        const results = await Promise.all(batch);
        for(let res of results) {
          if (res.success && res.img) {
            loadedFrames.push(res.img);
          } else {
            keepGoing = false;
            break;
          }
        }
        index += 10;
        
        if (index > 300) keepGoing = false; 
      }
      return loadedFrames;
    };

    const resizeCanvas = () => {
      if (canvasRef.current && canvasContainerRef.current) {
        canvasRef.current.width = canvasContainerRef.current.clientWidth;
        canvasRef.current.height = canvasContainerRef.current.clientHeight;
        if (frames.length > 0) {
          drawFrame(canvasRef.current, frames[Math.round(progress.frame)]);
        }
      }
    };

    window.addEventListener("resize", resizeCanvas);

    loadBatch().then((f) => {
      frames = f;
      resizeCanvas();

      if (f.length > 0) drawFrame(canvasRef.current, f[0]);

      ctx = gsap.context(() => {
        if (f.length > 0) {
          gsap.to(progress, {
            frame: f.length - 1,
            snap: "frame",
            ease: "none",
            duration: f.length / 30, // 30 fps
            repeat: -1,
            onUpdate: () => {
              drawFrame(canvasRef.current, f[Math.round(progress.frame)]);
            }
          });
        }
      });
    });

    return () => {
      if (ctx) ctx.revert();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section id="nutrition" style={{ background: "var(--background)", padding: "8rem 5vw" }}>
      <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
        
        {/* Left: Canvas Animation */}
        <div ref={canvasContainerRef} style={{ flex: 1, minWidth: "300px", position: "relative", minHeight: "500px", border: "1px solid var(--glass-border)", overflow: "hidden" }}>
           <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%", position: "absolute", inset: 0, zIndex: 1 }} />
           <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 2, pointerEvents: "none" }} />
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
