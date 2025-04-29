import { db } from "./server/db";
import { solutions, solutionFeatures, blogPosts } from "@shared/schema";

async function seed() {
  console.log("Seeding database with initial data...");

  // Create AgriConnect solution
  const [agriconnect] = await db.insert(solutions).values({
    title: "AgriConnect",
    description: "Connecting farmers with agricultural data, markets, and resources to improve productivity and profitability.",
    longDescription: "AgriConnect is our flagship platform designed to transform farming in West Africa. It combines real-time weather and soil data, market information, educational resources, and direct marketplace connections to help farmers make better decisions, improve yields, and increase their income.",
    slug: "agriconnect",
    color: "bg-[#27AE60]",
    isAvailable: true
  }).returning();

  console.log("Created solution:", agriconnect);

  // Add features to the solution
  await db.insert(solutionFeatures).values([
    { solutionId: agriconnect.id, feature: "Real-time weather and soil data integration" },
    { solutionId: agriconnect.id, feature: "Direct marketplace connection with fair pricing" },
    { solutionId: agriconnect.id, feature: "Mobile access with low-bandwidth optimization" },
    { solutionId: agriconnect.id, feature: "Educational resources in multiple local languages" },
    { solutionId: agriconnect.id, feature: "Supply chain tracking and transparency" }
  ]);

  // Create sample blog posts
  await db.insert(blogPosts).values([
    {
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
    },
    {
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
    },
    {
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
    }
  ]);

  console.log("Database seeded successfully!");
}

seed().catch(console.error);
