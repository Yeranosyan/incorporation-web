import { act, screen, within } from "@testing-library/react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { App } from "./App";
import { SECTIONS } from "./sections/registry";

describe("App", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    container = document.body.appendChild(document.createElement("div"));
    root = createRoot(container);
    act(() => root.render(<App />));
  });

  afterAll(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders every registered section as a labelled landmark", () => {
    SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id);
      expect(section).not.toBeNull();
      expect(section).toHaveAttribute("aria-labelledby", `${id}-title`);
      expect(document.getElementById(`${id}-title`)).not.toBeNull();
    });
  });

  it("renders exactly one top-level heading", () => {
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("points every in-page link at an element that exists", () => {
    container.querySelectorAll('a[href^="#"]').forEach((link) => {
      expect(
        document.getElementById(link.getAttribute("href")!.slice(1)),
      ).not.toBeNull();
    });
  });

  it("opens every new-tab link without an opener reference", () => {
    const links = container.querySelectorAll('a[target="_blank"]');
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) =>
      expect(link).toHaveAttribute("rel", "noopener noreferrer"),
    );
  });

  it("presents the CPQ Teams launch", () => {
    expect(
      screen.getByRole("heading", { name: /stop sending pdfs/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "CPQ Teams" })).toHaveAttribute(
      "src",
      "/cpq-teams-logo-gray.svg",
    );
  });

  it("links to the Onecodio Instagram profile from the footer", () => {
    const footer = screen.getByRole("contentinfo");
    expect(
      within(footer).getByRole("link", { name: "Instagram" }),
    ).toHaveAttribute("href", "https://www.instagram.com/onecodio/");
  });

  it("links to the FEA member listing from the footer only", () => {
    expect(
      screen.queryByRole("link", { name: /view member listing/i }),
    ).toBeNull();
    const footer = screen.getByRole("contentinfo");
    expect(
      within(footer).getByRole("link", { name: /fea membership/i }),
    ).toHaveAttribute(
      "href",
      "https://www.fea.org.uk/company/onecodio-inc?sid=1809179",
    );
  });
});
