"use client";

import { useEffect, useRef } from "react";
import { lerp } from "@/lib/utils";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const animate = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onEnterCTA = () => {
      ringRef.current?.style.setProperty("width", "72px");
      ringRef.current?.style.setProperty("height", "72px");
      ringRef.current?.style.setProperty("border-color", "var(--electric)");
      dotRef.current?.style.setProperty("opacity", "0");
    };
    const onLeaveCTA = () => {
      ringRef.current?.style.setProperty("width", "40px");
      ringRef.current?.style.setProperty("height", "40px");
      ringRef.current?.style.setProperty("border-color", "rgba(255,255,255,0.5)");
      dotRef.current?.style.setProperty("opacity", "1");
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("button, a, .cursor-hover").forEach(el => {
      el.addEventListener("mouseenter", onEnterCTA);
      el.addEventListener("mouseleave", onLeaveCTA);
    });

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const base: React.CSSProperties = {
    position: "fixed", pointerEvents: "none", zIndex: 9999,
    transform: "translate(-50%, -50%)"
  };

  return (
    <>
      <div ref={dotRef} style={{ ...base, width: 6, height: 6, background: "var(--electric)", borderRadius: "50%", transition: "opacity 0.3s" }} />
      <div ref={ringRef} style={{
        ...base, width: 40, height: 40, border: "1px solid rgba(255,255,255,0.5)",
        borderRadius: "50%", transition: "width 0.4s var(--ease-forze), height 0.4s var(--ease-forze), border-color 0.3s"
      }} />
    </>
  );
}
