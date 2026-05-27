"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { gsap } from "@/lib/gsap";
import * as THREE from "three";
import SectionLabel from "./ui/SectionLabel";

function AnatomyPlaceholder() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={ref} args={[1.5, 64, 64]} scale={1.8}>
      <MeshDistortMaterial
        color="#2a1010"
        emissive="#FF4D1A"
        emissiveIntensity={0.6}
        distort={0.4}
        speed={2}
        roughness={0.6}
        metalness={0.8}
        wireframe
      />
    </Sphere>
  );
}

const MUSCLE_GROUPS = ["CHEST", "BACK", "SHOULDERS", "ARMS", "CORE", "LEGS"];

export default function AnatomySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chestFrames: HTMLImageElement[] = [];
    let backFrames: HTMLImageElement[] = [];
    
    let chestProgress = { frame: 0 };
    let backProgress = { frame: 0 };
    let activeCanvasMuscle = "CHEST";
    let currentVisual = "CHEST";
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

    const loadBatch = async (muscle: string) => {
      const frames: HTMLImageElement[] = [];
      let index = 0;
      let keepGoing = true;
      while (keepGoing) {
        const batch = [];
        for(let i=0; i<10; i++) {
          const paddedIndex = String(index + i).padStart(6, '0');
          const url = `/videos/muscles/frames/${muscle}/frame_${paddedIndex}.png`;
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
            frames.push(res.img);
          } else {
            keepGoing = false;
            break;
          }
        }
        index += 10;
        
        // Failsafe to prevent infinite loops
        if (index > 300) keepGoing = false; 
      }
      return frames;
    };

    const resizeCanvas = () => {
      if (canvasRef.current && canvasContainerRef.current) {
        canvasRef.current.width = canvasContainerRef.current.clientWidth;
        canvasRef.current.height = canvasContainerRef.current.clientHeight;
        if (activeCanvasMuscle === "CHEST" && chestFrames.length > 0) {
          drawFrame(canvasRef.current, chestFrames[Math.round(chestProgress.frame)]);
        } else if (activeCanvasMuscle === "BACK" && backFrames.length > 0) {
          drawFrame(canvasRef.current, backFrames[Math.round(backProgress.frame)]);
        }
      }
    };

    window.addEventListener("resize", resizeCanvas);

    Promise.all([loadBatch('chest'), loadBatch('back')]).then(([cf, bf]) => {
      chestFrames = cf;
      backFrames = bf;
      resizeCanvas();

      if (cf.length > 0) drawFrame(canvasRef.current, cf[0]);

      ctx = gsap.context(() => {
        // Text fades
        MUSCLE_GROUPS.forEach((_, i) => {
          gsap.fromTo(`.muscle-${i}`,
            { opacity: 0.2, x: 40 },
            {
              opacity: 1, x: 0,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `top+=${i * 15}% center`,
                end: `top+=${i * 15 + 10}% center`,
                scrub: true,
              },
            }
          );
        });

        // Frame scrubbing CHEST
        if (cf.length > 0) {
          gsap.to(chestProgress, {
            frame: cf.length - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "top+=15% center",
              scrub: 0,
              onUpdate: () => {
                if (activeCanvasMuscle === "CHEST") drawFrame(canvasRef.current, cf[Math.round(chestProgress.frame)]);
              }
            }
          });
        }

        // Frame scrubbing BACK
        if (bf.length > 0) {
          gsap.to(backProgress, {
            frame: bf.length - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top+=15% center",
              end: "top+=30% center",
              scrub: 0,
              onUpdate: () => {
                if (activeCanvasMuscle === "BACK") drawFrame(canvasRef.current, bf[Math.round(backProgress.frame)]);
              }
            }
          });
        }

        const switchVisual = (group: string) => {
          let target = group;
          if (group !== "CHEST" && group !== "BACK") target = "3D";
          
          if (currentVisual === target) return;
          
          if (target === "3D") {
            gsap.to(canvasContainerRef.current, { opacity: 0, duration: 0.4 });
            gsap.to(threeContainerRef.current, { opacity: 1, duration: 0.4 });
          } else if (target === "CHEST") {
            gsap.to(threeContainerRef.current, { opacity: 0, duration: 0.4 });
            gsap.to(canvasContainerRef.current, { opacity: 0, duration: 0.4, onComplete: () => {
              activeCanvasMuscle = "CHEST";
              if (cf.length > 0) drawFrame(canvasRef.current, cf[Math.round(chestProgress.frame)]);
              gsap.to(canvasContainerRef.current, { opacity: 1, duration: 0.4 });
            }});
          } else if (target === "BACK") {
            gsap.to(threeContainerRef.current, { opacity: 0, duration: 0.4 });
            gsap.to(canvasContainerRef.current, { opacity: 0, duration: 0.4, onComplete: () => {
              activeCanvasMuscle = "BACK";
              if (bf.length > 0) drawFrame(canvasRef.current, bf[Math.round(backProgress.frame)]);
              gsap.to(canvasContainerRef.current, { opacity: 1, duration: 0.4 });
            }});
          }
          currentVisual = target;
        };

        MUSCLE_GROUPS.forEach((group, i) => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `top+=${i * 15}% center`,
            end: i === 5 ? `bottom center` : `top+=${(i + 1) * 15}% center`,
            onEnter: () => switchVisual(group),
            onEnterBack: () => switchVisual(group),
          });
        });

      }, sectionRef);
    });

    return () => {
      if (ctx) ctx.revert();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "var(--background)", height: "200vh", position: "relative" }}>
      <div className="sticky top-0 h-[100vh] flex flex-col md:flex-row items-center pt-20 md:pt-0">
        
        {/* Visuals (Top on mobile, Left on desktop) */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-full relative">
          
          {/* Canvas for 2D PNG Sequences */}
          <div ref={canvasContainerRef} style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 1 }}>
             <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
          </div>

          {/* 3D Sphere Fallback */}
          <div ref={threeContainerRef} style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0 }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} color="#E8FF00" />
              <AnatomyPlaceholder />
              <Environment preset="city" />
            </Canvas>
          </div>

          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at center, transparent 0%, var(--background) 70%)",
            pointerEvents: "none",
            zIndex: 3
          }} />
        </div>

        {/* Text Sequence (Bottom on mobile, Right on desktop) */}
        <div className="w-full md:w-1/2 h-[60vh] md:h-full p-[5vw] flex flex-col justify-center md:block">
          <SectionLabel label="Biomechanics" />
          <h2 className="text-display" style={{ color: "var(--white)", marginBottom: "3rem" }}>
            PRECISION<br /><span style={{ color: "var(--ember)" }}>ENGINEERED</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {MUSCLE_GROUPS.map((group, i) => (
              <div key={group} className={`muscle-${i}`} style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--white)", textTransform: "uppercase", lineHeight: 1
              }}>
                {group}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
