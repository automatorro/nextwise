import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Target, TrendingUp } from 'lucide-react';
import { StandardizedScore } from '@/types/tests';
import { getProgressPath, ProgressPath } from '@/utils/personalization/ProgressPathGenerator';
import { useLanguage } from '@/hooks/useLanguage';

interface ProgressPathCardProps {
  score: StandardizedScore;
  testName?: string;
}

export const ProgressPathCard: React.FC<ProgressPathCardProps> = ({ 
  score, 
  testName 
}) => {
  const { t } = useLanguage();
  const [progressPath, setProgressPath] = useState<ProgressPath | null>(null);

  useEffect(() => {
    const loadProgressPath = async () => {
      const path = await getProgressPath(testName || '', score);
      setProgressPath(path);
    };
    loadProgressPath();
  }, [testName, score]);

  if (!progressPath) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          {t('progressPath.title')}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t('progressPath.subtitle')}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {progressPath.milestones.map((milestone, index) => (
            <div key={index} className="p-3 border rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {milestone.timeframe}
                </Badge>
              </div>
              <h4 className="font-semibold text-sm mb-1">{milestone.goal}</h4>
              <p className="text-xs text-muted-foreground">{milestone.description}</p>
            </div>
          ))}
        </div>

        {progressPath.trackingMethods && (
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Cum să urmărești progresul
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {progressPath.trackingMethods.map((method, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {method}
                </li>
              ))}
            </ul>
          </div>
        )}

        {progressPath.retestRecommendation && (
          <div className="p-3 bg-muted/50 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium text-sm">Recomandare re-testare</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {progressPath.retestRecommendation}
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Setează reminder
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};