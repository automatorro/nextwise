
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { getResultLabels } from '@/utils/testResultTranslations';

interface ScoreData {
  overall: number;
  raw_score: number;
  max_score: number;
  interpretation: string;
  severity_level?: string;
}

interface OverallScoreCardProps {
  score: ScoreData;
}

const OverallScoreCard = ({ score }: OverallScoreCardProps) => {
  const { language } = useLanguage();
  const labels = getResultLabels(language);

  // Defensive checks
  if (!score || typeof score.overall !== 'number') {
    return null;
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    if (score >= 40) return 'outline';
    return 'destructive';
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'minimal':
        return 'default';
      case 'ușoară':
      case 'light':
        return 'secondary';
      case 'moderată':
      case 'moderate':
        return 'outline';
      case 'severă':
      case 'severe':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{labels.overallScoreTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="text-6xl font-bold text-blue-600">
            {score.overall}%
          </div>
          
          {score.severity_level && (
            <Badge variant={getSeverityBadgeVariant(score.severity_level)} className="text-sm">
              {score.severity_level}
            </Badge>
          )}
          
          <Badge variant={getScoreBadgeVariant(score.overall)} className="text-lg px-4 py-2">
            {score.overall >= 80 ? 'Excelent' : 
             score.overall >= 60 ? 'Bun' : 
             score.overall >= 40 ? 'Mediu' : 'Scăzut'}
          </Badge>
          
          <div className="text-gray-600 space-y-2">
            <p>
              {labels.scoredPoints}: {score.raw_score} / {labels.maxPoints}: {score.max_score}
            </p>
            
            {score.interpretation && score.interpretation !== labels.noInterpretationAvailable && (
              <p className="mt-4 text-lg font-medium text-gray-800">
                {score.interpretation}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallScoreCard;
