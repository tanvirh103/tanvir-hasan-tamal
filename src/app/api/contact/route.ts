import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Contact form endpoint. Runs on the server (Vercel Node.js runtime), so the Gmail App Password
// never reaches the browser. Required environment variables:
//   GMAIL_USER          the Gmail address that sends the mail
//   GMAIL_APP_PASSWORD  a Google App Password for that account (2-Step Verification must be on)
// Optional: CONTACT_TO (where messages are delivered; defaults to GMAIL_USER).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS = { name: 100, email: 150, subject: 150, message: 5000 };
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 16 * 1024;

// Best-effort limit per server instance. Serverless instances are recycled, so this slows casual
// abuse rather than stopping a determined attacker.
const recentRequests = new Map<string, number[]>();
let transporter: Transporter | undefined;

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status });
}

function getTransporter(): Transporter {
  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });
  return transporter;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentRequests.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  recentRequests.set(ip, recent);
  return recent.length > RATE_MAX_REQUESTS;
}

/** Removes line breaks so user input cannot inject extra mail headers. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function validate(fields: { name: string; email: string; subject: string; message: string }) {
  if (fields.name.length < 2 || fields.name.length > LIMITS.name) return "Please enter your name.";
  if (!EMAIL_PATTERN.test(fields.email) || fields.email.length > LIMITS.email)
    return "Please enter a valid email address.";
  if (fields.subject.length > LIMITS.subject) return "The subject is too long.";
  if (fields.message.length < 10 || fields.message.length > LIMITS.message)
    return "Please write a message of 10 to 5000 characters.";
  return null;
}

export async function POST(request: Request) {
  // Only the site's own pages may use this endpoint (blocks cross-site form posts).
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return json({ success: false, message: "Origin not allowed." }, 403);
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("Contact form is missing GMAIL_USER or GMAIL_APP_PASSWORD");
    return json({ success: false, message: "The mail service is not configured." }, 500);
  }

  if (isRateLimited(clientIp(request))) {
    return json({ success: false, message: "Too many messages. Please try again later." }, 429);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ success: false, message: "The message is too large." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw || "{}");
  } catch {
    return json({ success: false, message: "Invalid request body." }, 400);
  }

  // Honeypot: real visitors never fill this field, so pretend success and send nothing.
  if (body._honey) return json({ success: true }, 200);

  const fields = {
    name: singleLine(String(body.name ?? "")),
    email: singleLine(String(body.email ?? "")),
    subject: singleLine(String(body.subject ?? "")),
    message: String(body.message ?? "").trim(),
  };
  const problem = validate(fields);
  if (problem) return json({ success: false, message: problem }, 400);

  const recipient = (process.env.CONTACT_TO || process.env.GMAIL_USER || "").trim();
  if (!EMAIL_PATTERN.test(recipient)) {
    console.error(`CONTACT_TO (or GMAIL_USER) is not a valid email address: "${recipient}"`);
    return json({ success: false, message: "The mail service is not configured." }, 500);
  }

  const subject = fields.subject
    ? `Portfolio: ${fields.subject} — from ${fields.name}`
    : `Portfolio message from ${fields.name}`;

  try {
    await getTransporter().sendMail({
      from: `"${fields.name.replace(/"/g, "")} Portfolio Message" <${process.env.GMAIL_USER}>`,
      to: recipient,
      replyTo: `${fields.name.replace(/[<>"]/g, "")} <${fields.email}>`,
      subject,
      text: `From: ${fields.name} <${fields.email}>\n\n${fields.message}`,
    });
    return json({ success: true }, 200);
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return json({ success: false, message: "The message could not be sent." }, 500);
  }
}
