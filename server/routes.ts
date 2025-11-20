import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./services/email";
import { 
  contactFormSchema, 
  newsletterSubscriptionFormSchema,
  jobApplicationFormSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import multer from "multer";
import { logger } from "./utils/logger";
import { handleError, ValidationError, NotFoundError } from "./utils/errors";
import { getConfig } from "./config";
import { sanitizeString, sanitizeEmail, sanitizePhone, sanitizeObject } from "./utils/sanitize";
import { getFileStorage } from "./utils/file-storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize file storage
  const fileStorage = getFileStorage();
  await fileStorage.initialize();

  // Configure multer for file uploads (memory storage for processing)
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
      }
    },
  });

  // API Routes - all prefixed with /api
  
  // Blog routes
  app.get("/api/blog", async (req, res, next) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      
      // Transform to client format
      const formattedPosts = blogPosts.map(post => ({
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

  app.get("/api/blog/:slug", async (req, res, next) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        throw new NotFoundError('Blog post');
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
      
      res.json(formattedPost);
    } catch (error) {
      next(error);
    }
  });

  // Solutions routes
  app.get("/api/solutions", async (req, res, next) => {
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
      
      res.json(formattedSolutions);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/solutions/:slug", async (req, res, next) => {
    try {
      const { slug } = req.params;
      const solution = await storage.getSolutionBySlug(slug);
      
      if (!solution) {
        throw new NotFoundError('Solution');
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
      
      res.json(formattedSolution);
    } catch (error) {
      next(error);
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res, next) => {
    try {
      // Sanitize input before validation
      const sanitizedBody = sanitizeObject(req.body);
      
      // Validate request body
      const validatedData = contactFormSchema.parse(sanitizedBody);
      
      // Additional sanitization for specific fields
      validatedData.email = sanitizeEmail(validatedData.email);
      if (validatedData.phone) {
        validatedData.phone = sanitizePhone(validatedData.phone);
      }
      
      // Save to storage
      const submission = await storage.createContactSubmission(validatedData);
      
      const config = getConfig();
      
      // Send email notification (non-blocking - don't fail if email fails)
      try {
        const emailContent = `
          New contact form submission:
          
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          Phone: ${validatedData.phone || 'Not provided'}
          Company: ${validatedData.company || 'Not provided'}
          
          Message:
          ${validatedData.message}
        `;
        
        await sendEmail(
          config.email.sendgridApiKey,
          {
            to: "info@haydeentech.com",
            from: config.email.from,
            subject: "New Contact Form Submission - Haydeen Technologies",
            text: emailContent,
          }
        );
      } catch (emailError) {
        // Log email error but don't fail the request
        logger.error("Failed to send contact form notification email", emailError as Error, {
          submissionId: submission.id,
        });
      }
      
      // Send confirmation email to user (non-blocking)
      try {
        const userEmailContent = `
          Dear ${validatedData.name},
          
          Thank you for contacting Haydeen Technologies. We have received your message and will get back to you as soon as possible.
          
          Best regards,
          The Haydeen Technologies Team
        `;
        
        await sendEmail(
          config.email.sendgridApiKey,
          {
            to: validatedData.email,
            from: config.email.from,
            subject: "Thank You for Contacting Haydeen Technologies",
            text: userEmailContent,
          }
        );
      } catch (emailError) {
        // Log email error but don't fail the request
        logger.warn("Failed to send confirmation email to user", {
          email: validatedData.email,
          submissionId: submission.id,
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

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res, next) => {
    try {
      // Sanitize input before validation
      const sanitizedBody = sanitizeObject(req.body);
      
      // Validate request body
      const validatedData = newsletterSubscriptionFormSchema.parse(sanitizedBody);
      
      // Additional sanitization
      validatedData.email = sanitizeEmail(validatedData.email);
      
      // Check if already subscribed
      const isSubscribed = await storage.isEmailSubscribed(validatedData.email);
      
      if (isSubscribed) {
        return res.json({
          success: true,
          message: "Email is already subscribed to the newsletter"
        });
      }
      
      // Save subscription
      const subscription = await storage.subscribeToNewsletter(validatedData);
      
      const config = getConfig();
      
      // Send confirmation email (non-blocking)
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
          config.email.sendgridApiKey,
          {
            to: validatedData.email,
            from: config.email.from,
            subject: "Welcome to the Haydeen Technologies Newsletter",
            text: emailContent,
          }
        );
      } catch (emailError) {
        logger.warn("Failed to send newsletter confirmation email", {
          email: validatedData.email,
          subscriptionId: subscription.id,
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

  app.post("/api/newsletter/unsubscribe", async (req, res, next) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        throw new ValidationError(new ZodError([{
          path: ['email'],
          message: 'Valid email address is required',
          code: 'custom',
        }]));
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

  // Job application submission
  app.post("/api/job-applications", upload.single('cvFile'), async (req, res, next) => {
    try {
      // Sanitize form data (excluding file)
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
        motivation: sanitizedBody.motivation,
      };

      const validatedData = jobApplicationFormSchema.omit({ cvFile: true }).parse(formData);
      
      // Additional sanitization for specific fields
      validatedData.email = sanitizeEmail(validatedData.email);
      validatedData.phone = sanitizePhone(validatedData.phone);
      
      // Handle CV file if uploaded - use file storage instead of base64
      let cvFileName = null;
      let cvFilePath = null;
      
      if (req.file) {
        try {
          const fileResult = await fileStorage.saveFile({
            buffer: req.file.buffer,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
          });
          
          cvFileName = fileResult.fileName;
          cvFilePath = fileResult.filePath;
          
          logger.info('CV file saved', {
            fileName: cvFileName,
            originalName: req.file.originalname,
            size: req.file.size,
          });
        } catch (fileError) {
          logger.error('Failed to save CV file', fileError as Error);
          // Continue without file - don't fail the entire application
        }
      }

      // Save to storage
      // Note: For now, we'll store the file path. In the future, you might want to:
      // 1. Store only the file name and reconstruct path when needed
      // 2. Use cloud storage (S3, Cloudinary) and store the URL
      // 3. Keep base64 as fallback for small files if needed
      const applicationData = {
        ...validatedData,
        cvFileName: cvFileName || null,
        cvFileData: cvFilePath || null, // Store file path instead of base64
      };

      const application = await storage.createJobApplication(applicationData);
      
      const config = getConfig();
      
      // Send email notification to company (non-blocking)
      try {
        const emailContent = `
          New job application received:
          
          Position: ${validatedData.position}
          Name: ${validatedData.firstName} ${validatedData.lastName}
          Email: ${validatedData.email}
          Phone: ${validatedData.phone}
          Location: ${validatedData.location}
          University: ${validatedData.university || 'Not provided'}
          Field of Study: ${validatedData.studyField || 'Not provided'}
          Graduation Year: ${validatedData.graduationYear || 'Not provided'}
          
          Experience:
          ${validatedData.experience || 'Not provided'}
          
          Motivation:
          ${validatedData.motivation}
          
          CV: ${cvFileName ? 'Attached' : 'Not provided'}
          
          Application ID: ${application.id}
        `;
        
        await sendEmail(
          config.email.sendgridApiKey,
          {
            to: "careers@haydeentech.com",
            from: config.email.from,
            subject: `New Application: ${validatedData.position} - ${validatedData.firstName} ${validatedData.lastName}`,
            text: emailContent,
          }
        );
      } catch (emailError) {
        logger.error("Failed to send job application notification email", emailError as Error, {
          applicationId: application.id,
        });
      }
      
      // Send confirmation email to applicant (non-blocking)
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
          - Submitted: ${new Date().toLocaleDateString()}
        `;
        
        await sendEmail(
          config.email.sendgridApiKey,
          {
            to: validatedData.email,
            from: config.email.from,
            subject: "Application Received - Haydeen Technologies",
            text: confirmationContent,
          }
        );
      } catch (emailError) {
        logger.warn("Failed to send job application confirmation email", {
          email: validatedData.email,
          applicationId: application.id,
        });
      }
      
      res.status(201).json({ 
        success: true,
        message: "Application submitted successfully",
        applicationId: application.id
      });
    } catch (error) {
      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({ 
            success: false,
            error: {
              message: "File too large. Maximum size is 5MB.",
              code: 'FILE_TOO_LARGE',
            }
          });
        } else {
          res.status(400).json({ 
            success: false,
            error: {
              message: "File upload error: " + error.message,
              code: 'FILE_UPLOAD_ERROR',
            }
          });
        }
      } else {
        next(error);
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
