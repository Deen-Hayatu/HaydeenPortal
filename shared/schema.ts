import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

// Blog Posts Table
export const blogPosts = pgTable("blog_posts", {
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
  category: text("category").notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
});

// Solutions Table
export const solutions = pgTable("solutions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  slug: text("slug").notNull().unique(),
  color: text("color").notNull(),
  isAvailable: boolean("is_available").notNull().default(false),
});

export const insertSolutionSchema = createInsertSchema(solutions).omit({
  id: true,
});

// Solution Features Table
export const solutionFeatures = pgTable("solution_features", {
  id: serial("id").primaryKey(),
  solutionId: integer("solution_id").notNull().references(() => solutions.id),
  feature: text("feature").notNull(),
});

export const insertSolutionFeatureSchema = createInsertSchema(solutionFeatures).omit({
  id: true,
});

// Contact Form Submissions Table
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  isProcessed: boolean("is_processed").notNull().default(false),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
  isProcessed: true,
});

// Newsletter Subscriptions Table
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).pick({
  email: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type Solution = typeof solutions.$inferSelect;
export type InsertSolution = z.infer<typeof insertSolutionSchema>;

export type SolutionFeature = typeof solutionFeatures.$inferSelect;
export type InsertSolutionFeature = z.infer<typeof insertSolutionFeatureSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;

// Validation schemas for API
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export const newsletterSubscriptionFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// Job Applications Table
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  position: text("position").notNull(), // "UX/UI Design Intern" or "Agribusiness Research Intern"
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  university: text("university"),
  studyField: text("study_field"),
  graduationYear: text("graduation_year"),
  experience: text("experience"), // Brief description of relevant experience
  motivation: text("motivation").notNull(), // Why they want to join
  cvFileName: text("cv_file_name"), // File name of uploaded CV
  cvFileData: text("cv_file_data"), // Base64 encoded CV file
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  isProcessed: boolean("is_processed").notNull().default(false),
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).omit({
  id: true,
  submittedAt: true,
  isProcessed: true,
});

export type JobApplication = typeof jobApplications.$inferSelect;
export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;

export const jobApplicationFormSchema = z.object({
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
  cvFile: z.any().optional(), // File will be handled separately
});
