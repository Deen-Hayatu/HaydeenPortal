import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import FocusTrap from '@/components/accessibility/focus-trap';
import TouchOptimized from '@/components/mobile/touch-optimized';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
}

interface MobileMenuEnhancedProps {
  items: MenuItem[];
  className?: string;
}

const MobileMenuEnhanced = ({ items, className }: MobileMenuEnhancedProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [location] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setExpandedItems(new Set());
  }, [location]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleExpanded = (itemLabel: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemLabel)) {
      newExpanded.delete(itemLabel);
    } else {
      newExpanded.add(itemLabel);
    }
    setExpandedItems(newExpanded);
  };

  const isActive = (path: string) => location === path;
  const isExpanded = (itemLabel: string) => expandedItems.has(itemLabel);

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const expanded = isExpanded(item.label);

    return (
      <div key={item.label} className={`${level > 0 ? 'ml-4' : ''}`}>
        <div className="flex items-center">
          {hasChildren ? (
            <TouchOptimized
              size="lg"
              variant="button"
              className={`flex-1 flex items-center justify-between p-4 text-left transition-colors duration-200 ${
                isActive(item.path)
                  ? 'text-[#27AE60] bg-green-50'
                  : 'text-[#0A3D62] hover:bg-gray-50'
              }`}
            >
              <button
                onClick={() => toggleExpanded(item.label)}
                className="flex-1 flex items-center justify-between text-left"
                aria-expanded={expanded}
                aria-controls={`submenu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <span className="font-medium">{item.label}</span>
                {expanded ? (
                  <ChevronDown className="w-5 h-5 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-5 h-5 transition-transform duration-200" />
                )}
              </button>
            </TouchOptimized>
          ) : (
            <Link href={item.path} className="flex-1">
              <TouchOptimized
                size="lg"
                variant="link"
                className={`w-full p-4 text-left transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-[#27AE60] bg-green-50'
                    : 'text-[#0A3D62] hover:bg-gray-50'
                }`}
              >
                <span className="font-medium">{item.label}</span>
                {isActive(item.path) && (
                  <span className="sr-only">(current page)</span>
                )}
              </TouchOptimized>
            </Link>
          )}
        </div>

        {hasChildren && (
          <AnimatePresence>
            {expanded && (
              <motion.div
                id={`submenu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden bg-gray-50"
              >
                {item.children!.map(child => renderMenuItem(child, level + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <div className={`md:hidden ${className}`}>
      {/* Menu Toggle Button */}
      <TouchOptimized
        size="lg"
        variant="button"
        className="text-[#0A3D62] hover:text-[#27AE60] transition-colors duration-200"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="p-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </TouchOptimized>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              ref={menuRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-80 max-w-[80vw] bg-white shadow-xl z-50 overflow-y-auto"
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <FocusTrap isActive={isOpen} className="h-full">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-[#0A3D62]">Navigation</h2>
                    <TouchOptimized size="md" variant="button">
                      <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </TouchOptimized>
                  </div>

                  {/* Menu Items */}
                  <nav className="flex-1 py-4" role="navigation" aria-label="Mobile menu navigation">
                    {items.map(item => renderMenuItem(item))}
                  </nav>

                  {/* Footer */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-sm text-gray-600 text-center">
                      Haydeen Technologies © 2025
                    </p>
                  </div>
                </div>
              </FocusTrap>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenuEnhanced;