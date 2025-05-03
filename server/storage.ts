import {
  users, type User, type InsertUser,
  blogPosts, type BlogPost, type InsertBlogPost,
  solutions, type Solution, type InsertSolution,
  solutionFeatures, type SolutionFeature, type InsertSolutionFeature,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletterSubscription,
  supportTickets, type SupportTicket, type InsertSupportTicket,
  ticketMessages, type TicketMessage, type InsertTicketMessage
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Blog operations
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Solution operations
  getSolutions(): Promise<Solution[]>;
  getSolutionBySlug(slug: string): Promise<Solution | undefined>;
  getSolutionFeatures(solutionId: number): Promise<SolutionFeature[]>;
  createSolution(solution: InsertSolution): Promise<Solution>;
  createSolutionFeature(feature: InsertSolutionFeature): Promise<SolutionFeature>;

  // Contact operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  markContactSubmissionAsProcessed(id: number): Promise<void>;

  // Newsletter operations
  subscribeToNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  unsubscribeFromNewsletter(email: string): Promise<void>;
  isEmailSubscribed(email: string): Promise<boolean>;
  
  // Support Ticket operations
  createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket>;
  getSupportTickets(): Promise<SupportTicket[]>;
  getSupportTicketById(id: number): Promise<SupportTicket | undefined>;
  getSupportTicketsByEmail(email: string): Promise<SupportTicket[]>;
  updateSupportTicketStatus(id: number, status: 'open' | 'in_progress' | 'resolved' | 'closed'): Promise<void>;
  
  // Ticket Message operations
  createTicketMessage(message: InsertTicketMessage): Promise<TicketMessage>;
  getTicketMessages(ticketId: number): Promise<TicketMessage[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  // Solution operations
  async getSolutions(): Promise<Solution[]> {
    return db.select().from(solutions);
  }

  async getSolutionBySlug(slug: string): Promise<Solution | undefined> {
    const [solution] = await db.select().from(solutions).where(eq(solutions.slug, slug));
    return solution || undefined;
  }

  async getSolutionFeatures(solutionId: number): Promise<SolutionFeature[]> {
    return db.select().from(solutionFeatures).where(eq(solutionFeatures.solutionId, solutionId));
  }

  async createSolution(solution: InsertSolution): Promise<Solution> {
    const [newSolution] = await db.insert(solutions).values(solution).returning();
    return newSolution;
  }

  async createSolutionFeature(feature: InsertSolutionFeature): Promise<SolutionFeature> {
    const [newFeature] = await db.insert(solutionFeatures).values(feature).returning();
    return newFeature;
  }

  // Contact operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(contactSubmissions)
      .values({
        ...submission,
        isProcessed: false
      })
      .returning();
    return newSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.submittedAt));
  }

  async markContactSubmissionAsProcessed(id: number): Promise<void> {
    await db
      .update(contactSubmissions)
      .set({ isProcessed: true })
      .where(eq(contactSubmissions.id, id));
  }

  // Newsletter operations
  async subscribeToNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists
    const existingSubscription = await this.findSubscriptionByEmail(subscription.email);
    
    if (existingSubscription) {
      if (!existingSubscription.isActive) {
        // Reactivate subscription
        await db
          .update(newsletterSubscriptions)
          .set({ isActive: true })
          .where(eq(newsletterSubscriptions.id, existingSubscription.id));
        
        return {
          ...existingSubscription,
          isActive: true
        };
      }
      return existingSubscription;
    }
    
    // Create new subscription
    const [newSubscription] = await db
      .insert(newsletterSubscriptions)
      .values(subscription)
      .returning();
    
    return newSubscription;
  }

  async unsubscribeFromNewsletter(email: string): Promise<void> {
    await db
      .update(newsletterSubscriptions)
      .set({ isActive: false })
      .where(eq(newsletterSubscriptions.email, email));
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    const subscription = await this.findSubscriptionByEmail(email);
    return subscription ? subscription.isActive : false;
  }

  private async findSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    const [subscription] = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email));
    
    return subscription || undefined;
  }
  
  // Support Ticket operations
  async createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket> {
    const [newTicket] = await db
      .insert(supportTickets)
      .values(ticket)
      .returning();
    return newTicket;
  }
  
  async getSupportTickets(): Promise<SupportTicket[]> {
    return db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
  }
  
  async getSupportTicketById(id: number): Promise<SupportTicket | undefined> {
    const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, id));
    return ticket || undefined;
  }
  
  async getSupportTicketsByEmail(email: string): Promise<SupportTicket[]> {
    return db
      .select()
      .from(supportTickets)
      .where(eq(supportTickets.customerEmail, email))
      .orderBy(desc(supportTickets.createdAt));
  }
  
  async updateSupportTicketStatus(id: number, status: 'open' | 'in_progress' | 'resolved' | 'closed'): Promise<void> {
    await db
      .update(supportTickets)
      .set({
        status: status,
        updatedAt: new Date()
      })
      .where(eq(supportTickets.id, id));
  }
  
  // Ticket Message operations
  async createTicketMessage(message: InsertTicketMessage): Promise<TicketMessage> {
    const [newMessage] = await db
      .insert(ticketMessages)
      .values(message)
      .returning();
    
    // Update the ticket's updatedAt timestamp
    await db
      .update(supportTickets)
      .set({ updatedAt: new Date() })
      .where(eq(supportTickets.id, message.ticketId));
    
    return newMessage;
  }
  
  async getTicketMessages(ticketId: number): Promise<TicketMessage[]> {
    return db
      .select()
      .from(ticketMessages)
      .where(eq(ticketMessages.ticketId, ticketId))
      .orderBy(desc(ticketMessages.createdAt));
  }
}

// Use the database storage implementation
export const storage = new DatabaseStorage();
