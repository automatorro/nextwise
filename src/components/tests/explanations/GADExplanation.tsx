
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getClinicalTestExplanation } from '@/utils/testSpecificExplanations/clinicalExplanations';

interface GADExplanationProps {
  score?: any;
  language?: string;
}

export const GADExplanation: React.FC<GADExplanationProps> = ({ score, language = 'ro' }) => {
  const explanation = getClinicalTestExplanation('GAD-7', language as 'en' | 'ro');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ce înseamnă rezultatele tale GAD-7</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {explanation.description}
        </p>

        <div className="space-y-2">
          <h4 className="font-medium">Interpretarea scorurilor:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {explanation.clinicalRanges.map((range, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Badge variant={range.variant}>
                  {range.range}
                </Badge>
                <span className="text-sm">{range.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm font-medium">Ce înseamnă rezultatele tale:</p>
          <p className="text-sm text-muted-foreground mt-1">
            {explanation.whatItMeans}
          </p>
        </div>

        <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
          <p className="text-sm font-medium text-orange-800">Limitări importante:</p>
          <p className="text-sm text-orange-700 mt-1">
            {explanation.limitations}
          </p>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm font-medium text-blue-800">Recomandări:</p>
          <p className="text-sm text-blue-700 mt-1">
            {explanation.recommendations}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GADExplanation;
