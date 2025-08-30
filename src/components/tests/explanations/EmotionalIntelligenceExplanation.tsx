
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EmotionalIntelligenceExplanationProps {
  score?: any;
  language?: string;
}

const EmotionalIntelligenceExplanation: React.FC<EmotionalIntelligenceExplanationProps> = ({ score }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('tests.emotionalIntelligence.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {t('tests.emotionalIntelligence.comingSoon')}
        </p>
      </CardContent>
    </Card>
  );
};

export default EmotionalIntelligenceExplanation;
