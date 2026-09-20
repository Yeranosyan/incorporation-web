import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CONTACT } from "@/content/contact";
import { ContactChannel } from "./ContactChannel";

const channelNamed = (label: string) => CONTACT.channels.find((channel) => channel.label === label)!;

const renderChannel = (label: string) =>
  render(
    <ul>
      <ContactChannel {...channelNamed(label)} />
    </ul>,
  );

describe("ContactChannel", () => {
  it("opens external channels in a new tab without an opener", () => {
    renderChannel("LinkedIn");
    const link = screen.getByRole("link", { name: /linkedin/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows the headquarters as plain text with no hover fill", () => {
    const { container } = renderChannel("Headquarters");
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText(channelNamed("Headquarters").value)).toBeInTheDocument();
    expect(container.querySelector(".channel-fill")).toBeNull();
  });
});
