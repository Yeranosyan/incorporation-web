import { isLikelyBot, parseContact } from "../src/lib/contactContract.ts";
import { buildContactEmail } from "./contactEmail.ts";

export type ContactEnv = Record<string, string | undefined>;
export type ContactConfig = { apiKey?: string; from?: string; to?: string };
export type SendInit = { method: string; headers: Record<string, string>; body: string };
export type SendFetch = (endpoint: string, init: SendInit) => Promise<{ ok: boolean; status: number }>;
export type ContactLogger = {
  info: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};
export type ContactOptions = {
  allowUnsentWithoutKey?: boolean;
  fetchImpl?: SendFetch;
  logger?: ContactLogger;
};
export type ContactResponse = { status: number; body: { ok: boolean; error?: string } };

export const RESEND_ENDPOINT = "https://api.resend.com/emails";

export const readContactConfig = (env: ContactEnv): ContactConfig => ({
  apiKey: env.RESEND_API_KEY,
  from: env.CONTACT_REQUEST_FROM,
  to: env.CONTACT_REQUEST_TO,
});

const respond = (status: number, body: ContactResponse["body"]): ContactResponse => ({ status, body });

export const handleContactRequest = async (
  rawBody: unknown,
  config: ContactConfig,
  { allowUnsentWithoutKey = false, fetchImpl = fetch, logger = console }: ContactOptions = {},
): Promise<ContactResponse> => {
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: config.to,
      reply_to: contact.email,
      ...buildContactEmail(contact),
    }),
  });

  if (!response.ok) {
    logger.error("[contact] Resend rejected the email", response.status);
    return respond(502, { ok: false, error: "send_failed" });
  }

  return respond(200, { ok: true });
};
