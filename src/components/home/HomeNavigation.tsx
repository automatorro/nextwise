
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, LogOut, Menu, Settings } from 'lucide-react';

const HomeNavigation = () => {
  const { t, language, changeLanguage, loading } = useLanguage();
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleLanguageChange = async (newLanguage: string) => {
    if (newLanguage === language) return;
    
    console.log('🔄 User changing language to:', newLanguage);
    await changeLanguage(newLanguage as 'ro' | 'en');
  };

  // Show loading skeleton only during initial app load
  if (loading) {
    return (
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="bg-white/80 backdrop-blur-md shadow-lg border border-white/30 rounded-2xl">
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
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-white/80 backdrop-blur-md shadow-lg border border-white/30 rounded-2xl">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EC</span>
              </div>
              {/* Logo always goes to home page */}
              <Link to="/">
                <span className="font-bold text-xl text-gray-900">EmpowerCareer</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
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

                  <Select 
                    value={language} 
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger className="w-20 h-9 bg-white/60 hover:bg-white/80 border-gray-200 touch-manipulation">
                      <SelectValue>
                        {language.toUpperCase()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-lg z-[60]">
                      <SelectItem value="ro" className="hover:bg-gray-100 touch-manipulation">
                        RO
                      </SelectItem>
                      <SelectItem value="en" className="hover:bg-gray-100 touch-manipulation">
                        EN
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="rounded-full h-8 w-8 p-0 touch-manipulation">
                        <User className="h-4 w-4" />
                        <span className="sr-only">Open user menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border-gray-200 shadow-lg z-[60]">
                      <DropdownMenuItem onClick={() => navigate('/subscription')} className="touch-manipulation">
                        <Settings className="h-4 w-4 mr-2" />
                        {t('nav.subscriptionSettings')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut} className="touch-manipulation">
                        <LogOut className="h-4 w-4 mr-2" />
                        {t('nav.logout')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md touch-manipulation"
                    aria-expanded="false"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </>
              ) : (
                <>
                  <Select 
                    value={language} 
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger className="w-20 h-9 bg-white/60 hover:bg-white/80 border-gray-200 touch-manipulation">
                      <SelectValue>
                        {language.toUpperCase()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-lg z-[60]">
                      <SelectItem value="ro" className="hover:bg-gray-100 touch-manipulation">
                        RO
                      </SelectItem>
                      <SelectItem value="en" className="hover:bg-gray-100 touch-manipulation">
                        EN
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="hover:bg-white/60 transition-colors duration-200 touch-manipulation"
                  >
                    <Link to="/auth" className="no-underline">
                      {t('nav.login')}
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation"
                  >
                    <Link to="/auth" className="no-underline">
                      {t('nav.startFree')}
                    </Link>
                  </Button>
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
      </div>
    </nav>
  );
};

export default HomeNavigation;
