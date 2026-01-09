import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation/lead";
import { sendLeadEmail } from "@/lib/mail/send";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    const rl = rateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Túl sok kérés. Próbáld később." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = leadSchema.parse(body);

    if (parsed.website && parsed.website.trim().length > 0) {
      // bot gyanú - úgy csinálunk, mintha oké lenne
      return NextResponse.json({ ok: true });
    }

    await sendLeadEmail(parsed);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("LEAD ERROR:", err);

    return NextResponse.json(
      { ok: false, error: "Hibás adatok vagy email küldési hiba." },
      { status: 400 }
    );
  }
}
