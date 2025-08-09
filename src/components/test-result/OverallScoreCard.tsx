
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';
import { getScoreColor, getScoreBadgeVariant } from '@/utils/testScoring';
import { useLanguage } from '@/hooks/useLanguage';
import { getResultLabels } from '@/utils/testResultTranslations';

interface OverallScoreCardProps {
  score: {
    overall: number;
    raw_score: number;
    max_score: number;
    interpretation: string;
  };
}

const OverallScoreCard = ({ score }: OverallScoreCardProps) => {
  const { language } = useLanguage();
  const labels = getResultLabels(language);

  // Defensive checks - don't render if no meaningful score
  if (!score || typeof score.overall !== 'number' || score.overall <= 0) {
    return null;
  }

  const safeOverall = Math.max(0, Math.min(100, score.overall));
  const safeRawScore = typeof score.raw_score === 'number' ? score.raw_score : 0;
  const safeMaxScore = typeof score.max_score === 'number' && score.max_score > 0 ? score.max_score : 100;
  const safeInterpretation = score.interpretation || labels.noInterpretationAvailable || 'Scor calculat';

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          {labels.overallScoreTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold mb-2">
              <span className={getScoreColor(safeOverall)}>
                {safeOverall}%
              </span>
            </div>
            <Badge variant={getScoreBadgeVariant(safeOverall)}>
              {safeInterpretation}
            </Badge>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div>{labels.scoredPoints}: {safeRawScore}</div>
            <div>{labels.maxPoints}: {safeMaxScore}</div>
          </div>
        </div>
        <Progress value={safeOverall} className="w-full" />
      </CardContent>
    </Card>
  );
};

export default OverallScoreCard;
