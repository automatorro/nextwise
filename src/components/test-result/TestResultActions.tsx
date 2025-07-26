
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const TestResultActions = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex gap-4">
      <Button onClick={() => navigate('/teste')} className="flex-1">
        {t('tests.takeTest')}
      </Button>
      <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex-1">
        {t('nav.dashboard')}
      </Button>
    </div>
  );
};

export default TestResultActions;
