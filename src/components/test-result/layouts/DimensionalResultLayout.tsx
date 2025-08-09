
import React from 'react';
import { StandardizedScore } from '@/hooks/useTestCalculation';
import TestResultHeader from '../TestResultHeader';
import { TestExplanations } from '@/components/tests/TestExplanations';
import { ScoringExplanation } from '../ScoringExplanation';
import OverallScoreCard from '../OverallScoreCard';
import DimensionsAnalysis from '../DimensionsAnalysis';
import DimensionExplanations from '../DimensionExplanations';
import DetailedInterpretations from '../DetailedInterpretations';
import { TestResultCharts } from '../TestResultCharts';
import DetailedAnalysisSection from '../DetailedAnalysisSection';
import TestResultActions from '../TestResultActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { getResultLabels } from '@/utils/testResultTranslations';

interface DimensionalResultLayoutProps {
  score: StandardizedScore;
  testName: string;
  completedAt: string;
  resultId: string;
}

const DimensionalResultLayout = ({ score, testName, completedAt, resultId }: DimensionalResultLayoutProps) => {
  const { language } = useLanguage();
  const labels = getResultLabels(language);

  const hasMeaningfulDimensions = score.dimensions && 
    Object.keys(score.dimensions).length > 0 && 
    Object.values(score.dimensions).some(value => value > 0);

  const hasDetailedInterpretations = score.detailed_interpretations && 
    Object.keys(score.detailed_interpretations).length > 0 &&
    Object.values(score.detailed_interpretations).some(interpretation => 
      interpretation && interpretation.trim() !== '' && interpretation !== 'Interpretarea nu este disponibilă'
    );

  const scoreType = (testName.includes('16PF') || testName.includes('Cattell')) ? 'scale' : 'percentage';

  return (
    <div className="space-y-8">
      {/* Header */}
      <TestResultHeader testName={testName} completedAt={completedAt} />

      {/* Test Explanations */}
      <TestExplanations testName={testName} score={score} language={language} />

      {/* Scoring Explanation */}
      <ScoringExplanation 
        testName={testName}
        overallScore={score.overall}
        scoreType={scoreType}
        dimensions={score.dimensions}
      />

      {/* Overall Score - only if meaningful */}
      {score.overall > 0 && (
        <OverallScoreCard score={{
          overall: score.overall,
          raw_score: score.raw_score,
          max_score: score.max_score,
          interpretation: score.interpretation
        }} />
      )}

      {/* Dimensions Analysis */}
      {hasMeaningfulDimensions && (
        <DimensionsAnalysis 
          dimensions={score.dimensions!}
          testName={testName}
        />
      )}

      {/* Dimension Explanations */}
      {hasMeaningfulDimensions && (
        <DimensionExplanations 
          testName={testName}
          dimensions={score.dimensions!}
        />
      )}

      {/* Detailed Interpretations */}
      {hasDetailedInterpretations && (
        <DetailedInterpretations 
          interpretations={score.detailed_interpretations!}
          testName={testName}
        />
      )}

      {/* Charts Section */}
      {hasMeaningfulDimensions && (
        <TestResultCharts
          testName={testName}
          score={{
            overall: score.overall,
            dimensions: score.dimensions!,
            interpretation: score.interpretation
          }}
        />
      )}

      {/* AI Analysis Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{labels.generateAnalysis}</CardTitle>
          <p className="text-sm text-gray-600">
            {labels.analysisDescription}
          </p>
        </CardHeader>
        <CardContent>
          <DetailedAnalysisSection 
            dimensions={score.dimensions || {}} 
            resultId={resultId}
            testType={testName}
            score={{
              overall: score.overall,
              interpretation: score.interpretation
            }}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <TestResultActions />
    </div>
  );
};

export default DimensionalResultLayout;
