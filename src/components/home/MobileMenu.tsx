
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
        <div className="fixed inset-0 top-16 z-50 md:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative bg-white shadow-xl border-t border-gray-200 animate-slide-in-right">
            <div className="px-4 pt-4 pb-6 space-y-1">
              <button
                onClick={handleNavigation('/dashboard')}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
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
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
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
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
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
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
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
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
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
                  className="text-red-600 hover:text-red-800 hover:bg-red-50 block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    userSelect: 'none'
                  }}
                >
                  Admin Panel
                </button>
              )}
              
              <hr className="my-4 border-gray-200" />
              
              <button
                onClick={handleSignOut}
                className="text-red-600 hover:text-red-800 hover:bg-red-50 block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
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
        </div>
      )}
    </>
  );
};

export default MobileMenu;
