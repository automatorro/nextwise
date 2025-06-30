
import React from 'react';
import { Link } from 'react-router-dom';
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

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md touch-manipulation"
        aria-expanded="false"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <Menu className="h-6 w-6" />
      </button>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 backdrop-blur-md border-t border-white/30 rounded-b-2xl">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {t('nav.dashboard')}
            </Link>
            <Link
              to="/tests"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {t('nav.tests')}
            </Link>
            <Link
              to="/career-paths"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {t('nav.career')}
            </Link>
            <Link
              to="/my-profile"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {t('nav.profile')}
            </Link>
            <Link
              to="/subscription"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {t('nav.subscriptionSettings')}
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-red-600 hover:text-red-800 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="text-gray-700 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
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
