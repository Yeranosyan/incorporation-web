import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { UserEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CONTACT } from "@/content/contact";
import { Contact } from "./Contact";

const { form } = CONTACT;

const respond = (status: number, body: unknown) =>
  vi.fn().mockResolvedValue({ ok: status >= 200 && status < 300, status, json: async () => body });

const setup = () => {
  const user = userEvent.setup({ delay: null });
  render(<Contact id="contact" content={CONTACT} />);
  return user;
};

const openForm = async (user: UserEvent) => {
  await user.click(screen.getByRole("button", { name: /office@onecodio\.com/i }));
  return screen.getByRole("dialog");
};

const fillValidMessage = async (user: UserEvent, dialog: HTMLElement) => {
  await user.type(within(dialog).getByLabelText("Full name"), "Ada Lovelace");
  await user.type(within(dialog).getByLabelText("Email"), "ada@example.com");
  await user.type(within(dialog).getByLabelText("Message"), "We need a customer quoting portal.");
};

describe("Contact", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("opens the contact form instead of the mail client", async () => {
    const user = setup();
    const trigger = screen.getByRole("button", { name: /office@onecodio\.com/i });
    expect(trigger).not.toHaveAttribute("href");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");

    const dialog = await openForm(user);
    expect(dialog).toHaveAttribute("open");
    expect(within(dialog).getByRole("heading", { name: form.title })).toBeInTheDocument();
  });

  it("closes the form from the close button", async () => {
    const user = setup();
    const dialog = await openForm(user);
    await user.click(within(dialog).getByRole("button", { name: form.closeLabel }));
    expect(dialog).not.toHaveAttribute("open");
  });

  it("shows field errors and does not send an incomplete form", async () => {
    const fetchMock = respond(200, { ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const user = setup();
    const dialog = await openForm(user);

    await user.click(within(dialog).getByRole("button", { name: form.submitLabel }));

    expect(within(dialog).getByLabelText("Full name")).toHaveAttribute("aria-invalid", "true");
    expect(within(dialog).getAllByText(form.errors.required)).toHaveLength(3);
    expect(within(dialog).getByLabelText("Full name")).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("validates the email format", async () => {
    const user = setup();
    const dialog = await openForm(user);
    const emailInput = within(dialog).getByLabelText("Email");
    await user.type(emailInput, "ada@example");
    await user.tab();
    expect(within(dialog).getByText(form.errors.email)).toBeInTheDocument();
  });

  it("sends a valid message, closes the form and confirms delivery", async () => {
    const fetchMock = respond(200, { ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const user = setup();
    const dialog = await openForm(user);

    await fillValidMessage(user, dialog);
    await user.click(within(dialog).getByRole("button", { name: form.submitLabel }));

    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
    expect(screen.getByRole("status")).toHaveTextContent(form.confirmation.title);
    expect(screen.getByRole("status")).toHaveTextContent("ada@example.com");

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(JSON.parse(options.body)).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "We need a customer quoting portal.",
      website: "",
    });
  });

  it("keeps the message and shows an alert when sending fails", async () => {
    vi.stubGlobal("fetch", respond(502, { ok: false, error: "send_failed" }));
    const user = setup();
    const dialog = await openForm(user);

    await fillValidMessage(user, dialog);
    await user.click(within(dialog).getByRole("button", { name: form.submitLabel }));

    expect(await within(dialog).findByRole("alert")).toHaveTextContent(form.errors.submit);
    expect(dialog).toHaveAttribute("open");
    expect(within(dialog).getByLabelText("Full name")).toHaveValue("Ada Lovelace");
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });
});
