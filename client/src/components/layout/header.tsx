import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import CompanyLogo from "@/components/ui/company-logo";
import LanguageToggle from "@/components/layout/language-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Solutions", path: "/solutions" },
    { label: "Technology", path: "/technology" },
    { label: "Blog", path: "/blog" },
    { label: "Careers", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ];

  const productDropdownItems = [
    { label: "AgriConnect", path: "/solutions/agriconnect", description: "Agricultural marketplace platform" },
    { label: "GhEHR", path: "/solutions/ghehr", description: "Electronic health record system" },
    { label: "EcoVend", path: "/products", description: "E-commerce platform (Coming Soon)" },
    { label: "All Products", path: "/products", description: "View complete product suite" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md" role="banner">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-md"
            aria-label="Haydeen Technologies - Return to homepage"
          >
            <CompanyLogo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-medium flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive(item.path) 
                      ? "text-[#27AE60] bg-green-50" 
                      : "text-[#0A3D62] hover:text-[#27AE60] hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  }`}
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Products Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium text-[#0A3D62] hover:text-[#27AE60] bg-transparent">
                      Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {productDropdownItems.map((item, index) => (
                          <li key={index}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.path}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none text-[#0A3D62]">
                                  {item.label}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button & Language Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <button
              className="text-[#0A3D62] hover:text-[#27AE60] transition-all duration-200 p-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cta-button"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 font-medium ${
                  isActive(item.path) 
                    ? "text-[#27AE60]" 
                    : "text-[#0A3D62] hover:bg-[#F2F2F2]"
                } rounded-md`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Products submenu */}
            <div className="px-3 py-2">
              <div className="text-sm font-medium text-[#0A3D62] mb-2">Products</div>
              <div className="space-y-1 pl-3">
                {productDropdownItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    className="block py-1 text-sm text-gray-600 hover:text-[#27AE60]"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
