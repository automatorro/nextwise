
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AiAnalysisCard } from '../AiAnalysisCard';
import { ScoringExplanation } from '../ScoringExplanation';
import { TestExplanations } from '../../tests/TestExplanations';
import { PersonalizedResultsCard } from '../PersonalizedResultsCard';
import { ContextualRecommendationsCard } from '../ContextualRecommendationsCard';
import { LifeImpactExplanation } from '../LifeImpactExplanation';
import { ProgressPathCard } from '../ProgressPathCard';

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
        testName={testName}
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

      {/* Personalized Interpretation */}
      <PersonalizedResultsCard score={score} testName={testName} />

      {/* Life Impact Explanation */}
      <LifeImpactExplanation score={score} testName={testName} />

      {/* Contextual Recommendations */}
      <ContextualRecommendationsCard score={score} testName={testName} />

      {/* Progress Path */}
      <ProgressPathCard score={score} testName={testName} />

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
