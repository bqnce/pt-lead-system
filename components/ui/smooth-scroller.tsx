"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroller() {
  useEffect(() => {
    // 1. Akadálymentesítés: Ha a felhasználó nem kér animációt, ne fussunk feleslegesen
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // 2. Lenis inicializálás
    const lenis = new Lenis({
      duration: 1.2, // Picit növeltem a puhább érzetért (1 -> 1.2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // 3. RAF loop kezelése (változóban tárolva a cancel-hez)
    let rafHandle: number;

    function raf(time: number) {
      lenis.raf(time);
      rafHandle = requestAnimationFrame(raf);
    }

    // Indítás
    rafHandle = requestAnimationFrame(raf);

    // 4. Cleanup function: Mindent takarítunk unmountkor
    return () => {
      cancelAnimationFrame(rafHandle); // Loop leállítása
      lenis.destroy();                 // Lenis példány törlése
    };
  }, []);

  return null;
}