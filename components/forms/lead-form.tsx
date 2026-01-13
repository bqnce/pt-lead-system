"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";
import { CustomSelect } from "./CustomSelect";
import { SectionHeader } from "@/components/ui/section-header";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// --- MAIN FORM ---

export function LeadForm({ coach }: { coach: CoachConfig }) {
  const [state, setState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
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

  const inputClasses =
    "w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-slate-900 font-bold outline-none transition-all duration-300 placeholder:text-slate-400 placeholder:font-medium focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 hover:border-blue-300 hover:shadow-md";

  return (
    <Section id="apply" className="pt-20 pb-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          badge="Kapcsolat"
          title="Vágjunk bele a közös munkába"
          description="Töltsd ki az alábbi űrlapot, és 24 órán belül felveszem veled a kapcsolatot egy ingyenes konzultáció miatt."
          centered={true}
        />

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] border border-slate-100 bg-white p-8 md:p-16 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.08)]"
        >
          {/* Subtle Accent Background */}
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-600 via-indigo-500 to-blue-600" />

          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-4xl bg-blue-50 text-blue-600 shadow-inner">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                  Sikeres jelentkezés! 🎉
                </h3>
                <p className="text-lg text-slate-500 font-semibold max-w-md">
                  Köszönjük a bizalmad! Hamarosan keresni fogunk a megadott
                  elérhetőségeken, hogy egyeztessük az első lépéseket.
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
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit}
                className="space-y-8"
              >
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{
                    opacity: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 0,
                    width: 0,
                    zIndex: -1,
                  }}
                />
                <div className="grid gap-8 md:grid-cols-2">
                  <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <label className="mb-2.5 block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                      Név
                    </label>
                    <input
                      name="name"
                      required
                      className={inputClasses}
                      placeholder="Teljes neved"
                    />
                  </motion.div>

                  <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <label className="mb-2.5 block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                      Elérhetőség
                    </label>
                    <input
                      name="contact"
                      required
                      className={inputClasses}
                      placeholder="Email vagy telefonszám"
                    />
                  </motion.div>

                  <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
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

                  <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
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

                  <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="md:col-span-2"
                  >
                    <label className="mb-2.5 block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                      Hányszor tudsz edzeni?
                    </label>
                    <input
                      name="availability"
                      className={inputClasses}
                      placeholder="pl. Heti 3 alkalom"
                    />
                  </motion.div>

                  <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="md:col-span-2"
                  >
                    <label className="mb-2.5 block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                      Üzenet{" "}
                      <span className="opacity-50 font-normal">
                        (opcionális)
                      </span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className={`${inputClasses} resize-none`}
                      placeholder="Ide írhatsz bármit, amit fontosnak tartasz..."
                    />
                  </motion.div>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        required // EZT NE FELEJTSD EL!
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </div>
                    <label
                      htmlFor="privacy"
                      className="text-xs text-slate-500 font-medium leading-5"
                    >
                      Elolvastam és elfogadom az{" "}
                      <a
                        href="/adatkezeles"
                        target="_blank"
                        className="text-blue-600 underline decoration-blue-600/30 underline-offset-2 hover:text-blue-700"
                      >
                        Adatkezelési Tájékoztatót
                      </a>
                      , és hozzájárulok adataim kezeléséhez a kapcsolatfelvétel
                      érdekében.
                    </label>
                  </div>
                </div>

                <div className="pt-8 flex flex-col items-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={state === "submitting"}
                    className="group relative flex w-full max-w-lg items-center justify-center gap-3 rounded-2xl bg-slate-900 px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-all shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {state === "submitting" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin relative z-10" />
                        <span className="relative z-10">
                          Küldés folyamatban...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">
                          Jelentkezem a konzultációra
                        </span>
                        <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                      </>
                    )}
                  </motion.button>
                  <div className="flex items-center gap-2 text-slate-400">
                    <ShieldCheck className="h-4 w-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      Az adataidat bizalmasan kezeljük
                    </p>
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
