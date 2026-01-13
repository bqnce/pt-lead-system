import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/layout/footer";
import { demoCoach } from "@/content/coaches/demo"; // A design miatt betöltjük a demót

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar coach={demoCoach} />

      <div
        className="mx-auto max-w-3xl px-6 py-32"
        style={{ paddingTop: "130px", paddingBottom: "50px" }}
      >
        <h1 className="mb-8 text-4xl font-black tracking-tight">
          Adatkezelési Tájékoztató
        </h1>

        <div className="prose prose-slate prose-lg text-slate-600">
          <p className="font-bold text-red-600">
            FIGYELEM: A szögletes zárójelben lévő részeket cseréld le a
            saját/ügyfeled adataira!
          </p>

          <h3>1. Az Adatkezelő adatai</h3>
          <p>
            A jelen weboldal üzemeltetője és az adatok kezelője:
            <br />
            <strong>Név:</strong> [AZ EDZŐ VAGY CÉG NEVE]
            <br />
            <strong>Székhely:</strong> [CÍM]
            <br />
            <strong>E-mail:</strong> {demoCoach.contact.emailTo}
            <br />
            <strong>Telefonszám:</strong> [TELEFONSZÁM]
          </p>

          <h3>2. A kezelt adatok köre és célja</h3>
          <p>
            A weboldalon található jelentkezési űrlap kitöltésével Ön
            hozzájárul, hogy az alábbi személyes adatait kezeljük:
          </p>
          <ul className="list-disc pl-5">
            <li>Név (a kapcsolatfelvételhez)</li>
            <li>E-mail cím és telefonszám (a kapcsolattartáshoz)</li>
            <li>
              Edzettségi szint és célok (a szolgáltatás személyre szabásához)
            </li>
          </ul>
          <p>
            <strong>Az adatkezelés célja:</strong> Kapcsolatfelvétel,
            időpont-egyeztetés és személyi edzés szolgáltatás nyújtása.
          </p>

          <h3>3. Az adatkezelés jogalapja</h3>
          <p>
            Az adatkezelés jogalapja az Ön önkéntes hozzájárulása (GDPR 6. cikk
            (1) bekezdés a) pont), amelyet az űrlap elküldésével ad meg.
          </p>

          <h3>4. Adattovábbítás és technikai háttér</h3>
          <p>
            A weboldal technikai üzemeltetését végzi (Adatfeldolgozó):
            <br />
            <strong>Tárhely:</strong> Vercel Inc. (USA)
            <br />
            <strong>E-mail küldés:</strong> Resend Inc. (USA)
            <br />
            Az adatok technikai okokból továbbításra kerülhetnek ezen
            szolgáltatók szervereire, akik megfelelnek a GDPR előírásainak.
          </p>

          <h3>5. Az Ön jogai</h3>
          <p>
            Bármikor kérheti adatai törlését, módosítását vagy tájékoztatást
            kérhet a kezelt adatokról a fenti e-mail címen. Az adatait kérésre
            72 órán belül töröljük.
          </p>
        </div>
      </div>

      <Footer coach={demoCoach} />
    </main>
  );
}
