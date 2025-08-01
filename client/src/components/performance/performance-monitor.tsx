import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let observer: PerformanceObserver;

    if ('PerformanceObserver' in window) {
      // Monitor Core Web Vitals
      observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        entries.forEach((entry) => {
          switch (entry.entryType) {
            case 'paint':
              if (entry.name === 'first-contentful-paint') {
                setMetrics(prev => ({
                  ...prev,
                  firstContentfulPaint: entry.startTime
                }));
              }
              break;
            case 'largest-contentful-paint':
              setMetrics(prev => ({
                ...prev,
                largestContentfulPaint: entry.startTime
              }));
              break;
            case 'layout-shift':
              if (!(entry as any).hadRecentInput) {
                setMetrics(prev => ({
                  ...prev,
                  cumulativeLayoutShift: (prev.cumulativeLayoutShift || 0) + (entry as any).value
                }));
              }
              break;
            case 'first-input':
              setMetrics(prev => ({
                ...prev,
                firstInputDelay: (entry as any).processingStart - entry.startTime
              }));
              break;
          }
        });
      });

      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] });
    }

    // Monitor Time to Interactive
    window.addEventListener('load', () => {
      setIsLoading(false);
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationTiming) {
        setMetrics(prev => ({
          ...prev,
          timeToInteractive: navigationTiming.domInteractive - navigationTiming.fetchStart
        }));
      }
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return { metrics, isLoading };
};

// Performance budget warnings
export const usePerformanceBudget = () => {
  const { metrics } = usePerformanceMonitor();

  const budgets = {
    firstContentfulPaint: 1800, // 1.8s
    largestContentfulPaint: 2500, // 2.5s
    cumulativeLayoutShift: 0.1, // 0.1
    firstInputDelay: 100, // 100ms
    timeToInteractive: 3800, // 3.8s
  };

  const warnings = Object.entries(budgets).reduce((acc, [key, budget]) => {
    const metric = metrics[key as keyof PerformanceMetrics];
    if (metric && metric > budget) {
      acc[key] = {
        actual: metric,
        budget,
        exceeded: metric - budget,
      };
    }
    return acc;
  }, {} as Record<string, { actual: number; budget: number; exceeded: number }>);

  return { warnings, hasWarnings: Object.keys(warnings).length > 0 };
};

// Development only performance logger
export const PerformanceLogger = () => {
  const { metrics } = usePerformanceMonitor();
  const { warnings, hasWarnings } = usePerformanceBudget();

  useEffect(() => {
    if (import.meta.env.DEV && Object.keys(metrics).length > 0) {
      console.group('🚀 Performance Metrics');
      Object.entries(metrics).forEach(([key, value]) => {
        console.log(`${key}: ${Math.round(value)}${key.includes('shift') ? '' : 'ms'}`);
      });
      console.groupEnd();

      if (hasWarnings) {
        console.group('⚠️ Performance Budget Exceeded');
        Object.entries(warnings).forEach(([key, data]) => {
          console.warn(`${key}: ${Math.round(data.actual)}ms (budget: ${data.budget}ms, exceeded by: ${Math.round(data.exceeded)}ms)`);
        });
        console.groupEnd();
      }
    }
  }, [metrics, warnings, hasWarnings]);

  return null;
};