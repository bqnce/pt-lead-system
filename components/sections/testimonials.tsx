"use client"

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Sparkles, Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { CoachConfig, Testimonial } from "@/types/coach";

function Stars({ rating = 5 }: { rating?: 1 | 2 | 3 | 4 | 5 }) {
  const r = Math.max(1, Math.min(5, rating));
  return (
    <div className="flex items-center gap-1.5" aria-label={`${r} / 5 értékelés`}>
      {Array.from({ length: 5 }).map((_, i: number) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < r ? "text-blue-500 fill-blue-500" : "text-slate-200"}`}
        />
      ))}
    </div>
  );
}

export function Testimonials({ coach }: { coach: CoachConfig }) {
  const t = coach.sections.testimonials;
  if (!t || !t.items?.length) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3
      }
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + t.items.length) % t.items.length);
  };

  return (
    <Section id="testimonials" className="pt-20 relative overflow-hidden">
      {/* Decorative background elements consistent with Pricing */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-40" />
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
            Sikertörténetek
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
        >
          {t.title ?? "Visszajelzések"}
        </motion.h2>

        {t.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
        )}
      </div>

      <div className="max-w-4xl mx-auto relative px-4">
        {/* Carousel Controls */}
        <div className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-30 hidden sm:block">
          <motion.button
            whileHover={{ x: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(-1)}
            className="p-5 rounded-3xl bg-white border border-slate-200 text-slate-900 hover:text-blue-600 transition-all shadow-lg hover:shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
        </div>
        
        <div className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-30 hidden sm:block">
          <motion.button
            whileHover={{ x: 4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(1)}
            className="p-5 rounded-3xl bg-white border border-slate-200 text-slate-900 hover:text-blue-600 transition-all shadow-lg hover:shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Slideshow Content */}
        <div className="relative min-h-[400px] md:min-h-[350px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full bg-white rounded-4xl border border-slate-200 p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-10 right-10 text-slate-100 z-0">
                 <Quote className="w-24 h-24 fill-current opacity-50" />
              </div>
              
              <div className="relative z-10">
                <div className="mb-8">
                   <Stars rating={t.items[currentIndex].rating} />
                </div>
                
                <p className="text-xl md:text-2xl text-slate-700 leading-[1.6] font-medium">
                  “{t.items[currentIndex].text}”
                </p>
                
                <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-slate-200 ring-4 ring-white">
                      {t.items[currentIndex].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-black text-slate-900 text-lg uppercase tracking-tight">
                        {t.items[currentIndex].name}
                      </div>
                      {t.items[currentIndex].meta && (
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mt-0.5">
                          {t.items[currentIndex].meta}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Pagination Only Controls */}
        <div className="flex sm:hidden justify-center gap-4 mt-8">
           <button onClick={() => paginate(-1)} className="p-4 rounded-2xl bg-white border border-slate-200">
             <ChevronLeft className="w-5 h-5" />
           </button>
           <button onClick={() => paginate(1)} className="p-4 rounded-2xl bg-white border border-slate-200">
             <ChevronRight className="w-5 h-5" />
           </button>
        </div>

        {/* Pagination Dots styled like pricing navigation cues */}
        <div className="mt-12 flex justify-center gap-2.5">
          {t.items.map((_: Testimonial, idx: number) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`transition-all duration-500 rounded-full h-1.5 ${
                idx === currentIndex ? "w-10 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "w-1.5 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Ugrás a ${idx + 1}. visszajelzésre`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
