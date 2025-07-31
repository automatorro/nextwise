
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">NW</span>
          </div>
          <span className="font-bold text-xl">NextWise</span>
        </div>
        <p className="text-gray-400 mb-8">
          {t('home.footerText')}
        </p>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500">
            {t('home.footerCopyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
