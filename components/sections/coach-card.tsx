"use client";

import Image from "next/image";
import { CoachConfig } from "@/types/coach";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Quote, Trophy } from "lucide-react";
import { Section } from "../layout/section";

export function CoachCard({ coach }: { coach: CoachConfig }) {
  return (
    <Section id="coachCard">
      <motion.div
        initial="false"
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl group relative overflow-hidden rounded-[3rem] border border-slate-100 bg-white p-8 md:p-12 shadow-[0_48px_96px_-24px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_64px_128px_-32px_rgba(59,130,246,0.12)]"
      >
        {/* Decorative Background Accent */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-50/30 -z-10 translate-x-1/2 rounded-full blur-[120px]" />

        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* --- LEFT SIDE: Image & Stats --- */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-2xl ring-8 ring-white">
              <img
                src={
                  coach.brand.avatarUrl ??
                  "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=1000"
                }
                alt={coach.brand.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Premium Stat Matrix */}
            {coach.coach.badges?.length ? (
              <div className="grid grid-cols-2 gap-4">
                {coach.coach.badges.map((b) => (
                  <div
                    key={b.label}
                    className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-center transition-all duration-300 hover:bg-white hover:border-blue-100 hover:shadow-lg hover:shadow-blue-900/5 group/stat"
                  >
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/stat:text-blue-500 transition-colors">
                      {b.label}
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-900">
                      {b.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* --- RIGHT SIDE: Content --- */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div
              initial="false"
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-blue-600">
                  {coach.coach.title ?? "A Mentorod"}
                </span>
                {coach.brand.city && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    <MapPin className="h-3 w-3 text-blue-300" />
                    {coach.brand.city}
                  </span>
                )}
              </div>
            </motion.div>

            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">
              {coach.brand.name}
            </h3>

            <div className="relative mb-10">
              <Quote className="absolute -left-6 -top-4 h-12 w-12 text-blue-50 opacity-40 rotate-180" />
              <div className="relative z-10">
                <p className="text-xl leading-relaxed text-slate-600 font-semibold text-pretty">
                  "{coach.coach.bio}"
                </p>
                <p className="mt-6 text-base text-slate-500 leading-relaxed font-medium">
                  Hiszek abban, hogy a változás fejben dől el, de a testben
                  válik láthatóvá. A közös munka során nemcsak edzünk, hanem egy
                  olyan fenntartható rendszert építünk, ami az életed minden
                  területére pozitív hatással lesz.
                </p>
              </div>
            </div>

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
              <span className="relative z-10">Konzultáció kérése</span>
              <ArrowRight className="relative z-10 ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
