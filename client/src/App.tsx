import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GoogleAnalytics from "@/components/seo/google-analytics";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Solutions from "@/pages/solutions/index";
import Agriconnect from "@/pages/solutions/agriconnect";
import GhEHR from "@/pages/solutions/ghehr";
import WebsiteDesign from "@/pages/solutions/website-design";
import Products from "@/pages/products";
import Blog from "@/pages/blog/index";
import Careers from "@/pages/careers";
import Contact from "@/pages/contact";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/solutions/agriconnect" component={Agriconnect} />
          <Route path="/solutions/ghehr" component={GhEHR} />
          <Route path="/solutions/website-design" component={WebsiteDesign} />
          <Route path="/products" component={Products} />
          <Route path="/blog" component={Blog} />
          <Route path="/careers" component={Careers} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GoogleAnalytics />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
