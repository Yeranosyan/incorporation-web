import clsx from "clsx";
import { useEffect } from "react";
import type { NavItem } from "@/sections/registry";
import { ActionLink } from "@/ui";
import type { ActionTarget } from "@/ui/ActionLink";

export type MobileMenuProps = {
  id: string;
  open: boolean;
  navItems: NavItem[];
  active: string | null;
  action: ActionTarget;
  label: string;
  onClose: () => void;
};

export function MobileMenu({ id, open, navItems, active, action, label, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <div
      id={id}
      inert={!open}
      className={clsx("glass-blur mobile-menu-panel mt-2", open ? "opacity-100" : "mobile-menu-closed")}
    >
      <nav aria-label={label} className="p-2">
        <ul className="mobile-menu-list">
          {navItems.map(({ id: sectionId, label: itemLabel }) => (
            <li key={sectionId}>
              <a
                href={`#${sectionId}`}
                onClick={onClose}
                aria-current={active === sectionId ? "location" : undefined}
                className={clsx(
                  "mobile-menu-link",
                  active === sectionId ? "bg-(--glass-tint-hover)" : "text-(--fg-muted) hover:bg-(--glass-tint-hover)",
                )}
              >
                {itemLabel}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-(--line) p-4">
        <ActionLink href={action.href} variant={action.variant} onClick={onClose} className="w-full justify-center">
          {action.label}
        </ActionLink>
      </div>
    </div>
  );
}
