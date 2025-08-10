import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
import { DimensionsAnalysis } from '../DimensionsAnalysis';
import { TestExplanations } from '../../tests/TestExplanations';
import { ScoringExplanation } from '../ScoringExplanation';

interface DimensionalResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
}

export const DimensionalResultLayout: React.FC<DimensionalResultLayoutProps> = ({ score, testName }) => {
  const hasDimensions = Array.isArray(score.dimensions) && score.dimensions.length > 0;
  
  // Adaptor sigur pentru a garanta compatibilitatea cu componenta veche
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
      
      <ScoringExplanation testName={testName} />
      
      {hasDimensions && (
        <DimensionsAnalysis
          dimensions={score.dimensions} 
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