import { CoachConfig } from "@/types/coach";
import { Hero } from "@/components/sections/hero";
import { ForWho } from "@/components/sections/for-who";
import { Process } from "@/components/sections/process";
import { FAQ } from "@/components/sections/faq";
import { LeadForm } from "@/components/forms/lead-form";
import { CoachCard } from "@/components/sections/coach-card";
import { Pricing } from "@/components/sections/pricing";
import { Navbar } from "@/components/sections/navbar";
import { Testimonials } from "../sections/testimonials";

export function TemplateMinimal({ coach }: { coach: CoachConfig }) {
  return (
    <>
      <Navbar coach={coach} />
      <Hero coach={coach} />
      <CoachCard coach={coach} />
      <Testimonials coach={coach} />
      <ForWho coach={coach} />
      <Process coach={coach} />
      <Pricing coach={coach} />
      <FAQ coach={coach} />
      <LeadForm coach={coach} />
    </>
  );
}
