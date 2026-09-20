import { Buffer } from "node:buffer";
import { CONTACT_ENDPOINT } from "../src/lib/contactContract.js";
import { handleContactRequest, readContactConfig } from "./contact.js";

const MAX_BODY_BYTES = 32 * 1024;

const readJsonBody = (request) =>
  new Promise((resolve) => {
    let raw = "";
    let size = 0;
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      size += Buffer.byteLength(chunk);
      if (size <= MAX_BODY_BYTES) raw += chunk;
    });
    request.on("end", () => {
      if (size > MAX_BODY_BYTES) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(null);
      }
    });
    request.on("error", () => resolve(null));
  });

export const contactDevPlugin = (env) => {
  const attach = (server) => {
    server.middlewares.use(CONTACT_ENDPOINT, async (request, response, next) => {
      if (request.method !== "POST") {
        next();
        return;
      }
      const { status, body } = await handleContactRequest(await readJsonBody(request), readContactConfig(env), {
        allowUnsentWithoutKey: true,
      });
      response.statusCode = status;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(body));
    });
  };

  return {
    name: "onecodio-contact-endpoint",
    configureServer: attach,
    configurePreviewServer: attach,
  };
};
