import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

const HeadTags = ({ 
  title = "Haydeen Technologies | Software Solutions for West Africa & Ghana",
  description = "Leading provider of innovative software solutions in Ghana. Specializing in AgriConnect agricultural platform, GhEHR healthcare systems, and custom website design for West African businesses.",
  keywords = "software development Ghana, AgriConnect, GhEHR, healthcare technology, agricultural technology, West Africa, website design, digital solutions",
  canonical = "https://haydeentechnologies.com",
  ogImage = "https://haydeentechnologies.com/og-image.jpg",
  ogType = "website"
}: SEOProps) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) || 
                document.querySelector(`meta[property="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };
    
    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:url', canonical);
    updateMetaTag('og:type', ogType);
    
    // Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    
    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
    
  }, [title, description, keywords, canonical, ogImage, ogType]);

  return null;
};

export default HeadTags;