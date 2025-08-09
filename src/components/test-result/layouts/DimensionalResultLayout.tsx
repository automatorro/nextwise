
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
import DimensionsAnalysis from '../DimensionsAnalysis';
import { TestExplanations } from '@/components/tests/TestExplanations';
import { ScoringExplanation } from '../ScoringExplanation';

interface DimensionalResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
}

export const DimensionalResultLayout: React.FC<DimensionalResultLayoutProps> = ({ score, testName }) => {
  const hasDimensions = score.dimensions && score.dimensions.length > 0;

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

      <ScoringExplanation 
        testName={testName || ''}
        overallScore={score.overall}
        scoreType="percentage"
      />

      {hasDimensions && (
        <DimensionsAnalysis
          dimensions={score.dimensions.reduce((acc, dim) => {
            acc[dim.id] = dim.score;
            return acc;
          }, {} as { [key: string]: number })}
          testName={testName}
        />
      )}

      {hasDimensions && (
        <TestExplanations
          score={score}
          testName={testName || ''}
        />
      )}
    </div>
  );
};
