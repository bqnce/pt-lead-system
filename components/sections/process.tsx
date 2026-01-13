"use client";

import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/ui/section-header"; // <--- Új import
import { CoachConfig } from "@/types/coach";
import { motion, Variants } from "framer-motion";
import { MoveRight } from "lucide-react"; // Sparkles törölve, MoveRight maradt a nyilakhoz

export function Process({ coach }: { coach: CoachConfig }) {
  const data = coach.sections.process;
  if (!data) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <Section id="process" className="pt-20">
      <motion.div
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto max-w-6xl"
      >
        {/* --- ÚJ HEADERT HASZNÁLJUK --- */}
        <SectionHeader 
          badge="Folyamat"
          title="Hogyan zajlik a közös munka?"
          description="Egyszerű, átlátható lépések – hogy tudd, mire számíthatsz az út során."
          centered={true}
        />

        <div className="grid gap-10 md:grid-cols-3 relative">
          {data.steps.map((s, idx) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col rounded-[2.5rem] border border-slate-200/60 p-10 shadow-sm transition-all duration-300 hover:shadow-[0_32px_64px_-16px_rgba(59,130,246,0.12)] hover:border-blue-200 backdrop-blur-md bg-white/50"
            >
              {/* Step Number Badge */}
              <div className="relative mb-8 flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300" />
                <div className="absolute -inset-2 border border-blue-100 rounded-3xl group-hover:border-blue-200 transition-colors duration-300 opacity-50" />
                <span className="relative z-10 text-2xl font-black text-blue-600 group-hover:text-white transition-colors duration-300">
                  {idx + 1}
                </span>
              </div>

              <h3 className="mb-4 text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                {s.title}
              </h3>

              <p className="text-slate-500 leading-relaxed font-semibold mb-6">
                {s.desc}
              </p>

              {/* Decorative Ghost Number */}
              <div className="absolute right-8 top-8 text-8xl font-black text-slate-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 select-none -z-10 pointer-events-none group-hover:text-blue-50/50">
                0{idx + 1}
              </div>

              {/* Progress Connector (Hidden on mobile) */}
              {idx < data.steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-8 translate-x-1/2 -translate-y-1/2 z-20">
                  <MoveRight className="w-8 h-8 text-slate-200 group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}