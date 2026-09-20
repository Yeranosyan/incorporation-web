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

export const SECTIONS = [
  { id: "top", Component: Hero, content: HERO },
  { id: "company", navLabel: "Company", Component: Company, content: COMPANY_SECTION },
  { id: "cpq-teams", navLabel: "CPQ Teams", Component: Product, content: PRODUCT },
  { id: "industries", navLabel: "Industries", Component: Industries, content: INDUSTRIES },
  { id: "technology", navLabel: "Technology", Component: Technology, content: TECHNOLOGY },
  { id: "principles", navLabel: "Principles", Component: Principles, content: PRINCIPLES },
  { id: "membership", navLabel: "Membership", Component: Membership, content: MEMBERSHIP },
  { id: "contact", Component: Contact, content: CONTACT },
];

export const NAV_ITEMS = SECTIONS.filter(({ navLabel }) => navLabel).map(({ id, navLabel }) => ({
  id,
  label: navLabel,
}));
