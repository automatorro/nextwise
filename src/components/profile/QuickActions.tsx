
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface QuickActionsProps {
  isAdmin: boolean;
}

const QuickActions = ({ isAdmin }: QuickActionsProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.quickActions.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button 
            className="w-full" 
            onClick={() => navigate('/tests')}
          >
            {t('profile.quickActions.tryNewTest')}
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            {t('profile.quickActions.goToDashboard')}
          </Button>
          {!isAdmin && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/abonament')}
            >
              {t('profile.quickActions.viewSubscription')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
