import { useEffect } from 'react';

/**
 * Performance Monitor Component
 * Tracks Core Web Vitals and performance metrics
 */
export const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production
    if (import.meta.env.DEV) return;

    // Track Largest Contentful Paint (LCP)
    const trackLCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          
          // Log LCP to console (can be sent to analytics)
          console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
          
          // You can send this to your analytics service
          // Example: sendToAnalytics('LCP', lastEntry.renderTime);
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Cleanup after 10 seconds
        setTimeout(() => observer.disconnect(), 10000);
      } catch (e) {
        // PerformanceObserver not supported
      }
    };

    // Track First Input Delay (FID)
    const trackFID = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime;
            console.log('FID:', fid);
            
            // You can send this to your analytics service
            // Example: sendToAnalytics('FID', fid);
          });
        });
        
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // PerformanceObserver not supported
      }
    };

    // Track Cumulative Layout Shift (CLS)
    const trackCLS = () => {
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries() as any[];
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          // Log CLS to console
          console.log('CLS:', clsValue);
          
          // You can send this to your analytics service
          // Example: sendToAnalytics('CLS', clsValue);
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Report final CLS on page unload
        window.addEventListener('beforeunload', () => {
          console.log('Final CLS:', clsValue);
        });
      } catch (e) {
        // PerformanceObserver not supported
      }
    };

    // Track page load time
    const trackPageLoad = () => {
      window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        
        console.log('Page Load Time:', pageLoadTime, 'ms');
        console.log('DOM Content Loaded:', domContentLoaded, 'ms');
        
        // You can send this to your analytics service
        // Example: sendToAnalytics('pageLoad', pageLoadTime);
      });
    };

    // Initialize tracking
    trackLCP();
    trackFID();
    trackCLS();
    trackPageLoad();

    // Track resource loading times
    const trackResources = () => {
      window.addEventListener('load', () => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        const slowResources = resources.filter((resource) => {
          const loadTime = resource.responseEnd - resource.startTime;
          return loadTime > 1000; // Resources taking more than 1 second
        });

        if (slowResources.length > 0) {
          console.warn('Slow resources detected:', slowResources.map((r) => ({
            name: r.name,
            loadTime: `${(r.responseEnd - r.startTime).toFixed(2)}ms`,
            size: r.transferSize,
          })));
        }
      });
    };

    trackResources();
  }, []);

  return null; // This component doesn't render anything
};

/**
 * Hook to measure component render performance
 */
export const usePerformanceMeasure = (componentName: string) => {
  useEffect(() => {
    if (import.meta.env.DEV) {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        if (renderTime > 16) { // Warn if render takes more than 16ms (60fps threshold)
          console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
        }
      };
    }
  }, [componentName]);
};
