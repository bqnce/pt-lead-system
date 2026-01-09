import { Resend } from "resend";
import { LeadPayload } from "@/lib/validation/lead";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadEmail(lead: LeadPayload) {
  const html = `
    <h2>Új jelentkező – ${lead.coachName}</h2>
    <p><strong>Név:</strong> ${lead.name}</p>
    <p><strong>Elérhetőség:</strong> ${lead.contact}</p>
    <p><strong>Cél:</strong> ${lead.goal ?? "-"}</p>
    <p><strong>Edzés múlt:</strong> ${lead.experience ?? "-"}</p>
    <p><strong>Elérhetőség ideje:</strong> ${lead.availability ?? "-"}</p>
    <p><strong>Üzenet:</strong><br/>${lead.message ?? "-"}</p>
    <hr/>
    <p>Oldal: /${lead.slug}</p>
  `;

  await resend.emails.send({
    from: "Lead <onboarding@resend.dev>",
    to: lead.emailTo,
    subject: `Új jelentkező – ${lead.name}`,
    html,
  });
}
