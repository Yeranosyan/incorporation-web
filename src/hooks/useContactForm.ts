import { useRef, useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import { submitContact } from "@/lib/contactApi";
import type { ContactFields, ContactMeta } from "@/lib/contactApi";
import { CONTACT_FIELD_NAMES, validateContact } from "@/lib/contactContract";
import type { ContactErrors } from "@/lib/contactContract";

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
};
export type ContactSubmit = (fields: ContactFields, meta: ContactMeta) => Promise<void>;
export type ContactFormOptions = {
  onSuccess?: (fields: ContactFields) => void;
  submit?: ContactSubmit;
};
export type ContactStatus = "idle" | "submitting" | "error";
export type ContactField = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const EMPTY_VALUES: ContactValues = { name: "", email: "", company: "", message: "", website: "" };

const ALL_TOUCHED = Object.fromEntries(CONTACT_FIELD_NAMES.map((name) => [name, true]));

export const useContactForm = ({ onSuccess, submit = submitContact }: ContactFormOptions = {}) => {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<ContactStatus>("idle");
  const startedAt = useRef<number | null>(null);

  const errors = validateContact(values);
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([name]) => touched[name]),
  ) as ContactErrors;

  const handleChange = (event: ContactField) => {
    const { name, value } = event.target;
    startedAt.current ??= Date.now();
    setValues((current) => ({ ...current, [name]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    setTouched(ALL_TOUCHED);

    const firstInvalid = CONTACT_FIELD_NAMES.find((name) => errors[name]);
    if (firstInvalid) {
      const field = event.currentTarget.elements.namedItem(firstInvalid);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    const { website, ...fields } = values;
    setStatus("submitting");

    try {
      await submit(fields, { website, elapsedMs: Date.now() - (startedAt.current ?? Date.now()) });
      setValues(EMPTY_VALUES);
      setTouched({});
      setStatus("idle");
      startedAt.current = null;
      onSuccess?.(fields);
    } catch {
      setStatus("error");
    }
  };

  return { values, errors: visibleErrors, status, handleChange, handleBlur, handleSubmit };
};
