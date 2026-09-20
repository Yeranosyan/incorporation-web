import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { UI_TEXT } from "@/content/site";
import { Header } from "./Header";

const navItems = [
  { id: "company", label: "Company" },
  { id: "cpq-teams", label: "CPQ Teams" },
];

const renderHeader = () =>
  render(
    <Header
      brand="Onecodio"
      navItems={navItems}
      action={{ label: "Start a project", href: "#contact" }}
      text={UI_TEXT}
    />,
  );

const placeNavOver = (tone: string) => {
  const section = document.createElement("section");
  section.dataset.tone = tone;
  document.elementsFromPoint = () => [section];
};

describe("Header", () => {
  afterEach(() => {
    Reflect.deleteProperty(document, "elementsFromPoint");
  });

  it("uses dark glass over dark sections", () => {
    placeNavOver("dark");
    renderHeader();
    expect(screen.getByRole("banner")).toHaveAttribute("data-tone", "dark");
  });

  it("switches to light glass over light and stone sections", () => {
    placeNavOver("stone");
    renderHeader();
    expect(screen.getByRole("banner")).toHaveAttribute("data-tone", "light");
  });

  it("links every navigation item to its section", () => {
    renderHeader();
    const nav = screen.getByRole("navigation", { name: UI_TEXT.primaryNav });
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual(["#company", "#cpq-teams"]);
  });

  it("shows the company name without the logo mark", () => {
    renderHeader();
    const homeLink = screen.getByRole("link", { name: UI_TEXT.homeLink });
    expect(homeLink).toHaveTextContent("Onecodio");
    expect(homeLink.querySelector("svg")).toBeNull();
  });

  it("opens the mobile menu and closes it with Escape", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: UI_TEXT.openMenu }));
    expect(screen.getByRole("button", { name: UI_TEXT.closeMenu })).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("mobile-menu")).not.toHaveAttribute("inert");

    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: UI_TEXT.openMenu })).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-menu")).toHaveAttribute("inert");
  });
});
