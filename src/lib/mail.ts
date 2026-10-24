import nodemailer, { type Transporter } from "nodemailer";

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  budget: string;
  interests: string[];
  message: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

/**
 * Reads SMTP settings from the environment. Returns null when the mailbox has
 * not been configured, so callers can decide what to do rather than failing
 * with a connection error.
 */
function readConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.ENQUIRY_TO ?? "miru@madvertize.com";

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);

  return {
    host,
    port,
    // Port 465 is implicit TLS; 587 and 25 upgrade with STARTTLS.
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465,
    user,
    pass,
    // Most hosts only allow sending as the authenticated mailbox.
    from: process.env.SMTP_FROM ?? user,
    to,
  };
}

export function isMailConfigured() {
  return readConfig() !== null;
}

let transport: Transporter | null = null;

function getTransport(config: SmtpConfig) {
  transport ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });

  return transport;
}

export async function sendEnquiryEmail(enquiry: Enquiry) {
  const config = readConfig();
  if (!config) {
    throw new Error("SMTP is not configured — see .env.example");
  }

  const interests = enquiry.interests.length
    ? enquiry.interests.join(", ")
    : "Not specified";
  const rows: Array<[string, string]> = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Company", enquiry.company || "Not given"],
    ["Budget", enquiry.budget || "Not given"],
    ["Interested in", interests],
  ];

  await getTransport(config).sendMail({
    from: { name: "Madvertize site", address: config.from },
    to: config.to,
    replyTo: { name: enquiry.name, address: enquiry.email },
    subject: `New enquiry — ${enquiry.name}${
      enquiry.company ? ` (${enquiry.company})` : ""
    }`,
    text: [
      ...rows.map(([label, value]) => `${label}: ${value}`),
      "",
      enquiry.message,
    ].join("\n"),
    html: [
      '<div style="font-family:system-ui,sans-serif;line-height:1.6">',
      "<h2 style=\"margin:0 0 16px\">New enquiry from the website</h2>",
      '<table cellpadding="0" cellspacing="0" style="margin-bottom:20px">',
      ...rows.map(
        ([label, value]) =>
          `<tr><td style="padding:2px 16px 2px 0;color:#666">${label}</td>` +
          `<td style="padding:2px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
      ),
      "</table>",
      `<p style="white-space:pre-wrap;margin:0">${escapeHtml(enquiry.message)}</p>`,
      "</div>",
    ].join(""),
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
