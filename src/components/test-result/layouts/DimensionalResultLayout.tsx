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
  // Verificăm dacă 'dimensions' este o listă și are conținut
  const hasDimensions = Array.isArray(score.dimensions) && score.dimensions.length > 0;
  
  return (
    <div className="space-y-6">
      <OverallScoreCard
        scorePercentage={score.overall}
        rawScore={score.raw_score}
        maxScore={score.max_score}
        interpretation={score.interpretation}
        testName={testName}
      />
      
      <ScoringExplanation />
      
      {/* AICI ESTE CORECȚIA. Trimitem lista direct, fără nicio conversie. */}
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