"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/ui/section-header"; // <--- Új import
import { CoachConfig } from "@/types/coach";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react"; // Sparkles törölve

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.1,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={`group overflow-hidden rounded-4xl border transition-all duration-500 ${
        isOpen
          ? "border-blue-400 bg-white shadow-[0_32px_64px_-16px_rgba(59,130,246,0.1)] -translate-y-2"
          : "border-slate-300 bg-white/40 hover:bg-white hover:border-slate-200 hover:shadow-lg"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-6 p-8 text-left focus:outline-none cursor-pointer"
      >
        <span
          className={`text-xl font-black tracking-tight transition-colors duration-300 ${
            isOpen ? "text-blue-600" : "text-slate-800"
          }`}
        >
          {question}
        </span>

        <div
          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
            isOpen
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200 rotate-90"
              : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"
          }`}
        >
          {isOpen ? (
            <Minus className="h-5 w-5" strokeWidth={3} />
          ) : (
            <Plus className="h-5 w-5" strokeWidth={3} />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={false}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-8 pb-8 pt-0">
              <div className="border-t border-slate-100 pt-6">
                <p className="text-lg leading-relaxed text-slate-500 font-semibold text-pretty">
                  {answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ({ coach }: { coach: CoachConfig }) {
  const items = coach.sections.faq;
  if (!items?.length) return null;

  return (
    <Section id="faq" className="pt-20">
      <div className="mx-auto max-w-4xl">
        
        {/* --- ÚJ HEADERT HASZNÁLJUK --- */}
        <SectionHeader 
          badge="Tudnivalók"
          title="Gyakori kérdések"
          centered={true}
        />

        <motion.div
          initial={false}
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          {items.map((item, idx) => (
            <FAQItem
              key={item.q}
              question={item.q}
              answer={item.a}
              index={idx}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}