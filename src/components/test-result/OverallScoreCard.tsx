
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';
import { getScoreColor, getScoreBadgeVariant } from '@/utils/testResultHelpers';

interface OverallScoreCardProps {
  score: {
    overall: number;
    raw_score: number;
    max_score: number;
    interpretation: string;
  };
}

const OverallScoreCard = ({ score }: OverallScoreCardProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Scorul General
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold mb-2">
              <span className={getScoreColor(score.overall)}>
                {score.overall}%
              </span>
            </div>
            <Badge variant={getScoreBadgeVariant(score.overall)}>
              {score.interpretation}
            </Badge>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div>Scor obținut: {score.raw_score}</div>
            <div>Scor maxim: {score.max_score}</div>
          </div>
        </div>
        <Progress value={score.overall} className="w-full" />
      </CardContent>
    </Card>
  );
};

export default OverallScoreCard;
