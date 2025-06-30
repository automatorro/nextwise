
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useUserRole } from '@/hooks/useUserRole';
import { User } from 'lucide-react';

const NavigationLinks = () => {
  const { t } = useLanguage();
  const { isAdmin } = useUserRole();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link
        to="/dashboard"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 touch-manipulation"
      >
        {t('nav.dashboard')}
      </Link>
      <Link
        to="/tests"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 touch-manipulation"
      >
        {t('nav.tests')}
      </Link>
      <Link
        to="/career-paths"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 touch-manipulation"
      >
        {t('nav.career')}
      </Link>
      <Link
        to="/my-profile"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 touch-manipulation"
      >
        {t('nav.profile')}
      </Link>
      {isAdmin && (
        <Link
          to="/admin"
          className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors duration-200 touch-manipulation"
        >
          <User className="w-4 h-4" />
          Admin
        </Link>
      )}
    </div>
  );
};

export default NavigationLinks;
