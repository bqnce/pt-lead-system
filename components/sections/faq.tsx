import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";

export function FAQ({ coach }: { coach: CoachConfig }) {
  const items = coach.sections.faq;
  if (!items?.length) return null;

  return (
    <Section id="faq">
      <h2 className="text-2xl font-semibold">Gyakori kérdések</h2>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <details key={item.q} className="rounded-2xl border p-5">
            <summary className="cursor-pointer font-medium">
              {item.q}
            </summary>
            <p className="mt-3 opacity-80">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
