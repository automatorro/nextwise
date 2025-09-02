
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings } from 'lucide-react';

const UserMenu = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('User menu sign out clicked');
    await signOut();
    navigate('/auth');
  };

  const handleSubscriptionSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Subscription settings clicked');
    navigate('/subscription');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="rounded-full h-8 w-8 p-0 touch-manipulation"
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            userSelect: 'none'
          }}
        >
          <User className="h-4 w-4" />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-gray-200 shadow-lg z-[60]">
        <DropdownMenuItem 
          onClick={handleSubscriptionSettings} 
          className="touch-manipulation cursor-pointer"
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}
        >
          <Settings className="h-4 w-4 mr-2" />
          {t('header.subscriptionSettings')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleSignOut} 
          className="touch-manipulation cursor-pointer"
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t('header.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
