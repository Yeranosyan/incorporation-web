import { LINKS } from "./site";

export const MEMBERSHIP = {
  eyebrow: "Membership",
  title: "Member of the",
  titleMuted: "Foodservice Equipment Association.",
  pillarsLabel: "The FEA framework",
  pillars: [
    { name: "Information", description: "Market intelligence, industry insight and technical guidance." },
    { name: "Involvement", description: "Product groups, forums, events and training programmes." },
    { name: "Influence", description: "A collective voice that represents the sector." },
  ],
  credential: {
    label: "FEA membership credential",
    layers: [
      {
        label: "Status",
        value: "Member",
        tone: "graphite",
        description: "Onecodio Inc. is a member of the Foodservice Equipment Association (FEA).",
      },
      {
        label: "Association region",
        value: "United Kingdom",
        tone: "glass",
        description:
          "The FEA is the United Kingdom's leading independent trade association for the foodservice equipment industry.",
      },
      {
        label: "Company",
        value: "Onecodio Inc.",
        tone: "graphite",
        description:
          "Membership connects Onecodio with the manufacturers, distributors and dealers that CPQ Teams is built for. CPQ Teams works alongside AutoQuotes, the quoting system used across the foodservice equipment industry.",
      },
      {
        label: "Association",
        value: "FEA",
        tone: "glass",
        description: "The FEA represents 200 companies across the foodservice equipment sector.",
      },
    ] as const,
  },
  actions: [
    { label: "About the FEA", href: LINKS.fea, variant: "secondary", external: true },
  ] as const,
};

export type MembershipContent = typeof MEMBERSHIP;
