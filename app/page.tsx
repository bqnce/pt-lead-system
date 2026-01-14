import { getCoachBySlug } from "@/content/coaches";
import { TemplateMinimal } from "@/components/templates/template-minimal";
// Itt importálod majd az egyedi sablonokat:
// import { TemplateDani } from "@/components/templates/template-dani";

export default function Home() {
  // 1. KIVESSZÜK A VERCELEN BEÁLLÍTOTT VÁLTOZÓT
  // Ez minden projektnél MÁS lesz! (bela, dani, stb.)
  const slug = process.env.NEXT_PUBLIC_COACH_SLUG;

  // Ha fejlesztés közben vagy és nincs beállítva, betölti a demót
  const activeSlug = slug || "demo"; 

  const coach = getCoachBySlug(activeSlug);

  if (!coach) {
    return <div>Hiba: Nincs ilyen edző konfiguráció ({activeSlug})</div>;
  }

  // 2. A CONFIG ALAPJÁN DÖNTÜNK A MEGJELENÉSRŐL
  switch (coach.template) {
    // Ha Dani configjában az van, hogy "custom-dani", ez fut le:
    // case "custom-dani":
    //   return <TemplateDani coach={coach} />;

    // Ha Béla configjában az van, hogy "minimal", ez fut le:
    case "minimal":
    default:
      return <TemplateMinimal coach={coach} />;
  }
}