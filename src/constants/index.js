const navLinks = [
  {
    id: 1,
    name: "Finder",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Company Profile",
    type: "companyProfile",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Finder",
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Safari",
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Photos",
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "vscode",
    name: "Visual Studio Code",
    icon: "vscode.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact",
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Trash",
    icon: "trash.png",
    canOpen: true,
  },
];

const techPosts = [
  {
    id: 1,
    description: "The library for web and native user interfaces",
    title: "React",
    image: "/images/react-logo.png",
    link: "https://react.dev",
  },
  {
    id: 2,
    description: "The framework for building scalable web apps with confidence",
    title: "Angular",
    image: "/images/angular-logo.png",
    link: "https://angular.dev",
  },
  {
    id: 3,
    description:
      "An approachable, performant and versatile framework for building web user interfaces",
    title: "Vue",
    image: "/images/vue-logo.png",
    link: "https://vuejs.org",
  },
  {
    id: 4,
    description: "Build modern apps and powerful cloud services",
    title: ".NET",
    image: "/images/dot-net-logo.png",
    link: "https://dotnet.microsoft.com/en-us",
  },
  {
    id: 5,
    description: "Run JavaScript Everywhere",
    title: "Node.js",
    image: "/images/nodejs-logo.svg",
    link: "https://nodejs.org",
  },
  {
    id: 6,
    description: "The React Framework for the Web",
    title: "Next.js",
    image: "/images/nextjs-logo.svg",
    link: "https://nextjs.org",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Angular.js", "Vue.js", "JavaScript", "TypeScript"],
  },
  {
    category: "Mobile",
    items: ["React Native"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS", "Shadcn", "MUI"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "C#", ".NET", "Next.js"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "SQL Server", "Cosmos DB", "Aurora"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker", "Kubernetes", "Azure", "AWS"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#000000",
    link: "",
  },
  {
    id: 2,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://linkedin.com/company/onecodio",
  },
  {
    id: 3,
    text: "Gmail",
    icon: "/icons/gmail.svg",
    bg: "#4bcb63",
    link: "mailto:office@onecodio.com",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/react.jpg",
  },
  {
    id: 2,
    img: "/images/angular.jpg",
  },
  {
    id: 3,
    img: "/images/js-ts.jpg",
  },
  {
    id: 4,
    img: "/images/vue.jpg",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  techPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ 1
    {
      id: 5,
      name: "What We Do",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-7", // finder window position
      children: [
        {
          id: 1,
          name: "What We Do.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "We are an end-to-end digital transformation partner, supporting businesses from strategy and discovery to delivery and long-term growth.",
            "\u00A0",
            "\u00A0",
            "Our approach combines:",
            "\u00A0",
            "• Deep technical expertise.",
            "• Business-focused problem solving",
            "• A strong emphasis on quality, security, and performance.",
            "\u00A0",
            "We don’t just build software — we create solutions that align with business goals and deliver long-term value.",
            "\u00A0",
            "At Onecodio, we are committed to building secure, scalable, and future-ready solutions that help businesses grow with confidence. Our goal is to simplify complexity, reduce risk, and enable our clients to innovate faster in an ever-changing digital landscape.",
          ],
        },
        {
          id: 2,
          name: "onecodio.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://onecodio.com",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "partnership.jpeg",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/partnership.jpeg",
        },
      ],
    },

    // ▶ 2
    {
      id: 6,
      name: "Industries We Serve",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 right-65",
      windowPosition: "top-[15vh] left-1",
      children: [
        {
          id: 1,
          name: "Industries We Serve.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "We work with clients across a wide range of industries, including:",
            "\u00A0",
            "• Consumer Goods.",
            "• Government.",
            "• Financial Services.",
            "• Healthcare.",
            "• Industrial & Manufacturing.",
            "• Logistics & Supply Chain.",
            "• Media, Entertainment & Technology.",
            "• Restaurants & Convenience.",
            "• Retail & E-commerce.",
            "• Telecommunications.",
            "• Travel & Hospitality.",
            "\u00A0",
            "Our cross-industry experience allows us to apply proven architectural patterns, best practices, and emerging technologies while tailoring each engagement to the unique challenges, regulations, and goals of every industry we serve.",
            "\u00A0",
            "We combine technical excellence with industry insight to deliver solutions that are secure, scalable, and built for long-term success.",
          ],
        },
        {
          id: 2,
          name: "onecodio.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://onecodio.com",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "industries.jpg",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/industries.jpg",
        },
      ],
    },

    // ▶ 3
    {
      id: 7,
      name: "Onecodio Inc.",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-75",
      windowPosition: "top-[25vh] left-4",
      children: [
        {
          id: 1,
          name: "Onecodio Inc.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "<strong>Custom Software Development & Digital Transformation.</strong>",
            "\u00A0",
            "Onecodio Inc. is a custom software development and digital transformation consultancy operating across <strong><u>Canada</u></strong> and the <strong><u>United States</u></strong>. We partner with organizations to design, build, and scale technology solutions that drive measurable business results.",
            "\u00A0",
            "We help companies modernize systems, improve customer experiences, and accelerate innovation through reliable, secure, and scalable digital solutions.",
            "\u00A0",
            "At Onecodio, we take <strong><u>full ownership of the solutions we deliver</u></strong>. We approach every engagement with a strong sense of responsibility — for technical quality, business impact, security, and long-term sustainability.",
            "\u00A0",
            "We don't operate as a short-term vendor. We work as a <strong><u>trusted partner</u></strong>, accountable for outcomes, not just deliverables. Every decision we make is guided by what will best serve our client's business today and in the future.",
          ],
        },
        {
          id: 2,
          name: "onecodio.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://onecodio.com",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "onecodio-logo.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/onecodio-logo.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About us",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "onecodio-logo.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/onecodio-logo.png",
    },
    {
      id: 4,
      name: "about-us.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Onecodio Inc.",
      image: "/images/onecodio-logo.png",
      description: [
        "<strong>Built on Trust and Accountability</strong>",
        "\u00A0",
        "Trust is earned through consistent execution, transparency, and accountability. At Onecodio, we take responsibility for both the technical and business outcomes of the work we deliver.",
        "\u00A0",
        "We are committed to:",
        "• Standing behind the work we deliver, from first release to long-term operation",
        "• Communicating early, directly, and honestly — especially when decisions are difficult",
        "• Making architectural choices that future teams can understand, maintain, and extend",
        "• Treating customer data and system integrity as non-negotiable responsibilities",
        "• Addressing uncertainty upfront to prevent downstream cost, delay, or operational risk",
        "\u00A0",
        "When challenges arise, we address them directly, take ownership, and move forward with practical solutions — not excuses. Our clients rely on us to act decisively, communicate honestly, and deliver with integrity.",
        "We measure success by the trust we earn and the long-term value we create for the organizations we serve.",
      ],
    },
  ],
};

const COMPANY_PROFILE_LOCATION = {
  id: 3,
  type: "company-profile",
  name: "Company Profile",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "onecodio-company-profile.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "security.jpg",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.jpg",
    },
    {
      id: 2,
      name: "chip.jpg",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.jpg",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  companyProfile: COMPANY_PROFILE_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  companyProfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  vscode: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  trash: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };

export const highlightJSON = (line) => {
  return line
    .replace(/([{}])/g, '<span style="color:#C586C0">$1</span>')
    .replace(/"([^":]*)"\s*:/g, '<span style="color:#9CDCFE">"$1"</span>:')
    .replace(/:\s*"([^"]*)"/g, ': <span style="color:#CE9178">"$1"</span>')
    .replace(/:\s*(\d+\.\d+\.\d+)/g, ': <span style="color:#CE9178">$1</span>')
    .replace(/,/g, '<span style="color:#FFFFFF">,</span>');
};

export const highlightJSX = (line) => {
  return line
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"([^"]*)"/g, (match, p1) => `XDOUBLEQUOTEX${p1}XENDDOUBLEQUOTEX`)
    .replace(/'([^']*)'/g, (match, p1) => `XSINGLEQUOTEX${p1}XENDSINGLEQUOTEX`)
    .replace(
      /\b(import|export|default|from|return)\b/g,
      '<span style="color:#C586C0">$1</span>'
    )
    .replace(/\b(const|function)\b/g, '<span style="color:#569CD6">$1</span>')
    .replace(
      /\{\s*(StrictMode|createRoot)\s*\}/g,
      '{ <span style="color:#DCDCAA">$1</span> }'
    )
    .replace(/\{\s*(\w+)\s*\}/g, '{ <span style="color:#569CD6">$1</span> }')
    .replace(
      /\b(Onecodio|createRoot)\b(?!.*Inc)/g,
      '<span style="color:#DCDCAA">$1</span>'
    )
    .replace(/\b(React)\b/g, '<span style="color:#569CD6">$1</span>')
    .replace(
      /\b(App)\b(?![^X]*XENDDOUBLEQUOTEX)(?![^X]*XENDSINGLEQUOTEX)/g,
      '<span style="color:#569CD6">$1</span>'
    )
    .replace(
      /\b(className|document|getElementById|render)\b/g,
      '<span style="color:#9CDCFE">$1</span>'
    )
    .replace(/=&gt;/g, '<span style="color:#569CD6">=&gt;</span>')
    .replace(
      /&lt;(\/?)(StrictMode|App)\b/g,
      '<span style="color:#4EC9B0">&lt;$1$2</span>'
    )
    .replace(
      /&lt;(\/?)(div|h1|h2|p|span|main|svg|circle|text)\b/g,
      '<span style="color:#569CD6">&lt;$1$2</span>'
    )
    .replace(/&gt;/g, '<span style="color:#569CD6">&gt;</span>')
    .replace(
      /XDOUBLEQUOTEX([^X]*)XENDDOUBLEQUOTEX/g,
      '<span style="color:#CE9178">"$1"</span>'
    )
    .replace(
      /XSINGLEQUOTEX([^X]*)XENDSINGLEQUOTEX/g,
      "<span style=\"color:#CE9178\">'$1'</span>"
    );
};

export const vscodeFileStructure = [
  {
    name: "src",
    type: "folder",
    children: [
      { name: "App.jsx", type: "file" },
      { name: "main.jsx", type: "file" },
      {
        name: "components",
        type: "folder",
        children: [{ name: "Onecodio.jsx", type: "file" }],
      },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [{ name: "logo.svg", type: "file" }],
  },
  { name: "package.json", type: "file" },
];

export const vscodeSampleCodes = {
  "App.jsx": `import Onecodio from "./components/Onecodio";

function App() {
  return (
    <main>
      <Onecodio />
    </main>
  );
}

export default App;`,

  "main.jsx": `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`,

  "Onecodio.jsx": `const Onecodio = () => {
  return (
    <div>
      <h1>Onecodio Inc</h1>
      <p>Welcome to our company</p>
      <span>Nice to meet you</span>
    </div>
  );
};

export default Onecodio;`,

  "package.json": `{
  "name": "incorporation-web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "@tailwindcss/vite": "^4.1.18",
    "clsx": "^2.1.1",
    "dayjs": "^1.11.19",
    "gsap": "^3.14.2",
    "immer": "^11.0.1",
    "lucide-react": "^0.561.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-pdf": "^10.2.0",
    "react-tooltip": "^5.30.0",
    "tailwindcss": "^4.1.18",
    "zustand": "^5.0.9"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}`,
};
