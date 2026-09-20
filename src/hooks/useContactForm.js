import { useRef, useState } from "react";
import { submitContact } from "@/lib/contactApi";
import { CONTACT_FIELD_NAMES, validateContact } from "@/lib/contactContract";

const EMPTY_VALUES = { name: "", email: "", company: "", message: "", website: "" };

const ALL_TOUCHED = Object.fromEntries(CONTACT_FIELD_NAMES.map((name) => [name, true]));

export const useContactForm = ({ onSuccess, submit = submitContact } = {}) => {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const startedAt = useRef(null);

  const errors = validateContact(values);
  const visibleErrors = Object.fromEntries(Object.entries(errors).filter(([name]) => touched[name]));

  const handleChange = (event) => {
    const { name, value } = event.target;
    startedAt.current ??= Date.now();
    setValues((current) => ({ ...current, [name]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;
    setTouched(ALL_TOUCHED);

    const firstInvalid = CONTACT_FIELD_NAMES.find((name) => errors[name]);
    if (firstInvalid) {
      event.currentTarget.elements.namedItem(firstInvalid)?.focus();
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
