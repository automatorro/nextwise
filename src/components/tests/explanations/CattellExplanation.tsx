
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CattellExplanationProps {
  score?: any;
  language?: string;
}

const CattellExplanation: React.FC<CattellExplanationProps> = ({ score }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('tests.cattell.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {t('tests.cattell.comingSoon')}
        </p>
      </CardContent>
    </Card>
  );
};

export default CattellExplanation;
