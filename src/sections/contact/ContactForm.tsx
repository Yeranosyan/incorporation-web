import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { useId } from "react";
import type { ContactContent } from "@/content/contact";
import { useContactForm } from "@/hooks/useContactForm";
import type { ContactFields } from "@/lib/contactApi";
import { CONTACT_FIELDS } from "@/lib/contactContract";
import type { ContactFieldName } from "@/lib/contactContract";
import { formatTemplate } from "@/lib/format";
import { Button, Field } from "@/ui";

export type ContactFormContent = ContactContent["form"];
export type ContactFormProps = {
  form: ContactFormContent;
  onSent: (fields: ContactFields) => void;
  fallbackEmail: string;
};

export function ContactForm({ form, onSent, fallbackEmail }: ContactFormProps) {
  const idPrefix = useId();
  const { values, errors, status, handleChange, handleBlur, handleSubmit } = useContactForm({ onSuccess: onSent });
  const submitting = status === "submitting";

  const errorMessage = (name: ContactFieldName) => {
    const error = errors[name];
    return error && formatTemplate(form.errors[error], { max: CONTACT_FIELDS[name].maxLength });
  };

  return (
    <form noValidate onSubmit={handleSubmit} aria-busy={submitting} className="contact-form-grid">
      {form.fields.map(({ name, label, type, autoComplete, rows, wide }, index) => {
        const rule = CONTACT_FIELDS[name];
        const multiline = type === "textarea";
        return (
          <Field
            key={name}
            id={`${idPrefix}-${name}`}
            name={name}
            label={label}
            hint={rule.required ? undefined : form.optionalLabel}
            error={errorMessage(name)}
            as={multiline ? "textarea" : "input"}
            type={multiline ? undefined : type}
            rows={rows}
            autoComplete={autoComplete}
            required={rule.required}
            maxLength={rule.maxLength}
            value={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            data-autofocus={index === 0 ? "" : undefined}
            className={clsx(wide && "sm:col-span-2")}
          />
        );
      })}

      <div aria-hidden="true" className="contact-honeypot">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
      </div>

      {status === "error" && (
        <p role="alert" className="contact-form-error sm:col-span-2">
          {form.errors.submit}{" "}
          <a href={`mailto:${fallbackEmail}`} className="font-medium underline underline-offset-2">
            {fallbackEmail}
          </a>
          .
        </p>
      )}

      <div className="contact-form-footer sm:col-span-2">
        <p className="text-xs text-(--fg-subtle)">{form.privacy}</p>
        <Button type="submit" size="sm" disabled={submitting} className="contact-submit">
          {submitting && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
          {submitting ? form.submittingLabel : form.submitLabel}
        </Button>
      </div>
    </form>
  );
}
