import {
  users, type User, type InsertUser,
  blogPosts, type BlogPost, type InsertBlogPost,
  solutions, type Solution, type InsertSolution,
  solutionFeatures, type SolutionFeature, type InsertSolutionFeature,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletterSubscription
} from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, BlogPost>;
  private solutions: Map<number, Solution>;
  private solutionFeatures: Map<number, SolutionFeature>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private userId: number;
  private blogPostId: number;
  private solutionId: number;
  private solutionFeatureId: number;
  private contactSubmissionId: number;
  private newsletterSubscriptionId: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.solutions = new Map();
    this.solutionFeatures = new Map();
    this.contactSubmissions = new Map();
    this.newsletterSubscriptions = new Map();

    this.userId = 1;
    this.blogPostId = 1;
    this.solutionId = 1;
    this.solutionFeatureId = 1;
    this.contactSubmissionId = 1;
    this.newsletterSubscriptionId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const newUser: User = { ...user, id, createdAt: now };
    this.users.set(id, newUser);
    return newUser;
  }

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const newPost: BlogPost = { ...post, id };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  // Solution operations
  async getSolutions(): Promise<Solution[]> {
    return Array.from(this.solutions.values());
  }

  async getSolutionBySlug(slug: string): Promise<Solution | undefined> {
    return Array.from(this.solutions.values()).find(solution => solution.slug === slug);
  }

  async getSolutionFeatures(solutionId: number): Promise<SolutionFeature[]> {
    return Array.from(this.solutionFeatures.values())
      .filter(feature => feature.solutionId === solutionId);
  }

  async createSolution(solution: InsertSolution): Promise<Solution> {
    const id = this.solutionId++;
    const newSolution: Solution = { ...solution, id };
    this.solutions.set(id, newSolution);
    return newSolution;
  }

  async createSolutionFeature(feature: InsertSolutionFeature): Promise<SolutionFeature> {
    const id = this.solutionFeatureId++;
    const newFeature: SolutionFeature = { ...feature, id };
    this.solutionFeatures.set(id, newFeature);
    return newFeature;
  }

  // Contact operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactSubmissionId++;
    const now = new Date();
    const newSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      submittedAt: now, 
      isProcessed: false 
    };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values())
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }

  async markContactSubmissionAsProcessed(id: number): Promise<void> {
    const submission = this.contactSubmissions.get(id);
    if (submission) {
      submission.isProcessed = true;
      this.contactSubmissions.set(id, submission);
    }
  }

  // Newsletter operations
  async subscribeToNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email is already subscribed
    const existingSubscription = await this.findSubscriptionByEmail(subscription.email);
    if (existingSubscription) {
      if (!existingSubscription.isActive) {
        // Reactivate the subscription
        existingSubscription.isActive = true;
        this.newsletterSubscriptions.set(existingSubscription.id, existingSubscription);
      }
      return existingSubscription;
    }

    // Create new subscription
    const id = this.newsletterSubscriptionId++;
    const now = new Date();
    const newSubscription: NewsletterSubscription = {
      ...subscription,
      id,
      subscribedAt: now,
      isActive: true
    };
    this.newsletterSubscriptions.set(id, newSubscription);
    return newSubscription;
  }

  async unsubscribeFromNewsletter(email: string): Promise<void> {
    const subscription = await this.findSubscriptionByEmail(email);
    if (subscription) {
      subscription.isActive = false;
      this.newsletterSubscriptions.set(subscription.id, subscription);
    }
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    const subscription = await this.findSubscriptionByEmail(email);
    return subscription ? subscription.isActive : false;
  }

  private async findSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletterSubscriptions.values())
      .find(sub => sub.email.toLowerCase() === email.toLowerCase());
  }

  // Sample data initialization
  private initializeSampleData(): void {
    // Sample solutions
    const agriconnect = this.createSolution({
      title: "AgriConnect",
      description: "Connecting farmers with agricultural data, markets, and resources to improve productivity and profitability.",
      longDescription: "AgriConnect is our flagship platform designed to transform farming in West Africa. It combines real-time weather and soil data, market information, educational resources, and direct marketplace connections to help farmers make better decisions, improve yields, and increase their income.",
      slug: "agriconnect",
      color: "bg-[#27AE60]",
      isAvailable: true
    });

    // Sample solution features
    agriconnect.then(solution => {
      this.createSolutionFeature({ solutionId: solution.id, feature: "Real-time weather and soil data integration" });
      this.createSolutionFeature({ solutionId: solution.id, feature: "Direct marketplace connection with fair pricing" });
      this.createSolutionFeature({ solutionId: solution.id, feature: "Mobile access with low-bandwidth optimization" });
      this.createSolutionFeature({ solutionId: solution.id, feature: "Educational resources in multiple local languages" });
      this.createSolutionFeature({ solutionId: solution.id, feature: "Supply chain tracking and transparency" });
    });

    // Sample blog posts
    this.createBlogPost({
      title: "The Rise of AgriTech in West Africa",
      slug: "agritech-west-africa",
      excerpt: "Exploring how technology is transforming agriculture across the region and creating new opportunities.",
      content: "Sample content for this blog post.",
      publishedAt: new Date(2023, 4, 15),
      readTime: "5 min read",
      coverImage: "https://images.unsplash.com/photo-1517816428104-797678c7cf0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      authorName: "Kofi Mensah",
      authorRole: "Founder & CEO",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      category: "Technology"
    });

    this.createBlogPost({
      title: "Mobile Money Revolution: Beyond Payments",
      slug: "mobile-money-revolution",
      excerpt: "How mobile money is evolving beyond payments to create inclusive financial ecosystems.",
      content: "Sample content for this blog post.",
      publishedAt: new Date(2023, 3, 22),
      readTime: "4 min read",
      coverImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      authorName: "Ama Dankwa",
      authorRole: "Chief Strategy Officer",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      category: "Finance"
    });

    this.createBlogPost({
      title: "Building Tech Talent Pipelines in Ghana",
      slug: "tech-talent-ghana",
      excerpt: "Strategies for developing and retaining skilled tech talent to support Ghana's growing digital economy.",
      content: "Sample content for this blog post.",
      publishedAt: new Date(2023, 2, 10),
      readTime: "6 min read",
      coverImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      authorName: "David Osei",
      authorRole: "CTO",
      authorAvatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      category: "Education"
    });
  }
}

export const storage = new MemStorage();
