
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getDimensionLabel } from '@/utils/testLabels';
import { getScoreColor } from '@/utils/testScoring';

interface DimensionsAnalysisProps {
  dimensions: { [key: string]: number };
  testName?: string;
}

const DimensionsAnalysis = ({ dimensions, testName = '' }: DimensionsAnalysisProps) => {
  if (!dimensions || Object.keys(dimensions).length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Analiza pe Dimensiuni</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(dimensions).map(([key, value]) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{getDimensionLabel(testName, key)}</h3>
                <span className={`font-bold ${getScoreColor(value)}`}>
                  {value}%
                </span>
              </div>
              <Progress value={value} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensionsAnalysis;
