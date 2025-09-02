
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import NavigationLogo from './NavigationLogo';
import NavigationLinks from './NavigationLinks';
import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import GuestActions from './GuestActions';


const HomeNavigation = () => {
  const { loading } = useTranslation();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Show loading skeleton only during initial app load
  if (loading) {
    return (
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-9 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-20 h-9 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl" style={{ transform: 'translateX(-50%)' }}>
      <div className="bg-white shadow-lg border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <NavigationLogo />
            
            <div className="flex items-center space-x-4">
              {/* Desktop navigation - hidden on mobile */}
              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <>
                    <NavigationLinks />
                    <LanguageSelector />
                    <UserMenu />
                  </>
                ) : (
                  <>
                    <LanguageSelector />
                    <GuestActions />
                  </>
                )}
              </div>
              
              {/* Mobile menu - always show on mobile */}
              <MobileMenu 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen} 
              />
            </div>
          </div>
        </div>
        
        {/* Mobile menu content is handled within MobileMenu component */}
      </div>
    </nav>
  );
};

export default HomeNavigation;
