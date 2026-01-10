"use client";

import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";
import { motion } from "framer-motion";
import { Check, X, Target, Ban } from "lucide-react";

export function ForWho({ coach }: { coach: CoachConfig }) {
  const data = coach.sections.forWho;
  if (!data) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Section id="for-who">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto max-w-5xl"
      >
        <div className="text-center mb-12">
          <motion.span variants={cardVariants} className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Célközönség
          </motion.span>
          <motion.h2 variants={cardVariants} className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Kinek szól a program?
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* --- IGEN KÁRTYA (Kék hangsúly) --- */}
          <motion.div 
            variants={cardVariants}
            className="flex flex-col rounded-[2rem] border border-blue-100 bg-white/60 p-8 shadow-xl shadow-blue-900/5 backdrop-blur-sm transition-transform hover:-translate-y-1"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <Target className="h-6 w-6" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-6">Neked ajánlott, ha:</h3>
            
            <ul className="space-y-4">
              {data.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* --- NEM KÁRTYA (Szürke/Piros) --- */}
          {data.notFor?.length ? (
            <motion.div 
              variants={cardVariants}
              className="flex flex-col rounded-[2rem] border border-slate-200 bg-slate-50/50 p-8 transition-transform hover:-translate-y-1"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400">
                <Ban className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-6">Nem neked való, ha:</h3>

              <ul className="space-y-4">
                {data.notFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 opacity-75">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                      <X className="h-3 w-3" strokeWidth={3} />
                    </div>
                    <span className="text-slate-600 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </div>
      </motion.div>
    </Section>
  );
}