import { useCallback, useMemo, useState } from "react";
import { formatTemplate } from "@/lib/format";
import { Reveal, Section, SectionHeader, Toast } from "@/ui";
import { ContactChannel } from "./ContactChannel";
import { ContactDialog } from "./ContactDialog";
import { ContactEmailButton } from "./ContactEmailButton";

export function Contact({ id, content }) {
  const { eyebrow, title, titleMuted, lede, email, channels, form } = content;
  const headingId = `${id}-title`;
  const [formOpen, setFormOpen] = useState(false);
  const [sentMessage, setSentMessage] = useState(null);

  const openForm = useCallback(() => setFormOpen(true), []);
  const closeForm = useCallback(() => setFormOpen(false), []);
  const dismissConfirmation = useCallback(() => setSentMessage(null), []);
  const handleSent = useCallback((message) => {
    setFormOpen(false);
    setSentMessage(message);
  }, []);

  const confirmation = useMemo(
    () =>
      sentMessage && {
        title: form.confirmation.title,
        message: formatTemplate(form.confirmation.body, sentMessage),
      },
    [sentMessage, form.confirmation],
  );

  return (
    <Section id={id} tone="dark" labelledBy={headingId}>
      <div>
        <SectionHeader id={headingId} eyebrow={eyebrow} title={title} titleMuted={titleMuted} lede={lede} size="display" />

        <Reveal order={1} className="mt-14">
          <p className="type-label text-(--fg-subtle)">{email.label}</p>
          <ContactEmailButton email={email} onOpen={openForm} />
        </Reveal>

        <Reveal as="ul" order={2} className="mt-16 border-t border-(--line)">
          {channels.map((channel) => (
            <ContactChannel key={channel.label} {...channel} />
          ))}
        </Reveal>
      </div>

      <ContactDialog open={formOpen} onClose={closeForm} onSent={handleSent} form={form} fallbackEmail={email.value} />
      <Toast toast={confirmation} dismissLabel={form.confirmation.dismissLabel} onDismiss={dismissConfirmation} />
    </Section>
  );
}
