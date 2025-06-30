
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useUserRole } from '@/hooks/useUserRole';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }: MobileMenuProps) => {
  const { t } = useLanguage();
  const { isAdmin } = useUserRole();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Sign out clicked');
    await signOut();
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Navigating to: ${path}`);
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Menu toggle clicked');
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md touch-manipulation"
        aria-expanded="false"
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none'
        }}
      >
        <Menu className="h-6 w-6" />
      </button>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 backdrop-blur-md border-t border-white/30 rounded-b-2xl">
            <button
              onClick={handleNavigation('/dashboard')}
              className="text-gray-700 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
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
              className="text-gray-700 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
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
              className="text-gray-700 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
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
              className="text-gray-700 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                userSelect: 'none'
              }}
            >
              {t('nav.profile')}
            </button>
            <button
              onClick={handleNavigation('/subscription')}
              className="text-gray-700 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                userSelect: 'none'
              }}
            >
              {t('nav.subscriptionSettings')}
            </button>
            {isAdmin && (
              <button
                onClick={handleNavigation('/admin')}
                className="text-red-600 hover:text-red-800 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                  userSelect: 'none'
                }}
              >
                Admin Panel
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="text-gray-700 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                userSelect: 'none'
              }}
            >
              {t('nav.logout')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
