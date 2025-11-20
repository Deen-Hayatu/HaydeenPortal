import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Use process.cwd() for Vercel compatibility - it's more reliable in build environments
const root = process.cwd();
const clientDir = path.join(root, "client");
const distDir = path.join(root, "dist", "public");

export default defineConfig({
  plugins: [react()],
  root: clientDir,
  resolve: {
    alias: {
      "@": path.join(clientDir, "src"),
      "@shared": path.join(root, "shared"),
      "@assets": path.join(root, "attached_assets"),
    },
  },
  build: {
    outDir: distDir,
    emptyOutDir: true,
  },
});
