export const PRINCIPLES = {
  eyebrow: "Principles",
  title: "Built on trust",
  titleMuted: "and accountability.",
  lede: "Trust is earned through consistent execution, transparency and accountability. Onecodio takes responsibility for both the technical and the business outcomes of its work.",
  commitments: [
    {
      title: "Ownership after release",
      description: "Delivered work is supported from the first release through long-term operation.",
    },
    {
      title: "Direct communication",
      description: "Status, risks and trade-offs are communicated early, directly and honestly, especially when decisions are difficult.",
    },
    {
      title: "Maintainable architecture",
      description: "Architectural decisions are made so that future teams can understand, maintain and extend the system.",
    },
    {
      title: "Data and system integrity",
      description: "Customer data and system integrity are treated as non-negotiable responsibilities.",
    },
    {
      title: "Uncertainty resolved early",
      description: "Open questions are addressed up front to prevent downstream cost, delay and operational risk.",
    },
  ],
  closing:
    "When challenges arise, they are addressed directly, with ownership and practical solutions. Success is measured by the trust earned and the long-term value created for each organization served.",
};

export type PrinciplesContent = typeof PRINCIPLES;
