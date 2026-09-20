import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useToneBelow } from "@/hooks/useToneBelow";
import { ActionLink, Brand } from "@/ui";
import { MobileMenu } from "./MobileMenu";

const MENU_ID = "mobile-menu";
const NAV_CENTER_Y = 44;

export function Header({ brand, navItems, action, text }) {
  const active = useActiveSection(navItems.map(({ id }) => id));
  const tone = useToneBelow(NAV_CENTER_Y) === "dark" ? "dark" : "light";
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ToggleIcon = open ? X : Menu;

  return (
    <header data-tone={tone} className="nav-glass site-header">
      <div className="glass-blur site-header-bar">
        <a href="#top" aria-label={text.homeLink} className="site-home-link">
          <Brand name={brand} showMark={false} />
        </a>

        <nav aria-label={text.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                  className={clsx(
                    "site-nav-link",
                    active === id ? "bg-(--glass-tint-hover) text-(--fg)" : "text-(--fg-muted) hover:text-(--fg)",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="cluster-row">
          <ActionLink href={action.href} variant={action.variant} size="sm" className="max-[23.75rem]:hidden">
            {action.label}
          </ActionLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? text.closeMenu : text.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="mobile-menu-toggle"
          >
            <ToggleIcon aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      <MobileMenu
        id={MENU_ID}
        open={open}
        navItems={navItems}
        active={active}
        action={action}
        label={text.mobileNav}
        onClose={close}
      />
    </header>
  );
}
