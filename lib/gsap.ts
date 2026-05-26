"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { TextPlugin } from "gsap/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, TextPlugin);
  gsap.defaults({ ease: "power3.out" });
}

export { gsap, ScrollTrigger, Draggable, TextPlugin };
