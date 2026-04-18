import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const requestsByIp = new Map<string, number[]>();

const PLACEHOLDER_VALUES = new Set([
  "your_gmail@gmail.com",
  "your_gmail_app_password",
]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function validatePayload(payload: ContactPayload) {
  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();

  const errors: ContactErrors = {};

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name should be at least 2 characters.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return { name, email, message, errors };
}

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return realIp?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recentRequests = (requestsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestsByIp.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestsByIp.set(ip, recentRequests);

  for (const [key, timestamps] of requestsByIp.entries()) {
    const active = timestamps.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
    );
    if (active.length === 0) {
      requestsByIp.delete(key);
    } else {
      requestsByIp.set(key, active);
    }
  }

  return false;
}

function createTransporter() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (
    !smtpHost ||
    !smtpPort ||
    !smtpUser ||
    !smtpPass ||
    PLACEHOLDER_VALUES.has(smtpUser) ||
    PLACEHOLDER_VALUES.has(smtpPass)
  ) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    secure: smtpSecure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function smtpErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);

  if (
    /EAUTH|535|Username and Password not accepted|Invalid login/i.test(message)
  ) {
    return "SMTP authentication failed. Check your Gmail address, app password, and 2-step verification.";
  }

  if (/ECONNREFUSED|ETIMEDOUT|ENOTFOUND/i.test(message)) {
    return "SMTP server could not be reached. Check SMTP_HOST and SMTP_PORT.";
  }

  return "Failed to send email. Please try again.";
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const payload = (await req.json()) as ContactPayload;
    const { name, email, message, errors } = validatePayload(payload);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "All fields are required.", errors },
        { status: 400 },
      );
    }

    const transporter = createTransporter();

    if (!transporter) {
      return NextResponse.json(
        {
          error:
            "Mail configuration is missing or still using placeholder values. Update SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, and SMTP_TO in .env.local.",
        },
        { status: 500 },
      );
    }

    const smtpFrom = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "";
    const smtpTo = process.env.SMTP_TO ?? "vineetsingh.dev@gmail.com";

    const senderMessageHtml = `
      <div style="font-family: sans-serif; max-width: 480px;">
        <h2 style="color: #E0005E;">New message from your portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="background:#f5f5f5; padding:12px; border-radius:8px;">${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      </div>
    `;

    try {
      await transporter.verify();

      await transporter.sendMail({
        from: `"${escapeHtml(name)}" <${smtpFrom}>`,
        to: smtpTo,
        replyTo: email,
        subject: `Portfolio Contact — ${name}`,
        html: senderMessageHtml,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      });

      const confirmationHtml = `
        <div style="font-family: sans-serif; max-width: 520px;">
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thanks for your message! I've received it and will get back to you within 24 hours.</p>
          <p>Here's a copy of what you sent:</p>
          <blockquote style="background:#f5f5f5; padding:12px; border-radius:8px;">'${escapeHtml(message).replace(/\n/g, "<br />")}'</blockquote>
          <p>Best,<br />Vineet Singh<br />vineetsingh.dev@gmail.com</p>
        </div>
      `;

      try {
        await transporter.sendMail({
          from: `"Vineet Singh" <${smtpFrom}>`,
          to: email,
          subject: `Thanks for reaching out, ${name}!`,
          html: confirmationHtml,
          text: [
            `Hi ${name},`,
            "",
            "Thanks for your message! I've received it and will get back to you within 24 hours.",
            "",
            "Here's a copy of what you sent:",
            `'${message}'`,
            "",
            "Best,",
            "Vineet Singh",
            "vineetsingh.dev@gmail.com",
          ].join("\n"),
        });
      } catch (confirmationError) {
        console.error("Confirmation email error:", confirmationError);
      }

      return NextResponse.json(
        { success: true, message: "Email sent successfully!" },
        { status: 200 },
      );
    } catch (smtpError) {
      console.error("SMTP Error:", smtpError);
      return NextResponse.json(
        { error: smtpErrorMessage(smtpError) },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again new." },
      { status: 500 },
    );
  }
}
