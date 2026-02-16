import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  createContactHandler,
  type ContactHandlerRequest,
} from "./handler";

const handleContactRequest = createContactHandler({
  env: {
    resendApiKey: process.env.RESEND_API_KEY,
    contactEmail: process.env.CONTACT_EMAIL,
  },
  sendEmail: async ({ to, replyTo, subject, text }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      replyTo,
      subject,
      text,
    });
  },
});

export async function POST(request: Request) {
  const result = await handleContactRequest(request as ContactHandlerRequest);
  const response = NextResponse.json(result.body, { status: result.status });

  if (result.headers) {
    Object.entries(result.headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  return response;
}
