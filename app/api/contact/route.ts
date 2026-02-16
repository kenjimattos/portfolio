import { Resend } from "resend";
import { NextResponse } from "next/server";

// Rate limiting em memória
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 3; // máximo de requests por janela
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const requestLog = new Map<string, number[]>();
type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) || [];

  // Remove timestamps antigos (fora da janela)
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (recentTimestamps.length >= MAX_REQUESTS) {
    return true;
  }

  // Adiciona timestamp atual
  recentTimestamps.push(now);
  requestLog.set(ip, recentTimestamps);

  return false;
}

function toTrimmedString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value.trim();
}

function validateContactPayload(input: unknown): ContactPayload | null {
  if (!input || typeof input !== "object") return null;

  const payload = input as Record<string, unknown>;
  const name = toTrimmedString(payload.name);
  const email = toTrimmedString(payload.email);
  const message = toTrimmedString(payload.message);
  const website = toTrimmedString(payload.website);

  if (!name || !email || !message) return null;
  if (name.length > MAX_NAME_LENGTH) return null;
  if (email.length > MAX_EMAIL_LENGTH) return null;
  if (message.length > MAX_MESSAGE_LENGTH) return null;
  if (!emailRegex.test(email)) return null;

  return { name, email, message, website: website || undefined };
}

function isValidContactEmail(email: string | undefined): email is string {
  if (!email) return false;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  // Obtém IP do cliente
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  // Verifica rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const payload = validateContactPayload(body);
  if (!payload) {
    return NextResponse.json(
      { error: "Invalid form data" },
      { status: 400 }
    );
  }

  const { name, email, message, website } = payload;

  // Honeypot check - se preenchido, é bot
  if (website) {
    // Retorna sucesso falso para não alertar o bot
    return NextResponse.json({ success: true });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  if (!isValidContactEmail(process.env.CONTACT_EMAIL)) {
    console.error("CONTACT_EMAIL is missing or invalid");
    return NextResponse.json(
      { error: "Email recipient not configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const recipientEmail = process.env.CONTACT_EMAIL;

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: email,
      subject: `Contato Portfolio de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
