import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation/lead";
import { sendLeadEmail } from "@/lib/mail/send";
import { rateLimit } from "@/lib/rate-limit";
import { ZodError } from "zod"; // FONTOS: Ezt importálni kell a típusellenőrzéshez

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // 1. Rate Limit check -> 429
    const rl = rateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Túl sok kérés. Próbáld később." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Validation check (ez dobhat ZodErrort)
    const parsed = leadSchema.parse(body);

    // Bot védelem (Honeypot)
    if (parsed.website && parsed.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // 3. Email sending (ez dobhat egyéb hibát, pl. Resend API timeout)
    await sendLeadEmail(parsed);

    return NextResponse.json({ ok: true });

  } catch (err: any) {
    console.error("LEAD ERROR:", err);

    // ESET 1: Zod validációs hiba (kliens küldött rossz adatot) -> 400
    if (err instanceof ZodError) {
      return NextResponse.json(
        { ok: false, error: "Hibás adatok. Kérlek ellenőrizd a kitöltést." },
        { status: 400 }
      );
    }

    // ESET 2: JSON parse hiba (pl. üres body vagy rossz szintaxis) -> 400
    if (err instanceof SyntaxError) {
         return NextResponse.json(
            { ok: false, error: "Hibás kérés formátum." },
            { status: 400 }
        );
    }

    // ESET 3: Minden más (Szerver hiba, Resend hiba, Auth hiba) -> 500
    return NextResponse.json(
      { ok: false, error: "Belső hiba történt az email küldésekor." },
      { status: 500 }
    );
  }
}