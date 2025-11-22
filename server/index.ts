import express, { type Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { getConfig } from "./config";
import { logger } from "./utils/logger";
import { handleError } from "./utils/errors";

// Validate configuration on startup
try {
  getConfig();
  logger.info('Configuration validated successfully');
} catch (error) {
  logger.error('Failed to validate configuration', error as Error);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
}

const app = express();

// Trust proxy for rate limiting (needed for deployment environments)
app.set('trust proxy', 1);

// Rate limiting middleware
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit for development
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development', // Skip rate limiting in development
});

const contactLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // limit each IP to 3 contact form submissions per windowMs
  message: 'Too many contact form submissions, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(generalLimiter);
}
app.use('/api/contact', contactLimiter);

// Security middleware
app.use((req, res, next) => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // More permissive CSP for development
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: ws: wss:; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline';");
  } else {
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://replit.com; connect-src 'self' https:;");
  }
  
  // Remove server information
  res.removeHeader('X-Powered-By');
  
  next();
});

// Body parsing middleware (static files are served by serveStatic function)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Global error handler - must be last middleware
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    handleError(err, res);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Get port from config (defaults to 5000, can be overridden with PORT env var)
  const config = getConfig();
  const port = config.app.port;
  
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
