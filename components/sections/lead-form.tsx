"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  Loader2,
  ChevronDown,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type LeadState = "idle" | "submitting" | "success" | "error";

// --- CUSTOM DROPDOWN ---
interface CustomSelectProps {
  name: string;
  label: string;
  options: { value: string }[];
  placeholder: string;
}

function CustomSelect({ name, label, options, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input type="hidden" name={name} value={selected} />
      <label className="mb-2.5 block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-full text-left rounded-2xl border px-5 py-4 outline-none transition-all duration-300 flex items-center justify-between cursor-pointer
          ${isOpen 
            ? "border-blue-400 bg-white shadow-xl shadow-blue-900/5 ring-4 ring-blue-50" 
            : "border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-md"
          }
        `}
      >
        <span className={selected ? "text-slate-900 font-bold" : "text-slate-400 font-medium"}>
          {selected || placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 top-full mt-3 z-40 overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white/95 backdrop-blur-xl shadow-2xl shadow-blue-900/10 py-2"
            >
              <div className="max-h-60 overflow-y-auto">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-blue-50/50"
                  >
                    <span className={`text-sm ${selected === opt.value ? "font-black text-blue-600" : "text-slate-600 font-semibold"}`}>
                      {opt.value}
                    </span>
                    {selected === opt.value && <Check className="h-4 w-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- MAIN FORM ---

export function LeadForm({ coach }: { coach: CoachConfig }) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // ... payload logika marad ...
    const payload = {
      slug: coach.slug,
      coachName: coach.brand.name,
      emailTo: coach.contact.emailTo,
      name: String(formData.get("name") ?? ""),
      contact: String(formData.get("contact") ?? ""),
      goal: String(formData.get("goal") ?? ""),
      experience: String(formData.get("experience") ?? ""),
      availability: String(formData.get("availability") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Hiba történt a küldésnél.");
      }

      setState("success");
      form.reset();
    } catch (err: any) {
      setState("error");
      setErrorMsg(err?.message || "Hiba történt.");
    }
  }


  const inputClasses = "w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-slate-900 font-bold outline-none transition-all duration-300 placeholder:text-slate-400 placeholder:font-medium focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 hover:border-blue-300 hover:shadow-md";

  return (
    <Section id="apply">
      <div className="mx-auto max-w-4xl">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span className="animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-500 to-blue-700 text-[10px] font-black uppercase tracking-[0.25em]">
              Kapcsolat
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-6"
          >
            Vágjunk bele a közös munkába
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-slate-500 font-medium max-w-xl mx-auto"
          >
            Töltsd ki az alábbi űrlapot, és {coach.brand.name} 24 órán belül felveszi veled a kapcsolatot egy ingyenes konzultáció miatt.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] border border-slate-100 bg-white p-8 md:p-16 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.08)]"
        >
          {/* Subtle Accent Background */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />
          
          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-blue-50 text-blue-600 shadow-inner">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                  Sikeres jelentkezés! 🎉
                </h3>
                <p className="text-lg text-slate-500 font-semibold max-w-md">
                  Köszönjük a bizalmad! Hamarosan keresni fogunk a megadott elérhetőségeken, hogy egyeztessük az első lépéseket.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setState("idle")}
                  className="mt-12 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-600 transition-all hover:bg-slate-50 hover:text-blue-600 hover:border-blue-100 cursor-pointer"
                >
                  Új jelentkezés küldése
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit}
                className="space-y-8"
              >
                <div className="grid gap-8 md:grid-cols-2">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
                    <label className="mb-2.5 block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Név</label>
                    <input name="name" required className={inputClasses} placeholder="Teljes neved" />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
                    <label className="mb-2.5 block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Elérhetőség</label>
                    <input name="contact" required className={inputClasses} placeholder="Email vagy telefonszám" />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
                    <CustomSelect
                      name="goal"
                      label="Fő célod"
                      placeholder="Válassz célt..."
                      options={[
                        { value: "Fogyás / Formásodás" },
                        { value: "Izomtömeg növelés" },
                        { value: "Erő / Teljesítmény" },
                        { value: "Egészség / Fittség" },
                      ]}
                    />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
                    <CustomSelect
                      name="experience"
                      label="Tapasztalat"
                      placeholder="Szinted..."
                      options={[
                        { value: "Kezdő (Most indulok)" },
                        { value: "Újrakezdő" },
                        { value: "Középhaladó" },
                        { value: "Haladó / Versenyző" },
                      ]}
                    />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="md:col-span-2">
                    <label className="mb-2.5 block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Hányszor tudsz edzeni?</label>
                    <input name="availability" className={inputClasses} placeholder="pl. Heti 3 alkalom" />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="md:col-span-2">
                    <label className="mb-2.5 block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Üzenet <span className="opacity-50 font-normal">(opcionális)</span></label>
                    <textarea name="message" rows={4} className={`${inputClasses} resize-none`} placeholder="Ide írhatsz bármit, amit fontosnak tartasz..." />
                  </motion.div>
                </div>

                <div className="pt-8 flex flex-col items-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={state === "submitting"}
                    className="group relative flex w-full max-w-lg items-center justify-center gap-3 rounded-2xl bg-slate-900 px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-all shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {state === "submitting" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin relative z-10" />
                        <span className="relative z-10">Küldés folyamatban...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Jelentkezem a konzultációra</span>
                        <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                      </>
                    )}
                  </motion.button>
                  <div className="flex items-center gap-2 text-slate-400">
                    <ShieldCheck className="h-4 w-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.1em]">Az adataidat bizalmasan kezeljük</p>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}
