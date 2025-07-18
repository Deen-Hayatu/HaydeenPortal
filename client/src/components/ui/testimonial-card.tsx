import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  className?: string;
}

const TestimonialCard = ({ 
  name, 
  role, 
  company, 
  content, 
  rating, 
  avatar, 
  className = '' 
}: TestimonialCardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {/* Quote icon */}
      <div className="flex justify-between items-start mb-4">
        <Quote className="w-8 h-8 text-[#27AE60] opacity-50" />
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed">
        "{content}"
      </blockquote>
      
      {/* Author */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-[#27AE60] to-[#2ECC71] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover rounded-full" />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-600">{role}</div>
          <div className="text-sm text-[#27AE60] font-medium">{company}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;