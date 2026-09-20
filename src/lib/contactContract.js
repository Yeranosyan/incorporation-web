export const CONTACT_ENDPOINT = "/api/contact";

export const CONTACT_MIN_FILL_MS = 3000;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const CONTACT_FIELDS = {
  name: { required: true, maxLength: 120 },
  email: { required: true, maxLength: 200, format: "email" },
  company: { required: false, maxLength: 160 },
  message: { required: true, maxLength: 4000 },
};

export const CONTACT_FIELD_NAMES = Object.keys(CONTACT_FIELDS);

const readText = (source, key) => (typeof source?.[key] === "string" ? source[key].trim() : "");

const fieldError = (name, value) => {
  const rule = CONTACT_FIELDS[name];
  if (!value) return rule.required ? "required" : null;
  if (value.length > rule.maxLength) return "tooLong";
  if (rule.format === "email" && !EMAIL_PATTERN.test(value)) return "email";
  return null;
};

export const validateContact = (values) =>
  Object.fromEntries(
    CONTACT_FIELD_NAMES.map((name) => [name, fieldError(name, readText(values, name))]).filter(
      ([, error]) => error,
    ),
  );

export const parseContact = (input) => {
  if (typeof input !== "object" || input === null) return null;
  if (Object.keys(validateContact(input)).length > 0) return null;
  return Object.fromEntries(CONTACT_FIELD_NAMES.map((name) => [name, readText(input, name)]));
};

export const isLikelyBot = (input) => {
  if (typeof input !== "object" || input === null) return false;
  if (readText(input, "website")) return true;
  return typeof input.elapsedMs === "number" && input.elapsedMs < CONTACT_MIN_FILL_MS;
};
