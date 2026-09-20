export const HERO = {
  announcement: {
    tag: "New",
    text: "CPQ Teams is now available",
    href: "#cpq-teams",
  },
  eyebrow: "Software engineering · Canada, United States & United Kingdom",
  title: "Custom software,",
  titleMuted: "engineered to last.",
  lede: "Onecodio Inc. designs, builds and operates custom software and digital transformation programs. One accountable team carries each engagement from discovery to long-term operation.",
  actions: [
    { label: "Explore CPQ Teams", href: "#cpq-teams", variant: "secondary" },
  ] as const,
  lifecycle: {
    label: "Engagement lifecycle",
    hint: "Drag the ruler or use the arrow keys",
    stages: [
      {
        id: "discovery",
        name: "Discovery",
        summary:
          "Business goals, constraints and existing systems are documented before implementation starts. Risks are identified and sized up front.",
      },
      {
        id: "architecture",
        name: "Architecture",
        summary:
          "System boundaries, data models and integration contracts are defined so that future teams can understand, maintain and extend them.",
      },
      {
        id: "delivery",
        name: "Delivery",
        summary:
          "Features ship in short, reviewed increments. Each change passes code review, automated tests and a production build before release.",
      },
      {
        id: "launch",
        name: "Launch",
        summary:
          "Releases are staged, monitored and reversible. Security, performance and data integrity are verified in production.",
      },
      {
        id: "operation",
        name: "Operation",
        summary:
          "Accountability continues after release: the platform is maintained, measured and extended as the business grows.",
      },
    ],
  },
  metrics: [
    {
      value: 3,
      label: "Countries of operation",
      detail: "Canada, the United States and the United Kingdom",
    },
    { value: 12, label: "Industries served", detail: "Government to retail" },
    {
      value: 6,
      label: "Engineering disciplines",
      detail: "Frontend to cloud operations",
    },
    {
      value: 1,
      label: "In-house product",
      detail: "CPQ Teams, owned and operated by Onecodio",
    },
  ],
  blueprint: {
    modules: [
      { label: "Web application", tone: "accent" },
      { label: "Integration API", tone: "amber" },
      { label: "Data platform", tone: "pearl" },
    ] as const,
  },
};

export type HeroContent = typeof HERO;
