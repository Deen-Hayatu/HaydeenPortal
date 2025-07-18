import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import CompanyLogo from "@/components/ui/company-logo";
import LanguageToggle from "@/components/layout/language-toggle";

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
    { label: "Products", path: "/products" },
    { label: "Blog", path: "/blog" },
    { label: "Careers", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <CompanyLogo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-medium ${
                    isActive(item.path) 
                      ? "text-[#27AE60]" 
                      : "text-[#0A3D62] hover:text-[#27AE60]"
                  } transition`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button & Language Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <button
              className="text-[#0A3D62]"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
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
        <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
