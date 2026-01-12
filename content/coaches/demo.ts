import { CoachConfig } from "@/types/coach";
import trainer from "@/images/trainer.jpg";
import gym from "@/images/gym.jpg";

export const demoCoach: CoachConfig = {
  slug: "demo",
  template: "minimal",
  brand: {
    name: "NEXT LEVEL",
    city: "Budapest",
    avatarUrl: trainer.src,
  },
  coach: {
    title: "Személyi edző & Életmód tanácsadó",
    bio: "Nem hiszek a gyors csodákban, csak a következetes munkában. Az edzések célja nálam nem a felesleges szenvedés, hanem egy fenntartható rendszer kiépítése, ami valóban illeszkedik az életedbe. Segítek, hogy végre ne csak elkezdj, hanem folyamatosan haladj is a céljaid felé – legyen szó fogyásról, formásodásról vagy teljes életmódváltásról. Kezdőként is biztonságban érezheted magad: az alapoktól építkezünk, hogy ne csak az eredményt lásd a tükörben, hanem élvezd is az oda vezető utat.",
    badges: [
      { label: "Tapasztalat", value: "5+ év" },
      { label: "Kliensek", value: "120+ fő" },
      { label: "Szakterület", value: "Fogyás / Alakformálás" },
      { label: "Végzettség", value: "IWI / NASM" },
    ],
  },
  hero: {
    headline: "Formáld át az életed.",
    subheadline:
      "Személyre szabott edzésterv és táplálkozási tanácsadás, hogy elérd a céljaidat – kompromisszumok nélkül.",
    primaryCtaText: "Jelentkezem",
    heroImageUrl: gym.src,
    badges: ["Erőnlét", "Életmód", "Mobilitás"],
  },
  contact: {
    emailTo: "csobadibence@gmail.com",
    instagramUrl: "https://instagram.com/",
  },
  sections: {
    forWho: {
      items: [
        "Szeretnél végre fenntartható életmódot váltani",
        "Eleged van a jojó-effektusból és az önsanyargatásból",
        "Professzionális, szakértői támogatásra vágysz",
        "Keresed a motivációt a mindennapokhoz",
      ],
      notFor: [
        "Gyors, 2 hetes 'csodamegoldást' keresel",
        "Nem vagy hajlandó energiát fektetni a munkába",
        "Csak egy sablonos étrendet szeretnél venni",
      ],
    },
    process: {
      steps: [
        {
          title: "Konzultáció",
          desc: "Egy alapos állapotfelméréssel kezdünk, ahol átbeszéljük a céljaidat, lehetőségeidet és a jelenlegi életmódodat.",
        },
        {
          title: "Személyre szabott terv",
          desc: "Kialakítjuk az egyedi edzés- és étrendstratégiát, ami tökéletesen illeszkedik a mindennapi rutinodba.",
        },
        {
          title: "Folyamatos mentorálás",
          desc: "Heti csekkolásokkal, napi támogatással és folyamatos finomhangolással kísérlek végig a változás útján.",
        },
      ],
    },
    faq: [
      {
        q: "Kezdőként is belevághatok?",
        a: "Természetesen! A program lényege éppen az, hogy az aktuális szintedhez igazítjuk a tempót és a feladatokat. Nem számít hol tartasz most, csak az, hova akarsz eljutni.",
      },
      {
        q: "Mennyi időt vesz igénybe naponta?",
        a: "Az edzések és az étrend is úgy lesz kialakítva, hogy beleférjen a napirendedbe. Átlagosan napi 30-60 perc fókuszált figyelem már látványos eredményt hoz.",
      },
      {
        q: "Van lehetőség személyes edzésre?",
        a: "A fő programom online alapú, de bizonyos csomagok esetén (pl. Elite Mentor) van lehetőség havi egy személyes konzultációra és technikai finomhangolásra Budapesten.",
      },
      {
        q: "Hogyan tudok fizetni?",
        a: "Biztonságos bankkártyás fizetéssel (Stripe) vagy banki átutalással is rendezheted a mentorálás díját. Havi előfizetéses rendszerben dolgozunk, ami bármikor lemondható.",
      },
    ],
    pricing: {
      title: "Válassz utat a fejlődéshez",
      subtitle:
        "Személyre szabott mentorprogramok, amik segítenek kihozni belőled a maximumot.",
      disclaimer:
        "Az árak bruttó összegek és havi elszámolásban értendőek. Lemondható bármikor.",
      plans: [
        {
          id: "basic",
          name: "Alapozó",
          priceText: "49.000 Ft",
          note: "Kezdőknek",
          features: [
            "Heti 1 órás online konzultáció",
            "Személyre szabott edzésterv",
            "E-mailes támogatás (24h)",
            "Alapszintű receptgyűjtemény",
          ],
        },
        {
          id: "pro",
          name: "Haladó Pro",
          priceText: "89.000 Ft",
          highlighted: true,
          features: [
            "Heti 2 órás konzultáció",
            "Mindent magában foglaló mentorálás",
            "VIP WhatsApp elérhetőség",
            "Havi workshop részvétel",
            "Prémium táplálékkiegészítők",
          ],
        },
        {
          id: "elite",
          name: "Elite Mentor",
          priceText: "149.000 Ft",
          note: "Limitált",
          features: [
            "Korlátlan 1:1 hozzáférés",
            "Napi szintű nyomonkövetés",
            "Exkluzív offline elvonulások",
            "Személyes asszisztencia",
            "Egyedi életmód-stratégia",
          ],
        },
      ],
    },
  },
  nav: {
    items: [
      { id: "coachCard", label: "Rólam" },
      { id: "for-who", label: "Kinek ajánlom?" },
      { id: "process", label: "Folyamat" },
      { id: "pricing", label: "Csomagok" },
      { id: "faq", label: "GYIK" },
    ],
    cta: {
      label: "Jelentkezem",
      href: "#apply",
    },
  },
};
