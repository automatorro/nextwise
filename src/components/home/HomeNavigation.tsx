
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Menu, Globe, Settings } from 'lucide-react';

const HomeNavigation = () => {
  const { t, language, changeLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'ro' ? 'en' : 'ro';
    changeLanguage(newLanguage);
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-white/80 backdrop-blur-md shadow-lg border border-white/30 rounded-2xl">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EC</span>
              </div>
              <Link to={user ? "/dashboard" : "/"}>
                <span className="font-bold text-xl text-gray-900">EmpowerCareer</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="hidden md:flex items-center space-x-4">
                    <Link
                      to="/dashboard"
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {t('nav.dashboard')}
                    </Link>
                    <Link
                      to="/teste"
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {t('nav.tests')}
                    </Link>
                    <Link
                      to="/cariere"
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {t('nav.career')}
                    </Link>
                    <Link
                      to="/profilul-meu"
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {t('nav.profile')}
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

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="flex items-center gap-1"
                  >
                    <Globe className="w-4 h-4" />
                    {language.toUpperCase()}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                        <User className="h-4 w-4" />
                        <span className="sr-only">Open user menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate('/abonament')}>
                        <Settings className="h-4 w-4 mr-2" />
                        {t('nav.subscriptionSettings')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        {t('nav.logout')}
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
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="flex items-center gap-1"
                  >
                    <Globe className="w-4 h-4" />
                    {language.toUpperCase()}
                  </Button>
                  
                  <Link to="/auth">
                    <Button variant="ghost" className="hover:bg-white/60 transition-colors">
                      {t('nav.login')}
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      {t('nav.startFree')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state. */}
        {isMenuOpen && user && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 backdrop-blur-md border-t border-white/30 rounded-b-2xl">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.dashboard')}
              </Link>
              <Link
                to="/teste"
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.tests')}
              </Link>
              <Link
                to="/cariere"
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.career')}
              </Link>
              <Link
                to="/profilul-meu"
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.profile')}
              </Link>
              <Link
                to="/abonament"
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.subscriptionSettings')}
              </Link>
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
                {t('nav.logout')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomeNavigation;
