export type ContactFieldName = "name" | "email" | "company" | "message";
export type ContactRule = { required: boolean; maxLength: number; format?: "email" };
export type Contact = Record<ContactFieldName, string>;
export type ContactError = "required" | "tooLong" | "email";
export type ContactErrors = Partial<Record<ContactFieldName, ContactError>>;

export const CONTACT_ENDPOINT = "/api/contact";

export const CONTACT_MIN_FILL_MS = 3000;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const CONTACT_FIELDS: Record<ContactFieldName, ContactRule> = {
  name: { required: true, maxLength: 120 },
  email: { required: true, maxLength: 200, format: "email" },
  company: { required: false, maxLength: 160 },
  message: { required: true, maxLength: 4000 },
};

export const CONTACT_FIELD_NAMES = Object.keys(CONTACT_FIELDS) as ContactFieldName[];

const readText = (source: unknown, key: string) => {
  const value = (source as Record<string, unknown> | null)?.[key];
  return typeof value === "string" ? value.trim() : "";
};

const fieldError = (name: ContactFieldName, value: string): ContactError | null => {
  const rule = CONTACT_FIELDS[name];
  if (!value) return rule.required ? "required" : null;
  if (value.length > rule.maxLength) return "tooLong";
  if (rule.format === "email" && !EMAIL_PATTERN.test(value)) return "email";
  return null;
};

export const validateContact = (values: unknown) =>
  Object.fromEntries(
    CONTACT_FIELD_NAMES.map((name) => [name, fieldError(name, readText(values, name))]).filter(
      ([, error]) => error,
    ),
  ) as ContactErrors;

export const parseContact = (input: unknown): Contact | null => {
  if (typeof input !== "object" || input === null) return null;
  if (Object.keys(validateContact(input)).length > 0) return null;
  return Object.fromEntries(CONTACT_FIELD_NAMES.map((name) => [name, readText(input, name)])) as Contact;
};

export const isLikelyBot = (input: unknown) => {
  if (typeof input !== "object" || input === null) return false;
  if (readText(input, "website")) return true;
  const { elapsedMs } = input as { elapsedMs?: unknown };
  return typeof elapsedMs === "number" && elapsedMs < CONTACT_MIN_FILL_MS;
};
