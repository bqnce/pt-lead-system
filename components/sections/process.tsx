import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";

export function Process({ coach }: { coach: CoachConfig }) {
  const data = coach.sections.process;
  if (!data) return null;

  return (
    <Section id="process">
      <h2 className="text-2xl font-semibold">Hogyan zajlik?</h2>
      <p className="mt-2 max-w-2xl opacity-80">
        Egyszerű, átlátható folyamat – hogy tudd, mire számíthatsz.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {data.steps.map((s, idx) => (
          <div key={s.title} className="rounded-2xl border p-6">
            <p className="text-sm opacity-60">{String(idx + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 opacity-80">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
