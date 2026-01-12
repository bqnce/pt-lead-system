"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  ArrowUp,
  Sparkles,
  MapPin,
  ExternalLink,
  Youtube,
} from "lucide-react";
import { CoachConfig } from "@/types/coach";

export function Footer({ coach }: { coach: CoachConfig }) {
  const f = coach.footer;
  const navItems = coach.nav?.items ?? [];

  const handleNavClick = (idOrHash: string) => {
    // elfogad "apply" és "#apply" formátumot is
    const id = idOrHash.startsWith("#") ? idOrHash.slice(1) : idOrHash;

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-slate-100">
      {/* Decorative background blurs to match Pricing/Testimonials */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="grid gap-16 lg:grid-cols-12 mb-20">
          {/* Brand Identity Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-slate-200">
                {coach.brand.name.charAt(0)}
              </div>
              <span className="font-black text-2xl tracking-tighter text-slate-900">
                {coach.brand.name}
              </span>
            </div>

            <p className="text-slate-500 text-lg leading-relaxed max-w-sm mb-8">
              {f?.brandLine ??
                "Profi szakmai háttérrel segítek elérni a fizikai és mentális céljaidat."}
            </p>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-100 w-fit">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                {coach.brand.city ?? "Budapest, Magyarország"}
              </span>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Sparkles className="w-3 h-3 text-blue-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">
                Navigáció
              </span>
            </div>
            <ul className="flex flex-col gap-4">
              {navItems
                .filter((item) => item.show !== false)
                .map((item) => (
                  <li key={item.id}>
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-500 transition-all duration-300" />
                      {item.label}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <Mail className="w-3 h-3 text-slate-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                Kapcsolat
              </span>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              {f?.socials?.email && (
                <a
                  href={`mailto:${f.socials.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">
                    {f.socials.email}
                  </span>
                </a>
              )}
            </div>

            <div className="flex items-center gap-3">
              {[
                {
                  icon: Instagram,
                  href: f?.socials?.instagram,
                  label: "Instagram",
                },
                {
                  icon: Facebook,
                  href: f?.socials?.facebook,
                  label: "Facebook",
                },
                { icon: Youtube, href: f?.socials?.youtube, label: "Youtube" },
              ].map(
                (social, i) =>
                  social.href && (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      // Interaktív lebegés és növekedés hoverre
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 text-white shadow-lg transition-all duration-300 hover:shadow-blue-500/40"
                      aria-label={social.label}
                    >
                      {/* 1. Háttér Gradiens: Alapból láthatatlan (opacity-0), hoverre tűnik elő */}
                      <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* 2. Shine (Fénycsík) Effekt: Átsuhan, amikor ráviszed az egeret */}
                      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

                      {/* 3. Ikon: Relatív pozíció kell, hogy a layerek fölött legyen */}
                      <social.icon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </motion.a>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Divider & Legal */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3">
            {f?.legal?.privacyUrl && (
              <a
                href={f.legal.privacyUrl}
                className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
              >
                Adatkezelés
              </a>
            )}
            {f?.legal?.termsUrl && (
              <a
                href={f.legal.termsUrl}
                className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
              >
                ÁSZF
              </a>
            )}
            {f?.legal?.imprintUrl && (
              <a
                href={f.legal.imprintUrl}
                className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
              >
                Impresszum
              </a>
            )}
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              © {new Date().getFullYear()} {coach.brand.name}
            </span>
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all group cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
