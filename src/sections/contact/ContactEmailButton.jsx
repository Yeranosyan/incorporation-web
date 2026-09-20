import { ArrowUpRight } from "lucide-react";

export function ContactEmailButton({ email, onOpen }) {
  return (
    <button type="button" aria-haspopup="dialog" onClick={onOpen} className="group contact-email-button mt-3">
      <span className="contact-email-address">{email.value}</span>
      <span className="sr-only">{email.actionLabel}</span>
      <ArrowUpRight aria-hidden="true" className="contact-email-arrow" />
    </button>
  );
}
