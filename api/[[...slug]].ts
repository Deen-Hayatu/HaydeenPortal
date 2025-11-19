import express, { type Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "../server/routes.js";

const app = express();
let routesRegistered = false;

app.set("trust proxy", 1);

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: "Too many contact form submissions, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

if (process.env.NODE_ENV === "production") {
  app.use(generalLimiter);
}
app.use("/api/contact", contactLimiter);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; connect-src 'self';",
  );
  res.removeHeader("X-Powered-By");
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

function ensureRoutesRegistered() {
  if (!routesRegistered) {
    registerRoutes(app);
    routesRegistered = true;
  }
}

ensureRoutesRegistered();

app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    // Check database connectivity
    const { pool } = await import("../server/db.js");
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      database: "connected"
    });
  } catch (error) {
    res.status(503).json({ 
      status: "unhealthy", 
      timestamp: new Date().toISOString(),
      database: "disconnected"
    });
  }
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  
  // Log error server-side
  if (status >= 500) {
    console.error('Server error:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      path: _req.path,
    });
  }
  
  // Return generic error message
  const message = status >= 500 
    ? "An internal server error occurred" 
    : (err.message || "Bad request");
  
  res.status(status).json({ 
    success: false,
    error: message 
  });
});

export const config = {
  runtime: "nodejs20.x",
};

export default app;
