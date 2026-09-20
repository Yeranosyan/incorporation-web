import { X } from "lucide-react";
import { useId } from "react";
import type { ContactFields } from "@/lib/contactApi";
import { Dialog } from "@/ui";
import { ContactForm } from "./ContactForm";
import type { ContactFormContent } from "./ContactForm";

export type ContactDialogProps = {
  open: boolean;
  onClose: () => void;
  onSent: (fields: ContactFields) => void;
  form: ContactFormContent;
  fallbackEmail: string;
};

export function ContactDialog({ open, onClose, onSent, form, fallbackEmail }: ContactDialogProps) {
  const titleId = useId();
  const ledeId = useId();

  return (
    <Dialog open={open} onClose={onClose} labelledBy={titleId} describedBy={ledeId}>
      <div className="spread-row-top">
        <div>
          <p className="type-label text-(--fg-muted)">{form.eyebrow}</p>
          <h2 id={titleId} className="type-title mt-3">
            {form.title}
          </h2>
          <p id={ledeId} className="muted-copy mt-3">
            {form.lede}
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label={form.closeLabel} className="contact-dialog-close">
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>
      <ContactForm form={form} onSent={onSent} fallbackEmail={fallbackEmail} />
    </Dialog>
  );
}
