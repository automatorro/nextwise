
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';

const GuestActions = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('GuestActions: Login button clicked - START');
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log('GuestActions: Attempting navigation to /auth');
      navigate('/auth');
      console.log('GuestActions: Navigation completed');
    } catch (error) {
      console.error('GuestActions: Navigation failed:', error);
    }
  };

  const handleStartFreeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('GuestActions: Start Free button clicked - START');
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log('GuestActions: Attempting navigation to /auth');
      navigate('/auth');
      console.log('GuestActions: Navigation completed');
    } catch (error) {
      console.error('GuestActions: Navigation failed:', error);
    }
  };

  console.log('GuestActions: Component rendered');

  return (
    <>
      <Link 
        to="/how-it-works"
        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 min-h-[44px] min-w-[44px] px-4 py-2 flex items-center justify-center"
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none'
        }}
      >
        {t('header.howItWorks')}
      </Link>
      <Button 
        variant="ghost" 
        className="hover:bg-gray-100 transition-colors duration-200 min-h-[44px] min-w-[44px] px-4 py-2"
        onClick={handleLoginClick}
        onTouchStart={() => console.log('GuestActions: Login touch start')}
        onTouchEnd={() => console.log('GuestActions: Login touch end')}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none',
          cursor: 'pointer'
        }}
      >
        {t('header.login')}
      </Button>
      <Button 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg min-h-[44px] min-w-[44px] px-4 py-2"
        onClick={handleStartFreeClick}
        onTouchStart={() => console.log('GuestActions: Start Free touch start')}
        onTouchEnd={() => console.log('GuestActions: Start Free touch end')}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none',
          cursor: 'pointer'
        }}
      >
        {t('header.startFree')}
      </Button>
    </>
  );
};

export default GuestActions;
