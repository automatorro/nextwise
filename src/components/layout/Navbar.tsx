
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useUserRole } from '@/hooks/useUserRole';
import { Brain, User, LogOut, Menu, X, Globe } from 'lucide-react';

interface MenuItem {
  label: string;
  to: string;
}

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const { isAdmin } = useUserRole();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'ro' ? 'en' : 'ro');
  };

  const menuItems: MenuItem[] = [
    { label: t('navbar.dashboard'), to: '/dashboard' },
    { label: t('navbar.tests'), to: '/teste' },
    { label: t('navbar.career'), to: '/cariere' },
    { label: t('navbar.myProfile'), to: '/profilul-meu' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                TestMind
              </span>
            </Link>
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-1"
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </Button>
              
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t('navbar.dashboard')}
                </Link>
                <Link
                  to="/teste"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t('navbar.tests')}
                </Link>
                <Link
                  to="/cariere"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t('navbar.career')}
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
                  >
                    <User className="w-4 h-4" />
                    Admin
                  </Link>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                    <User className="h-4 w-4" />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profilul-meu')}>
                    <User className="h-4 w-4 mr-2" />
                    {t('navbar.myProfile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('navbar.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/auth"
                className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                {t('navbar.signIn')}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && user && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-red-600 hover:text-red-800 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="text-gray-700 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
            >
              {t('navbar.signOut')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
