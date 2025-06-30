
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings } from 'lucide-react';

const UserMenu = () => {
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
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
  );
};

export default UserMenu;
