import React from 'react';
// Use public folder for images - more reliable for static assets
const ghehrScreenshotWebP = '/images/ghehr-screenshot.webp';
const ghehrScreenshotFallback = '/images/ghehr-screenshot.png';

interface PlatformScreenshotProps {
  platform: 'agriconnect' | 'ghehr' | 'ecovendghana';
  className?: string;
}

const PlatformScreenshot = ({ platform, className = '' }: PlatformScreenshotProps) => {
  const getScreenshotContent = () => {
    switch (platform) {
      case 'agriconnect':
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-[#27AE60] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#27AE60]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold">AgriConnect</h2>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                <span className="text-sm">Online</span>
              </div>
            </div>
            
            {/* Dashboard content */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">24°C</div>
                  <div className="text-sm text-gray-600">Temperature</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">78%</div>
                  <div className="text-sm text-gray-600">Humidity</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">85%</div>
                  <div className="text-sm text-gray-600">Crop Health</div>
                </div>
              </div>
              
              {/* Market prices */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Today's Market Prices</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Cocoa (per bag)</span>
                    <span className="font-semibold text-green-600">₵480</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maize (per bag)</span>
                    <span className="font-semibold text-green-600">₵85</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tomatoes (per crate)</span>
                    <span className="font-semibold text-green-600">₵45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'ghehr':
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
            <picture>
              <source srcSet={ghehrScreenshotWebP} type="image/webp" />
              <img 
                src={ghehrScreenshotFallback} 
                alt="GhEHR Patient Management System - Electronic Health Record platform for Ghana" 
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </picture>
          </div>
        );
      
      case 'ecovendghana':
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-[#27AE60] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#27AE60]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 3H3m4 10a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold">EcoVend Ghana</h2>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                <span className="text-sm">Eco-Friendly</span>
              </div>
            </div>
            
            {/* Marketplace */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1,247</div>
                  <div className="text-sm text-gray-600">Eco Products</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">89</div>
                  <div className="text-sm text-gray-600">Local Vendors</div>
                </div>
              </div>
              
              {/* Product grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-lg p-3">
                  <div className="w-full h-16 bg-green-100 rounded mb-2"></div>
                  <div className="text-sm font-medium">Bamboo Plates</div>
                  <div className="text-xs text-gray-500">₵15.00</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="w-full h-16 bg-blue-100 rounded mb-2"></div>
                  <div className="text-sm font-medium">Solar Charger</div>
                  <div className="text-xs text-gray-500">₵85.00</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="w-full h-16 bg-yellow-100 rounded mb-2"></div>
                  <div className="text-sm font-medium">Organic Soap</div>
                  <div className="text-xs text-gray-500">₵12.50</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="w-full h-16 bg-purple-100 rounded mb-2"></div>
                  <div className="text-sm font-medium">Eco Bags</div>
                  <div className="text-xs text-gray-500">₵8.00</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Platform not found</div>;
    }
  };

  return (
    <div className={`transform hover:scale-105 transition-transform duration-300 ${className}`}>
      {getScreenshotContent()}
    </div>
  );
};

export default PlatformScreenshot;