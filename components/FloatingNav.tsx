"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";

const NAV_LINKS = [
  { label: "Programs", href: "#programs" },
  { label: "Transform", href: "#transform" },
  { label: "Coaches", href: "#coaches" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "Join", href: "#membership" },
];

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed", top: "1.5rem", left: "50%",
            transform: "translateX(-50%)", zIndex: 100,
            display: "flex", alignItems: "center", gap: "2.5rem",
            padding: "0.75rem 2rem",
            background: "rgba(10,10,10,0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--glass-border)",
            borderRadius: "9999px",
          }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--electric)", letterSpacing: "0.1em" }}>
            FORZE
          </span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} style={{
                fontFamily: "var(--font-sub)", fontSize: "0.75rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: activeSection === link.href ? "var(--electric)" : "var(--silver)",
                textDecoration: "none", transition: "color 0.3s",
              }}>
                {link.label}
              </a>
            ))}
          </div>
          <MagneticButton href="#membership" variant="electric" size="sm">
            JOIN NOW
          </MagneticButton>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
