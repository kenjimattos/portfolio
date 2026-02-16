const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 3;
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

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

type ContactEmailPayload = {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};

type ContactEnv = {
  resendApiKey?: string;
  contactEmail?: string;
};

export type ContactHandlerRequest = {
  headers: Headers;
  json: () => Promise<unknown>;
};

export type ContactHandlerResponse = {
  status: number;
  body: Record<string, unknown>;
  headers?: Record<string, string>;
};

type ContactHandlerDependencies = {
  env: ContactEnv;
  sendEmail: (payload: ContactEmailPayload) => Promise<void>;
  now?: () => number;
};

export function createContactHandler({
  env,
  sendEmail,
  now = () => Date.now(),
}: ContactHandlerDependencies) {
  const requestLog = new Map<string, RateLimitEntry>();
  let lastCleanupAt = 0;

  function cleanupRateLimitStore(currentTime: number) {
    const shouldCleanupByTime =
      currentTime - lastCleanupAt >= RATE_LIMIT_CLEANUP_INTERVAL;
    const shouldCleanupBySize = requestLog.size > MAX_TRACKED_CLIENTS;

    if (!shouldCleanupByTime && !shouldCleanupBySize) return;

    for (const [clientId, entry] of requestLog) {
      if (currentTime - entry.lastSeen > RATE_LIMIT_ENTRY_TTL) {
        requestLog.delete(clientId);
      }
    }

    if (requestLog.size > MAX_TRACKED_CLIENTS) {
      const oldestEntries = [...requestLog.entries()]
        .sort((a, b) => a[1].lastSeen - b[1].lastSeen)
        .slice(0, requestLog.size - MAX_TRACKED_CLIENTS);

      oldestEntries.forEach(([clientId]) => requestLog.delete(clientId));
    }

    lastCleanupAt = currentTime;
  }

  function getClientIdentifier(headers: Headers): string {
    const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const realIp = headers.get("x-real-ip")?.trim();
    const cfIp = headers.get("cf-connecting-ip")?.trim();
    const vercelIp = headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();

    const ip = forwarded || realIp || cfIp || vercelIp;
    if (ip && ip !== "unknown") return `ip:${ip}`;

    const userAgent = headers.get("user-agent")?.trim() || "unknown-agent";
    const acceptLanguage =
      headers.get("accept-language")?.trim() || "unknown-language";

    return `fallback:${userAgent}|${acceptLanguage}`;
  }

  function getRateLimitStatus(clientId: string): {
    isLimited: boolean;
    retryAfterSeconds: number;
  } {
    const currentTime = now();
    cleanupRateLimitStore(currentTime);
    const currentEntry = requestLog.get(clientId);

    if (!currentEntry || currentTime - currentEntry.windowStart >= RATE_LIMIT_WINDOW) {
      requestLog.set(clientId, {
        count: 1,
        windowStart: currentTime,
        lastSeen: currentTime,
      });
      return { isLimited: false, retryAfterSeconds: 0 };
    }

    if (currentEntry.count >= MAX_REQUESTS) {
      currentEntry.lastSeen = currentTime;
      requestLog.set(clientId, currentEntry);
      const retryAfterMs = Math.max(
        RATE_LIMIT_WINDOW - (currentTime - currentEntry.windowStart),
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
      lastSeen: currentTime,
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

  return async function handleContactRequest(
    request: ContactHandlerRequest
  ): Promise<ContactHandlerResponse> {
    const clientId = getClientIdentifier(request.headers);
    const rateLimitStatus = getRateLimitStatus(clientId);

    if (rateLimitStatus.isLimited) {
      return {
        status: 429,
        body: { error: "Too many requests. Please try again later." },
        headers: { "Retry-After": String(rateLimitStatus.retryAfterSeconds) },
      };
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return { status: 400, body: { error: "Invalid request body" } };
    }

    const payload = validateContactPayload(body);
    if (!payload) {
      return { status: 400, body: { error: "Invalid form data" } };
    }

    const { name, email, message, website } = payload;

    if (website) {
      return { status: 200, body: { success: true } };
    }

    if (!env.resendApiKey) {
      return { status: 500, body: { error: "Email service not configured" } };
    }

    if (!isValidContactEmail(env.contactEmail)) {
      return { status: 500, body: { error: "Email recipient not configured" } };
    }

    try {
      await sendEmail({
        to: env.contactEmail,
        replyTo: email,
        subject: `Contato Portfolio de ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
      });
      return { status: 200, body: { success: true } };
    } catch {
      return { status: 500, body: { error: "Failed to send email" } };
    }
  };
}

