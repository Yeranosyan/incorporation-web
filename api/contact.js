import process from "node:process";
import { handleContactRequest, readContactConfig } from "../server/contact.js";

const parseBody = (body) => {
  if (typeof body !== "string") return body;
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};

export default async function handler(request, response) {
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
