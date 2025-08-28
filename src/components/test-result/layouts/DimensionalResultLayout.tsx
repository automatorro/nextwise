
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
import { DimensionsAnalysis } from '../DimensionsAnalysis';
import { TestExplanations } from '../../tests/TestExplanations';
import { ScoringExplanation } from '../ScoringExplanation';
import { AiAnalysisCard } from '../AiAnalysisCard';
import { PersonalizedResultsCard } from '../PersonalizedResultsCard';
import { ContextualRecommendationsCard } from '../ContextualRecommendationsCard';
import { LifeImpactExplanation } from '../LifeImpactExplanation';
import { ProgressPathCard } from '../ProgressPathCard';

interface DimensionalResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
  resultId?: string;
}

export const DimensionalResultLayout: React.FC<DimensionalResultLayoutProps> = ({ score, testName, resultId }) => {
  const hasDimensions = Array.isArray(score.dimensions) && score.dimensions.length > 0;
  
  const cardScoreData = {
    overall: score.overall ?? 0,
    raw_score: score.raw_score ?? 0,
    max_score: score.max_score ?? 0,
    interpretation: score.interpretation ?? '',
    dimensions: score.dimensions ?? [],
    detailed_interpretations: score.detailed_interpretations ?? {},
  };

  return (
    <div className="space-y-6">
      <OverallScoreCard
        score={cardScoreData}
        testName={testName}
      />
      
      <PersonalizedResultsCard score={score} testName={testName} />
      
      <ContextualRecommendationsCard score={score} testName={testName} />
      
      <LifeImpactExplanation score={score} testName={testName} />
      
      <ProgressPathCard score={score} testName={testName} />
      
      <AiAnalysisCard score={score} testName={testName} resultId={resultId} />
      
      <ScoringExplanation testName={testName} />
      
      {hasDimensions && (
        <DimensionsAnalysis
          dimensions={score.dimensions}
          testName={testName}
        />
      )}
      
      {hasDimensions && (
        <TestExplanations
          score={score}
          testName={testName}
        />
      )}
    </div>
  );
};
