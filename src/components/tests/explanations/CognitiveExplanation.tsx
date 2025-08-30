
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CognitiveExplanationProps {
  score?: any;
  language?: string;
}

const CognitiveExplanation: React.FC<CognitiveExplanationProps> = ({ score }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('tests.cognitive.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {t('tests.cognitive.comingSoon')}
        </p>
      </CardContent>
    </Card>
  );
};

export default CognitiveExplanation;
