import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/layout/footer";
import { demoCoach } from "@/content/coaches/demo";

export default function ImprintPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar coach={demoCoach} />

      <div
        className="mx-auto max-w-3xl px-6 py-32"
        style={{ paddingTop: "130px", paddingBottom: "50px" }}
      >
        <h1 className="mb-8 text-4xl font-black tracking-tight">Impresszum</h1>

        <div className="space-y-8 text-lg text-slate-600">
          <section>
            <h2 className="mb-2 text-xl font-bold text-slate-900">
              Szolgáltató adatai
            </h2>
            <p>
              <strong>Cégnév / Vállalkozó neve:</strong> [PÉLDA KFT. vagy EGYÉNI
              VÁLLALKOZÓ NEVE]
              <br />
              <strong>Székhely:</strong> [1234 Budapest, Példa utca 1.]
              <br />
              <strong>Adószám:</strong> [12345678-1-41]
              <br />
              <strong>Cégjegyzékszám / EV nyilvántartási szám:</strong>{" "}
              [XX-XX-XXXXXX]
              <br />
              <strong>E-mail:</strong> {demoCoach.contact.emailTo}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-slate-900">
              Tárhelyszolgáltató
            </h2>
            <p>
              <strong>Név:</strong> Vercel Inc.
              <br />
              <strong>Cím:</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA
              <br />
              <strong>Weboldal:</strong> https://vercel.com
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-slate-900">
              Felelősségkizárás
            </h2>
            <p>
              Az oldalon található információk tájékoztató jellegűek. Az
              egészségügyi tanácsok nem helyettesítik az orvosi konzultációt.
            </p>
          </section>
        </div>
      </div>

      <Footer coach={demoCoach} />
    </main>
  );
}
