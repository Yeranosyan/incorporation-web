import { describe, expect, it, vi } from "vitest";
import { submitContact } from "./contactApi";
import type { ContactFetch } from "./contactApi";
import { CONTACT_ENDPOINT } from "./contactContract";

const fields = { name: "Ada Lovelace", email: "ada@example.com", company: "", message: "Hello" };
const meta = { website: "", elapsedMs: 9000 };

const responding = (status: number, body: unknown) =>
  vi.fn<ContactFetch>().mockResolvedValue({ ok: status >= 200 && status < 300, status, json: async () => body });

describe("submitContact", () => {
  it("posts the fields and metadata as JSON to the contact endpoint", async () => {
    const fetchImpl = responding(200, { ok: true });
    await submitContact(fields, meta, fetchImpl);
    const [url, options] = fetchImpl.mock.calls[0];
    expect(url).toBe(CONTACT_ENDPOINT);
    expect(options.method).toBe("POST");
    expect(JSON.parse(String(options.body))).toEqual({ ...fields, ...meta });
  });

  it("throws the server error code when the request is rejected", async () => {
    await expect(submitContact(fields, meta, responding(502, { ok: false, error: "send_failed" }))).rejects.toThrow(
      "send_failed",
    );
  });

  it("throws when a successful status carries an unexpected body", async () => {
    await expect(submitContact(fields, meta, responding(200, null))).rejects.toThrow("status_200");
  });

  it("throws when the network request fails", async () => {
    const fetchImpl = vi.fn<ContactFetch>().mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(submitContact(fields, meta, fetchImpl)).rejects.toThrow("Failed to fetch");
  });
});
