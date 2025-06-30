
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';

const GuestActions = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Login button clicked');
    navigate('/auth');
  };

  const handleStartFreeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Start Free button clicked');
    navigate('/auth');
  };

  return (
    <>
      <Button 
        variant="ghost" 
        className="hover:bg-white/60 transition-colors duration-200 touch-manipulation"
        onClick={handleLoginClick}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none'
        }}
      >
        {t('nav.login')}
      </Button>
      <Button 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation"
        onClick={handleStartFreeClick}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none'
        }}
      >
        {t('nav.startFree')}
      </Button>
    </>
  );
};

export default GuestActions;
