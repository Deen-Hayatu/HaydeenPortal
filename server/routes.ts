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

export function registerRoutes(app: Express): void {
  // Configure multer for file uploads
  const upload = multer({
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
  app.get("/api/blog", async (req, res) => {
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
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
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
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
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
      
      res.json(formattedSolutions);
    } catch (error) {
      console.error("Error fetching solutions:", error);
      res.status(500).json({ message: "Failed to fetch solutions" });
    }
  });

  app.get("/api/solutions/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const solution = await storage.getSolutionBySlug(slug);
      
      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
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
      console.error("Error fetching solution:", error);
      res.status(500).json({ message: "Failed to fetch solution" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Save to storage
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notification
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
        process.env.SENDGRID_API_KEY || "",
        {
          to: "info@haydeentech.com",
          from: process.env.EMAIL_FROM || "noreply@haydeentech.com",
          subject: "New Contact Form Submission - Haydeen Technologies",
          text: emailContent,
        }
      );
      
      // Send confirmation email to user
      const userEmailContent = `
        Dear ${validatedData.name},
        
        Thank you for contacting Haydeen Technologies. We have received your message and will get back to you as soon as possible.
        
        Best regards,
        The Haydeen Technologies Team
      `;
      
      await sendEmail(
        process.env.SENDGRID_API_KEY || "",
        {
          to: validatedData.email,
          from: process.env.EMAIL_FROM || "noreply@haydeentech.com",
          subject: "Thank You for Contacting Haydeen Technologies",
          text: userEmailContent,
        }
      );
      
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        submissionId: submission.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error processing contact form:", error);
        res.status(500).json({ message: "Failed to process contact form" });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      // Validate request body
      const validatedData = newsletterSubscriptionFormSchema.parse(req.body);
      
      // Check if already subscribed
      const isSubscribed = await storage.isEmailSubscribed(validatedData.email);
      
      if (isSubscribed) {
        return res.json({
          message: "Email is already subscribed to the newsletter"
        });
      }
      
      // Save subscription
      const subscription = await storage.subscribeToNewsletter(validatedData);
      
      // Send confirmation email
      const emailContent = `
        Dear Subscriber,
        
        Thank you for subscribing to the Haydeen Technologies newsletter. You'll now receive updates on our solutions, industry insights, and upcoming events.
        
        If you did not request this subscription, please click here to unsubscribe:
        https://haydeentech.com/newsletter/unsubscribe?email=${encodeURIComponent(validatedData.email)}
        
        Best regards,
        The Haydeen Technologies Team
      `;
      
      await sendEmail(
        process.env.SENDGRID_API_KEY || "",
        {
          to: validatedData.email,
          from: process.env.EMAIL_FROM || "noreply@haydeentech.com",
          subject: "Welcome to the Haydeen Technologies Newsletter",
          text: emailContent,
        }
      );
      
      res.status(201).json({ 
        message: "Successfully subscribed to the newsletter",
        subscriptionId: subscription.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error processing newsletter subscription:", error);
        res.status(500).json({ message: "Failed to process newsletter subscription" });
      }
    }
  });

  app.post("/api/newsletter/unsubscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Valid email address is required" });
      }
      
      await storage.unsubscribeFromNewsletter(email);
      
      res.json({ message: "Successfully unsubscribed from the newsletter" });
    } catch (error) {
      console.error("Error processing newsletter unsubscription:", error);
      res.status(500).json({ message: "Failed to process newsletter unsubscription" });
    }
  });

  // Job application submission
  app.post("/api/job-applications", upload.single('cvFile'), async (req, res) => {
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
        cvFileName = req.file.originalname;
        cvFileData = req.file.buffer.toString('base64');
      }

      // Save to storage
      const applicationData = {
        ...validatedData,
        cvFileName,
        cvFileData,
      };

      const application = await storage.createJobApplication(applicationData);
      
      // Send email notification to company
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
        process.env.SENDGRID_API_KEY || "",
        {
          to: "careers@haydeentech.com",
          from: process.env.EMAIL_FROM || "noreply@haydeentech.com",
          subject: `New Application: ${validatedData.position} - ${validatedData.firstName} ${validatedData.lastName}`,
          text: emailContent,
        }
      );
      
      // Send confirmation email to applicant
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
        process.env.SENDGRID_API_KEY || "",
        {
          to: validatedData.email,
          from: process.env.EMAIL_FROM || "noreply@haydeentech.com",
          subject: "Application Received - Haydeen Technologies",
          text: confirmationContent,
        }
      );
      
      res.status(201).json({ 
        message: "Application submitted successfully",
        applicationId: application.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({ message: "File too large. Maximum size is 5MB." });
        } else {
          res.status(400).json({ message: "File upload error: " + error.message });
        }
      } else {
        console.error("Error processing job application:", error);
        res.status(500).json({ message: "Failed to process job application" });
      }
    }
  });
  }
