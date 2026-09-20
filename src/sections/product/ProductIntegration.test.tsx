import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PRODUCT } from "@/content/product";
import { ProductIntegration } from "./ProductIntegration";

const { integration } = PRODUCT;

const renderIntegration = () => render(<ProductIntegration integration={integration} />);

const ACCESSIBLE_TEXT = { ignore: "script, style, [aria-hidden='true'], [aria-hidden='true'] *" };

describe("ProductIntegration", () => {
  it("describes the sync flow to assistive technology", () => {
    renderIntegration();
    expect(screen.getByRole("img", { name: integration.diagramLabel })).toBeInTheDocument();
  });

  it("labels each lane with the number of data types moving that way", () => {
    renderIntegration();
    expect(screen.getByText(`${integration.readLabel} · 05`)).toBeInTheDocument();
    expect(screen.getByText(`${integration.writeLabel} · 01`)).toBeInTheDocument();
  });

  it("lists every data type read from AutoQuotes", () => {
    renderIntegration();
    const list = screen.getByRole("list", { name: integration.inboundLabel });
    expect(within(list).getAllByRole("listitem")).toHaveLength(integration.inbound.length);
    integration.inbound.forEach(({ label }) => expect(within(list).getByText(label)).toBeInTheDocument());
  });

  it("states the sync rules and the single write-back", () => {
    renderIntegration();
    integration.specs.forEach(({ value }) => expect(screen.getByText(value, { selector: "dd" })).toBeInTheDocument());
    expect(screen.getByText(integration.outbound.label, ACCESSIBLE_TEXT)).toBeInTheDocument();
  });

  it("shows the write-back outside the sync diagram, from CPQ Teams to AutoQuotes", () => {
    renderIntegration();
    const diagram = screen.getByRole("img", { name: integration.diagramLabel });
    const writeBack = screen.getByText(integration.outbound.label, ACCESSIBLE_TEXT);
    expect(diagram).not.toContainElement(writeBack);
    expect(screen.getByText(integration.outboundLabel).parentElement).toHaveTextContent(
      `${integration.target.name}to${integration.source.name}`,
    );
  });

  it("explains the synced markers with a legend", () => {
    renderIntegration();
    expect(screen.getByText(integration.syncedLabel)).toBeInTheDocument();
  });
});
