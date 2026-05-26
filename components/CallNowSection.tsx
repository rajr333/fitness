"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import SectionLabel from "./ui/SectionLabel";
import AtmosphereLayer from "./AtmosphereLayer";
import { X } from "lucide-react";

export default function CallNowSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("https://formsubmit.co/ajax/financeburnout@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        form.reset();
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="call-now" className="relative py-24 px-5 md:py-40 md:px-[5vw] overflow-hidden flex items-center justify-center text-center" style={{ background: "var(--background)" }}>
      <AtmosphereLayer particleCount={50} color="255,255,255" />
      
      <div style={{ position: "relative", zIndex: 10 }}>
        <SectionLabel label="Take Action" />
        <h2 className="text-display" style={{ color: "var(--white)", marginBottom: "1rem" }}>
          START YOUR <span style={{ color: "var(--electric)" }}>TRANSFORMATION</span>
        </h2>
        <p style={{ fontFamily: "var(--font-sub)", fontSize: "1.2rem", letterSpacing: "0.1em", color: "var(--silver)", textTransform: "uppercase", marginBottom: "3rem" }}>
          Book your free consultation today
        </p>
        <div onClick={() => setIsModalOpen(true)}>
          <MagneticButton variant="electric" size="lg">
            BOOK NOW
          </MagneticButton>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-[95%] md:w-full max-h-[90vh] overflow-y-auto"
              style={{ background: "var(--surface)", border: "1px solid var(--glass-border)", padding: "2rem md:3rem", maxWidth: "500px", position: "relative" }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "var(--silver)", cursor: "pointer", transition: "color 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--white)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--silver)"}
              >
                <X size={24} />
              </button>

              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--white)", marginBottom: "2rem" }}>
                BOOK CONSULTATION
              </h3>

              {isSubmitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ color: "var(--electric)", fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
                  <h4 style={{ fontFamily: "var(--font-sub)", fontSize: "1.5rem", color: "var(--white)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Request Received
                  </h4>
                  <p style={{ color: "var(--silver)", marginTop: "1rem" }}>We'll contact you within 24 hours!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Consultation Request - FORZE" />
                  
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-sub)", fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--silver)", textTransform: "uppercase", marginBottom: "0.5rem", textAlign: "left" }}>Full Name</label>
                    <input required type="text" name="name" className="w-full min-h-[44px]" style={{ padding: "1rem", background: "var(--surface-2)", border: "1px solid var(--ash)", color: "var(--white)", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.currentTarget.style.borderColor = "var(--electric)"} onBlur={(e) => e.currentTarget.style.borderColor = "var(--ash)"} />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label style={{ display: "block", fontFamily: "var(--font-sub)", fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--silver)", textTransform: "uppercase", marginBottom: "0.5rem", textAlign: "left" }}>Email</label>
                      <input required type="email" name="email" className="w-full min-h-[44px]" style={{ padding: "1rem", background: "var(--surface-2)", border: "1px solid var(--ash)", color: "var(--white)", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.currentTarget.style.borderColor = "var(--electric)"} onBlur={(e) => e.currentTarget.style.borderColor = "var(--ash)"} />
                    </div>
                    <div className="flex-1">
                      <label style={{ display: "block", fontFamily: "var(--font-sub)", fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--silver)", textTransform: "uppercase", marginBottom: "0.5rem", textAlign: "left" }}>Phone</label>
                      <input required type="tel" name="phone" className="w-full min-h-[44px]" style={{ padding: "1rem", background: "var(--surface-2)", border: "1px solid var(--ash)", color: "var(--white)", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.currentTarget.style.borderColor = "var(--electric)"} onBlur={(e) => e.currentTarget.style.borderColor = "var(--ash)"} />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label style={{ display: "block", fontFamily: "var(--font-sub)", fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--silver)", textTransform: "uppercase", marginBottom: "0.5rem", textAlign: "left" }}>Age</label>
                      <input required type="number" name="age" min="16" max="100" className="w-full min-h-[44px]" style={{ padding: "1rem", background: "var(--surface-2)", border: "1px solid var(--ash)", color: "var(--white)", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.currentTarget.style.borderColor = "var(--electric)"} onBlur={(e) => e.currentTarget.style.borderColor = "var(--ash)"} />
                    </div>
                    <div className="flex-[2]">
                      <label style={{ display: "block", fontFamily: "var(--font-sub)", fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--silver)", textTransform: "uppercase", marginBottom: "0.5rem", textAlign: "left" }}>Fitness Goal</label>
                      <select required name="goal" className="w-full min-h-[44px]" style={{ padding: "1rem", background: "var(--surface-2)", border: "1px solid var(--ash)", color: "var(--white)", outline: "none", appearance: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.currentTarget.style.borderColor = "var(--electric)"} onBlur={(e) => e.currentTarget.style.borderColor = "var(--ash)"}>
                        <option value="Weight Loss">Weight Loss</option>
                        <option value="Muscle Gain">Muscle Gain</option>
                        <option value="Endurance">Endurance</option>
                        <option value="Mobility">Mobility</option>
                        <option value="General Fitness">General Fitness</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="min-h-[44px]" style={{ marginTop: "1rem", width: "100%", padding: "1.25rem", background: "var(--electric)", color: "#000", border: "none", fontFamily: "var(--font-sub)", fontSize: "1rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "bold", cursor: "pointer", transition: "background 0.3s, box-shadow 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 20px rgba(232,255,0,0.4)"} onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}>
                    BOOK NOW
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
