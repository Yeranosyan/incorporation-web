import { describe, expect, it } from "vitest";
import { CONTACT_FIELDS, isLikelyBot, parseContact, validateContact } from "./contactContract";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "",
  message: "We need a customer quoting portal.",
};

describe("validateContact", () => {
  it("accepts a complete message without an optional company", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires name, email and message", () => {
    expect(validateContact({})).toEqual({ name: "required", email: "required", message: "required" });
  });

  it("treats whitespace-only values as missing", () => {
    expect(validateContact({ ...valid, name: "   " })).toEqual({ name: "required" });
  });

  it("rejects a malformed email address", () => {
    expect(validateContact({ ...valid, email: "ada@example" })).toEqual({ email: "email" });
  });

  it("rejects values longer than the field limit", () => {
    const company = "x".repeat(CONTACT_FIELDS.company.maxLength + 1);
    expect(validateContact({ ...valid, company })).toEqual({ company: "tooLong" });
  });
});

describe("parseContact", () => {
  it("returns trimmed fields for a valid payload and drops unknown keys", () => {
    expect(parseContact({ ...valid, name: "  Ada Lovelace  ", extra: "ignored" })).toEqual(valid);
  });

  it("returns null for invalid or non-object input", () => {
    expect(parseContact({ ...valid, email: "" })).toBeNull();
    expect(parseContact(null)).toBeNull();
    expect(parseContact("text")).toBeNull();
  });
});

describe("isLikelyBot", () => {
  it("flags a filled honeypot field", () => {
    expect(isLikelyBot({ ...valid, website: "https://spam.example" })).toBe(true);
  });

  it("flags a submission completed faster than a person can type", () => {
    expect(isLikelyBot({ ...valid, elapsedMs: 400 })).toBe(true);
  });

  it("accepts a normal submission", () => {
    expect(isLikelyBot({ ...valid, website: "", elapsedMs: 12000 })).toBe(false);
  });
});
