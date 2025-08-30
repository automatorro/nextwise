
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BigFiveExplanationProps {
  score?: any;
  language?: string;
}

const BigFiveExplanation: React.FC<BigFiveExplanationProps> = ({ score }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('tests.bigFive.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {t('tests.bigFive.comingSoon')}
        </p>
      </CardContent>
    </Card>
  );
};

export default BigFiveExplanation;
