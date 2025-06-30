
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';

const GuestActions = () => {
  const { t } = useLanguage();

  return (
    <>
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
  );
};

export default GuestActions;
