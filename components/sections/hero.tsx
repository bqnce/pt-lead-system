"use client";

import Image from "next/image";
import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, MapPin, Check } from "lucide-react";

export function Hero({ coach }: { coach: CoachConfig }) {
  return (
    <Section id="top">
      <motion.div 
        className="grid gap-12 lg:grid-cols-2 lg:items-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        
        {/* --- BAL OLDAL --- */}
        <div className="flex flex-col items-start max-w-2xl">
          
          {/* Brand Badge - Kék kerettel */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm text-blue-900 mb-8 backdrop-blur-sm"
          >
            <span className="font-bold tracking-wide uppercase text-xs text-blue-700">{coach.brand.name}</span>
            {coach.brand.city && (
              <>
                <span className="h-1 w-1 rounded-full bg-blue-300" />
                <span className="flex items-center gap-1 text-xs uppercase tracking-wide text-slate-500">
                  <MapPin className="h-3 w-3 text-blue-400" />
                  {coach.brand.city}
                </span>
              </>
            )}
          </motion.div>

          {/* Címsor - Sötét Navy */}
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.15] text-balance"
          >
            {coach.hero.headline}
          </motion.h1>

          {/* Alcím - Kékes szürke */}
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mt-6 text-lg text-slate-600 leading-relaxed text-pretty max-w-lg font-medium"
          >
            {coach.hero.subheadline}
          </motion.p>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mt-10 flex flex-col w-full sm:w-auto sm:flex-row gap-4"
          >
            {/* CTA Gomb - Erős Kék */}
            <a
              href="#apply"
              className="group inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-700 hover:scale-[1.02] shadow-xl shadow-blue-900/20 ring-4 ring-transparent hover:ring-blue-100"
            >
              {coach.hero.primaryCtaText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Másodlagos gomb */}
            {coach.contact.instagramUrl && (
              <a
                href={coach.contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-8 py-4 text-base font-semibold text-slate-700 transition-all hover:bg-white hover:border-blue-200 hover:text-blue-600 backdrop-blur-sm"
              >
                <Instagram className="h-5 w-5" />
                Instagram
              </a>
            )}
          </motion.div>

          {/* Badges - Kék pipák */}
          {coach.hero.badges?.length ? (
            <motion.div 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="mt-12 flex flex-wrap gap-x-8 gap-y-3 pt-8 border-t border-slate-100 w-full"
            >
              {coach.hero.badges.map((b) => (
                <div key={b} className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">{b}</span>
                </div>
              ))}
            </motion.div>
          ) : null}
        </div>

        {/* --- JOBB OLDAL --- */}
        <motion.div 
          variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }}
          className="relative lg:ml-auto w-full max-w-md lg:max-w-none mt-8 lg:mt-0"
        >
          {/* Háttér keret - Kék */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-blue-100 to-slate-50 rounded-[2.5rem] -z-10 -rotate-2" />
          
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl shadow-blue-900/10 lg:aspect-square">
            <Image
              src={coach.hero.heroImageUrl ?? "/next.svg"}
              alt={`${coach.brand.name} hero`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-40" />
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}