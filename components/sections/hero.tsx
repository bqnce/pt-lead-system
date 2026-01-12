"use client";

import Image from "next/image";
import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Instagram,
  MapPin,
  Check,
  Target,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export function Hero({ coach }: { coach: CoachConfig }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, rotate: 2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Section id="top" className="pt-28 pb-14">
      <motion.div
        className="grid gap-16 lg:grid-cols-12 lg:items-center"
        initial={false}
        animate="visible"
        variants={containerVariants}
      >
        {/* --- BAL OLDAL --- */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Brand Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 rounded-full border border-blue-100 p-1.5 pr-4 text-sm backdrop-blur-md shadow-sm mb-8"
          >
            <div className="bg-blue-600 rounded-full p-1 text-white shadow-md shadow-blue-200">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="font-black tracking-[0.15em] uppercase text-[10px] text-blue-900/80">
              {coach.brand.name}
            </span>
            {coach.brand.city && (
              <>
                <div className="h-3 w-px bg-blue-100 mx-1" />
                <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  <MapPin className="h-3 w-3 text-blue-400" />
                  {coach.brand.city}
                </span>
              </>
            )}
          </motion.div>

          {/* Címsor */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black tracking-[-0.04em] text-slate-900 leading-[0.95] mb-8"
          >
            {coach.hero.headline.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-[0.2em] last:mr-0">
                {word === "Befektetés" ? (
                  <span className="text-blue-600 relative">
                    {word}
                    <motion.span
                      initial={false}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1, duration: 1 }}
                      className="absolute -bottom-2 left-0 h-1.5 bg-blue-100 -z-10 rounded-full"
                    />
                  </span>
                ) : (
                  word
                )}
              </span>
            ))}
          </motion.h1>

          {/* Alcím */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-500 leading-relaxed max-w-xl font-medium mb-12"
          >
            {coach.hero.subheadline}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col w-full sm:w-auto sm:flex-row gap-5"
          >
            {/* CTA Gomb */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() =>
                document
                  .getElementById("apply")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 cursor-pointer"
            >
              {/* A Shine (Fénycsík) effekt */}
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

              {/* Szöveg és Ikon */}
              <span className="relative z-10">{coach.hero.primaryCtaText}</span>
              <ArrowRight className="relative z-10 ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>

            {/* Másodlagos gomb */}
            {coach.contact.instagramUrl && (
              <motion.a
                href={coach.contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, backgroundColor: "#fff" }}
                transition={{ duration: 0.05, ease: "easeInOut" }}
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 px-10 py-5 text-sm font-bold text-slate-700 transition-all hover:border-blue-200 hover:text-blue-600 backdrop-blur-sm"
              >
                <Instagram className="h-5 w-5" />
                Instagram
                <ExternalLink className="h-3 w-3 opacity-30" />
              </motion.a>
            )}
          </motion.div>

          {/* Badges */}
          {coach.hero.badges?.length ? (
            <motion.div
              variants={itemVariants}
              className="mt-16 flex flex-wrap gap-x-10 gap-y-5 pt-10 border-t border-slate-200/60 w-full"
            >
              {coach.hero.badges.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </div>
                  <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                    {b}
                  </span>
                </div>
              ))}
            </motion.div>
          ) : null}
        </div>

        {/* --- JOBB OLDAL --- */}
        <motion.div
          variants={imageVariants}
          className="lg:col-span-5 relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[420px] group">
            {/* The actual image container */}
            <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] transition-transform duration-700 hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.16)]">
              <img
                src={
                  coach.hero.heroImageUrl ||
                  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000"
                }
                alt={`${coach.brand.name} hero`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
