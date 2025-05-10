import { defineConfig } from "@tanstack/react-start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { baseURL, prerender } from "process";

const config = defineConfig({
  tsr: {
    appDirectory: "src",
  },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      tailwindcss(),
    ],
  },

  server: {
    baseURL: "/shadcn-tanstack-form",
    prerender: {
      routes: ["/"],
    },
  },
});

export default config;
