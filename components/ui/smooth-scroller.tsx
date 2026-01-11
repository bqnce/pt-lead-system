"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1, // Minél nagyobb, annál "lassabb" és puhább a scroll (alap: 1.0)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Finom megállás (ease-out)
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // A Lenis-nek szüksége van a folyamatos frissítésre (requestAnimationFrame)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}