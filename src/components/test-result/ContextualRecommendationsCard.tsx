import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { StandardizedScore } from '@/types/tests';
import { getContextualRecommendations } from '@/utils/personalization/RecommendationEngine';

interface ContextualRecommendationsCardProps {
  score: StandardizedScore;
  testName?: string;
}

export const ContextualRecommendationsCard: React.FC<ContextualRecommendationsCardProps> = ({ 
  score, 
  testName 
}) => {
  const recommendations = getContextualRecommendations(testName || '', score);

  if (!recommendations) {
    return null;
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'immediate':
        return <AlertTriangle className="h-4 w-4" />;
      case 'professional':
        return <Info className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getVariantForType = (type: string) => {
    switch (type) {
      case 'immediate':
        return 'destructive' as const;
      case 'professional':
        return 'outline' as const;
      default:
        return 'secondary' as const;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Următorii pași recomandați</CardTitle>
        <p className="text-sm text-muted-foreground">
          Recomandări specifice bazate pe rezultatul tău
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              {getIconForType(rec.type)}
              <Badge variant={getVariantForType(rec.type)}>
                {rec.category}
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-sm">{rec.title}</h4>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
            </div>
            {rec.actionItems && (
              <ul className="text-sm space-y-1 ml-4">
                {rec.actionItems.map((action, actionIndex) => (
                  <li key={actionIndex} className="flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    {action}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};