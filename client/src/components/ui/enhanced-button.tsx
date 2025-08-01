import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface EnhancedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  ripple?: boolean;
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({
    className,
    variant = "primary",
    size = "md",
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    ripple = true,
    children,
    disabled,
    onClick,
    ...props
  }, ref) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
      "transition-all duration-200 transform active:scale-95",
      "focus-visible:outline-2 focus-visible:outline-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
      "cta-button", // Ensures minimum touch target
      {
        "w-full": fullWidth,
        "hover:scale-105": !disabled && !isLoading && ripple,
      }
    );

    const variantClasses = {
      primary: "bg-[#27AE60] text-white hover:bg-[#229954] focus-visible:outline-[#27AE60] shadow-md hover:shadow-lg",
      secondary: "bg-[#0A3D62] text-white hover:bg-[#0D47A1] focus-visible:outline-[#0A3D62] shadow-md hover:shadow-lg",
      outline: "border-2 border-[#27AE60] text-[#27AE60] hover:bg-[#27AE60] hover:text-white focus-visible:outline-[#27AE60]",
      ghost: "text-[#0A3D62] hover:bg-gray-100 focus-visible:outline-gray-500",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600 shadow-md hover:shadow-lg",
    };

    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      xl: "px-10 py-5 text-xl",
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !disabled && !isLoading) {
        // Create ripple effect
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const rippleElement = document.createElement("span");
        rippleElement.className = "absolute rounded-full bg-white/30 animate-ping";
        rippleElement.style.width = rippleElement.style.height = size + "px";
        rippleElement.style.left = x + "px";
        rippleElement.style.top = y + "px";
        rippleElement.style.pointerEvents = "none";
        
        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.appendChild(rippleElement);
        
        setTimeout(() => {
          rippleElement.remove();
        }, 600);
      }
      
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || isLoading}
        onClick={handleClick}
        aria-label={isLoading && loadingText ? loadingText : undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";

export default EnhancedButton;