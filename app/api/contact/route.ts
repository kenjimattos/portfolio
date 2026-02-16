import { Resend } from "resend";
import { NextResponse } from "next/server";

// Rate limiting em memória
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 3; // máximo de requests por janela
const RATE_LIMIT_CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutos
const RATE_LIMIT_ENTRY_TTL = 10 * 60 * 1000; // 10 minutos sem atividade
const MAX_TRACKED_CLIENTS = 10_000;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RateLimitEntry = {
  count: number;
  windowStart: number;
  lastSeen: number;
};

const requestLog = new Map<string, RateLimitEntry>();
let lastCleanupAt = 0;

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

function cleanupRateLimitStore(now: number) {
  const shouldCleanupByTime = now - lastCleanupAt >= RATE_LIMIT_CLEANUP_INTERVAL;
  const shouldCleanupBySize = requestLog.size > MAX_TRACKED_CLIENTS;

  if (!shouldCleanupByTime && !shouldCleanupBySize) return;

  for (const [clientId, entry] of requestLog) {
    if (now - entry.lastSeen > RATE_LIMIT_ENTRY_TTL) {
      requestLog.delete(clientId);
    }
  }

  if (requestLog.size > MAX_TRACKED_CLIENTS) {
    const oldestEntries = [...requestLog.entries()]
      .sort((a, b) => a[1].lastSeen - b[1].lastSeen)
      .slice(0, requestLog.size - MAX_TRACKED_CLIENTS);

    oldestEntries.forEach(([clientId]) => requestLog.delete(clientId));
  }

  lastCleanupAt = now;
}

function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  const vercelIp = request.headers
    .get("x-vercel-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  const ip = forwarded || realIp || cfIp || vercelIp;
  if (ip && ip !== "unknown") {
    return `ip:${ip}`;
  }

  const userAgent = request.headers.get("user-agent")?.trim() || "unknown-agent";
  const acceptLanguage =
    request.headers.get("accept-language")?.trim() || "unknown-language";

  // Fallback when the platform does not expose a client IP.
  return `fallback:${userAgent}|${acceptLanguage}`;
}

function getRateLimitStatus(clientId: string): {
  isLimited: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  cleanupRateLimitStore(now);
  const currentEntry = requestLog.get(clientId);

  if (!currentEntry || now - currentEntry.windowStart >= RATE_LIMIT_WINDOW) {
    requestLog.set(clientId, { count: 1, windowStart: now, lastSeen: now });
    return { isLimited: false, retryAfterSeconds: 0 };
  }

  if (currentEntry.count >= MAX_REQUESTS) {
    currentEntry.lastSeen = now;
    requestLog.set(clientId, currentEntry);
    const retryAfterMs = Math.max(
      RATE_LIMIT_WINDOW - (now - currentEntry.windowStart),
      0
    );
    return {
      isLimited: true,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  requestLog.set(clientId, {
    ...currentEntry,
    count: currentEntry.count + 1,
    lastSeen: now,
  });
  return { isLimited: false, retryAfterSeconds: 0 };
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
  const clientId = getClientIdentifier(request);
  const rateLimitStatus = getRateLimitStatus(clientId);

  if (rateLimitStatus.isLimited) {
    const response = NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
    response.headers.set("Retry-After", String(rateLimitStatus.retryAfterSeconds));
    return response;
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
