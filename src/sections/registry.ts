import type { ComponentType } from "react";
import { COMPANY_SECTION } from "@/content/company";
import { CONTACT } from "@/content/contact";
import { HERO } from "@/content/hero";
import { INDUSTRIES } from "@/content/industries";
import { MEMBERSHIP } from "@/content/membership";
import { PRINCIPLES } from "@/content/principles";
import { PRODUCT } from "@/content/product";
import { TECHNOLOGY } from "@/content/technology";
import { Company } from "./company/Company";
import { Contact } from "./contact/Contact";
import { Hero } from "./hero/Hero";
import { Industries } from "./industries/Industries";
import { Membership } from "./membership/Membership";
import { Principles } from "./principles/Principles";
import { Product } from "./product/Product";
import { Technology } from "./technology/Technology";
import type { SectionViewProps } from "./section";

export type SectionEntry = {
  id: string;
  navLabel?: string;
  Component: ComponentType<SectionViewProps<unknown>>;
  content: unknown;
};

const section = <T,>(entry: {
  id: string;
  navLabel?: string;
  Component: ComponentType<SectionViewProps<T>>;
  content: T;
}) => entry as SectionEntry;

export const SECTIONS = [
  section({ id: "top", Component: Hero, content: HERO }),
  section({ id: "company", navLabel: "Company", Component: Company, content: COMPANY_SECTION }),
  section({ id: "cpq-teams", navLabel: "CPQ Teams", Component: Product, content: PRODUCT }),
  section({ id: "industries", navLabel: "Industries", Component: Industries, content: INDUSTRIES }),
  section({ id: "technology", navLabel: "Technology", Component: Technology, content: TECHNOLOGY }),
  section({ id: "principles", navLabel: "Principles", Component: Principles, content: PRINCIPLES }),
  section({ id: "membership", navLabel: "Membership", Component: Membership, content: MEMBERSHIP }),
  section({ id: "contact", Component: Contact, content: CONTACT }),
];

export const NAV_ITEMS = SECTIONS.flatMap(({ id, navLabel }) =>
  navLabel ? [{ id, label: navLabel }] : [],
);

export type NavItem = (typeof NAV_ITEMS)[number];
