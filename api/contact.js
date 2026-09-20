// server/handler.ts
import process from "node:process";

// src/lib/contactContract.ts
var CONTACT_MIN_FILL_MS = 3e3;
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var CONTACT_FIELDS = {
  name: { required: true, maxLength: 120 },
  email: { required: true, maxLength: 200, format: "email" },
  company: { required: false, maxLength: 160 },
  message: { required: true, maxLength: 4e3 }
};
var CONTACT_FIELD_NAMES = Object.keys(CONTACT_FIELDS);
var readText = (source, key) => {
  const value = source?.[key];
  return typeof value === "string" ? value.trim() : "";
};
var fieldError = (name, value) => {
  const rule = CONTACT_FIELDS[name];
  if (!value) return rule.required ? "required" : null;
  if (value.length > rule.maxLength) return "tooLong";
  if (rule.format === "email" && !EMAIL_PATTERN.test(value)) return "email";
  return null;
};
var validateContact = (values) => Object.fromEntries(
  CONTACT_FIELD_NAMES.map((name) => [name, fieldError(name, readText(values, name))]).filter(
    ([, error]) => error
  )
);
var parseContact = (input) => {
  if (typeof input !== "object" || input === null) return null;
  if (Object.keys(validateContact(input)).length > 0) return null;
  return Object.fromEntries(CONTACT_FIELD_NAMES.map((name) => [name, readText(input, name)]));
};
var isLikelyBot = (input) => {
  if (typeof input !== "object" || input === null) return false;
  if (readText(input, "website")) return true;
  const { elapsedMs } = input;
  return typeof elapsedMs === "number" && elapsedMs < CONTACT_MIN_FILL_MS;
};

// src/content/site.ts
var COMPANY = {
  name: "Onecodio Inc.",
  shortName: "Onecodio",
  tagline: "Custom Software Development & Digital Transformation",
  email: "office@onecodio.com",
  location: "Vancouver, British Columbia, Canada",
  coordinates: "49.2827\xB0 N \xB7 123.1207\xB0 W",
  copyright: "\xA9 2026 Onecodio Inc. All rights reserved."
};
var LINKS = {
  email: `mailto:${COMPANY.email}`,
  linkedin: "https://linkedin.com/company/onecodio",
  instagram: "https://www.instagram.com/onecodio/",
  cpqTeams: "https://www.cpqteams.com/",
  cpqSecurity: "https://www.cpqteams.com/security",
  cpqFaq: "https://www.cpqteams.com/faq",
  fea: "https://www.fea.org.uk/",
  feaProfile: "https://www.fea.org.uk/company/onecodio-inc?sid=1809179"
};

// server/contactEmail.ts
var SITE_URL = "https://www.onecodio.com";
var SITE_LABEL = "onecodio.com";
var REPLY_SUBJECT = `Re: Your enquiry to ${COMPANY.shortName}`;
var PREVIEW_LENGTH = 140;
var PREVIEW_FILLER = "&#847;&zwnj;&nbsp;".repeat(60);
var FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
var MONO = "ui-monospace,Menlo,Consolas,monospace";
var COLOR = {
  page: "#f2f2f0",
  card: "#ffffff",
  panel: "#f6f6f4",
  line: "#e8e8e6",
  ink: "#0e0e0e",
  muted: "#6f6f6e",
  subtle: "#9a9a98",
  accent: "#ff4709",
  accentTint: "#fff0ea"
};
var sanitizeHeader = (value) => Array.from(value, (char) => {
  const code = char.charCodeAt(0);
  return code < 32 || code === 127 ? " " : char;
}).join("").replace(/ {2,}/g, " ").trim();
var escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
var firstName = (name) => name.split(/\s+/)[0];
var previewOf = (message) => {
  const flat = message.replace(/\s+/g, " ").trim();
  return flat.length > PREVIEW_LENGTH ? `${flat.slice(0, PREVIEW_LENGTH).trimEnd()}\u2026` : flat;
};
var mailtoHref = (email, subject) => `mailto:${encodeURIComponent(email).replace("%40", "@")}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
var buildText = ({ name, email, company, message }) => [
  "New website enquiry",
  "",
  `From:    ${name}`,
  `Email:   ${email}`,
  `Company: ${company || "Not provided"}`,
  "",
  "Message:",
  message,
  "",
  "\u2014",
  `Sent from the contact form on ${SITE_LABEL}. Reply to this email to answer ${firstName(name)} directly.`
].join("\n");
var detailRow = (label, value) => `<tr>
<td class="detail-label" width="96" style="width:96px;padding:14px 0;border-bottom:1px solid ${COLOR.line};font-size:13px;color:${COLOR.muted};vertical-align:top">${label}</td>
<td style="padding:14px 0;border-bottom:1px solid ${COLOR.line};font-size:15px;color:${COLOR.ink};word-break:break-word">${value}</td>
</tr>`;
var buildHtml = ({ name, email, company, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const companyValue = company ? escapeHtml(company) : `<span style="color:${COLOR.subtle}">Not provided</span>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>New enquiry from ${safeName}</title>
<style>
@media (max-width: 520px) {
  .card { padding: 28px 20px !important; }
  .name { font-size: 24px !important; }
  .detail-label { width: 76px !important; }
}
</style>
</head>
<body style="margin:0;padding:0;background:${COLOR.page};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(previewOf(message))}${PREVIEW_FILLER}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.page}" style="background:${COLOR.page}">
<tr><td align="center" style="padding:32px 12px">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;font-family:${FONT}">

<tr><td style="padding:0 4px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:middle">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="32" height="32" align="center" bgcolor="${COLOR.ink}" style="width:32px;height:32px;border-radius:9px;background:${COLOR.ink};color:#ffffff;font-family:${MONO};font-size:13px;font-weight:700;line-height:32px">&gt;_</td>
<td style="padding-left:10px;font-size:16px;font-weight:700;letter-spacing:-0.01em;color:${COLOR.ink}">${COMPANY.shortName}</td>
</tr></table>
</td>
<td align="right" style="vertical-align:middle">
<span style="display:inline-block;padding:6px 12px;border-radius:999px;background:${COLOR.accentTint};color:${COLOR.accent};font-size:12px;font-weight:600;white-space:nowrap">&#9679;&nbsp; New enquiry</span>
</td>
</tr></table>
</td></tr>

<tr><td class="card" bgcolor="${COLOR.card}" style="background:${COLOR.card};border:1px solid ${COLOR.line};border-radius:20px;padding:36px 32px">
<p style="margin:0 0 6px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${COLOR.subtle}">From</p>
<h1 class="name" style="margin:0;font-size:28px;line-height:1.2;font-weight:700;letter-spacing:-0.02em;color:${COLOR.ink}">${safeName}</h1>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;border-top:1px solid ${COLOR.line}">
${detailRow("Email", `<a href="${escapeHtml(mailtoHref(email))}" style="color:${COLOR.ink};text-decoration:underline;text-decoration-color:${COLOR.accent};text-underline-offset:3px">${safeEmail}</a>`)}
${detailRow("Company", companyValue)}
</table>

<p style="margin:28px 0 10px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${COLOR.subtle}">Message</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td bgcolor="${COLOR.panel}" style="background:${COLOR.panel};border-radius:14px;padding:20px 22px;font-size:15px;line-height:1.65;color:${COLOR.ink};white-space:pre-wrap;word-break:break-word">${escapeHtml(message)}</td>
</tr></table>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px"><tr>
<td bgcolor="${COLOR.ink}" style="border-radius:999px;background:${COLOR.ink}">
<a href="${escapeHtml(mailtoHref(email, REPLY_SUBJECT))}" style="display:inline-block;padding:13px 24px;border-radius:999px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none">Reply to ${escapeHtml(firstName(name))} &rarr;</a>
</td>
</tr></table>
</td></tr>

<tr><td align="center" style="padding:20px 16px 0;font-size:12px;line-height:1.6;color:${COLOR.subtle}">
Sent from the contact form on <a href="${SITE_URL}" style="color:${COLOR.muted};text-decoration:none">${SITE_LABEL}</a><br>
Replying to this email goes straight to ${escapeHtml(firstName(name))}.
</td></tr>

</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</body>
</html>`;
};
var buildContactEmail = (contact) => ({
  subject: `Website enquiry \u2014 ${sanitizeHeader(contact.name)}`,
  text: buildText(contact),
  html: buildHtml(contact)
});

// server/contact.ts
var RESEND_ENDPOINT = "https://api.resend.com/emails";
var readContactConfig = (env) => ({
  apiKey: env.RESEND_API_KEY,
  from: env.CONTACT_REQUEST_FROM,
  to: env.CONTACT_REQUEST_TO
});
var respond = (status, body) => ({ status, body });
var handleContactRequest = async (rawBody, config, { allowUnsentWithoutKey = false, fetchImpl = fetch, logger = console } = {}) => {
  const contact = parseContact(rawBody);
  if (!contact) return respond(400, { ok: false, error: "invalid_request" });
  if (isLikelyBot(rawBody)) return respond(200, { ok: true });
  if (!config.apiKey) {
    if (allowUnsentWithoutKey) {
      logger.info("[contact] RESEND_API_KEY is not set; the message was accepted but not sent", contact);
      return respond(200, { ok: true });
    }
    logger.error("[contact] RESEND_API_KEY is not set; the message cannot be sent");
    return respond(500, { ok: false, error: "not_configured" });
  }
  if (!config.from || !config.to) {
    logger.error("[contact] CONTACT_REQUEST_FROM and CONTACT_REQUEST_TO must both be set");
    return respond(500, { ok: false, error: "not_configured" });
  }
  const response = await fetchImpl(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: config.from,
      to: config.to,
      reply_to: contact.email,
      ...buildContactEmail(contact)
    })
  });
  if (!response.ok) {
    logger.error("[contact] Resend rejected the email", response.status);
    return respond(502, { ok: false, error: "send_failed" });
  }
  return respond(200, { ok: true });
};

// server/handler.ts
var parseBody = (body) => {
  if (typeof body !== "string") return body;
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};
async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    response.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }
  try {
    const { status, body } = await handleContactRequest(parseBody(request.body), readContactConfig(process.env));
    response.status(status).json(body);
  } catch (error) {
    console.error("[contact] handler failed", error);
    response.status(500).json({ ok: false, error: "server_error" });
  }
}
export {
  handler as default
};
