import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  // Fallback sample posts in case API request fails
  const samplePosts = [
    {
      id: 1,
      title: "The Rise of AgriTech in West Africa",
      excerpt: "Exploring how technology is transforming agriculture across the region and creating new opportunities for farmers and agricultural businesses.",
      content: "Sample content for this blog post.",
      slug: "agritech-west-africa",
      publishedAt: "2023-05-15",
      readTime: "5 min read",
      coverImage: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: {
        name: "Kofi Mensah",
        role: "Founder & CEO",
        avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      },
      category: "Technology",
    },
    {
      id: 2,
      title: "Mobile Money Revolution: Beyond Payments",
      excerpt: "How mobile money is evolving beyond payments to create inclusive financial ecosystems and driving economic growth in West Africa.",
      content: "Sample content for this blog post.",
      slug: "mobile-money-revolution",
      publishedAt: "2023-04-22",
      readTime: "4 min read",
      coverImage: "https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: {
        name: "Ama Dankwa",
        role: "Chief Strategy Officer",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      },
      category: "Finance",
    },
    {
      id: 3,
      title: "Building Tech Talent Pipelines in Ghana",
      excerpt: "Strategies for developing and retaining skilled tech talent to support Ghana's growing digital economy and tech innovation ecosystem.",
      content: "Sample content for this blog post.",
      slug: "tech-talent-ghana",
      publishedAt: "2023-03-10",
      readTime: "6 min read",
      coverImage: "https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: {
        name: "David Osei",
        role: "CTO",
        avatar: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      },
      category: "Education",
    },
    {
      id: 4,
      title: "Sustainable E-commerce Models for African Artisans",
      excerpt: "How digital platforms are helping traditional craftspeople reach global markets while preserving cultural heritage and promoting sustainability.",
      content: "Sample content for this blog post.",
      slug: "sustainable-ecommerce-artisans",
      publishedAt: "2023-02-18",
      readTime: "7 min read",
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: {
        name: "Kofi Mensah",
        role: "Founder & CEO",
        avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      },
      category: "Commerce",
    },
    {
      id: 5,
      title: "The Future of Logistics in West Africa",
      excerpt: "Examining how technology is overcoming infrastructure challenges to transform logistics and transportation across the region.",
      content: "Sample content for this blog post.",
      slug: "future-logistics-west-africa",
      publishedAt: "2023-01-25",
      readTime: "5 min read",
      coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: {
        name: "Ama Dankwa",
        role: "Chief Strategy Officer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      },
      category: "Logistics",
    },
    {
      id: 6,
      title: "Climate Data for Smallholder Farmers",
      excerpt: "How accessible climate data and predictive analytics are helping smallholder farmers adapt to changing weather patterns and improve resilience.",
      content: "Sample content for this blog post.",
      slug: "climate-data-smallholder-farmers",
      publishedAt: "2022-12-12",
      readTime: "8 min read",
      coverImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: {
        name: "David Osei",
        role: "CTO",
        avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      },
      category: "Agriculture",
    },
  ];

  const displayPosts = blogPosts || samplePosts;

  const filteredPosts = displayPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#0A3D62] text-white py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Insights</h1>
            <p className="text-xl opacity-90">
              Explore our latest thoughts on technology, innovation, and development in West Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="bg-gray-300 h-48 w-full"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${post.slug}`}>
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-[#F2F2F2] rounded-full text-[#0A3D62]">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold text-[#0A3D62] font-poppins mb-3 hover:text-[#27AE60] transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="text-sm font-medium text-[#0A3D62]">{post.author.name}</p>
                          <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                        </div>
                      </div>
                      <Link 
                        href={`/blog/${post.slug}`} 
                        className="text-[#27AE60] font-semibold text-sm hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600 mb-4">No articles found matching "{searchTerm}"</h3>
              <p className="text-gray-500 mb-6">Try changing your search term or browse all our articles.</p>
              <Button onClick={() => setSearchTerm("")} className="bg-[#27AE60] hover:bg-[#219251]">
                View All Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#F2F2F2]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#0A3D62] mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Get the latest insights and updates delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input 
                type="email" 
                placeholder="Your email address" 
                required 
                className="flex-grow"
              />
              <Button className="bg-[#27AE60] hover:bg-[#219251] whitespace-nowrap">
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
