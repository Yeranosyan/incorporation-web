import { LINKS } from "./site";

const LOGO = "/cpq-teams-logo-gray.svg";

export const PRODUCT = {
  name: "CPQ Teams",
  logo: LOGO,
  eyebrow: "Product launch · 2026",
  title: "Stop sending PDFs.",
  titleMuted: "Start sending quotes.",
  lede: "CPQ Teams is the configure-price-quote platform built for AutoQuotes teams. It replaces the email-and-PDF quote cycle with one live workspace in which customers open, approve or mark up a quote directly.",
  actions: [{ label: "Visit cpqteams.com", href: LINKS.cpqTeams, variant: "secondary", external: true }],
  cycle: {
    label: "Quote cycle, in weeks",
    scale: 26,
    axis: [0, 4, 8, 13, 17, 21, 26],
    rows: [
      { label: "Email and PDF", value: "3–6 months", from: 13, to: 26, tone: "amber" },
      { label: "With CPQ Teams", value: "1–2 weeks", from: 1, to: 2, tone: "accent" },
    ],
    caption: "Typical time from the first quote to customer approval, before and after CPQ Teams.",
  },
  highlights: [
    { value: 2, label: "Clicks for a customer to approve a quote" },
    { value: 1, label: "Workspace for every request and change" },
    { value: 0, label: "Email chains — one timestamped record" },
    { value: 3, label: "Role-scoped portals on one platform" },
  ],
  comparison: {
    beforeLabel: "Before",
    afterLabel: "With CPQ Teams",
    rows: [
      { before: "3–6 months per quote cycle", after: "1–2 weeks per quote cycle" },
      { before: "100–200 page PDFs to review", after: "A live quote, approved in two clicks" },
      { before: "Email threads and phone calls", after: "One place for every request and change" },
      { before: "Screenshots and stale copies", after: "One timestamped record per quote" },
    ],
  },
  portalsIntro: {
    eyebrow: "Portals",
    title: "One platform,",
    titleMuted: "three role-scoped experiences.",
    tabsLabel: "CPQ Teams portals",
    link: { label: "Open cpqteams.com", href: LINKS.cpqTeams },
  },
  workflowIntro: {
    eyebrow: "Workflow",
    title: "From AutoQuotes project",
    titleMuted: "to approved quote.",
  },
  portals: [
    {
      id: "customer",
      index: "01",
      role: "Customer",
      shortRole: "Customer",
      title: "Approve in two clicks.",
      lines: [
        "Review a live quote instead of a 100–200 page PDF",
        "Approve without downloading a file",
        "Request changes on any line item",
        "Comment on a single line item",
      ],
      specs: [
        { label: "Access", value: "Email invite" },
        { label: "Scope", value: "Sent quotes" },
        { label: "Edits", value: "3 fields" },
        { label: "Quote view", value: "Snapshot" },
      ],
      metric: { value: 2, label: "Clicks to approve", axis: "Quote decision" },
      distributionLabel: "Line-item control",
      meters: [
        { label: "Editable fields", value: 3, total: 5, tone: "lime" },
        { label: "Locked fields", value: 2, total: 5, tone: "accent" },
      ],
    },
    {
      id: "account-manager",
      index: "02",
      role: "Account manager",
      shortRole: "Manager",
      title: "One workspace for every quote.",
      lines: [
        "Send quotes from one place",
        "Receive live notifications when a customer acts",
        "Track sent, opened, approved and changes requested",
        "Adjust the layout before a quote is sent",
      ],
      specs: [
        { label: "Access", value: "Admin invite" },
        { label: "Scope", value: "Own + shared" },
        { label: "Send stages", value: "4 tracked" },
        { label: "Coverage", value: "Shareable" },
      ],
      metric: { value: 4, label: "Tracked send stages", axis: "Sent to approved" },
      distributionLabel: "Notification switches",
      meters: [
        { label: "In-app notifications", value: 11, total: 15, tone: "lime" },
        { label: "Email notifications", value: 4, total: 15, tone: "accent" },
      ],
    },
    {
      id: "administrator",
      index: "03",
      role: "Administrator",
      shortRole: "Admin",
      title: "Configure the workspace.",
      lines: [
        "Configure columns and the product image catalog",
        "Map categories to a custom structure",
        "Control every email customers receive",
        "Review finance and usage reports",
      ],
      specs: [
        { label: "Access", value: "Full workspace" },
        { label: "Scope", value: "Every quote" },
        { label: "Admin areas", value: "7 tabs" },
        { label: "Reports", value: "Finance, usage" },
      ],
      metric: { value: 7, label: "Admin console areas", axis: "Users to usage" },
      distributionLabel: "Editable email templates",
      meters: [
        { label: "Customer-facing", value: 2, total: 4, tone: "lime" },
        { label: "Internal", value: 2, total: 4, tone: "accent" },
      ],
    },
  ],
  workflow: [
    {
      index: "01",
      name: "Sync",
      role: "Account manager",
      description:
        "AutoQuotes projects arrive automatically. Each upstream change waits for review, so a working quote never changes without approval.",
    },
    {
      index: "02",
      name: "Build",
      role: "Account manager",
      description:
        "Line items, photos, notes and category mapping live on one record. Sending a quote freezes it as an immutable snapshot.",
    },
    {
      index: "03",
      name: "Decide",
      role: "Customer",
      description:
        "The customer approves in two clicks or requests changes on a specific line item. The account manager is notified immediately.",
    },
  ],
  integration: {
    label: "AutoQuotes integration",
    title: "AutoQuotes remains the system of record.",
    source: { name: "AutoQuotes", caption: "System of record" },
    target: { name: "CPQ Teams", caption: "Customer-facing workspace" },
    diagramLabel:
      "AutoQuotes sends projects, line items, products, owners and contacts to CPQ Teams. CPQ Teams publishes new customer contacts back to AutoQuotes.",
    readLabel: "Read",
    writeLabel: "Write-back",
    specs: [
      { label: "Project data", value: "Read-only" },
      { label: "Cadence", value: "Scheduled + on open" },
      { label: "Upstream changes", value: "Held for review" },
    ],
    inboundLabel: "Read from AutoQuotes",
    syncedLabel: "Synced",
    outboundLabel: "Written back",
    inbound: [
      { label: "Projects", detail: "Each with a permanent CPQ Teams quote number" },
      { label: "Line items", detail: "Quantities, prices, statuses and categories" },
      { label: "Products", detail: "Specifications, cut sheets and photography" },
      { label: "Owners", detail: "Each account manager sees their own projects" },
      { label: "Customers and contacts", detail: "Recipients autocomplete by name" },
    ],
    outbound: {
      label: "New customer contacts",
      detail:
        "Contacts created in CPQ Teams are published back to AutoQuotes. No other data is written upstream.",
    },
    guarantee:
      "CPQ Teams never modifies an AutoQuotes project, line item, price or quantity. Upstream changes are held for review and applied only after an account manager accepts them.",
  },
  safeguards: {
    label: "Security",
    items: [
      {
        title: "Invite-only",
        description: "No public sign-up. Administrators create every account and assign its role.",
      },
      {
        title: "Tenant isolation",
        description: "The company filter is enforced in the data layer, not left to individual queries.",
      },
      {
        title: "Private files",
        description: "Uploads sit in a non-listable bucket behind links that expire within minutes.",
      },
      {
        title: "Gated releases",
        description: "No change merges until formatting, type checks, tests and a production build pass.",
      },
    ],
    hosting:
      "Built and operated by Onecodio Inc. in Vancouver, British Columbia. Hosted on Amazon Web Services in the United States.",
  },
};
