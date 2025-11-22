import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../client/vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Resolve path relative to project root
  // Use process.cwd() for reliable path resolution in bundled code
  const staticDir = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(staticDir)) {
    throw new Error(
      `Could not find the build directory: ${staticDir}, make sure to build the client first`,
    );
  }

  // Serve static files (CSS/JS/images) with proper MIME types and caching
  app.use(express.static(staticDir, {
    maxAge: process.env.NODE_ENV === 'production' ? '1y' : '1h',
    immutable: process.env.NODE_ENV === 'production',
    setHeaders: (res, filePath) => {
      // Ensure proper MIME types (Express does this automatically, but we can override if needed)
      if (filePath.endsWith(".map")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    }
  }));

  // SPA fallback: only serve index.html for GET requests that are:
  // - Not API calls (/api/*)
  // - Have no file extension (not static assets)
  // - Are GET requests
  app.get("*", (req, res, next) => {
    const hasExtension = path.extname(req.path) !== "";
    
    // Skip if:
    // - Not a GET request
    // - Is an API route
    // - Has a file extension (is a static asset)
    if (req.method !== "GET" || req.path.startsWith("/api") || hasExtension) {
      return next(); // Let 404 or other handlers run
    }
    
    // Serve index.html for SPA routing
    return res.sendFile(path.join(staticDir, "index.html"));
  });
}
