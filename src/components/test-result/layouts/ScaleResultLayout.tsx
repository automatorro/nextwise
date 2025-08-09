
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScaleResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
}

export const ScaleResultLayout: React.FC<ScaleResultLayoutProps> = ({ score, testName }) => {
  return (
    <div className="space-y-6">
      <OverallScoreCard
        score={{
          overall: score.overall || 0,
          raw_score: score.raw_score || 0,
          max_score: score.max_score || 0,
          interpretation: score.interpretation || ''
        }}
      />

      {score.scale_level && (
        <Card>
          <CardHeader>
            <CardTitle>Nivelul tău:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{score.scale_level}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
