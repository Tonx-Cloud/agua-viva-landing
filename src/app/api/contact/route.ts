import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ─── Configuração SMTP (Gmail) ─────────────────────────── */
const SMTP_USER = process.env.SMTP_USER!;           // hiltonsf@gmail.com
const SMTP_PASS = process.env.SMTP_PASS!;           // App Password
const EMAIL_TO  = process.env.EMAIL_TO  || SMTP_USER;
const EMAIL_CC  = process.env.EMAIL_CC  || "ancartor@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

/* ─── Campos obrigatórios ──────────────────────────────── */
const REQUIRED = ["name", "email", "message"] as const;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 2000);
}

function escapeHtml(str: string): string {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honey-pot anti-spam
    if (body._honey) {
      return NextResponse.json({ ok: true }); // silently ignore bots
    }

    // Validar campos obrigatórios
    for (const field of REQUIRED) {
      if (!sanitize(body[field])) {
        return NextResponse.json(
          { error: `Campo obrigatório: ${field}` },
          { status: 400 }
        );
      }
    }

    const name    = escapeHtml(sanitize(body.name));
    const email   = escapeHtml(sanitize(body.email));
    const city    = escapeHtml(sanitize(body.city)) || "(não informado)";
    const message = escapeHtml(sanitize(body.message));

    const htmlBody = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #1a3a5c; border-bottom: 2px solid #d4a843; padding-bottom: 8px;">
          📖 Novo Pedido — Livro Água Viva
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #1a3a5c; border-bottom: 1px solid #eee; width: 130px;">Nome</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #1a3a5c; border-bottom: 1px solid #eee;">E-mail</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              <a href="mailto:${email}">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #1a3a5c; border-bottom: 1px solid #eee;">Cidade/UF</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${city}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #1a3a5c; vertical-align: top;">Mensagem</td>
            <td style="padding: 10px; white-space: pre-line;">${message}</td>
          </tr>
        </table>
        <p style="margin-top: 24px; font-size: 12px; color: #888;">
          Enviado via agua-viva-landing.vercel.app
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Livro Água Viva" <${SMTP_USER}>`,
      to: EMAIL_TO,
      cc: EMAIL_CC || undefined,
      replyTo: email,
      subject: `Pedido — Livro Água Viva — ${name}`,
      html: htmlBody,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Erro ao enviar e-mail:", err);
    return NextResponse.json(
      { error: "Falha ao enviar. Tente novamente." },
      { status: 500 }
    );
  }
}
