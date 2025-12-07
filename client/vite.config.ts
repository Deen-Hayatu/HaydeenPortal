import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// Get absolute paths that work in both local and Vercel environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// __dirname is client/ when this file is in client/
const clientDir = __dirname;
const projectRoot = path.resolve(clientDir, "..");

export default defineConfig({
  base: "/",
  root: clientDir,
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
      plugins: [
        tailwindcss({
          config: path.resolve(projectRoot, "tailwind.config.ts"),
        }),
        autoprefixer(),
      ],
    },
  },
  build: {
    outDir: path.resolve(projectRoot, "dist", "public"),
    emptyOutDir: true,
    // Performance optimizations
    minify: "esbuild",
    sourcemap: false, // Disable in production for better performance
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['wouter'],
          'ui-vendor': ['framer-motion'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Feature chunks
          'solutions': [
            './src/pages/solutions/index.tsx',
            './src/pages/solutions/agriconnect.tsx',
            './src/pages/solutions/ghehr.tsx',
          ],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|svg|gif|webp)$/.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter', 'framer-motion'],
  },
});
