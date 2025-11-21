import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Get absolute paths that work in both local and Vercel environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// __dirname is client/ when this file is in client/
const clientDir = __dirname;
const projectRoot = path.resolve(clientDir, "..");

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@\/(.*)$/,
        replacement: path.resolve(clientDir, "src", "$1"),
      },
      {
        find: /^@shared\/(.*)$/,
        replacement: path.resolve(projectRoot, "shared", "$1"),
      },
      {
        find: /^@assets\/(.*)$/,
        replacement: path.resolve(projectRoot, "attached_assets", "$1"),
      },
    ],
  },
  css: {
    postcss: {
      config: path.resolve(projectRoot, "postcss.config.js"),
    },
  },
  build: {
    outDir: path.resolve(projectRoot, "dist", "public"),
    emptyOutDir: true,
  },
});
