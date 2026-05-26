"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "electric" | "ember" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function MagneticButton({
  children,
  href,
  variant = "electric",
  size = "md",
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    electric: "bg-[var(--electric)] text-black font-bold shadow-[0_0_20px_rgba(232,255,0,0.4)] hover:shadow-[0_0_30px_rgba(232,255,0,0.6)]",
    ember: "bg-[var(--ember)] text-white font-bold shadow-[0_0_20px_rgba(255,77,26,0.4)] hover:shadow-[0_0_30px_rgba(255,77,26,0.6)]",
    outline: "border border-[var(--glass-border)] text-[var(--white)] hover:border-[var(--white)]",
  };

  const sizes = {
    sm: "px-6 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  const Component = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="magnetic-area inline-block"
    >
      <Component
        href={href}
        className={cn(
          "font-sub uppercase tracking-[0.2em] rounded-full transition-colors duration-300",
          variants[variant],
          sizes[size],
          className
        )}
        style={{ display: "inline-block", textDecoration: "none" }}
      >
        {children}
      </Component>
    </motion.div>
  );
}
