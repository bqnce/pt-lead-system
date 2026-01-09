"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";

type LeadState = "idle" | "submitting" | "success" | "error";

export function LeadForm({ coach }: { coach: CoachConfig }) {
  const [state, setState] = useState<LeadState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

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

  return (
    <Section id="apply">
      <h2 className="text-2xl font-semibold">
        Jelentkezés ingyenes konzultációra
      </h2>
      <p className="mt-2 max-w-2xl opacity-80">
        Töltsd ki röviden, és {coach.brand.name} 24 órán belül visszajelez.
      </p>

      <div className="mt-6 rounded-2xl border p-6">
        {state === "success" ? (
          <div>
            <p className="text-lg font-semibold">Megkaptuk! ✅</p>
            <p className="mt-2 opacity-80">
              Hamarosan kapsz visszajelzést. (Ha 24 órán belül nem jön válasz,
              nézd meg a spam/promóciók mappát.)
            </p>
            <button
              className="mt-5 rounded-xl border px-4 py-2"
              onClick={() => setState("idle")}
            >
              Új jelentkezés
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="relative grid gap-4 md:grid-cols-2">
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-10000px",
                top: "auto",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              <label htmlFor="website">Website</label>
              <input
                type="text"
                name="website"
                id="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="md:col-span-1">
              <label className="text-sm opacity-70">Név</label>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-xl border p-3"
                placeholder="Teljes név"
              />
            </div>

            <div className="md:col-span-1">
              <label className="text-sm opacity-70">
                Elérhetőség (email vagy telefon)
              </label>
              <input
                name="contact"
                required
                className="mt-1 w-full rounded-xl border p-3"
                placeholder="pl. email@email.com vagy +36..."
              />
            </div>

            <div className="md:col-span-1">
              <label className="text-sm opacity-70">Cél</label>
              <select
                name="goal"
                className="mt-1 w-full rounded-xl border p-3"
                defaultValue=""
              >
                <option value="" disabled>
                  Válassz
                </option>
                <option value="Fogyás / formásodás">Fogyás / formásodás</option>
                <option value="Izomtömeg">Izomtömeg</option>
                <option value="Erő / teljesítmény">Erő / teljesítmény</option>
                <option value="Általános fittség">Általános fittség</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <label className="text-sm opacity-70">Edzés múlt</label>
              <select
                name="experience"
                className="mt-1 w-full rounded-xl border p-3"
                defaultValue=""
              >
                <option value="" disabled>
                  Válassz
                </option>
                <option value="Kezdő">Kezdő</option>
                <option value="Középhaladó">Középhaladó</option>
                <option value="Haladó">Haladó</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm opacity-70">Mikor tudsz edzeni?</label>
              <input
                name="availability"
                className="mt-1 w-full rounded-xl border p-3"
                placeholder="pl. H–P este, heti 3x"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm opacity-70">Üzenet (opcionális)</label>
              <textarea
                name="message"
                rows={4}
                className="mt-1 w-full rounded-xl border p-3"
                placeholder="Röviden írd le a helyzeted..."
              />
            </div>

            {state === "error" ? (
              <p className="md:col-span-2 text-sm text-red-600">{errorMsg}</p>
            ) : null}

            <div className="md:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={state === "submitting"}
                className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-60"
              >
                {state === "submitting" ? "Küldés..." : "Jelentkezem"}
              </button>

              <p className="text-sm opacity-70">
                Beküldés után 24 órán belül visszajelzés.
              </p>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
