import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import { analyticsPlugin } from "./server/analyticsPlugin.ts";
import { contactDevPlugin } from "./server/contactDevPlugin.ts";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss(), contactDevPlugin(env), analyticsPlugin(env)],
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
            include: ["{src,server}/**/*.test.{js,ts}"],
            environment: "node",
          },
        },
        {
          extends: true,
          test: {
            name: "dom",
            include: ["src/**/*.test.{jsx,tsx}"],
            environment: "jsdom",
            pool: "vmThreads",
            setupFiles: ["./src/test/setup.ts"],
          },
        },
      ],
    },
  };
});
