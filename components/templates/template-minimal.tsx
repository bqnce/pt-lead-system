import { CoachConfig } from "@/types/coach";
import { Hero } from "@/components/sections/hero";
import { ForWho } from "@/components/sections/for-who";
import { Process } from "@/components/sections/process";
import { FAQ } from "@/components/sections/faq";
import { LeadForm } from "@/components/sections/lead-form";


export function TemplateMinimal({ coach }: { coach: CoachConfig }) {
  return (
    <>
      <Hero coach={coach} />
      <ForWho coach={coach} />
      <Process coach={coach} />
      <FAQ coach={coach} />
      <LeadForm coach={coach} />
      {/* Következő lépés: Lead form */}
    </>
  );
}
