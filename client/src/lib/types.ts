// User Types
export interface User {
  id: number;
  username: string;
}

// Blog Types
export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  author: BlogAuthor;
  category: string;
}

// Solution Types
export interface Solution {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  colorClass: string;
  slug: string;
  isAvailable: boolean;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

// Newsletter Subscription Types
export interface NewsletterSubscription {
  email: string;
}
