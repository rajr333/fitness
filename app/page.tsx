"use client";

import { useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";
import Preloader from "@/components/Preloader";
import FloatingNav from "@/components/FloatingNav";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import ProgramsSection from "@/components/ProgramsSection";
import TransformSection from "@/components/TransformSection";
import AnatomySection from "@/components/AnatomySection";
import CoachesSection from "@/components/CoachesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NutritionSection from "@/components/NutritionSection";
import MembershipSection from "@/components/MembershipSection";
import CallNowSection from "@/components/CallNowSection";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  useEffect(() => {
    const lenis = initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <main>
      <Preloader />
      <FloatingNav />
      <CustomCursor />

      {/* Hero — 350vh sticky wrapper */}
      <div id="hero-root" style={{ height: "350vh" }}>
        <HeroSection />
      </div>

      <ManifestoSection />
      <ProgramsSection />
      <TransformSection />
      <AnatomySection />
      <CoachesSection />
      <TestimonialsSection />
      <NutritionSection />
      <MembershipSection />
      <CallNowSection />
      <FinalCTA />
    </main>
  );
}
