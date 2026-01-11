"use client";

import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";
import { motion, Variants } from "framer-motion";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function Pricing({ coach }: { coach: CoachConfig }) {
  const pricing = coach.sections.pricing;
  if (!pricing) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <Section id="pricing">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="text-center mb-16 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
            Befektetés önmagadba
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
        >
          {pricing.title ?? "Csomagok"}
        </motion.h2>

        {pricing.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            {pricing.subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 grid gap-8 md:grid-cols-3 relative z-10"
      >
        {pricing.plans.map((plan) => {
          const isHot = !!plan.highlighted;

          return (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`group relative flex flex-col rounded-[2rem] p-8 transition-all duration-300 ${
                isHot
                  ? "bg-white border-2 border-blue-500 shadow-[0_20px_50px_rgba(59,130,246,0.15)] ring-4 ring-blue-500/5 scale-105 z-20"
                  : "bg-white/80 border border-slate-200 backdrop-blur-md shadow-sm hover:shadow-xl hover:border-slate-300"
              }`}
            >
              {isHot && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl ring-2 ring-white">
                  <Zap className="w-3 h-3 fill-current" />
                  Legnépszerűbb
                </div>
              )}

              {plan.note && !isHot && (
                <div className="absolute right-8 top-8 rounded-full bg-slate-100 px-3 py-1 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  {plan.note}
                </div>
              )}

              <div className="mb-8">
                <p
                  className={`text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${
                    isHot ? "text-blue-600" : "text-slate-400"
                  }`}
                >
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    {plan.priceText}
                  </span>
                </div>
              </div>

              <div className="flex-grow">
                <div className="h-px w-full bg-slate-100 mb-6" />
                <ul className="space-y-4">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 group/item">
                      <div
                        className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 transition-colors ${
                          isHot
                            ? "bg-blue-100 text-blue-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-600 leading-snug group-hover/item:text-slate-900 transition-colors">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                onClick={() => {
                  const target = document.getElementById("apply");
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                whileTap={{ scale: 0.97 }}
                className={`mt-10 flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  isHot
                    ? "bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:bg-blue-700 hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)]"
                    : "bg-slate-900 text-white hover:bg-black"
                }`}
              >
                Jelentkezem
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-16 flex flex-col items-center gap-6">
        {pricing.disclaimer && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs text-slate-400 font-medium italic text-center max-w-md"
          >
            * {pricing.disclaimer}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-8 py-4 px-8 rounded-2xl bg-slate-100/50 border border-slate-200/50"
        >
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Biztonságos fizetés
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Check className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Garanciát vállalok
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
