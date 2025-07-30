
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">EC</span>
      </div>
      <Link to="/" className="touch-manipulation" style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        userSelect: 'none'
      }}>
        <span className="font-bold text-xl text-gray-900">EmpowerCareer</span>
      </Link>
    </div>
  );
};

export default NavigationLogo;
