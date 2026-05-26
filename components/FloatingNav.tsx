"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import { Menu, X } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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
              padding: "0.75rem 2rem",
              background: "rgba(10,10,10,0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "9999px",
            }}
            className="flex items-center gap-6 md:gap-10 w-[90%] md:w-auto justify-between md:justify-center"
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--electric)", letterSpacing: "0.1em" }}>
              FORZE
            </span>
            
            {/* Desktop Links */}
            <div className="hidden md:flex gap-8">
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
            
            <div className="hidden md:block">
              <MagneticButton href="#membership" variant="electric" size="sm">
                JOIN NOW
              </MagneticButton>
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} color="var(--electric)" />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(10,10,10,0.95)",
              backdropFilter: "blur(30px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center"
            }}
          >
            <button 
              style={{ position: "absolute", top: "2rem", right: "2rem" }}
              className="text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} color="var(--electric)" />
            </button>
            
            <div className="flex flex-col items-center gap-8 mb-12">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-display)", fontSize: "2.5rem",
                    color: "var(--white)", textDecoration: "none",
                    textTransform: "uppercase"
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            <a href="#call-now" onClick={() => setMobileMenuOpen(false)} style={{
              fontFamily: "var(--font-sub)", fontSize: "1rem", letterSpacing: "0.25em",
              textTransform: "uppercase", padding: "1.25rem 3rem",
              background: "var(--electric)", color: "#000", fontWeight: 700,
              textDecoration: "none", minHeight: "44px", display: "inline-flex", alignItems: "center", justifyContent: "center"
            }}>
              BOOK CONSULTATION
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
