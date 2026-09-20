import { describe, expect, it } from "vitest";
import { buildContactEmail } from "./contactEmail.js";

const contact = {
  name: "Ada Lovelace",
  email: "ada+quotes@example.com",
  company: "",
  message: "We need a customer quoting portal.\n\nCan we talk next week?",
};

describe("buildContactEmail", () => {
  it("opens the inbox preview with the message on one line", () => {
    const { html } = buildContactEmail(contact);
    expect(html).toContain("We need a customer quoting portal. Can we talk next week?");
  });

  it("shortens a long message in the inbox preview", () => {
    const { html } = buildContactEmail({ ...contact, message: "word ".repeat(100) });
    expect(html).toMatch(/(word ){27}word…/);
  });

  it("marks a missing company as not provided", () => {
    const { html, text } = buildContactEmail(contact);
    expect(text).toContain("Company: Not provided");
    expect(html).toContain("Not provided");
  });

  it("replies to the visitor with a prefilled subject", () => {
    const { html } = buildContactEmail(contact);
    expect(html).toContain('href="mailto:ada%2Bquotes@example.com?subject=Re%3A%20Your%20enquiry%20to%20Onecodio"');
    expect(html).toContain("Reply to Ada");
  });

  it("escapes markup in every visitor field", () => {
    const { html } = buildContactEmail({
      name: "<b>Ada</b>",
      email: "ada@example.com",
      company: "<i>Engines</i>",
      message: "<script>alert(1)</script>",
    });
    expect(html).not.toMatch(/<(b|i|script)>/);
    expect(html).toContain("&lt;script&gt;");
  });
});
