import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import { contactDevPlugin } from "./server/contactDevPlugin.js";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), contactDevPlugin(loadEnv(mode, process.cwd(), ""))],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
    cssCodeSplit: false,
  },
  test: {
    css: false,
    restoreMocks: true,
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["{src,server}/**/*.test.js"],
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          name: "dom",
          include: ["src/**/*.test.jsx"],
          environment: "jsdom",
          pool: "vmThreads",
          setupFiles: ["./src/test/setup.js"],
        },
      },
    ],
  },
}));
