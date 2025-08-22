
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useUserRole } from '@/hooks/useUserRole';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }: MobileMenuProps) => {
  const { t } = useLanguage();
  const { isAdmin } = useUserRole();
  const { signOut, user } = useAuth();
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
    console.log('Menu toggle clicked - current state:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu toggle - new state will be:', !isMenuOpen);
  };

  // Mobile menu content based on authentication status
  const renderMenuContent = () => (
    <div className="px-4 pt-4 pb-6 space-y-1">
      {user ? (
        // Authenticated user menu
        <>
          <button
            onClick={handleNavigation('/dashboard')}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-colors duration-200"
            style={{ minHeight: '48px' }}
          >
            {t('header.dashboard')}
          </button>
          <button
            onClick={handleNavigation('/tests')}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-colors duration-200"
            style={{ minHeight: '48px' }}
          >
            {t('header.tests')}
          </button>
          <button
            onClick={handleNavigation('/career-paths')}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-colors duration-200"
            style={{ minHeight: '48px' }}
          >
            {t('header.career')}
          </button>
          <button
            onClick={handleNavigation('/my-profile')}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-colors duration-200"
            style={{ minHeight: '48px' }}
          >
            {t('header.profile')}
          </button>
          <button
            onClick={handleNavigation('/subscription')}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-colors duration-200"
            style={{ minHeight: '48px' }}
          >
            {t('header.subscriptionSettings')}
          </button>
          {isAdmin && (
            <button
              onClick={handleNavigation('/admin')}
              className="text-red-600 hover:text-red-800 hover:bg-red-50 block w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-colors duration-200"
              style={{ minHeight: '48px' }}
            >
              {t('header.adminPanel')}
            </button>
          )}
          
          <hr className="my-4 border-gray-200" />
          
          <button
            onClick={handleSignOut}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 block w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-colors duration-200"
            style={{ minHeight: '48px' }}
          >
            {t('header.logout')}
          </button>
        </>
      ) : (
        // Guest user menu
        <>
          <button
            onClick={handleNavigation('/auth')}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 block w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-colors duration-200"
            style={{ minHeight: '48px' }}
          >
            {t('auth.signIn')}
          </button>
          <button
            onClick={handleNavigation('/auth')}
            className="bg-blue-600 text-white hover:bg-blue-700 block w-full text-center px-4 py-4 rounded-lg text-base font-medium transition-colors duration-200"
            style={{ minHeight: '48px' }}
          >
            {t('auth.signUp')}
          </button>
        </>
      )}
    </div>
  );

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md"
        aria-expanded={isMenuOpen}
        aria-label="Toggle menu"
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none'
        }}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isMenuOpen && createPortal(
        <div className="fixed inset-0 z-[200] md:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/30"
            onClick={() => setIsMenuOpen(false)}
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          />
          
          {/* Menu Content */}
          <div 
            className="fixed top-20 left-4 right-4 bg-white shadow-2xl border border-gray-200 rounded-xl animate-scale-in max-h-[calc(100vh-6rem)] overflow-y-auto"
            style={{
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {renderMenuContent()}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default MobileMenu;
