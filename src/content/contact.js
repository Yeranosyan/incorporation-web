import { COMPANY, LINKS } from "./site";

export const CONTACT = {
  eyebrow: "Contact",
  title: "Start with",
  titleMuted: "a conversation.",
  lede: "Describe the system, the constraint or the outcome required. Every enquiry receives a direct reply from the Onecodio team.",
  email: { label: "Email", value: COMPANY.email, actionLabel: "Open the contact form" },
  channels: [
    { label: "LinkedIn", value: "linkedin.com/company/onecodio", href: LINKS.linkedin, external: true },
    { label: "Headquarters", value: COMPANY.location },
    { label: "CPQ Teams", value: "cpqteams.com", href: LINKS.cpqTeams, external: true },
  ],
  form: {
    eyebrow: "Contact form",
    title: "Send a message to Onecodio",
    lede: "Describe the system, the constraint or the outcome required. The message is delivered to office@onecodio.com and answered from there.",
    fields: [
      { name: "name", label: "Full name", type: "text", autoComplete: "name" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      { name: "company", label: "Company", type: "text", autoComplete: "organization", wide: true },
      { name: "message", label: "Message", type: "textarea", rows: 5, wide: true },
    ],
    optionalLabel: "Optional",
    submitLabel: "Send message",
    submittingLabel: "Sending",
    closeLabel: "Close the contact form",
    privacy: "Details are used only to reply to this enquiry.",
    errors: {
      required: "This field is required.",
      email: "Enter a valid email address.",
      tooLong: "Shorten this entry to {max} characters or fewer.",
      submit: "The message could not be sent. Try again in a moment, or write to",
    },
    confirmation: {
      title: "Message sent",
      body: "Thank you, {name}. The Onecodio team will reply to {email}.",
      dismissLabel: "Dismiss the confirmation",
    },
  },
};
