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
  
  return (
    <div className="space-y-6">
      {/* === AICI ESTE CORECȚIA FINALĂ === */}
      {/* Am modificat proprietățile pentru a se potrivi cu ce așteaptă componenta OverallScoreCard */}
      <OverallScoreCard
        score={score} // Trimitem întregul obiect de scor
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