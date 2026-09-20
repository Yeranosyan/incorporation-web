export const COMPANY = {
  name: "Onecodio Inc.",
  shortName: "Onecodio",
  tagline: "Custom Software Development & Digital Transformation",
  email: "office@onecodio.com",
  location: "Vancouver, British Columbia, Canada",
  coordinates: "49.2827° N · 123.1207° W",
  copyright: "© 2026 Onecodio Inc. All rights reserved.",
};

export const LINKS = {
  email: `mailto:${COMPANY.email}`,
  linkedin: "https://linkedin.com/company/onecodio",
  instagram: "https://www.instagram.com/onecodio/",
  cpqTeams: "https://www.cpqteams.com/",
  cpqSecurity: "https://www.cpqteams.com/security",
  cpqFaq: "https://www.cpqteams.com/faq",
  fea: "https://www.fea.org.uk/",
  feaProfile: "https://www.fea.org.uk/company/onecodio-inc?sid=1809179",
};

export const PRIMARY_ACTION = { label: "Start a project", href: "#contact", variant: "white" } as const;

export const UI_TEXT = {
  skipLink: "Skip to content",
  homeLink: "Onecodio Inc. — back to top",
  primaryNav: "Primary",
  mobileNav: "Sections",
  openMenu: "Open menu",
  closeMenu: "Close menu",
};

export type Company = typeof COMPANY;
export type PrimaryAction = typeof PRIMARY_ACTION;
export type UiText = typeof UI_TEXT;
