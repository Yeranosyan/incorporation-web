import type { HtmlTagDescriptor, Plugin, loadEnv } from "vite";

type ViteEnv = ReturnType<typeof loadEnv>;

export const GTAG_SCRIPT_URL = "https://www.googletagmanager.com/gtag/js";

const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

const gtagBootstrap = (id: string) =>
  [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag() { dataLayer.push(arguments); }",
    'gtag("js", new Date());',
    `gtag("config", "${id}");`,
  ].join("\n");

export const buildAnalyticsTags = (env: ViteEnv): HtmlTagDescriptor[] => {
  const id = env.GA_MEASUREMENT_ID;
  if (!id) return [];
  if (!MEASUREMENT_ID_PATTERN.test(id)) {
    throw new Error(`[analytics] GA_MEASUREMENT_ID must look like G-XXXXXXXXXX, received "${id}"`);
  }
  return [
    { tag: "script", attrs: { async: true, src: `${GTAG_SCRIPT_URL}?id=${id}` }, injectTo: "head" },
    { tag: "script", children: gtagBootstrap(id), injectTo: "head" },
  ];
};

export const analyticsPlugin = (env: ViteEnv): Plugin => ({
  name: "onecodio-google-analytics",
  apply: "build",
  transformIndexHtml: { order: "pre", handler: () => buildAnalyticsTags(env) },
});
