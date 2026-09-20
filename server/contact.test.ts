import { describe, expect, it, vi } from "vitest";
import { RESEND_ENDPOINT, handleContactRequest, readContactConfig } from "./contact.ts";
import type { SendFetch } from "./contact.ts";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  message: "We need a customer quoting portal.",
  website: "",
  elapsedMs: 12000,
};

const config = { apiKey: "re_test", from: "Onecodio <web@onecodio.com>", to: "office@onecodio.com" };

const setup = (fetchResult = { ok: true, status: 200 }) => ({
  fetchImpl: vi.fn<SendFetch>().mockResolvedValue(fetchResult),
  logger: { info: vi.fn(), error: vi.fn() },
});

describe("readContactConfig", () => {
  it("reads the Resend key and the sender and recipient addresses", () => {
    expect(
      readContactConfig({ RESEND_API_KEY: "k", CONTACT_REQUEST_FROM: "from@x.com", CONTACT_REQUEST_TO: "to@x.com" }),
    ).toEqual({ apiKey: "k", from: "from@x.com", to: "to@x.com" });
  });
});

describe("handleContactRequest", () => {
  it("rejects an invalid payload", async () => {
    const deps = setup();
    const result = await handleContactRequest({ ...valid, email: "not-an-email" }, config, deps);
    expect(result).toEqual({ status: 400, body: { ok: false, error: "invalid_request" } });
    expect(deps.fetchImpl).not.toHaveBeenCalled();
  });

  it("accepts a likely bot submission without sending it", async () => {
    const deps = setup();
    const result = await handleContactRequest({ ...valid, website: "https://spam.example" }, config, deps);
    expect(result.status).toBe(200);
    expect(deps.fetchImpl).not.toHaveBeenCalled();
  });

  it("refuses to report success when the API key is missing in production", async () => {
    const deps = setup();
    const result = await handleContactRequest(valid, { ...config, apiKey: undefined }, deps);
    expect(result).toEqual({ status: 500, body: { ok: false, error: "not_configured" } });
    expect(deps.logger.error).toHaveBeenCalled();
  });

  it("accepts without sending in development when the API key is missing", async () => {
    const deps = setup();
    const result = await handleContactRequest(valid, { ...config, apiKey: undefined }, {
      ...deps,
      allowUnsentWithoutKey: true,
    });
    expect(result.status).toBe(200);
    expect(deps.fetchImpl).not.toHaveBeenCalled();
  });

  it("requires both sender and recipient addresses", async () => {
    const deps = setup();
    const result = await handleContactRequest(valid, { ...config, to: undefined }, deps);
    expect(result.body.error).toBe("not_configured");
  });

  it("sends the message through Resend with the visitor as the reply-to address", async () => {
    const deps = setup();
    const result = await handleContactRequest(valid, config, deps);
    expect(result).toEqual({ status: 200, body: { ok: true } });

    const [url, options] = deps.fetchImpl.mock.calls[0];
    const payload = JSON.parse(options.body);
    expect(url).toBe(RESEND_ENDPOINT);
    expect(options.headers.Authorization).toBe("Bearer re_test");
    expect(payload).toMatchObject({ from: config.from, to: config.to, reply_to: "ada@example.com" });
    expect(payload.subject).toBe("Website enquiry — Ada Lovelace");
    expect(payload.text).toContain("We need a customer quoting portal.");
  });

  it("escapes markup and strips control characters from the email", async () => {
    const deps = setup();
    await handleContactRequest({ ...valid, name: "Ada\r\nBcc: x@y.com <b>" }, config, deps);
    const payload = JSON.parse(deps.fetchImpl.mock.calls[0][1].body);
    expect(payload.subject).not.toMatch(/[\r\n]/);
    expect(payload.html).toContain("&lt;b&gt;");
    expect(payload.html).not.toContain("<b>");
  });

  it("reports a failed send when Resend rejects the email", async () => {
    const deps = setup({ ok: false, status: 422 });
    const result = await handleContactRequest(valid, config, deps);
    expect(result).toEqual({ status: 502, body: { ok: false, error: "send_failed" } });
  });
});
