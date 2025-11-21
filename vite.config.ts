import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// In Vercel, process.cwd() is the project root
const root = process.cwd();

export default defineConfig({
  plugins: [react()],
  // Set root to client directory where index.html lives
  root: path.resolve(root, "client"),
  resolve: {
    alias: {
      "@": path.resolve(root, "client", "src"),
      "@shared": path.resolve(root, "shared"),
      "@assets": path.resolve(root, "attached_assets"),
    },
  },
  build: {
    outDir: path.resolve(root, "dist", "public"),
    emptyOutDir: true,
  },
});
