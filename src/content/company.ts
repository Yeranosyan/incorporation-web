export const COMPANY_SECTION = {
  eyebrow: "Company",
  title: "A consultancy accountable for outcomes,",
  titleMuted: "not only deliverables.",
  paragraphs: [
    "Onecodio Inc. is a custom software development and digital transformation consultancy operating across Canada, the United States and the United Kingdom. The company designs, builds and scales technology solutions that produce measurable business results.",
    "Engagements modernize existing systems, improve customer experiences and shorten the path from requirement to production through reliable, secure and scalable architecture.",
    "Onecodio takes full ownership of each solution it delivers. Technical quality, business impact, security and long-term sustainability are managed as one responsibility.",
  ],
  approach: {
    label: "Approach",
    title: "End-to-end, from strategy and discovery to delivery and long-term growth.",
    pillars: [
      {
        title: "Deep technical expertise",
        description:
          "Engineering across frontend, backend, data, mobile and cloud infrastructure within a single team.",
      },
      {
        title: "Business-focused problem solving",
        description:
          "Each technical decision is traced to a business goal and a result that can be measured.",
      },
      {
        title: "Quality, security and performance",
        description:
          "Treated as release criteria from the first iteration, not as improvements scheduled after launch.",
      },
    ],
    outcome:
      "The objective is to simplify complexity, reduce risk and enable clients to deliver new capabilities faster in a changing digital landscape.",
  },
  services: [
    {
      title: "Custom software development",
      description:
        "Web platforms, internal tools and APIs built around the organization's own processes and data.",
    },
    {
      title: "Digital transformation",
      description:
        "Strategy, discovery and phased delivery that move manual workflows onto dependable systems.",
    },
    {
      title: "System modernization",
      description:
        "Incremental replacement of legacy applications without interrupting daily operations.",
    },
    {
      title: "Cloud and DevOps",
      description:
        "Containerized workloads, CI/CD pipelines and managed infrastructure on AWS and Azure.",
    },
    {
      title: "Mobile applications",
      description:
        "Cross-platform iOS and Android applications built with React Native on a shared codebase.",
    },
    {
      title: "Data and integration",
      description:
        "Relational and document databases, third-party integrations and consistent data flows between systems.",
    },
  ],
};

export type CompanyContent = typeof COMPANY_SECTION;
