"use client";

import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";
import { motion, Variants } from "framer-motion";
import { MoveRight, Sparkles } from "lucide-react";

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
      transition: { duration: 0.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } 
    },
  };

  return (
    <Section id="process">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-100 shadow-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span className="animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-500 to-blue-700 text-[10px] font-black uppercase tracking-[0.25em]">
              Folyamat
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-6"
          >
            Hogyan zajlik a közös munka?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-500 font-medium"
          >
            Egyszerű, átlátható lépések – hogy tudd, mire számíthatsz az út során.
          </motion.p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 relative">
          {data.steps.map((s, idx) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col rounded-[2.5rem] border border-slate-200/60 p-10 shadow-sm transition-all duration-300 hover:shadow-[0_32px_64px_-16px_rgba(59,130,246,0.12)] hover:border-blue-200 backdrop-blur-md"
            >
              {/* Step Number Badge */}
              <div className="relative mb-8 flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300" />
                <div className="absolute -inset-2 border border-blue-100 rounded-[1.5rem] group-hover:border-blue-200 transition-colors duration-300 opacity-50" />
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
