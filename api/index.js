var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// api/handler.ts
import express from "express";
import rateLimit from "express-rate-limit";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  contactFormSchema: () => contactFormSchema,
  contactSubmissions: () => contactSubmissions,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertContactSubmissionSchema: () => insertContactSubmissionSchema,
  insertJobApplicationSchema: () => insertJobApplicationSchema,
  insertNewsletterSubscriptionSchema: () => insertNewsletterSubscriptionSchema,
  insertSolutionFeatureSchema: () => insertSolutionFeatureSchema,
  insertSolutionSchema: () => insertSolutionSchema,
  insertUserSchema: () => insertUserSchema,
  jobApplicationFormSchema: () => jobApplicationFormSchema,
  jobApplications: () => jobApplications,
  newsletterSubscriptionFormSchema: () => newsletterSubscriptionFormSchema,
  newsletterSubscriptions: () => newsletterSubscriptions,
  solutionFeatures: () => solutionFeatures,
  solutions: () => solutions,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true
});
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  readTime: text("read_time").notNull(),
  coverImage: text("cover_image").notNull(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role").notNull(),
  authorAvatar: text("author_avatar").notNull(),
  category: text("category").notNull()
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true
});
var solutions = pgTable("solutions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  slug: text("slug").notNull().unique(),
  color: text("color").notNull(),
  isAvailable: boolean("is_available").notNull().default(false)
});
var insertSolutionSchema = createInsertSchema(solutions).omit({
  id: true
});
var solutionFeatures = pgTable("solution_features", {
  id: serial("id").primaryKey(),
  solutionId: integer("solution_id").notNull().references(() => solutions.id),
  feature: text("feature").notNull()
});
var insertSolutionFeatureSchema = createInsertSchema(solutionFeatures).omit({
  id: true
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  isProcessed: boolean("is_processed").notNull().default(false)
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
  isProcessed: true
});
var newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  isActive: boolean("is_active").notNull().default(true)
});
var insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).pick({
  email: true
});
var contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});
var newsletterSubscriptionFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});
var jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  position: text("position").notNull(),
  // "UX/UI Design Intern" or "Agribusiness Research Intern"
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  university: text("university"),
  studyField: text("study_field"),
  graduationYear: text("graduation_year"),
  experience: text("experience"),
  // Brief description of relevant experience
  motivation: text("motivation").notNull(),
  // Why they want to join
  cvFileName: text("cv_file_name"),
  // File name of uploaded CV
  cvFileData: text("cv_file_data"),
  // Base64 encoded CV file
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  isProcessed: boolean("is_processed").notNull().default(false)
});
var insertJobApplicationSchema = createInsertSchema(jobApplications).omit({
  id: true,
  submittedAt: true,
  isProcessed: true
});
var jobApplicationFormSchema = z.object({
  position: z.enum(["UX/UI Design Intern", "Agribusiness Research Intern"], {
    message: "Please select a position"
  }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  location: z.string().min(2, { message: "Please enter your location" }),
  university: z.string().optional(),
  studyField: z.string().optional(),
  graduationYear: z.string().optional(),
  experience: z.string().optional(),
  motivation: z.string().min(50, { message: "Please tell us why you want to join (at least 50 characters)" }),
  // Note: cvFile is handled separately on the client and not validated here
  // The file is sent as FormData and processed by multer on the server
  cvFile: z.unknown().optional()
  // File will be handled separately
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

// server/config.ts
function getEnvVar(name, required = true) {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(
      `Missing required environment variable: ${name}. Please check your .env file or environment configuration.`
    );
  }
  return value || "";
}
function getEnvVarOptional(name, defaultValue = null) {
  return process.env[name] || defaultValue;
}
function validateConfig() {
  const nodeEnv = process.env.NODE_ENV || "development";
  const isProduction = nodeEnv === "production";
  const databaseUrl = getEnvVar("DATABASE_URL");
  const sessionSecret = getEnvVar("SESSION_SECRET", isProduction);
  if (isProduction && sessionSecret.length < 32) {
    throw new Error(
      "SESSION_SECRET must be at least 32 characters long in production. Generate a secure random string for security."
    );
  }
  const sendgridApiKey = getEnvVarOptional("SENDGRID_API_KEY");
  const emailFrom = getEnvVarOptional("EMAIL_FROM", "noreply@haydeentech.com");
  const gaMeasurementId = getEnvVarOptional("VITE_GA_MEASUREMENT_ID");
  return {
    database: {
      url: databaseUrl
    },
    email: {
      sendgridApiKey,
      from: emailFrom
    },
    session: {
      secret: sessionSecret || "dev-secret-change-in-production-" + Date.now()
    },
    analytics: {
      gaMeasurementId
    },
    app: {
      nodeEnv,
      port: parseInt(process.env.PORT || "5000", 10)
    }
  };
}
var config = null;
function getConfig() {
  if (!config) {
    config = validateConfig();
  }
  return config;
}
try {
  getConfig();
} catch (error) {
  console.error("\u274C Configuration Error:", error instanceof Error ? error.message : String(error));
  console.error("\n\u{1F4A1} Tip: Copy .env.example to .env and fill in the required values.");
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
    process.exit(1);
  }
}

// server/utils/logger.ts
var Logger = class {
  isDevelopment = process.env.NODE_ENV === "development";
  formatMessage(level, message, context) {
    const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : "";
    return `[${timestamp2}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }
  log(level, message, context, error) {
    const formattedMessage = this.formatMessage(level, message, context);
    if (error) {
      const errorContext = {
        ...context,
        error: {
          name: error.name,
          message: error.message,
          stack: this.isDevelopment ? error.stack : void 0
        }
      };
      const errorMessage = this.formatMessage(level, message, errorContext);
      switch (level) {
        case "error":
          console.error(errorMessage);
          break;
        case "warn":
          console.warn(errorMessage);
          break;
        default:
          console.log(errorMessage);
      }
    } else {
      switch (level) {
        case "error":
          console.error(formattedMessage);
          break;
        case "warn":
          console.warn(formattedMessage);
          break;
        case "debug":
          if (this.isDevelopment) {
            console.log(formattedMessage);
          }
          break;
        default:
          console.log(formattedMessage);
      }
    }
  }
  info(message, context) {
    this.log("info", message, context);
  }
  warn(message, context) {
    this.log("warn", message, context);
  }
  error(message, error, context) {
    this.log("error", message, context, error);
  }
  debug(message, context) {
    this.log("debug", message, context);
  }
};
var logger = new Logger();

// server/utils/db-retry.ts
var DEFAULT_OPTIONS = {
  maxRetries: 3,
  initialDelay: 1e3,
  // 1 second
  maxDelay: 1e4,
  // 10 seconds
  backoffMultiplier: 2,
  retryableErrors: [
    "ECONNREFUSED",
    "ETIMEDOUT",
    "ENOTFOUND",
    "ECONNRESET",
    "Connection terminated unexpectedly",
    "Connection closed"
  ]
};
function isRetryableError(error, retryableErrors) {
  if (!(error instanceof Error)) {
    return false;
  }
  const errorMessage = error.message.toLowerCase();
  const errorName = error.name.toLowerCase();
  return retryableErrors.some((retryableError) => {
    const lowerRetryable = retryableError.toLowerCase();
    return errorMessage.includes(lowerRetryable) || errorName.includes(lowerRetryable);
  });
}
function calculateDelay(attempt, options) {
  const delay = options.initialDelay * Math.pow(options.backoffMultiplier, attempt);
  return Math.min(delay, options.maxDelay);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function withRetry(fn, options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError;
  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === opts.maxRetries) {
        break;
      }
      if (!isRetryableError(error, opts.retryableErrors)) {
        logger.debug("Error is not retryable", { error: error instanceof Error ? error.message : String(error) });
        throw error;
      }
      const delay = calculateDelay(attempt, opts);
      logger.warn(`Database operation failed, retrying in ${delay}ms (attempt ${attempt + 1}/${opts.maxRetries})`, {
        error: error instanceof Error ? error.message : String(error),
        attempt: attempt + 1
      });
      await sleep(delay);
    }
  }
  logger.error("Database operation failed after all retries", lastError, {
    maxRetries: opts.maxRetries
  });
  throw lastError;
}

// server/db.ts
neonConfig.webSocketConstructor = ws;
var config2 = getConfig();
var pool = new Pool({
  connectionString: config2.database.url,
  max: 20,
  // Maximum number of clients in the pool
  idleTimeoutMillis: 3e4,
  // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2e3
  // Return an error after 2 seconds if connection cannot be established
});
withRetry(
  async () => {
    await pool.query("SELECT 1");
    logger.info("Database connection established successfully");
  },
  {
    maxRetries: 3,
    initialDelay: 1e3
  }
).catch((error) => {
  logger.error("Failed to connect to database after retries", error);
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
});
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Blog operations
  async getBlogPosts() {
    return withRetry(
      () => db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt))
    );
  }
  async getBlogPostBySlug(slug) {
    const [post] = await withRetry(
      () => db.select().from(blogPosts).where(eq(blogPosts.slug, slug))
    );
    return post || void 0;
  }
  async createBlogPost(post) {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }
  // Solution operations
  async getSolutions() {
    return db.select().from(solutions);
  }
  async getSolutionBySlug(slug) {
    const [solution] = await db.select().from(solutions).where(eq(solutions.slug, slug));
    return solution || void 0;
  }
  async getSolutionFeatures(solutionId) {
    return db.select().from(solutionFeatures).where(eq(solutionFeatures.solutionId, solutionId));
  }
  async createSolution(solution) {
    const [newSolution] = await db.insert(solutions).values(solution).returning();
    return newSolution;
  }
  async createSolutionFeature(feature) {
    const [newFeature] = await db.insert(solutionFeatures).values(feature).returning();
    return newFeature;
  }
  // Contact operations
  async createContactSubmission(submission) {
    const [newSubmission] = await db.insert(contactSubmissions).values({
      ...submission,
      isProcessed: false
    }).returning();
    return newSubmission;
  }
  async getContactSubmissions() {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.submittedAt));
  }
  async markContactSubmissionAsProcessed(id) {
    await db.update(contactSubmissions).set({ isProcessed: true }).where(eq(contactSubmissions.id, id));
  }
  // Newsletter operations
  async subscribeToNewsletter(subscription) {
    const existingSubscription = await this.findSubscriptionByEmail(subscription.email);
    if (existingSubscription) {
      if (!existingSubscription.isActive) {
        await db.update(newsletterSubscriptions).set({ isActive: true }).where(eq(newsletterSubscriptions.id, existingSubscription.id));
        return {
          ...existingSubscription,
          isActive: true
        };
      }
      return existingSubscription;
    }
    const [newSubscription] = await db.insert(newsletterSubscriptions).values(subscription).returning();
    return newSubscription;
  }
  async unsubscribeFromNewsletter(email) {
    await db.update(newsletterSubscriptions).set({ isActive: false }).where(eq(newsletterSubscriptions.email, email));
  }
  async isEmailSubscribed(email) {
    const subscription = await this.findSubscriptionByEmail(email);
    return subscription ? subscription.isActive : false;
  }
  async findSubscriptionByEmail(email) {
    const [subscription] = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email));
    return subscription || void 0;
  }
  // Job application operations
  async createJobApplication(application) {
    const [newApplication] = await withRetry(
      () => db.insert(jobApplications).values(application).returning()
    );
    return newApplication;
  }
  async getJobApplications() {
    return db.select().from(jobApplications).orderBy(desc(jobApplications.submittedAt));
  }
  async markJobApplicationAsProcessed(id) {
    await db.update(jobApplications).set({ isProcessed: true }).where(eq(jobApplications.id, id));
  }
};
var storage = new DatabaseStorage();

// server/services/email.ts
import { MailService } from "@sendgrid/mail";

// server/utils/errors.ts
import { ZodError } from "zod";
var AppError = class extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
var ValidationError = class extends AppError {
  constructor(errors) {
    super(400, "Validation failed");
    this.errors = errors;
    this.name = "ValidationError";
  }
};
var NotFoundError = class extends AppError {
  constructor(resource) {
    super(404, `${resource} not found`);
    this.name = "NotFoundError";
  }
};

// server/services/email.ts
async function sendEmail(apiKey, params) {
  const key = apiKey || process.env.SENDGRID_API_KEY || null;
  if (!key) {
    logger.warn("SendGrid API key not provided, email will not be sent", {
      to: params.to,
      subject: params.subject
    });
    throw new AppError(
      500,
      "Email service not configured. Please contact the administrator."
    );
  }
  try {
    const mailService = new MailService();
    mailService.setApiKey(key);
    const mailData = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || params.html || params.subject
      // Ensure text is always present
    };
    if (params.html) {
      mailData.html = params.html;
    }
    await mailService.send(mailData);
    logger.info("Email sent successfully", {
      to: params.to,
      subject: params.subject
    });
  } catch (error) {
    logger.error("SendGrid email error", error, {
      to: params.to,
      subject: params.subject
    });
    throw new AppError(
      500,
      "Failed to send email. Please try again later."
    );
  }
}

// server/routes.ts
import multer from "multer";

// server/utils/sanitize.ts
function sanitizeString(input) {
  if (typeof input !== "string") {
    return "";
  }
  let sanitized = input.replace(/\0/g, "");
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return sanitized.trim();
}
function sanitizeObject(obj) {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (typeof sanitized[key] === "string") {
      sanitized[key] = sanitizeString(sanitized[key]);
    } else if (typeof sanitized[key] === "object" && sanitized[key] !== null && !Array.isArray(sanitized[key])) {
      sanitized[key] = sanitizeObject(sanitized[key]);
    }
  }
  return sanitized;
}
function sanitizeEmail(email) {
  return sanitizeString(email).toLowerCase().trim();
}
function sanitizePhone(phone) {
  return sanitizeString(phone).replace(/[^\d+]/g, "");
}

// server/utils/file-storage.ts
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
var DEFAULT_CONFIG = {
  uploadDir: "./uploads",
  maxFileSize: 5 * 1024 * 1024,
  // 5MB
  allowedMimeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ]
};
var FileStorageService = class {
  config;
  constructor(config3 = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config3 };
  }
  /**
   * Initialize storage directory
   */
  async initialize() {
    try {
      if (!existsSync(this.config.uploadDir)) {
        await mkdir(this.config.uploadDir, { recursive: true });
        logger.info("Created upload directory", { path: this.config.uploadDir });
      }
    } catch (error) {
      logger.error("Failed to initialize file storage", error);
      throw new AppError(500, "Failed to initialize file storage");
    }
  }
  /**
   * Validate file before upload
   */
  validateFile(file) {
    if (file.size > this.config.maxFileSize) {
      throw new AppError(
        400,
        `File size exceeds maximum allowed size of ${this.config.maxFileSize / 1024 / 1024}MB`
      );
    }
    if (!this.config.allowedMimeTypes.includes(file.mimetype)) {
      throw new AppError(
        400,
        `File type ${file.mimetype} is not allowed. Allowed types: ${this.config.allowedMimeTypes.join(", ")}`
      );
    }
  }
  /**
   * Generate a unique filename to prevent collisions
   */
  generateFileName(originalName) {
    const timestamp2 = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split(".").pop();
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "_");
    return `${nameWithoutExt}_${timestamp2}_${random}.${extension}`;
  }
  /**
   * Save file to storage
   */
  async saveFile(file) {
    this.validateFile(file);
    const fileName = this.generateFileName(file.originalname);
    const filePath = join(this.config.uploadDir, fileName);
    try {
      await writeFile(filePath, file.buffer);
      logger.info("File saved successfully", {
        fileName,
        filePath,
        size: file.size,
        mimeType: file.mimetype
      });
      return {
        fileName,
        filePath,
        fileSize: file.size,
        mimeType: file.mimetype
      };
    } catch (error) {
      logger.error("Failed to save file", error, {
        originalName: file.originalname
      });
      throw new AppError(500, "Failed to save file");
    }
  }
  /**
   * Delete file from storage
   */
  async deleteFile(filePath) {
    try {
      if (existsSync(filePath)) {
        await unlink(filePath);
        logger.info("File deleted successfully", { filePath });
      }
    } catch (error) {
      logger.error("Failed to delete file", error, { filePath });
    }
  }
  /**
   * Get file path for a stored file
   */
  getFilePath(fileName) {
    return join(this.config.uploadDir, fileName);
  }
};
var fileStorage = null;
function getFileStorage() {
  if (!fileStorage) {
    fileStorage = new FileStorageService({
      uploadDir: process.env.UPLOAD_DIR || "./uploads",
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "5242880", 10)
      // 5MB default
    });
  }
  return fileStorage;
}

// server/routes.ts
async function registerRoutes(app2) {
  const fileStorage2 = getFileStorage();
  await fileStorage2.initialize();
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024
      // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type. Only PDF, DOC, and DOCX files are allowed."));
      }
    }
  });
  app2.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app2.get("/api/blog", async (req, res, next) => {
    try {
      const blogPosts2 = await storage.getBlogPosts();
      const formattedPosts = blogPosts2.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt.toISOString(),
        readTime: post.readTime,
        coverImage: post.coverImage,
        author: {
          name: post.authorName,
          role: post.authorRole,
          avatar: post.authorAvatar
        },
        category: post.category
      }));
      res.json(formattedPosts);
    } catch (error) {
      next(error);
    }
  });
  app2.get("/api/blog/:slug", async (req, res, next) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      if (!post) {
        throw new NotFoundError("Blog post");
      }
      const formattedPost = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        publishedAt: post.publishedAt.toISOString(),
        readTime: post.readTime,
        coverImage: post.coverImage,
        author: {
          name: post.authorName,
          role: post.authorRole,
          avatar: post.authorAvatar
        },
        category: post.category
      };
      res.json(formattedPost);
    } catch (error) {
      next(error);
    }
  });
  app2.get("/api/solutions", async (req, res, next) => {
    try {
      const solutions2 = await storage.getSolutions();
      const formattedSolutions = await Promise.all(solutions2.map(async (solution) => {
        const features = await storage.getSolutionFeatures(solution.id);
        return {
          id: solution.id,
          title: solution.title,
          description: solution.description,
          longDescription: solution.longDescription,
          slug: solution.slug,
          color: solution.color,
          isAvailable: solution.isAvailable,
          features: features.map((f) => f.feature)
        };
      }));
      res.json(formattedSolutions);
    } catch (error) {
      next(error);
    }
  });
  app2.get("/api/solutions/:slug", async (req, res, next) => {
    try {
      const { slug } = req.params;
      const solution = await storage.getSolutionBySlug(slug);
      if (!solution) {
        throw new NotFoundError("Solution");
      }
      const features = await storage.getSolutionFeatures(solution.id);
      const formattedSolution = {
        id: solution.id,
        title: solution.title,
        description: solution.description,
        longDescription: solution.longDescription,
        slug: solution.slug,
        color: solution.color,
        isAvailable: solution.isAvailable,
        features: features.map((f) => f.feature)
      };
      res.json(formattedSolution);
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/contact", async (req, res, next) => {
    try {
      const sanitizedBody = sanitizeObject(req.body);
      const validatedData = contactFormSchema.parse(sanitizedBody);
      validatedData.email = sanitizeEmail(validatedData.email);
      if (validatedData.phone) {
        validatedData.phone = sanitizePhone(validatedData.phone);
      }
      const submission = await storage.createContactSubmission(validatedData);
      const config3 = getConfig();
      try {
        const emailContent = `
          New contact form submission:
          
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          Phone: ${validatedData.phone || "Not provided"}
          Company: ${validatedData.company || "Not provided"}
          
          Message:
          ${validatedData.message}
        `;
        await sendEmail(
          config3.email.sendgridApiKey,
          {
            to: "info@haydeentech.com",
            from: config3.email.from,
            subject: "New Contact Form Submission - Haydeen Technologies",
            text: emailContent
          }
        );
      } catch (emailError) {
        logger.error("Failed to send contact form notification email", emailError, {
          submissionId: submission.id
        });
      }
      try {
        const userEmailContent = `
          Dear ${validatedData.name},
          
          Thank you for contacting Haydeen Technologies. We have received your message and will get back to you as soon as possible.
          
          Best regards,
          The Haydeen Technologies Team
        `;
        await sendEmail(
          config3.email.sendgridApiKey,
          {
            to: validatedData.email,
            from: config3.email.from,
            subject: "Thank You for Contacting Haydeen Technologies",
            text: userEmailContent
          }
        );
      } catch (emailError) {
        logger.warn("Failed to send confirmation email to user", {
          email: validatedData.email,
          submissionId: submission.id
        });
      }
      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        submissionId: submission.id
      });
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/newsletter/subscribe", async (req, res, next) => {
    try {
      const sanitizedBody = sanitizeObject(req.body);
      const validatedData = newsletterSubscriptionFormSchema.parse(sanitizedBody);
      validatedData.email = sanitizeEmail(validatedData.email);
      const isSubscribed = await storage.isEmailSubscribed(validatedData.email);
      if (isSubscribed) {
        return res.json({
          success: true,
          message: "Email is already subscribed to the newsletter"
        });
      }
      const subscription = await storage.subscribeToNewsletter(validatedData);
      const config3 = getConfig();
      try {
        const emailContent = `
          Dear Subscriber,
          
          Thank you for subscribing to the Haydeen Technologies newsletter. You'll now receive updates on our solutions, industry insights, and upcoming events.
          
          If you did not request this subscription, please click here to unsubscribe:
          https://haydeentech.com/newsletter/unsubscribe?email=${encodeURIComponent(validatedData.email)}
          
          Best regards,
          The Haydeen Technologies Team
        `;
        await sendEmail(
          config3.email.sendgridApiKey,
          {
            to: validatedData.email,
            from: config3.email.from,
            subject: "Welcome to the Haydeen Technologies Newsletter",
            text: emailContent
          }
        );
      } catch (emailError) {
        logger.warn("Failed to send newsletter confirmation email", {
          email: validatedData.email,
          subscriptionId: subscription.id
        });
      }
      res.status(201).json({
        success: true,
        message: "Successfully subscribed to the newsletter",
        subscriptionId: subscription.id
      });
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/newsletter/unsubscribe", async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== "string") {
        throw new ValidationError([{
          path: ["email"],
          message: "Valid email address is required",
          code: "custom"
        }]);
      }
      await storage.unsubscribeFromNewsletter(email);
      res.json({
        success: true,
        message: "Successfully unsubscribed from the newsletter"
      });
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/job-applications", upload.single("cvFile"), async (req, res, next) => {
    try {
      const sanitizedBody = sanitizeObject(req.body);
      const formData = {
        position: sanitizedBody.position,
        firstName: sanitizedBody.firstName,
        lastName: sanitizedBody.lastName,
        email: sanitizedBody.email,
        phone: sanitizedBody.phone,
        location: sanitizedBody.location,
        university: sanitizedBody.university || null,
        studyField: sanitizedBody.studyField || null,
        graduationYear: sanitizedBody.graduationYear || null,
        experience: sanitizedBody.experience || null,
        motivation: sanitizedBody.motivation
      };
      const validatedData = jobApplicationFormSchema.omit({ cvFile: true }).parse(formData);
      validatedData.email = sanitizeEmail(validatedData.email);
      validatedData.phone = sanitizePhone(validatedData.phone);
      let cvFileName = null;
      let cvFilePath = null;
      if (req.file) {
        try {
          const fileResult = await fileStorage2.saveFile({
            buffer: req.file.buffer,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
          });
          cvFileName = fileResult.fileName;
          cvFilePath = fileResult.filePath;
          logger.info("CV file saved", {
            fileName: cvFileName,
            originalName: req.file.originalname,
            size: req.file.size
          });
        } catch (fileError) {
          logger.error("Failed to save CV file", fileError);
        }
      }
      const applicationData = {
        ...validatedData,
        cvFileName: cvFileName || null,
        cvFileData: cvFilePath || null
        // Store file path instead of base64
      };
      const application = await storage.createJobApplication(applicationData);
      const config3 = getConfig();
      try {
        const emailContent = `
          New job application received:
          
          Position: ${validatedData.position}
          Name: ${validatedData.firstName} ${validatedData.lastName}
          Email: ${validatedData.email}
          Phone: ${validatedData.phone}
          Location: ${validatedData.location}
          University: ${validatedData.university || "Not provided"}
          Field of Study: ${validatedData.studyField || "Not provided"}
          Graduation Year: ${validatedData.graduationYear || "Not provided"}
          
          Experience:
          ${validatedData.experience || "Not provided"}
          
          Motivation:
          ${validatedData.motivation}
          
          CV: ${cvFileName ? "Attached" : "Not provided"}
          
          Application ID: ${application.id}
        `;
        await sendEmail(
          config3.email.sendgridApiKey,
          {
            to: "careers@haydeentech.com",
            from: config3.email.from,
            subject: `New Application: ${validatedData.position} - ${validatedData.firstName} ${validatedData.lastName}`,
            text: emailContent
          }
        );
      } catch (emailError) {
        logger.error("Failed to send job application notification email", emailError, {
          applicationId: application.id
        });
      }
      try {
        const confirmationContent = `
          Dear ${validatedData.firstName},
          
          Thank you for applying for the ${validatedData.position} position at Haydeen Technologies. We have received your application and will review it carefully.
          
          We appreciate your interest in joining our team and helping us build innovative solutions for Ghana's agricultural and healthcare sectors. Our team will review your application and get back to you within 1-2 weeks.
          
          If you have any questions in the meantime, please don't hesitate to contact us.
          
          Best regards,
          The Haydeen Technologies Team
          
          Application Details:
          - Position: ${validatedData.position}
          - Application ID: ${application.id}
          - Submitted: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}
        `;
        await sendEmail(
          config3.email.sendgridApiKey,
          {
            to: validatedData.email,
            from: config3.email.from,
            subject: "Application Received - Haydeen Technologies",
            text: confirmationContent
          }
        );
      } catch (emailError) {
        logger.warn("Failed to send job application confirmation email", {
          email: validatedData.email,
          applicationId: application.id
        });
      }
      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        applicationId: application.id
      });
    } catch (error) {
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          res.status(400).json({
            success: false,
            error: {
              message: "File too large. Maximum size is 5MB.",
              code: "FILE_TOO_LARGE"
            }
          });
        } else {
          res.status(400).json({
            success: false,
            error: {
              message: "File upload error: " + error.message,
              code: "FILE_UPLOAD_ERROR"
            }
          });
        }
      } else {
        next(error);
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// api/handler.ts
var app = express();
app.set("trust proxy", 1);
var generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 100,
  // Lower limit for serverless
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});
var contactLimiter = rateLimit({
  windowMs: 5 * 60 * 1e3,
  // 5 minutes
  max: 3,
  message: "Too many contact form submissions, please try again later.",
  standardHeaders: true,
  legacyHeaders: false
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
  res.setHeader("Content-Security-Policy", "default-src 'self'; base-uri 'self'; object-src 'none'; img-src 'self' data: blob: https://images.unsplash.com https://*.unsplash.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.vercel.app https://*.vercel.com https:; frame-ancestors 'none';");
  res.removeHeader("X-Powered-By");
  next();
});
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
var routesInitialized = false;
var initPromise = (async () => {
  try {
    await registerRoutes(app);
    routesInitialized = true;
    logger.info("Routes registered successfully");
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Failed to register routes:", error);
    } else {
      logger.error("Failed to register routes: (non-Error) " + String(error));
    }
    app.get("/api/*", (req, res) => {
      res.status(503).json({
        success: false,
        error: {
          message: "Service temporarily unavailable. Please check environment variables.",
          code: "CONFIG_ERROR"
        }
      });
    });
  }
})();
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.use((err, req, res, next) => {
  logger.error("API Error:", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      ...process.env.NODE_ENV === "development" && { stack: err.stack }
    }
  });
});
async function handler(req, res) {
  await initPromise;
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(void 0);
      }
    });
  });
}
export {
  handler as default
};
