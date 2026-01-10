"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-blue-200 bg-white shadow-lg shadow-blue-900/5"
          : "border-slate-200 bg-white/50 hover:bg-white hover:border-blue-200"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left focus:outline-none"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? "text-blue-900" : "text-slate-700"}`}>
          {question}
        </span>
        
        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-400"}`}>
            {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0">
              <p className="text-base leading-relaxed text-slate-500 text-pretty border-t border-slate-100 pt-4">
                {answer}
              </p>
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
    <Section id="faq">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-12 text-center">
           <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Tudnivalók
          </motion.span>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Gyakori kérdések
          </motion.h2>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <FAQItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}