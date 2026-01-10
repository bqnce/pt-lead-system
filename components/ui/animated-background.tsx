"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// ERŐSEBB SZÍNEK KONFIGURÁCIÓ
const CONFIG = {
  particleCount: 50,
  mobileParticleCount: 20,
  minSize: 10,
  maxSize: 40,
  speed: 1.5,
  colors: [
    // Növeltem az árnyalatot (400->500/600) és az opacity-t (/20 -> /50)
    "bg-blue-600/50",
    "bg-sky-500/50",
    "bg-indigo-600/40",
    "bg-cyan-500/50",
    "bg-azure-500/50" // (Opcionális, ha van ilyen, vagy használj blue-500-at)
  ]
};

type Particle = {
  id: number;
  x: string;
  y: string;
  size: number;
  colorClass: string;
  duration: number;
  delay: number;
  movementX: number[];
  movementY: number[];
};

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? CONFIG.mobileParticleCount : CONFIG.particleCount;

    const generatedParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: `${random(0, 100)}%`,
      y: `${random(0, 100)}%`,
      size: random(CONFIG.minSize, CONFIG.maxSize),
      colorClass: randomItem(CONFIG.colors),
      duration: random(10, 25) / CONFIG.speed,
      delay: random(0, 10),
      movementX: [0, random(-100, 100), random(-50, 50), 0],
      movementY: [0, random(-100, 100), random(-50, 50), 0],
    }));

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-slate-50">
      {/* Háttér gradiens kicsit halványítva, hogy a gömbök jobban érvényesüljenek */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-slate-50/20 to-transparent" />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          // blur-sm: Kicsit élesebb, mint a blur-md, így jobban látszik a színe
          className={`absolute rounded-full blur-sm ${p.colorClass}`}
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: p.movementX,
            y: p.movementY,
            scale: [1, 1.2, 0.9, 1],
            // Magasabb opacity tartomány
            opacity: [0.7, 1, 0.6, 0.7], 
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}