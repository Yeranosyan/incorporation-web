import { afterEach, describe, expect, it, vi } from "vitest";
import handler from "../api/contact.js";

type Sent = { url: string; init: { headers: Record<string, string>; body: string } };

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  message: "We need a customer quoting portal.",
  website: "",
  elapsedMs: 12000,
};

const invoke = (request: { method?: string; body?: unknown }) =>
  new Promise<{ status: number; body: { ok: boolean; error?: string } }>((resolve) => {
    handler(request, {
      setHeader: () => {},
      status: (status: number) => ({ json: (body: { ok: boolean; error?: string }) => resolve({ status, body }) }),
    });
  });

const configure = () => {
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("CONTACT_REQUEST_FROM", "Onecodio <web@onecodio.com>");
  vi.stubEnv("CONTACT_REQUEST_TO", "office@onecodio.com");
};

const captureSend = () => {
  const sent: Sent[] = [];
  vi.stubGlobal("fetch", async (url: string, init: Sent["init"]) => {
    sent.push({ url, init });
    return { ok: true, status: 200 };
  });
  return sent;
};

describe("deployed contact function", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("loads as a self-contained module with no unresolved imports", () => {
    expect(typeof handler).toBe("function");
  });

  it("allows only POST", async () => {
    expect(await invoke({ method: "GET" })).toEqual({
      status: 405,
      body: { ok: false, error: "method_not_allowed" },
    });
  });

  it("rejects an invalid payload without sending", async () => {
    configure();
    const sent = captureSend();
    expect(await invoke({ method: "POST", body: { ...valid, email: "not-an-email" } })).toEqual({
      status: 400,
      body: { ok: false, error: "invalid_request" },
    });
    expect(sent).toHaveLength(0);
  });

  it("sends the enquiry through Resend", async () => {
    configure();
    const sent = captureSend();
    expect(await invoke({ method: "POST", body: valid })).toEqual({ status: 200, body: { ok: true } });

    const [{ url, init }] = sent;
    const payload = JSON.parse(init.body);
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test");
    expect(payload).toMatchObject({ to: "office@onecodio.com", reply_to: "ada@example.com" });
    expect(payload.subject).toBe("Website enquiry — Ada Lovelace");
  });

  it("parses a string body as JSON", async () => {
    configure();
    const sent = captureSend();
    expect(await invoke({ method: "POST", body: JSON.stringify(valid) })).toEqual({ status: 200, body: { ok: true } });
    expect(sent).toHaveLength(1);
  });
});
