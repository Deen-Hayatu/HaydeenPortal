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
                // Validate the value is reasonable (reject if > 1 hour = 3600000ms)
                const fcp = entry.startTime;
                if (fcp > 0 && fcp < 3600000) {
                  setMetrics(prev => ({
                    ...prev,
                    firstContentfulPaint: fcp
                  }));
                }
              }
              break;
            case 'largest-contentful-paint':
              const lcp = entry.startTime;
              // Validate the value is reasonable
              if (lcp > 0 && lcp < 3600000) {
                setMetrics(prev => ({
                  ...prev,
                  largestContentfulPaint: lcp
                }));
              }
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
        const tti = navigationTiming.domInteractive - navigationTiming.fetchStart;
        // Validate the value is reasonable (reject if > 1 hour = 3600000ms)
        if (tti > 0 && tti < 3600000) {
          setMetrics(prev => ({
            ...prev,
            timeToInteractive: tti
          }));
        }
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
    // Only log in development mode
    if (import.meta.env.DEV && Object.keys(metrics).length > 0) {
      // Filter out invalid metrics (e.g., extremely large values that indicate errors)
      const validMetrics = Object.entries(metrics).filter(([key, value]) => {
        if (value === undefined || value === null) return false;
        // Reject metrics that are clearly wrong (e.g., > 1 hour = 3600000ms)
        if (typeof value === 'number' && value > 3600000) return false;
        return true;
      });

      if (validMetrics.length > 0) {
        console.group('🚀 Performance Metrics');
        validMetrics.forEach(([key, value]) => {
          console.log(`${key}: ${Math.round(value as number)}${key.includes('shift') ? '' : 'ms'}`);
        });
        console.groupEnd();
      }

      // Only show warnings for valid metrics
      const validWarnings = Object.entries(warnings).filter(([key, data]) => {
        return data.actual <= 3600000; // Reject if > 1 hour
      });

      if (validWarnings.length > 0) {
        console.group('⚠️ Performance Budget Exceeded');
        validWarnings.forEach(([key, data]) => {
          console.warn(`${key}: ${Math.round(data.actual)}ms (budget: ${data.budget}ms, exceeded by: ${Math.round(data.exceeded)}ms)`);
        });
        console.groupEnd();
      }
    }
  }, [metrics, warnings, hasWarnings]);

  return null;
};