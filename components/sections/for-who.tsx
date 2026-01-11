"use client";

import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";
import { motion, Variants } from "framer-motion";
import { Check, X, Target, Ban, Sparkles } from "lucide-react";

export function ForWho({ coach }: { coach: CoachConfig }) {
  const data = coach.sections.forWho;
  if (!data) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } 
    },
  };

  return (
    <Section id="for-who">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto max-w-6xl"
      >
        <div className="text-center mb-20">
          <motion.div
            variants={cardVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span className="animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-500 to-blue-700 text-[10px] font-black uppercase tracking-[0.25em]">
              Célközönség
            </span>
          </motion.div>
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight"
          >
            Kinek szól a program?
          </motion.h2>
          <motion.div 
            variants={cardVariants}
            className="mt-4 h-1.5 w-24 bg-blue-600 rounded-full mx-auto"
          />
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-stretch">
          {/* --- IGEN KÁRTYA --- */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="relative flex flex-col rounded-[2.5rem] border border-blue-100 bg-white p-10 shadow-[0_32px_64px_-16px_rgba(59,130,246,0.1)] transition-all duration-500 hover:shadow-[0_48px_80px_-24px_rgba(59,130,246,0.15)] overflow-hidden"
          >
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />

            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-blue-600 text-white shadow-xl shadow-blue-200 ring-4 ring-blue-50">
              <Target className="h-7 w-7" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">
              Neked ajánlott, ha:
            </h3>

            <ul className="space-y-6">
              {data.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4 group/item">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-300">
                    <Check className="h-3.5 w-3.5" strokeWidth={4} />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed group-hover/item:text-slate-900 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* --- NEM KÁRTYA --- */}
          {data.notFor?.length ? (
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="relative flex flex-col rounded-[2.5rem] border border-slate-100 bg-slate-50/50 p-10 transition-all duration-500 hover:bg-white hover:border-slate-200 hover:shadow-xl group"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white border border-slate-200 text-slate-400 group-hover:text-rose-400 group-hover:border-rose-100 transition-colors duration-300">
                <Ban className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">
                Nem neked való, ha:
              </h3>

              <ul className="space-y-6">
                {data.notFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-white text-rose-300 border border-slate-100 group-hover:bg-rose-50 group-hover:text-rose-500 group-hover:border-rose-100 transition-colors">
                      <X className="h-3.5 w-3.5" strokeWidth={4} />
                    </div>
                    <span className="text-slate-500 font-bold leading-relaxed group-hover:text-slate-700 transition-colors">
                      {item}
                    </span>
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
