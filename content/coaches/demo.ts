import { CoachConfig } from "@/types/coach";

export const demoCoach: CoachConfig = {
  slug: "demo",
  template: "minimal",
  brand: {
    name: "NEXT LEVEL",
    city: "Budapest",
    avatarUrl: "/file.svg",
  },
  hero: {
    headline: "Formáld át az életed.",
    subheadline: "Személyre szabott edzésterv és táplálkozási tanácsadás, hogy elérd a céljaidat – kompromisszumok nélkül.",
    primaryCtaText: "Jelentkezem",
    heroImageUrl: "/globe.svg",
    badges: ["Erőnlét", "Életmód", "Mobilitás"],
  },
  contact: {
    emailTo: "csobadibence@gmail.com",
    instagramUrl: "https://instagram.com/",
  },
  sections: {
    forWho: {
      items: [
        "Ha most kezdenél edzeni, de félsz, hogy abbahagyod",
        "Ha fogyni / formásodni szeretnél, de nincs rendszered",
        "Ha erősödni akarsz és szeretnél biztos tervet",
      ],
      notFor: ["Ha nem akarsz változtatni a szokásaidon", "Ha azonnali csodát keresel"],
    },
    process: {
      steps: [
        { title: "Jelentkezés", desc: "Kitöltöd a rövid jelentkezést, hogy értsem a célod." },
        { title: "Ingyenes konzultáció", desc: "Átbeszéljük a helyzeted és a lehetőségeket." },
        { title: "Terv + munka", desc: "Megkapod a személyre szabott irányt és elindulunk." },
      ],
    },
    faq: [
      { q: "Kezdőként is jelentkezhetek?", a: "Igen, kifejezetten sok kezdővel dolgozom." },
      { q: "Mennyi idő alatt várható változás?", a: "Ez célfüggő, de 4–8 hét alatt már látszanak jelek." },
    ],
  },
};
