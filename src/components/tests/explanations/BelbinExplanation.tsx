
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BelbinExplanationProps {
  score?: any;
  language?: string;
}

const BelbinExplanation: React.FC<BelbinExplanationProps> = ({ score }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('tests.belbin.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {t('tests.belbin.comingSoon')}
        </p>
      </CardContent>
    </Card>
  );
};

export default BelbinExplanation;
