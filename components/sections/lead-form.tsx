"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, ChevronDown, Check } from "lucide-react";

type LeadState = "idle" | "submitting" | "success" | "error";

// --- CUSTOM DROPDOWN ---
interface CustomSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
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
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full text-left rounded-xl border px-4 py-3 outline-none transition-all duration-300 flex items-center justify-between
          ${isOpen 
            ? "border-blue-400 ring-4 ring-blue-50 bg-white shadow-sm" 
            : "border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-sm"
          }
        `}
      >
        <span className={selected ? "text-slate-900 font-medium" : "text-slate-400"}>
          {selected || placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full mt-2 z-20 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl shadow-blue-900/10 py-1"
            >
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-blue-50"
                  >
                    <span className={selected === opt.value ? "font-semibold text-blue-700" : "text-slate-600"}>
                      {opt.label}
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
  const [state, setState] = useState<LeadState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

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

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // KÉK FÓKUSZ STÍLUSOK
  const inputClasses = "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 hover:border-blue-200 hover:shadow-sm";

  return (
    <Section id="apply">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-10 text-center">
          <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Konzultáció
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Jelentkezz a programba
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-slate-500 max-w-xl mx-auto text-pretty">
            Töltsd ki az alábbi űrlapot, és {coach.brand.name} 24 órán belül felveszi veled a kapcsolatot.
          </motion.p>
        </div>

        <motion.div 
          variants={fadeUp}
          className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white/80 shadow-2xl shadow-blue-900/5 backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-16 px-6 text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Sikeres jelentkezés! 🎉</h3>
                <p className="mt-3 max-w-md text-slate-500">
                  Köszönjük a bizalmad! Hamarosan keresni fogunk a megadott elérhetőségeken.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-6 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-blue-600 hover:border-blue-200"
                >
                  Új jelentkezés küldése
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit}
                className="p-8 sm:p-10 relative"
              >
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0 }}>
                  <label htmlFor="website">Website</label>
                  <input type="text" name="website" id="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Név</label>
                    <input name="name" required className={inputClasses} placeholder="Teljes neved" />
                  </div>

                  <div className="md:col-span-1">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Elérhetőség</label>
                    <input name="contact" required className={inputClasses} placeholder="Email vagy telefonszám" />
                  </div>

                  <div className="md:col-span-1">
                    <CustomSelect 
                      name="goal" 
                      label="Fő célod" 
                      placeholder="Válassz célt..."
                      options={[
                        { value: "Fogyás / formásodás", label: "Fogyás / Formásodás" },
                        { value: "Izomtömeg növelés", label: "Izomtömeg növelés" },
                        { value: "Erő / teljesítmény", label: "Erő / Teljesítmény" },
                        { value: "Általános fittség", label: "Egészség / Fittség" }
                      ]}
                    />
                  </div>

                  <div className="md:col-span-1">
                     <CustomSelect 
                      name="experience" 
                      label="Tapasztalat" 
                      placeholder="Szinted..."
                      options={[
                        { value: "Kezdő", label: "Kezdő (Most indulok)" },
                        { value: "Újrakezdő", label: "Újrakezdő" },
                        { value: "Középhaladó", label: "Középhaladó" },
                        { value: "Haladó", label: "Haladó / Versenyző" }
                      ]}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Mikor tudsz edzeni?</label>
                    <input name="availability" className={inputClasses} placeholder="pl. Hétköznap esténként, Heti 3 alkalom..." />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Rövid bemutatkozás <span className="text-slate-400 font-normal">(opcionális)</span>
                    </label>
                    <textarea name="message" rows={4} className={`${inputClasses} resize-none`} placeholder="Ide írhatsz bármit, amit fontosnak tartasz..." />
                  </div>
                </div>

                <AnimatePresence>
                  {state === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100"
                    >
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <p>{errorMsg}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8 flex flex-col items-center gap-4">
                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-blue-900/20 ring-4 ring-transparent hover:ring-blue-100"
                  >
                    {state === "submitting" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Küldés folyamatban...
                      </>
                    ) : (
                      <>
                        Jelentkezem a konzultációra
                        <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-400">
                    Az adataidat bizalmasan kezeljük és nem küldünk spamet.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Section>
  );
}