
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useUserRole } from '@/hooks/useUserRole';
import { User } from 'lucide-react';

const NavigationLinks = () => {
  const { t } = useLanguage();
  const { isAdmin } = useUserRole();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <div className="hidden md:flex items-center space-x-4">
      <button
        onClick={handleNavigation('/dashboard')}
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 touch-manipulation"
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none'
        }}
      >
        {t('nav.dashboard')}
      </button>
      <button
        onClick={handleNavigation('/tests')}
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 touch-manipulation"
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none'
        }}
      >
        {t('nav.tests')}
      </button>
      <button
        onClick={handleNavigation('/career-paths')}
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 touch-manipulation"
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none'
        }}
      >
        {t('nav.career')}
      </button>
      <button
        onClick={handleNavigation('/my-profile')}
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 touch-manipulation"
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none'
        }}
      >
        {t('nav.profile')}
      </button>
      {isAdmin && (
        <button
          onClick={handleNavigation('/admin')}
          className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors duration-200 touch-manipulation"
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            userSelect: 'none'
          }}
        >
          <User className="w-4 h-4" />
          Admin
        </button>
      )}
    </div>
  );
};

export default NavigationLinks;
