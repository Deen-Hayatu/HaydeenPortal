import type { Express } from "express";
import { storage } from "./storage";
import { sendEmail } from "./services/email";
import { 
  contactFormSchema, 
  newsletterSubscriptionFormSchema,
  jobApplicationFormSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import multer from "multer";
import rateLimit from "express-rate-limit";
import { logger } from "./utils/logger";
import { sendSuccess, sendError, sendPaginated } from "./utils/response";
import { validateSlug } from "./middleware/validation";
import { slugSchema, paginationSchema } from "./utils/validation";
import { sanitizeFileName } from "./utils/sanitize";
import {
  createContactNotificationEmail,
  createContactConfirmationEmail,
  createNewsletterSubscriptionEmail,
  createJobApplicationNotificationEmail,
  createJobApplicationConfirmationEmail,
} from "./utils/email-templates";

// Rate limiters
const newsletterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 subscriptions per 15 minutes
  message: 'Too many newsletter subscription attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const jobApplicationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 applications per hour
  message: 'Too many job application submissions, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const unsubscribeLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 unsubscribe attempts per 5 minutes
  standardHeaders: true,
  legacyHeaders: false,
});

export function registerRoutes(app: Express): void {
  // Configure multer for file uploads with improved security
  const upload = multer({
    storage: multer.memoryStorage(), // Store in memory temporarily
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      // Check MIME type
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
      }
      
      // Additional validation: check file extension
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
      if (!allowedExtensions.includes(fileExtension)) {
        return cb(new Error('Invalid file extension. Only PDF, DOC, and DOCX files are allowed.'));
      }
      
      cb(null, true);
    },
  });

  // API Routes - all prefixed with /api
  
  // Blog routes with pagination
  app.get("/api/blog", async (req, res) => {
    try {
      const pagination = paginationSchema.parse({
        page: req.query.page || 1,
        limit: req.query.limit || 10,
      });

      const allPosts = await storage.getBlogPosts();
      const total = allPosts.length;
      const startIndex = (pagination.page - 1) * pagination.limit;
      const endIndex = startIndex + pagination.limit;
      const paginatedPosts = allPosts.slice(startIndex, endIndex);
      
      // Transform to client format
      const formattedPosts = paginatedPosts.map(post => ({
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
      
      sendPaginated(res, formattedPosts, pagination.page, pagination.limit, total);
    } catch (error) {
      logger.error("Error fetching blog posts", "routes", error as Error);
      sendError(res, "Failed to fetch blog posts", 500);
    }
  });

  // Blog post by slug with validation
  app.get("/api/blog/:slug", validateSlug, async (req, res) => {
    try {
      const slug = slugSchema.parse(req.params.slug);
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return sendError(res, "Blog post not found", 404);
      }
      
      // Transform to client format
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
      
      sendSuccess(res, formattedPost);
    } catch (error) {
      if (error instanceof ZodError) {
        sendError(res, "Invalid slug format", 400);
      } else {
        logger.error("Error fetching blog post", "routes", error as Error);
        sendError(res, "Failed to fetch blog post", 500);
      }
    }
  });

  // Solutions routes
  app.get("/api/solutions", async (req, res) => {
    try {
      const solutions = await storage.getSolutions();
      
      // Get features for each solution and format the response
      const formattedSolutions = await Promise.all(solutions.map(async (solution) => {
        const features = await storage.getSolutionFeatures(solution.id);
        return {
          id: solution.id,
          title: solution.title,
          description: solution.description,
          longDescription: solution.longDescription,
          slug: solution.slug,
          color: solution.color,
          isAvailable: solution.isAvailable,
          features: features.map(f => f.feature)
        };
      }));
      
      sendSuccess(res, formattedSolutions);
    } catch (error) {
      logger.error("Error fetching solutions", "routes", error as Error);
      sendError(res, "Failed to fetch solutions", 500);
    }
  });

  // Solution by slug with validation
  app.get("/api/solutions/:slug", validateSlug, async (req, res) => {
    try {
      const slug = slugSchema.parse(req.params.slug);
      const solution = await storage.getSolutionBySlug(slug);
      
      if (!solution) {
        return sendError(res, "Solution not found", 404);
      }
      
      const features = await storage.getSolutionFeatures(solution.id);
      
      // Format the response
      const formattedSolution = {
        id: solution.id,
        title: solution.title,
        description: solution.description,
        longDescription: solution.longDescription,
        slug: solution.slug,
        color: solution.color,
        isAvailable: solution.isAvailable,
        features: features.map(f => f.feature)
      };
      
      sendSuccess(res, formattedSolution);
    } catch (error) {
      if (error instanceof ZodError) {
        sendError(res, "Invalid slug format", 400);
      } else {
        logger.error("Error fetching solution", "routes", error as Error);
        sendError(res, "Failed to fetch solution", 500);
      }
    }
  });

  // Contact form submission (rate limiting applied in server/index.ts)
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Save to storage
      const submission = await storage.createContactSubmission(validatedData);
      
      // Get email addresses from environment
      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO || "info@haydeentech.com";
      const fromEmail = process.env.EMAIL_FROM || "noreply@haydeentech.com";
      
      // Send email notification using sanitized templates
      const emailContent = createContactNotificationEmail(validatedData);
      
      await sendEmail(
        process.env.SENDGRID_API_KEY || "",
        {
          to: adminEmail,
          from: fromEmail,
          subject: "New Contact Form Submission - Haydeen Technologies",
          text: emailContent,
        }
      );
      
      // Send confirmation email to user
      const userEmailContent = createContactConfirmationEmail(validatedData.name);
      
      await sendEmail(
        process.env.SENDGRID_API_KEY || "",
        {
          to: validatedData.email,
          from: fromEmail,
          subject: "Thank You for Contacting Haydeen Technologies",
          text: userEmailContent,
        }
      );
      
      sendSuccess(res, { submissionId: submission.id }, "Contact form submitted successfully", 201);
    } catch (error) {
      if (error instanceof ZodError) {
        sendError(res, "Validation error", 400, error.errors[0]?.message);
      } else {
        logger.error("Error processing contact form", "routes", error as Error);
        sendError(res, "Failed to process contact form", 500);
      }
    }
  });

  // Newsletter subscription with rate limiting
  app.post("/api/newsletter/subscribe", newsletterLimiter, async (req, res) => {
    try {
      // Validate request body
      const validatedData = newsletterSubscriptionFormSchema.parse(req.body);
      
      // Check if already subscribed
      const isSubscribed = await storage.isEmailSubscribed(validatedData.email);
      
      if (isSubscribed) {
        return sendSuccess(res, null, "Email is already subscribed to the newsletter");
      }
      
      // Save subscription
      const subscription = await storage.subscribeToNewsletter(validatedData);
      
      // Create unsubscribe URL
      const baseUrl = process.env.BASE_URL || "https://haydeentechnologies.com";
      const unsubscribeUrl = `${baseUrl}/newsletter/unsubscribe?email=${encodeURIComponent(validatedData.email)}`;
      
      // Send confirmation email using sanitized template
      const emailContent = createNewsletterSubscriptionEmail(validatedData.email, unsubscribeUrl);
      const fromEmail = process.env.EMAIL_FROM || "noreply@haydeentech.com";
      
      await sendEmail(
        process.env.SENDGRID_API_KEY || "",
        {
          to: validatedData.email,
          from: fromEmail,
          subject: "Welcome to the Haydeen Technologies Newsletter",
          text: emailContent,
        }
      );
      
      sendSuccess(res, { subscriptionId: subscription.id }, "Successfully subscribed to the newsletter", 201);
    } catch (error) {
      if (error instanceof ZodError) {
        sendError(res, "Validation error", 400, error.errors[0]?.message);
      } else {
        logger.error("Error processing newsletter subscription", "routes", error as Error);
        sendError(res, "Failed to process newsletter subscription", 500);
      }
    }
  });

  // Newsletter unsubscribe with rate limiting
  app.post("/api/newsletter/unsubscribe", unsubscribeLimiter, async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return sendError(res, "Valid email address is required", 400);
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return sendError(res, "Invalid email address format", 400);
      }
      
      await storage.unsubscribeFromNewsletter(email);
      
      sendSuccess(res, null, "Successfully unsubscribed from the newsletter");
    } catch (error) {
      logger.error("Error processing newsletter unsubscription", "routes", error as Error);
      sendError(res, "Failed to process newsletter unsubscription", 500);
    }
  });

  // Job application submission with rate limiting and improved file handling
  app.post("/api/job-applications", jobApplicationLimiter, upload.single('cvFile'), async (req, res) => {
    try {
      // Validate form data (excluding file)
      const formData = {
        position: req.body.position,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        university: req.body.university || null,
        studyField: req.body.studyField || null,
        graduationYear: req.body.graduationYear || null,
        experience: req.body.experience || null,
        motivation: req.body.motivation,
      };

      const validatedData = jobApplicationFormSchema.omit({ cvFile: true }).parse(formData);
      
      // Handle CV file if uploaded
      let cvFileName = null;
      let cvFileData = null;
      
      if (req.file) {
        // Sanitize file name
        cvFileName = sanitizeFileName(req.file.originalname);
        
        // TODO: In production, upload to cloud storage (S3, Cloudinary) instead of storing in DB
        // For now, store as base64 but this should be changed
        cvFileData = req.file.buffer.toString('base64');
        
        // Log file upload for security monitoring
        logger.info("CV file uploaded", "routes", {
          fileName: cvFileName,
          size: req.file.size,
          mimeType: req.file.mimetype,
        });
      }

      // Save to storage
      const applicationData = {
        ...validatedData,
        cvFileName,
        cvFileData,
      };

      const application = await storage.createJobApplication(applicationData);
      
      // Get email addresses from environment
      const careersEmail = process.env.CAREERS_EMAIL || process.env.EMAIL_TO || "careers@haydeentech.com";
      const fromEmail = process.env.EMAIL_FROM || "noreply@haydeentech.com";
      
      // Send email notification using sanitized template
      const emailContent = createJobApplicationNotificationEmail({
        ...validatedData,
        applicationId: application.id,
        cvFileName: cvFileName || undefined,
      });
      
      await sendEmail(
        process.env.SENDGRID_API_KEY || "",
        {
          to: careersEmail,
          from: fromEmail,
          subject: `New Application: ${validatedData.position} - ${validatedData.firstName} ${validatedData.lastName}`,
          text: emailContent,
        }
      );
      
      // Send confirmation email to applicant using sanitized template
      const confirmationContent = createJobApplicationConfirmationEmail({
        firstName: validatedData.firstName,
        position: validatedData.position,
        applicationId: application.id,
      });
      
      await sendEmail(
        process.env.SENDGRID_API_KEY || "",
        {
          to: validatedData.email,
          from: fromEmail,
          subject: "Application Received - Haydeen Technologies",
          text: confirmationContent,
        }
      );
      
      sendSuccess(res, { applicationId: application.id }, "Application submitted successfully", 201);
    } catch (error) {
      if (error instanceof ZodError) {
        sendError(res, "Validation error", 400, error.errors[0]?.message);
      } else if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          sendError(res, "File too large. Maximum size is 5MB.", 400);
        } else {
          sendError(res, `File upload error: ${error.message}`, 400);
        }
      } else {
        logger.error("Error processing job application", "routes", error as Error);
        sendError(res, "Failed to process job application", 500);
      }
    }
  });
}
