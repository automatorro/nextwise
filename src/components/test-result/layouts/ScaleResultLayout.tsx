
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AiAnalysisCard } from '../AiAnalysisCard';
import { ScoringExplanation } from '../ScoringExplanation';
import { TestExplanations } from '../../tests/TestExplanations';

interface ScaleResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
  resultId?: string;
}

export const ScaleResultLayout: React.FC<ScaleResultLayoutProps> = ({ score, testName, resultId }) => {
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

      {/* Test Explanations */}
      {testName && (
        <TestExplanations testName={testName} score={score} />
      )}

      {/* AI Analysis Card */}
      <AiAnalysisCard 
        score={score} 
        testName={testName} 
        resultId={resultId} 
      />

      {/* Scoring Explanation */}
      <ScoringExplanation 
        testName={testName || ''} 
        overallScore={score.overall}
        scoreType={score.type}
      />
    </div>
  );
};
