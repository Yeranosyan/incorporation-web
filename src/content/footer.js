import { LINKS } from "./site";

export const FOOTER = {
  statement: "Custom software, digital transformation and CPQ Teams — engineered and operated from Vancouver, British Columbia.",
  sectionsLabel: "Sections",
  columns: [
    {
      title: "Product",
      links: [
        { label: "CPQ Teams", href: LINKS.cpqTeams, external: true },
        { label: "Security", href: LINKS.cpqSecurity, external: true },
        { label: "FAQ", href: LINKS.cpqFaq, external: true },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "LinkedIn", href: LINKS.linkedin, external: true },
        { label: "Instagram", href: LINKS.instagram, external: true },
        { label: "FEA membership", href: LINKS.feaProfile, external: true },
      ],
    },
  ],
};
