import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export function serveStatic(app: Express) {
  const staticDir = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(staticDir)) {
    throw new Error(
      `Could not find the build directory: ${staticDir}, make sure to build the client first`,
    );
  }

  app.use(express.static(staticDir, {
    maxAge: process.env.NODE_ENV === 'production' ? '1y' : '1h',
    immutable: process.env.NODE_ENV === 'production',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".map")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    }
  }));

  app.get("*", (req, res, next) => {
    const hasExtension = path.extname(req.path) !== "";
    
    if (req.method !== "GET" || req.path.startsWith("/api") || hasExtension) {
      return next();
    }
    
    return res.sendFile(path.join(staticDir, "index.html"));
  });
}
