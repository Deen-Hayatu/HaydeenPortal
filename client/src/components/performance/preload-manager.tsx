import { useEffect } from 'react';

interface PreloadManagerProps {
  images?: string[];
  fonts?: string[];
  scripts?: string[];
}

const PreloadManager = ({ images = [], fonts = [], scripts = [] }: PreloadManagerProps) => {
  useEffect(() => {
    const preloadElements: HTMLLinkElement[] = [];

    // Preload critical images
    images.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      preloadElements.push(link);
    });

    // Preload fonts
    fonts.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = src;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      preloadElements.push(link);
    });

    // Preload scripts
    scripts.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      document.head.appendChild(link);
      preloadElements.push(link);
    });

    return () => {
      preloadElements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [images, fonts, scripts]);

  return null;
};

export default PreloadManager;

// Critical resource preloader hook
export const useCriticalResourcePreloader = () => {
  useEffect(() => {
    // Only prefetch pages (not preload) - these are used for navigation
    // Prefetch is better for pages that might be visited
    const prefetchPages = [
      '/solutions/agriconnect',
      '/solutions/ghehr',
      '/products',
      '/contact',
    ];

    prefetchPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }, []);
};