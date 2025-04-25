import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';

const viteConfig = defineViteConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  base: process.env.VITE_BASE_URL || "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
});

export default mergeConfig(viteConfig, vitestConfig);

