"use client";

import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";
import { motion } from "framer-motion";

export function Process({ coach }: { coach: CoachConfig }) {
  const data = coach.sections.process;
  if (!data) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
        <div className="mb-16 md:text-center max-w-2xl mx-auto">
           <motion.span variants={itemVariants} className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Folyamat
          </motion.span>
          <motion.h2 variants={itemVariants} className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
            Hogyan zajlik a közös munka?
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-lg text-slate-500 text-pretty">
            Egyszerű, átlátható lépések – hogy tudd, mire számíthatsz.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative">
          {data.steps.map((s, idx) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              className="group relative flex flex-col rounded-[2rem] border border-slate-100 bg-white/60 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-100 backdrop-blur-sm"
            >
               {/* Szám: Alapból halványkék, hoverre sötétkék */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/20">
                {idx + 1}
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-900">
                {s.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed font-medium">
                {s.desc}
              </p>

              <div className="absolute right-6 top-6 text-6xl font-black text-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 select-none -z-10 pointer-events-none">
                {idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}