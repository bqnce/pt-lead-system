import { Resend } from "resend";
import { LeadPayload } from "@/lib/validation/lead";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Biztonsági segédfüggvény:
 * Kicseréli a veszélyes karaktereket, hogy ne lehessen HTML/Script kódot injektálni.
 */
function escapeHtml(unsafe: string | null | undefined): string {
  if (!unsafe) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendLeadEmail(lead: LeadPayload) {
  // 1. ADATOK TISZTÍTÁSA (Security)
  const safeName = escapeHtml(lead.name);
  const safeContact = escapeHtml(lead.contact);
  const safeGoal = escapeHtml(lead.goal || "Nincs megadva");
  const safeExperience = escapeHtml(lead.experience || "Nincs megadva");
  const safeAvailability = escapeHtml(lead.availability || "Nincs megadva");
  
  // A sortöréseket (<br>) csak az escape UTÁN tesszük be, hogy biztonságos legyen
  const safeMessage = escapeHtml(lead.message || "Nem hagyott üzenetet.")
    .replace(/\n/g, "<br/>");

  // Design változók
  const primaryColor = "#2563eb";
  const secondaryColor = "#4f46e5";
  const bgColor = "#f8fafc";
  const textColor = "#0f172a";
  const labelColor = "#94a3b8";

  // 2. PLAIN TEXT VERZIÓ (Deliverability)
  // Ez kritikus, hogy ne kerülj Spam-be!
  const textContent = `
ÚJ JELENTKEZÉS ÉRKEZETT!
------------------------
Program: ${lead.coachName}

Név: ${lead.name}
Elérhetőség: ${lead.contact}

Fő cél: ${lead.goal || "-"}
Tapasztalat: ${lead.experience || "-"}
Időbeosztás: ${lead.availability || "-"}

Üzenet:
${lead.message || "Nem hagyott üzenetet."}

------------------------
Forrás: /${lead.slug}
  `.trim();

  // 3. HTML VERZIÓ (A te szép designoddal)
  // Fontos: Itt már a 'safe...' változókat használjuk!
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: ${bgColor}; margin: 0; padding: 40px 20px; color: ${textColor}; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
          .header-bar { height: 6px; background: linear-gradient(to right, ${primaryColor}, ${secondaryColor}); }
          .content { padding: 40px; }
          .badge { display: inline-block; padding: 4px 12px; background: #eff6ff; color: ${primaryColor}; border-radius: 99px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 16px; }
          .title { font-size: 24px; font-weight: 900; margin: 0 0 8px 0; letter-spacing: -0.02em; }
          .subtitle { font-size: 14px; color: ${labelColor}; margin-bottom: 40px; font-weight: 600; }
          .data-grid { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
          .data-row { border-bottom: 1px solid #f1f5f9; }
          .data-label { padding: 16px 0; font-size: 10px; font-weight: 900; color: ${labelColor}; text-transform: uppercase; letter-spacing: 0.1em; width: 35%; }
          .data-value { padding: 16px 0; font-size: 15px; font-weight: 700; color: ${textColor}; }
          .message-box { background-color: #f8faff; border-radius: 16px; padding: 24px; border: 1px solid #eef2ff; }
          .message-label { font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
          .message-text { font-size: 15px; line-height: 1.6; color: #475569; font-weight: 500; margin: 0; }
          .footer { padding: 24px 40px; background-color: #fcfcfd; border-top: 1px solid #f1f5f9; text-align: center; }
          .footer-text { font-size: 11px; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.1em; }
          .link { color: ${primaryColor}; text-decoration: none; font-weight: 800; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header-bar"></div>
          <div class="content">
            <div class="badge">Új Érdeklődés</div>
            <h2 class="title">Jelentkezés érkezett</h2>
            <p class="subtitle">A ${lead.coachName} programra</p>
            
            <table class="data-grid">
              <tr class="data-row">
                <td class="data-label">Név</td>
                <td class="data-value">${safeName}</td>
              </tr>
              <tr class="data-row">
                <td class="data-label">Elérhetőség</td>
                <td class="data-value"><a href="mailto:${safeContact}" class="link">${safeContact}</a></td>
              </tr>
              <tr class="data-row">
                <td class="data-label">Fő cél</td>
                <td class="data-value">${safeGoal}</td>
              </tr>
              <tr class="data-row">
                <td class="data-label">Tapasztalat</td>
                <td class="data-value">${safeExperience}</td>
              </tr>
              <tr class="data-row">
                <td class="data-label">Időbeosztás</td>
                <td class="data-value">${safeAvailability}</td>
              </tr>
            </table>

            <div class="message-box">
              <div class="message-label">Bemutatkozás & Üzenet</div>
              <p class="message-text">${safeMessage}</p>
            </div>
          </div>
          <div class="footer">
            <span class="footer-text">Forrás: <a href="https://yourdomain.com/${lead.slug}" class="link">/${lead.slug}</a></span>
          </div>
        </div>
      </body>
    </html>
  `;

  await resend.emails.send({
    from: "Lead <onboarding@resend.dev>", // Élesben: sajat-domain@pl.com
    to: lead.emailTo,
    replyTo: lead.contact, // Így a "Válasz" gomb rögtön az ügyfélnek megy
    subject: `🚀 Új jelentkező: ${lead.name}`,
    text: textContent, // Plain text verzió
    html: htmlContent, // HTML verzió
  });
}