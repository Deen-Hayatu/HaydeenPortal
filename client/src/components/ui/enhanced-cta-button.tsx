import React from 'react';
import { Button } from './button';
import { ArrowRight, Calendar, MessageCircle, Play } from 'lucide-react';

interface EnhancedCTAButtonProps {
  variant?: 'primary' | 'secondary' | 'demo' | 'contact';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const EnhancedCTAButton = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  href, 
  className = '' 
}: EnhancedCTAButtonProps) => {
  const getIcon = () => {
    switch (variant) {
      case 'demo':
        return <Play className="w-4 h-4" />;
      case 'contact':
        return <MessageCircle className="w-4 h-4" />;
      case 'secondary':
        return <Calendar className="w-4 h-4" />;
      default:
        return <ArrowRight className="w-4 h-4" />;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-[#27AE60] to-[#2ECC71] hover:from-[#229954] hover:to-[#27AE60] text-white shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-gradient-to-r from-[#0A3D62] to-[#1B4F72] hover:from-[#0E4B99] hover:to-[#2E86AB] text-white shadow-lg hover:shadow-xl';
      case 'demo':
        return 'bg-gradient-to-r from-[#F39C12] to-[#E67E22] hover:from-[#D68910] hover:to-[#CA6F1E] text-white shadow-lg hover:shadow-xl';
      case 'contact':
        return 'bg-gradient-to-r from-[#8E44AD] to-[#9B59B6] hover:from-[#7D3C98] hover:to-[#8E44AD] text-white shadow-lg hover:shadow-xl';
      default:
        return 'bg-gradient-to-r from-[#27AE60] to-[#2ECC71] hover:from-[#229954] hover:to-[#27AE60] text-white shadow-lg hover:shadow-xl';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const buttonContent = (
    <Button
      onClick={onClick}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
        relative overflow-hidden group
        transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
        font-semibold tracking-wide
        border-none
        focus:ring-4 focus:ring-opacity-50
        ${variant === 'primary' ? 'focus:ring-green-300' : ''}
        ${variant === 'secondary' ? 'focus:ring-blue-300' : ''}
        ${variant === 'demo' ? 'focus:ring-orange-300' : ''}
        ${variant === 'contact' ? 'focus:ring-purple-300' : ''}
      `}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          {getIcon()}
        </span>
      </span>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-2 -left-2 w-0 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform skew-x-12 group-hover:w-full group-hover:animate-shimmer transition-all duration-700"></div>
      
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </Button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

export default EnhancedCTAButton;