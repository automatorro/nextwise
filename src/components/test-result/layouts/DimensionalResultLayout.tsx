import React from 'react';
import { StandardizedScore } from '@/types/tests';
import TestResultHeader from '../TestResultHeader';
import { TestExplanations } from '@/components/tests/TestExplanations';
import { ScoringExplanation } from '../ScoringExplanation';
import DimensionsAnalysis from '../DimensionsAnalysis';
import DetailedInterpretations from '../DetailedInterpretations';
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
        scoreType="percentage"
        dimensions={score.dimensions}
      />

      {/* Dimensions Analysis */}
      {score.dimensions && (
        <DimensionsAnalysis
          dimensions={score.dimensions}
          testName={testName}
        />
      )}

      {/* Detailed Interpretations */}
      {score.detailed_interpretations && (
        <DetailedInterpretations
          interpretations={score.detailed_interpretations}
          testName={testName}
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
              raw_score: score.raw_score,
              max_score: score.max_score,
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
