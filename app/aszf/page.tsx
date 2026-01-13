import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/layout/footer";
import { demoCoach } from "@/content/coaches/demo";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar coach={demoCoach} />

      {/* JAVÍTÁS: Inline style-t használunk a paddingra. 
         A 'paddingTop: 160px' garantálja, hogy a szöveg nem csúszik be a menü alá.
      */}
      <div
        className="mx-auto max-w-4xl px-6 pb-20"
        style={{ paddingTop: "130px", paddingBottom: "50px" }}
      >
        <h1 className="mb-12 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
          Általános Szerződési Feltételek (ÁSZF)
        </h1>

        {/* Tartalom... */}
        <div className="text-lg text-slate-600 leading-relaxed">
          <p className="mb-8 font-medium">
            Hatályos: 2024. [HÓNAP] [NAP]-tól visszavonásig.
          </p>

          <section className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              1. Bevezető rendelkezések
            </h3>
            <p className="mb-4">
              Jelen Általános Szerződési Feltételek (továbbiakban:{" "}
              <strong>ÁSZF</strong>) tartalmazzák a(z) [EDZŐ VAGY CÉG NEVE]
              (továbbiakban: <strong>Szolgáltató</strong>) által üzemeltetett
              weboldalon elérhető szolgáltatások igénybevételének feltételeit.
            </p>
          </section>

          <section className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              2. A Szolgáltató adatai
            </h3>
            <ul className="space-y-2 list-disc pl-5 marker:text-slate-400">
              <li>
                <strong>Név:</strong> [CÉGNÉV / VÁLLALKOZÓ NEVE]
              </li>
              <li>
                <strong>Székhely:</strong> [CÍM]
              </li>
              <li>
                <strong>Adószám:</strong> [ADÓSZÁM]
              </li>
              <li>
                <strong>E-mail:</strong> {demoCoach.contact.emailTo}
              </li>
            </ul>
          </section>

          {/* További szekciók maradhatnak a régiek, csak a keret volt a lényeg */}
          <section className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              3. A szolgáltatás tárgya
            </h3>
            <p className="mb-4">
              A Szolgáltató személyi edzést, életmód-tanácsadást és online
              mentorálást nyújt. A szolgáltatások részletes leírása és ára a
              weboldalon található.
            </p>
          </section>

          <section className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              6. Lemondási feltételek
            </h3>
            <p className="mb-4">
              A lefoglalt időpont (konzultáció vagy edzés) díjmentesen
              lemondható a kezdés előtt legalább [24] órával.
            </p>
          </section>
        </div>
      </div>

      <Footer coach={demoCoach} />
    </main>
  );
}
