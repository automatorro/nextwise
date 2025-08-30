
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const NavigationLinks = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const links = [
    { to: '/dashboard', label: t('header.dashboard') },
    { to: '/tests', label: t('header.tests') },
    { to: '/career-paths', label: t('header.career') },
    { to: '/my-profile', label: t('header.profile') },
    { to: '/how-it-works', label: t('header.howItWorks') },
  ];

  return (
    <div className="hidden md:flex items-center space-x-6">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`text-sm font-medium transition-colors hover:text-blue-600 ${
            location.pathname === link.to
              ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
              : 'text-gray-700'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavigationLinks;
