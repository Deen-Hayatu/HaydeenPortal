import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@/lib/types";

const BlogPreview = () => {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  // Fallback sample posts in case API request fails
  const samplePosts = [
    {
      id: 1,
      title: "The Rise of AgriTech in West Africa",
      excerpt: "Exploring how technology is transforming agriculture across the region and creating new opportunities.",
      slug: "agritech-west-africa",
      publishedAt: "2023-05-15",
      readTime: "5 min read",
      coverImage: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Mobile Money Revolution: Beyond Payments",
      excerpt: "How mobile money is evolving beyond payments to create inclusive financial ecosystems.",
      slug: "mobile-money-revolution",
      publishedAt: "2023-04-22",
      readTime: "4 min read",
      coverImage: "https://images.unsplash.com/photo-1581126336747-14d0a5ae0a9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Building Tech Talent Pipelines in Ghana",
      excerpt: "Strategies for developing and retaining skilled tech talent to support Ghana's growing digital economy.",
      slug: "tech-talent-ghana",
      publishedAt: "2023-03-10",
      readTime: "6 min read",
      coverImage: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const displayPosts = blogPosts || samplePosts;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F2F2F2]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] font-poppins mb-4">Latest Insights</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Explore our latest thoughts on technology, innovation, and development in West Africa.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="bg-gray-300 h-48 w-full"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A3D62] font-poppins mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-[#27AE60] font-semibold inline-flex items-center">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/blog" className="btn btn-outline">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
