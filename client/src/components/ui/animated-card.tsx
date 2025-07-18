import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
  delay?: number;
}

const AnimatedCard = ({ 
  children, 
  className = '', 
  hoverScale = 1.05, 
  hoverRotate = 0,
  delay = 0
}: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: hoverScale, 
        rotate: hoverRotate,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative overflow-hidden
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#27AE60] to-[#2ECC71] opacity-0 blur-xl"
        animate={{
          opacity: isHovered ? 0.1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        animate={{
          x: isHovered ? '100%' : '-100%',
          opacity: isHovered ? 0.1 : 0,
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

export default AnimatedCard;