"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CoachConfig } from "@/types/coach";

interface NavbarProps {
  coach: CoachConfig;
}

export const Navbar: React.FC<NavbarProps> = ({ coach }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nav = coach.nav;
  const navItems = nav?.items ?? [];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (idOrHash: string) => {
    setIsOpen(false);

    // elfogad "apply" és "#apply" formátumot is
    const id = idOrHash.startsWith("#") ? idOrHash.slice(1) : idOrHash;

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-4 bg-white/75 backdrop-blur-md shadow-md"
          : "py-6 bg-transparent shadow-xs"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-12 lg:px-24">
        {/* Trainer Name / Logo */}
        <div
          className="group flex cursor-pointer items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 font-black text-white transition-transform group-hover:scale-105">
            {coach.brand.name.charAt(0)}
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">
            {coach.brand.name}
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems
            .filter((item) => item.show !== false)
            .map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="group relative text-sm font-bold uppercase tracking-widest text-slate-500 transition-colors duration-300 hover:text-blue-600 cursor-pointer"
              >
                {item.label}

                {/* KÖZÉPRŐL EXPANDÁLÓ VONAL */}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-center scale-x-0 bg-blue-600 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </button>
            ))}

          {/* Main CTA Button */}
          {nav?.cta
            ? (() => {
                const ctaId = nav.cta.href; // lehet "#apply" is
                const ctaLabel = nav.cta.label;

                return (
                  <button
                    onClick={() => handleNavClick(ctaId)}
                    // A 'bg-gradient-to-r from-blue-600 to-indigo-600' most már alapból rajta van, nem hoverre
                    className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3 text-xs font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-105 hover:shadow-blue-600/40 cursor-pointer"
                  >
                    {/* A Shine (Fénycsík) effekt - ez marad a hoverre */}
                    <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

                    <span className="relative z-10">{ctaLabel}</span>

                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                );
              })()
            : null}
        </div>

        {/* Mobile Toggle */}
        <button
          className="p-2 text-slate-900 lg:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-slate-100 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {navItems
                .filter((item) => item.show !== false)
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="border-b border-slate-50 pb-2 text-left text-lg font-bold text-slate-900"
                  >
                    {item.label}
                  </button>
                ))}

              {/* Mobile CTA */}
              <button
                onClick={() => handleNavClick(nav?.cta?.href ?? "#apply")}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 p-5 text-sm font-black uppercase tracking-widest text-white shadow-xl"
              >
                {nav?.cta?.label ?? "Jelentkezés"}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
