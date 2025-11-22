import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GoogleAnalytics from "@/components/seo/google-analytics";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SkipToMain from "@/components/accessibility/skip-to-main";
import ErrorBoundary from "@/components/ui/error-boundary";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/schema-markup";
import PreloadManager, { useCriticalResourcePreloader } from "@/components/performance/preload-manager";
import { PerformanceLogger } from "@/components/performance/performance-monitor";
import Home from "@/pages/home";
import About from "@/pages/about";
import Solutions from "@/pages/solutions/index";
import Agriconnect from "@/pages/solutions/agriconnect";
import GhEHR from "@/pages/solutions/ghehr";
import WebsiteDesign from "@/pages/solutions/website-design";
import Technology from "@/pages/technology/index";
import MVPDocumentation from "@/pages/mvp-documentation";
import Products from "@/pages/products";
import Blog from "@/pages/blog/index";
import Careers from "@/pages/careers";
import Contact from "@/pages/contact";
import JobApplication from "@/pages/apply";

function Router() {
  useCriticalResourcePreloader();

  return (
    <div className="min-h-screen flex flex-col">
      <SkipToMain />
      
      {/* Global Schema Markup */}
      <OrganizationSchema
        name="Haydeen Technologies"
        description="Innovative software solutions for West African industries"
        url="https://haydeen.com"
        address={{
          streetAddress: "Bw 14 Benz road",
          addressLocality: "Effiduasi",
          addressRegion: "Ashanti",
          addressCountry: "Ghana"
        }}
        contactPoint={{
          telephone: "+233-207-884-182",
          contactType: "customer service",
          email: "info@haydeen.com"
        }}
      />
      
      <WebsiteSchema
        name="Haydeen Technologies"
        url="https://haydeen.com"
        description="Building innovative MVP solutions for Ghana's agriculture and healthcare sectors"
        publisher="Haydeen Technologies"
        inLanguage="en"
      />
      
      {/* PreloadManager removed - images will load when needed */}
      
      <Header />
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/solutions/agriconnect" component={Agriconnect} />
          <Route path="/solutions/ghehr" component={GhEHR} />
          <Route path="/solutions/website-design" component={WebsiteDesign} />
          <Route path="/technology" component={Technology} />
          <Route path="/mvp-progress" component={MVPDocumentation} />
          <Route path="/products" component={Products} />
          <Route path="/blog" component={Blog} />
          <Route path="/careers" component={Careers} />
          <Route path="/contact" component={Contact} />
          <Route path="/apply" component={JobApplication} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <GoogleAnalytics />
            {import.meta.env.DEV && <PerformanceLogger />}
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
  );
}

export default App;
