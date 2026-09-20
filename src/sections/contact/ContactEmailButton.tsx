import { ArrowUpRight } from "lucide-react";
import type { ContactContent } from "@/content/contact";

export type ContactEmailButtonProps = { email: ContactContent["email"]; onOpen: () => void };

export function ContactEmailButton({ email, onOpen }: ContactEmailButtonProps) {
  return (
    <button type="button" aria-haspopup="dialog" onClick={onOpen} className="group contact-email-button mt-3">
      <span className="contact-email-address">{email.value}</span>
      <span className="sr-only">{email.actionLabel}</span>
      <ArrowUpRight aria-hidden="true" className="contact-email-arrow" />
    </button>
  );
}
