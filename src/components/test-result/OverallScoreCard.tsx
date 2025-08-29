import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StandardizedScore } from '@/types/tests';
import { useTranslation } from '@/hooks/useTranslation';

interface OverallScoreCardProps {
  score: Partial<StandardizedScore>;
  testName?: string;
}

export const OverallScoreCard: React.FC<OverallScoreCardProps> = ({ score, testName }) => {
  const { t } = useTranslation();
  
  const overallPercentage = score.overall ?? 0;
  const rawScore = score.raw_score ?? 0;
  const maxScore = score.max_score ?? 0;
  const interpretation = score.interpretation ?? t('testResult.interpretation.notAvailable');

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('testResult.overallScore.title', { testName: testName || t('testResult.incomplete') })}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{t('testResult.overallScore.totalScore')}</h3>
          <p className="text-4xl font-bold text-primary">{overallPercentage}%</p>
          <p className="text-sm text-muted-foreground mb-4">{t('testResult.overallScore.description')}</p>
          <p className="text-sm text-muted-foreground">{interpretation}</p>
        </div>
        <div>
          <p className="text-sm">
            <span className="font-semibold">{t('testResult.overallScore.pointsObtained')}</span> {rawScore}
          </p>
          <p className="text-sm">
            <span className="font-semibold">{t('testResult.overallScore.maxPoints')}</span> {maxScore}
          </p>
        </div>
        
        <div className="pt-2">
          <h4 className="font-semibold text-base mb-2">{t('testResult.overallScore.whatMeansTitle')}</h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallScoreCard;