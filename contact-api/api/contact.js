// Contact form endpoint: receives the portfolio's contact form and sends it through Gmail SMTP.
// Deployed as a separate Vercel project (Root Directory = contact-api). Required environment:
//   GMAIL_USER          the Gmail address that sends (and receives) the messages
//   GMAIL_APP_PASSWORD  a Google App Password for that account (not your normal password)
//   ALLOWED_ORIGIN      the site allowed to call this API, e.g. https://tanvirh103.github.io
// Optional: CONTACT_TO (defaults to GMAIL_USER).
import nodemailer from "nodemailer";
const LIMITS = { name: 100, email: 150, subject: 150, message: 5000 };
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;

// Best-effort, per serverless instance. Enough to slow down casual abuse; use a shared store for strict limits.
const recentRequests = new Map();
let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
  }
  return transporter;
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return (
    (typeof forwarded === "string" ? forwarded.split(",")[0] : req.socket?.remoteAddress)?.trim() ??
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (recentRequests.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  recentRequests.set(ip, recent);
  return recent.length > RATE_MAX_REQUESTS;
}

/** Removes line breaks so user input cannot inject extra mail headers. */
function singleLine(value) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function validate(fields) {
  if (fields.name.length < 2 || fields.name.length > LIMITS.name) return "Please enter your name.";
  if (!EMAIL_PATTERN.test(fields.email) || fields.email.length > LIMITS.email)
    return "Please enter a valid email address.";
  if (fields.subject.length > LIMITS.subject) return "The subject is too long.";
  if (fields.message.length < 10 || fields.message.length > LIMITS.message)
    return "Please write a message of 10 to 5000 characters.";
  return null;
}

function setCors(req, res, allowedOrigin) {
  if (req.headers.origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  setCors(req, res, allowedOrigin);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")
    return res.status(405).json({ success: false, message: "Method not allowed." });
  if (!allowedOrigin || req.headers.origin !== allowedOrigin) {
    return res.status(403).json({ success: false, message: "Origin not allowed." });
  }
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("Contact API is missing GMAIL_USER or GMAIL_APP_PASSWORD");
    return res.status(500).json({ success: false, message: "The mail service is not configured." });
  }
  if (isRateLimited(clientIp(req))) {
    return res
      .status(429)
      .json({ success: false, message: "Too many messages. Please try again later." });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});

  // Honeypot: real visitors never fill this field, so pretend success and send nothing.
  if (body._honey) return res.status(200).json({ success: true });

  const fields = {
    name: singleLine(String(body.name ?? "")),
    email: singleLine(String(body.email ?? "")),
    subject: singleLine(String(body.subject ?? "")),
    message: String(body.message ?? "").trim(),
  };
  const problem = validate(fields);
  if (problem) return res.status(400).json({ success: false, message: problem });

  const subject = fields.subject
    ? `Portfolio: ${fields.subject} — from ${fields.name}`
    : `Portfolio message from ${fields.name}`;

  const recipient = (process.env.CONTACT_TO || process.env.GMAIL_USER || "").trim();
  if (!EMAIL_PATTERN.test(recipient)) {
    console.error(`CONTACT_TO (or GMAIL_USER) is not a valid email address: "${recipient}"`);
    return res.status(500).json({ success: false, message: "The mail service is not configured." });
  }

  try {
    await getTransporter().sendMail({
      from: `"${fields.name.replace(/"/g, "")} via Portfolio" <${process.env.GMAIL_USER}>`,
      to: recipient,
      replyTo: `${fields.name.replace(/[<>"]/g, "")} <${fields.email}>`,
      subject,
      text: `From: ${fields.name} <${fields.email}>\n\n${fields.message}`,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return res.status(500).json({ success: false, message: "The message could not be sent." });
  }
}
