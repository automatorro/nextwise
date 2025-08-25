
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTestScoringExplanation, type TestExplanation } from '@/utils/scoring/testExplanations';
import { useLanguage } from '@/hooks/useLanguage';

interface ScoringExplanationProps {
  testName: string;
  overallScore?: number;
  scoreType?: string;
  dimensions?: { [key: string]: number };
  roleScores?: { [key: string]: number };
}

export const ScoringExplanation = ({ testName }: ScoringExplanationProps) => {
  const { t } = useLanguage();
  const explanation: TestExplanation = getTestScoringExplanation(testName);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{t('testResult.scoring.title')}</CardTitle>
        <CardDescription>
          {t('testResult.scoring.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {explanation.description}
        </p>

        {explanation.scoreRanges && (
          <div className="space-y-2">
            <h4 className="font-medium">{t('testResult.scoring.interpretation')}</h4>
            <div className="flex flex-wrap gap-2">
              {explanation.scoreRanges.map((range, index) => (
                <Badge key={index} variant={range.variant}>
                  {range.range}: {range.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {explanation.whatItMeans && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm font-medium">{t('testResult.scoring.whatMeans')}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {explanation.whatItMeans}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
