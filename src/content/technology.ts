export const TECHNOLOGY = {
  eyebrow: "Technology",
  title: "Technologies selected",
  titleMuted: "for longevity, not novelty.",
  lede: "Each stack is chosen for maintainability, ecosystem maturity and compatibility with the client's existing environment. The categories below list the technologies in active use.",
  categories: [
    {
      name: "Frontend",
      items: ["React", "Angular", "Vue.js", "JavaScript", "TypeScript"],
    },
    {
      name: "Mobile",
      items: ["React Native"],
    },
    {
      name: "Styling",
      items: ["Tailwind CSS", "Sass", "CSS", "shadcn/ui", "MUI"],
    },
    {
      name: "Backend",
      items: ["Node.js", "Express", "C#", ".NET", "Next.js"],
    },
    {
      name: "Database",
      items: ["PostgreSQL", "SQL Server", "MongoDB", "Azure Cosmos DB", "Amazon Aurora"],
    },
    {
      name: "DevOps and cloud",
      items: ["Git", "GitHub", "Docker", "Kubernetes", "Microsoft Azure", "AWS"],
    },
  ],
  platformsLabel: "Core platforms",
  platforms: [
    { name: "React", description: "The library for web and native user interfaces", href: "https://react.dev" },
    { name: "Angular", description: "The framework for building scalable web applications", href: "https://angular.dev" },
    { name: "Vue", description: "An approachable, performant framework for web user interfaces", href: "https://vuejs.org" },
    { name: ".NET", description: "Modern applications and cloud services", href: "https://dotnet.microsoft.com" },
    { name: "Node.js", description: "A JavaScript runtime for servers and tooling", href: "https://nodejs.org" },
    { name: "Next.js", description: "The React framework for the web", href: "https://nextjs.org" },
  ],
};

export type TechnologyContent = typeof TECHNOLOGY;
