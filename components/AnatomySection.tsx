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

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "var(--background)", height: "200vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center" }}>
        
        {/* Left Side: 3D Canvas */}
        <div style={{ width: "50%", height: "100%", position: "relative" }}>
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#E8FF00" />
            <AnatomyPlaceholder />
            <Environment preset="city" />
          </Canvas>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at center, transparent 0%, var(--background) 70%)",
            pointerEvents: "none"
          }} />
        </div>

        {/* Right Side: Text Sequence */}
        <div style={{ width: "50%", padding: "5vw" }}>
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
