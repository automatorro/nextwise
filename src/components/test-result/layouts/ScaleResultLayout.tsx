
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import TestResultHeader from '../TestResultHeader';
import { TestExplanations } from '@/components/tests/TestExplanations';
import { ScoringExplanation } from '../ScoringExplanation';
import OverallScoreCard from '../OverallScoreCard';
import DetailedInterpretations from '../DetailedInterpretations';
import DetailedAnalysisSection from '../DetailedAnalysisSection';
import TestResultActions from '../TestResultActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { getResultLabels } from '@/utils/testResultTranslations';
import { dimensionsToObject } from '@/utils/dimensionsConverter';

interface ScaleResultLayoutProps {
  score: StandardizedScore;
  testName: string;
  completedAt: string;
  resultId: string;
}

const ScaleResultLayout = ({ score, testName, completedAt, resultId }: ScaleResultLayoutProps) => {
  const { language } = useLanguage();
  const labels = getResultLabels(language);

  // Convert dimensions array to object format for components that expect it
  const dimensionsAsObject = dimensionsToObject(score.dimensions);

  return (
    <div className="space-y-8">
      {/* Header */}
      <TestResultHeader testName={testName} completedAt={completedAt} />

      {/* Test Explanations */}
      <TestExplanations testName={testName} score={score} language={language} />

      {/* Overall Score Display */}
      <OverallScoreCard score={{
        overall: score.overall,
        raw_score: score.raw_score,
        max_score: score.max_score,
        interpretation: score.interpretation,
        severity_level: score.severity_level
      }} />

      {/* Scoring Explanation */}
      <ScoringExplanation 
        testName={testName}
        overallScore={score.overall}
        scoreType="raw"
      />

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
            dimensions={dimensionsAsObject} 
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

export default ScaleResultLayout;
