import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TouchOptimizedProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'link' | 'card';
}

const TouchOptimized = ({
  children,
  className,
  size = 'md',
  variant = 'button',
}: TouchOptimizedProps) => {
  const sizeClasses = {
    sm: 'min-h-[36px] min-w-[36px]',
    md: 'min-h-[44px] min-w-[44px]',
    lg: 'min-h-[48px] min-w-[48px]',
  };

  const variantClasses = {
    button: 'touch-manipulation select-none cursor-pointer',
    link: 'touch-manipulation',
    card: 'touch-manipulation',
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        'flex items-center justify-center',
        // Enhanced touch feedback
        'active:scale-[0.98] transition-transform duration-75',
        // Better focus visibility on mobile
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        className
      )}
    >
      {children}
    </div>
  );
};

export default TouchOptimized;