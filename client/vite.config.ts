import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// When vite build runs, we're in the client directory (due to "cd client" in build script)
// So process.cwd() = client directory
const clientDir = process.cwd();
const projectRoot = path.resolve(clientDir, "..");

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(clientDir, "src"),
      "@shared": path.resolve(projectRoot, "shared"),
      "@assets": path.resolve(projectRoot, "attached_assets"),
    },
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
