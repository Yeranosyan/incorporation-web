import clsx from "clsx";
import { useEffect } from "react";
import { ActionLink } from "@/ui";

export function MobileMenu({ id, open, navItems, active, action, label, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => event.key === "Escape" && onClose();
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
