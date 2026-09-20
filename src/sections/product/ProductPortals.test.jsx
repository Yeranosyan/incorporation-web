import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PRODUCT } from "@/content/product";
import { ProductPortals } from "./ProductPortals";

const renderPortals = () => render(<ProductPortals intro={PRODUCT.portalsIntro} portals={PRODUCT.portals} />);

describe("ProductPortals", () => {
  it("renders one tab per role with the first role selected", () => {
    renderPortals();
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(PRODUCT.portals.length);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", tabs[0].id);
  });

  it("switches the chart panel to the selected role", async () => {
    const user = userEvent.setup();
    renderPortals();
    await user.click(screen.getByRole("tab", { name: /account manager/i }));
    const panel = screen.getByRole("tabpanel");
    expect(within(panel).getByRole("heading", { name: "One workspace for every quote." })).toBeInTheDocument();
    expect(within(panel).getByRole("meter", { name: "In-app notifications" })).toHaveAttribute("aria-valuenow", "11");
  });

  it("crossfades between roles while exposing only the selected role", async () => {
    const user = userEvent.setup();
    renderPortals();
    const panel = screen.getByRole("tabpanel");
    const [customer, manager] = PRODUCT.portals;

    expect(within(panel).getByRole("heading", { name: customer.title })).toBeInTheDocument();
    expect(within(panel).queryByRole("heading", { name: manager.title })).toBeNull();

    await user.click(screen.getByRole("tab", { name: /account manager/i }));

    expect(within(panel).queryByRole("heading", { name: customer.title })).toBeNull();
    const managerCopy = within(panel).getByRole("heading", { name: manager.title }).closest("[data-active]");
    expect(managerCopy).toHaveAttribute("data-active", "true");
  });

  it("moves between roles with the arrow keys and wraps at the ends", async () => {
    const user = userEvent.setup();
    renderPortals();
    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    await user.keyboard("{ArrowLeft}");
    const last = tabs[tabs.length - 1];
    expect(last).toHaveAttribute("aria-selected", "true");
    expect(last).toHaveFocus();
  });

  it("keeps only the selected tab in the tab order", () => {
    renderPortals();
    const tabs = screen.getAllByRole("tab");
    expect(tabs.filter((tab) => tab.tabIndex === 0)).toHaveLength(1);
  });
});
