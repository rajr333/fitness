import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ash: "var(--ash)",
        smoke: "var(--smoke)",
        silver: "var(--silver)",
        light: "var(--light)",
        white: "var(--white)",
        electric: "var(--electric)",
        "electric-dim": "var(--electric-dim)",
        ember: "var(--ember)",
        "ember-dim": "var(--ember-dim)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sub: ["var(--font-sub)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(7rem, 18vw, 18rem)", { lineHeight: "0.82", letterSpacing: "-0.02em" }],
        display: ["clamp(3.5rem, 9vw, 9rem)", { lineHeight: "0.88" }],
        section: ["clamp(2rem, 5vw, 5rem)", { lineHeight: "0.92" }],
        sub: ["clamp(1rem, 2vw, 1.4rem)", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        label: ["0.65rem", { letterSpacing: "0.35em", lineHeight: "1" }],
      },
      transitionTimingFunction: {
        "forze": "cubic-bezier(0.16, 1, 0.3, 1)",
        "forze-in": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      animation: {
        "pulse-neon": "pulseNeon 2s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee 30s linear infinite reverse",
      },
      keyframes: {
        pulseNeon: {
          "0%, 100%": { textShadow: "0 0 20px rgba(232,255,0,0.6), 0 0 60px rgba(232,255,0,0.2)" },
          "50%": { textShadow: "0 0 40px rgba(232,255,0,1), 0 0 100px rgba(232,255,0,0.4)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
