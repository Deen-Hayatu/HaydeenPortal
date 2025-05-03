import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./services/email";
import { 
  contactFormSchema, 
  newsletterSubscriptionFormSchema,
  createTicketFormSchema,
  addTicketMessageSchema
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Support Ticket System API Routes
  
  // Create a new support ticket
  app.post("/api/support/tickets", async (req, res) => {
    try {
      // Validate request body
      const validatedData = createTicketFormSchema.parse(req.body);
      
      // Save to storage
      const ticket = await storage.createSupportTicket(validatedData);
      
      // Format response
      const response = {
        id: ticket.id,
        subject: ticket.subject,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        customerName: ticket.customerName,
        customerEmail: ticket.customerEmail,
        createdAt: ticket.createdAt.toISOString(),
        updatedAt: ticket.updatedAt.toISOString(),
      };
      
      // Send confirmation email to customer
      const emailContent = `
        Dear ${validatedData.customerName},
        
        Thank you for submitting a support ticket to Haydeen Technologies. Your ticket has been received with the following details:
        
        Ticket ID: ${ticket.id}
        Subject: ${ticket.subject}
        Priority: ${ticket.priority}
        Status: ${ticket.status}
        
        We will review your ticket and respond as soon as possible. You can check the status of your ticket by visiting our support portal.
        
        Best regards,
        The Haydeen Technologies Support Team
      `;
      
      try {
        await sendEmail(
          process.env.SENDGRID_API_KEY || "",
          {
            to: validatedData.customerEmail,
            from: process.env.EMAIL_FROM || "support@haydeentech.com",
            subject: `Support Ticket #${ticket.id} - ${ticket.subject}`,
            text: emailContent,
          }
        );
      } catch (emailError) {
        console.error("Error sending ticket confirmation email:", emailError);
        // Continue with the ticket creation even if email fails
      }
      
      res.status(201).json({
        message: "Support ticket created successfully",
        ticket: response
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating support ticket:", error);
        res.status(500).json({ message: "Failed to create support ticket" });
      }
    }
  });
  
  // Get all support tickets
  app.get("/api/support/tickets", async (req, res) => {
    try {
      // Check for customer email filter
      const { email } = req.query;
      
      let tickets;
      if (email && typeof email === 'string') {
        tickets = await storage.getSupportTicketsByEmail(email);
      } else {
        tickets = await storage.getSupportTickets();
      }
      
      // Format response
      const formattedTickets = tickets.map(ticket => ({
        id: ticket.id,
        subject: ticket.subject,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        customerName: ticket.customerName,
        customerEmail: ticket.customerEmail,
        createdAt: ticket.createdAt.toISOString(),
        updatedAt: ticket.updatedAt.toISOString(),
      }));
      
      res.json(formattedTickets);
    } catch (error) {
      console.error("Error fetching support tickets:", error);
      res.status(500).json({ message: "Failed to fetch support tickets" });
    }
  });
  
  // Get a single support ticket by ID
  app.get("/api/support/tickets/:id", async (req, res) => {
    try {
      const ticketId = parseInt(req.params.id);
      
      if (isNaN(ticketId)) {
        return res.status(400).json({ message: "Invalid ticket ID" });
      }
      
      const ticket = await storage.getSupportTicketById(ticketId);
      
      if (!ticket) {
        return res.status(404).json({ message: "Support ticket not found" });
      }
      
      // Get messages for this ticket
      const messages = await storage.getTicketMessages(ticket.id);
      
      // Format response
      const formattedTicket = {
        id: ticket.id,
        subject: ticket.subject,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        customerName: ticket.customerName,
        customerEmail: ticket.customerEmail,
        createdAt: ticket.createdAt.toISOString(),
        updatedAt: ticket.updatedAt.toISOString(),
        messages: messages.map(msg => ({
          id: msg.id,
          message: msg.message,
          isFromStaff: msg.isFromStaff,
          senderName: msg.senderName,
          createdAt: msg.createdAt.toISOString(),
        }))
      };
      
      res.json(formattedTicket);
    } catch (error) {
      console.error("Error fetching support ticket:", error);
      res.status(500).json({ message: "Failed to fetch support ticket" });
    }
  });
  
  // Update a ticket's status
  app.patch("/api/support/tickets/:id/status", async (req, res) => {
    try {
      const ticketId = parseInt(req.params.id);
      const { status } = req.body;
      
      if (isNaN(ticketId)) {
        return res.status(400).json({ message: "Invalid ticket ID" });
      }
      
      // Validate status
      if (!['open', 'in_progress', 'resolved', 'closed'].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      
      const ticket = await storage.getSupportTicketById(ticketId);
      
      if (!ticket) {
        return res.status(404).json({ message: "Support ticket not found" });
      }
      
      await storage.updateSupportTicketStatus(ticketId, status);
      
      res.json({ message: "Ticket status updated successfully" });
    } catch (error) {
      console.error("Error updating ticket status:", error);
      res.status(500).json({ message: "Failed to update ticket status" });
    }
  });
  
  // Add a message to a ticket
  app.post("/api/support/tickets/:id/messages", async (req, res) => {
    try {
      const ticketId = parseInt(req.params.id);
      
      if (isNaN(ticketId)) {
        return res.status(400).json({ message: "Invalid ticket ID" });
      }
      
      // Validate request body
      const validatedData = addTicketMessageSchema.parse({
        ...req.body,
        ticketId: ticketId
      });
      
      const ticket = await storage.getSupportTicketById(ticketId);
      
      if (!ticket) {
        return res.status(404).json({ message: "Support ticket not found" });
      }
      
      // Save the message
      const message = await storage.createTicketMessage(validatedData);
      
      // Format response
      const formattedMessage = {
        id: message.id,
        ticketId: message.ticketId,
        message: message.message,
        isFromStaff: message.isFromStaff,
        senderName: message.senderName,
        createdAt: message.createdAt.toISOString(),
      };
      
      // Send email notification
      const emailRecipient = message.isFromStaff ? ticket.customerEmail : process.env.SUPPORT_EMAIL || "support@haydeentech.com";
      const emailSubject = message.isFromStaff
        ? `Support Ticket #${ticket.id} - Response from Support`
        : `Support Ticket #${ticket.id} - New Customer Message`;
      
      const emailContent = `
        ${message.isFromStaff ? 'The support team has responded to your ticket:' : 'A new message has been added to the support ticket:'}
        
        Ticket: #${ticket.id} - ${ticket.subject}
        From: ${message.senderName}
        Message: ${message.message}
        
        ${message.isFromStaff ? 'You can reply to this message by logging into our support portal.' : 'Please review and respond to this ticket at your earliest convenience.'}
      `;
      
      try {
        await sendEmail(
          process.env.SENDGRID_API_KEY || "",
          {
            to: emailRecipient,
            from: process.env.EMAIL_FROM || "support@haydeentech.com",
            subject: emailSubject,
            text: emailContent,
          }
        );
      } catch (emailError) {
        console.error("Error sending message notification email:", emailError);
        // Continue with the message creation even if email fails
      }
      
      res.status(201).json({
        message: "Message added successfully",
        ticketMessage: formattedMessage
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error adding message to ticket:", error);
        res.status(500).json({ message: "Failed to add message to ticket" });
      }
    }
  });
  
  // Get messages for a ticket
  app.get("/api/support/tickets/:id/messages", async (req, res) => {
    try {
      const ticketId = parseInt(req.params.id);
      
      if (isNaN(ticketId)) {
        return res.status(400).json({ message: "Invalid ticket ID" });
      }
      
      const ticket = await storage.getSupportTicketById(ticketId);
      
      if (!ticket) {
        return res.status(404).json({ message: "Support ticket not found" });
      }
      
      const messages = await storage.getTicketMessages(ticketId);
      
      // Format response
      const formattedMessages = messages.map(msg => ({
        id: msg.id,
        ticketId: msg.ticketId,
        message: msg.message,
        isFromStaff: msg.isFromStaff,
        senderName: msg.senderName,
        createdAt: msg.createdAt.toISOString(),
      }));
      
      res.json(formattedMessages);
    } catch (error) {
      console.error("Error fetching ticket messages:", error);
      res.status(500).json({ message: "Failed to fetch ticket messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
