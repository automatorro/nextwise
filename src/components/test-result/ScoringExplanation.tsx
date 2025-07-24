
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTestScoringExplanation } from '@/utils/scoring/testExplanations';

interface ScoringExplanationProps {
  testName: string;
  overallScore?: number;
  scoreType?: string;
  dimensions?: { [key: string]: number };
  roleScores?: { [key: string]: number };
}

export const ScoringExplanation = ({ testName }: ScoringExplanationProps) => {
  const explanation = getTestScoringExplanation(testName);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Cum se calculează scorul</CardTitle>
        <CardDescription>
          Explicația sistemului de evaluare pentru acest test
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {explanation.description}
        </p>

        {explanation.scoreRanges && (
          <div className="space-y-2">
            <h4 className="font-medium">Interpretarea scorurilor:</h4>
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
            <p className="text-sm font-medium">Ce înseamnă rezultatele tale:</p>
            <p className="text-sm text-muted-foreground mt-1">
              {explanation.whatItMeans}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
