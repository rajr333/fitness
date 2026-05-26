"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function SplitTextReveal({
  text,
  className = "",
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  stagger?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".split-word");
    gsap.fromTo(
      words,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: stagger,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, [stagger]);

  return (
    <div ref={containerRef} className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="split-word inline-block mr-[0.3em]"
        >
          {word}
        </span>
      ))}
    </div>
  );
}
