import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";

export function ForWho({ coach }: { coach: CoachConfig }) {
  const data = coach.sections.forWho;
  if (!data) return null;

  return (
    <Section id="for-who">
      <h2 className="text-2xl font-semibold">Kinek szól?</h2>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <p className="font-medium">Ajánlott, ha:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 opacity-80">
            {data.items.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>

        {data.notFor?.length ? (
          <div className="rounded-2xl border p-6">
            <p className="font-medium">Nem neked való, ha:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 opacity-80">
              {data.notFor.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
